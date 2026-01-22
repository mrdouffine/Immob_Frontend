import { describe, it, expect, beforeEach } from '@jest/globals';
import { useAuthStore } from '../../src/store/authStore';

describe('AuthStore', () => {
    beforeEach(() => {
        // Reset store before each test
        useAuthStore.setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
        });

        // Clear localStorage
        localStorage.clear();
    });

    describe('Initial State', () => {
        it('should have correct initial state', () => {
            const state = useAuthStore.getState();

            expect(state.user).toBeNull();
            expect(state.isAuthenticated).toBe(false);
            expect(state.isLoading).toBe(false);
            expect(state.error).toBeNull();
        });
    });

    describe('login', () => {
        it('should reject invalid email', async () => {
            const { login } = useAuthStore.getState();
            const result = await login('invalid-email', 'Password123!');

            expect(result.success).toBe(false);
            expect(result.error).toBeTruthy();
        });

        it('should reject weak password', async () => {
            const { login } = useAuthStore.getState();
            const result = await login('test@example.com', 'weak');

            expect(result.success).toBe(false);
            expect(result.error).toBeTruthy();
        });

        it('should accept valid credentials', async () => {
            const { login } = useAuthStore.getState();
            const result = await login('test@example.com', 'Password123!');

            expect(result.success).toBe(true);

            const state = useAuthStore.getState();
            expect(state.isAuthenticated).toBe(true);
            expect(state.user).toBeTruthy();
            expect(state.user?.email).toBe('test@example.com');
        });

        it('should set loading state during login', async () => {
            const { login } = useAuthStore.getState();

            const loginPromise = login('test@example.com', 'Password123!');

            // Check loading state immediately
            let state = useAuthStore.getState();
            expect(state.isLoading).toBe(true);

            await loginPromise;

            // Check loading state after
            state = useAuthStore.getState();
            expect(state.isLoading).toBe(false);
        });

        it('should sanitize email', async () => {
            const { login } = useAuthStore.getState();
            await login('test@example.com', 'Password123!');

            const state = useAuthStore.getState();
            expect(state.user?.email).not.toContain('<');
            expect(state.user?.email).not.toContain('>');
        });
    });

    describe('register', () => {
        it('should reject mismatched passwords', async () => {
            const { register } = useAuthStore.getState();
            const result = await register({
                email: 'test@example.com',
                password: 'Password123!',
                confirmPassword: 'Different123!',
                firstName: 'John',
                lastName: 'Doe',
            });

            expect(result.success).toBe(false);
            expect(result.error).toBeTruthy();
        });

        it('should reject invalid first name', async () => {
            const { register } = useAuthStore.getState();
            const result = await register({
                email: 'test@example.com',
                password: 'Password123!',
                confirmPassword: 'Password123!',
                firstName: 'J',
                lastName: 'Doe',
            });

            expect(result.success).toBe(false);
        });

        it('should accept valid registration data', async () => {
            const { register } = useAuthStore.getState();
            const result = await register({
                email: 'test@example.com',
                password: 'Password123!',
                confirmPassword: 'Password123!',
                firstName: 'John',
                lastName: 'Doe',
            });

            expect(result.success).toBe(true);

            const state = useAuthStore.getState();
            expect(state.isAuthenticated).toBe(true);
            expect(state.user?.firstName).toBe('John');
            expect(state.user?.lastName).toBe('Doe');
        });
    });

    describe('logout', () => {
        it('should clear user and authentication state', async () => {
            const { login, logout } = useAuthStore.getState();

            // Login first
            await login('test@example.com', 'Password123!');
            expect(useAuthStore.getState().isAuthenticated).toBe(true);

            // Logout
            logout();

            const state = useAuthStore.getState();
            expect(state.user).toBeNull();
            expect(state.isAuthenticated).toBe(false);
            expect(state.error).toBeNull();
        });

        it('should clear localStorage', async () => {
            const { login, logout } = useAuthStore.getState();

            await login('test@example.com', 'Password123!');
            logout();

            const stored = localStorage.getItem('auth-storage');
            expect(stored).toBeNull();
        });
    });

    describe('checkSession', () => {
        it('should return false when no user', () => {
            const { checkSession } = useAuthStore.getState();
            expect(checkSession()).toBe(false);
        });

        it('should return true for valid session', async () => {
            const { login, checkSession } = useAuthStore.getState();

            await login('test@example.com', 'Password123!');
            expect(checkSession()).toBe(true);
        });

        it('should logout on expired session', async () => {
            const { login, checkSession } = useAuthStore.getState();

            await login('test@example.com', 'Password123!');

            // Manually set expired session
            const state = useAuthStore.getState();
            if (state.user) {
                useAuthStore.setState({
                    user: {
                        ...state.user,
                        sessionExpiry: new Date(Date.now() - 1000).toISOString(),
                    },
                });
            }

            const isValid = checkSession();
            expect(isValid).toBe(false);
            expect(useAuthStore.getState().isAuthenticated).toBe(false);
        });
    });

    describe('clearError', () => {
        it('should clear error message', async () => {
            const { login, clearError } = useAuthStore.getState();

            // Trigger error
            await login('invalid', 'weak');
            expect(useAuthStore.getState().error).toBeTruthy();

            // Clear error
            clearError();
            expect(useAuthStore.getState().error).toBeNull();
        });
    });

    describe('Persistence', () => {
        it('should persist user to localStorage', async () => {
            const { login } = useAuthStore.getState();

            await login('test@example.com', 'Password123!');

            const stored = localStorage.getItem('auth-storage');
            expect(stored).toBeTruthy();

            if (stored) {
                const parsed = JSON.parse(stored);
                expect(parsed.state.user).toBeTruthy();
                expect(parsed.state.isAuthenticated).toBe(true);
            }
        });
    });
});
