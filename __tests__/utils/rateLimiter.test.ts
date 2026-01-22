import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import RateLimiter, { messageLimiter, searchLimiter } from '../../src/utils/rateLimiter';

describe('RateLimiter', () => {
    let limiter: RateLimiter;

    beforeEach(() => {
        limiter = new RateLimiter(5, 60000); // 5 attempts per minute
    });

    it('should allow requests within limit', () => {
        expect(limiter.canProceed('test-key')).toBe(true);
        expect(limiter.canProceed('test-key')).toBe(true);
        expect(limiter.canProceed('test-key')).toBe(true);
    });

    it('should block requests exceeding limit', () => {
        for (let i = 0; i < 5; i++) {
            limiter.canProceed('test-key');
        }
        expect(limiter.canProceed('test-key')).toBe(false);
    });

    it('should track different keys separately', () => {
        for (let i = 0; i < 5; i++) {
            limiter.canProceed('key1');
        }
        expect(limiter.canProceed('key1')).toBe(false);
        expect(limiter.canProceed('key2')).toBe(true);
    });

    it('should return correct remaining attempts', () => {
        expect(limiter.getRemainingAttempts('test-key')).toBe(5);
        limiter.canProceed('test-key');
        expect(limiter.getRemainingAttempts('test-key')).toBe(4);
        limiter.canProceed('test-key');
        expect(limiter.getRemainingAttempts('test-key')).toBe(3);
    });

    it('should calculate time until reset', () => {
        limiter.canProceed('test-key');
        const timeUntilReset = limiter.getTimeUntilReset('test-key');
        expect(timeUntilReset).toBeGreaterThan(0);
        expect(timeUntilReset).toBeLessThanOrEqual(60000);
    });

    it('should reset attempts for a key', () => {
        for (let i = 0; i < 5; i++) {
            limiter.canProceed('test-key');
        }
        expect(limiter.canProceed('test-key')).toBe(false);

        limiter.reset('test-key');
        expect(limiter.canProceed('test-key')).toBe(true);
    });

    it('should clean up old attempts', () => {
        const shortLimiter = new RateLimiter(3, 100); // 100ms window

        shortLimiter.canProceed('test-key');
        shortLimiter.canProceed('test-key');
        shortLimiter.canProceed('test-key');

        expect(shortLimiter.canProceed('test-key')).toBe(false);

        // Wait for window to expire
        return new Promise(resolve => {
            setTimeout(() => {
                expect(shortLimiter.canProceed('test-key')).toBe(true);
                resolve(undefined);
            }, 150);
        });
    });
});

describe('Pre-configured limiters', () => {
    it('messageLimiter should have correct configuration', () => {
        expect(messageLimiter).toBeInstanceOf(RateLimiter);
        expect(messageLimiter.getRemainingAttempts('test')).toBe(10);
    });

    it('searchLimiter should have correct configuration', () => {
        expect(searchLimiter).toBeInstanceOf(RateLimiter);
        expect(searchLimiter.getRemainingAttempts('test')).toBe(20);
    });
});
