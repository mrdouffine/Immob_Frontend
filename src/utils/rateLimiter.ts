// Persistent rate limiter with localStorage
class PersistentRateLimiter {
    private readonly storageKey = 'rate-limiter';
    private readonly maxAttempts: number;
    private readonly windowMs: number;

    constructor(maxAttempts: number = 10, windowMs: number = 60000) {
        this.maxAttempts = maxAttempts;
        this.windowMs = windowMs;
        this.cleanup();
    }

    private getAttempts(key: string): number[] {
        try {
            const stored = localStorage.getItem(`${this.storageKey}-${key}`);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    private setAttempts(key: string, attempts: number[]): void {
        try {
            localStorage.setItem(`${this.storageKey}-${key}`, JSON.stringify(attempts));
        } catch (error) {
            console.warn('Failed to persist rate limiter data:', error);
        }
    }

    private cleanup(): void {
        // Nettoyer les anciennes entrées au démarrage
        try {
            const now = Date.now();
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key?.startsWith(this.storageKey)) {
                    const attempts = JSON.parse(localStorage.getItem(key) || '[]');
                    const recent = attempts.filter((time: number) => now - time < this.windowMs);
                    if (recent.length === 0) {
                        localStorage.removeItem(key);
                    } else {
                        localStorage.setItem(key, JSON.stringify(recent));
                    }
                }
            }
        } catch (error) {
            console.warn('Failed to cleanup rate limiter:', error);
        }
    }

    canProceed(key: string): boolean {
        const now = Date.now();
        const attempts = this.getAttempts(key);

        // Nettoyer les anciennes tentatives
        const recentAttempts = attempts.filter(time => now - time < this.windowMs);

        if (recentAttempts.length >= this.maxAttempts) {
            return false;
        }

        recentAttempts.push(now);
        this.setAttempts(key, recentAttempts);
        return true;
    }

    getRemainingAttempts(key: string): number {
        const now = Date.now();
        const attempts = this.getAttempts(key);
        const recentAttempts = attempts.filter(time => now - time < this.windowMs);
        return Math.max(0, this.maxAttempts - recentAttempts.length);
    }

    getTimeUntilReset(key: string): number {
        const attempts = this.getAttempts(key);
        if (attempts.length === 0) return 0;

        const oldestAttempt = Math.min(...attempts);
        const resetTime = oldestAttempt + this.windowMs;
        return Math.max(0, resetTime - Date.now());
    }

    reset(key: string): void {
        try {
            localStorage.removeItem(`${this.storageKey}-${key}`);
        } catch (error) {
            console.warn('Failed to reset rate limiter:', error);
        }
    }

    clearAll(): void {
        try {
            for (let i = localStorage.length - 1; i >= 0; i--) {
                const key = localStorage.key(i);
                if (key?.startsWith(this.storageKey)) {
                    localStorage.removeItem(key);
                }
            }
        } catch (error) {
            console.warn('Failed to clear rate limiter:', error);
        }
    }
}

// Export instances with persistence
export const messageLimiter = new PersistentRateLimiter(10, 60000); // 10 messages par minute
export const searchLimiter = new PersistentRateLimiter(20, 60000); // 20 recherches par minute
export const apiLimiter = new PersistentRateLimiter(5, 60000); // 5 appels API par minute
export const loginLimiter = new PersistentRateLimiter(5, 300000); // 5 tentatives par 5 minutes

export default PersistentRateLimiter;
