import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { loginSchema, registerSchema, sanitizeString } from '../utils/validation';
import { encryptData, decryptData } from '../utils/crypto';
import { loginLimiter } from '../utils/rateLimiter';
import config from '../config';
import * as React from 'react';

/**
 * User interface representing an authenticated user
 */
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'guest' | 'host' | 'admin';
    avatar?: string;
    verified: boolean;
    createdAt: string;
    sessionExpiry: string;
}

/**
 * Authentication state interface
 */
interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    /**
     * Logs in a user with email and password
     * @param email - User email address
     * @param password - User password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
     * @returns Promise with success status and optional error message
     * @example
     * ```tsx
     * const { login } = useAuthStore();
     * const result = await login('user@example.com', 'Password123');
     * if (result.success) {
     *   navigate('/dashboard');
     * }
     * ```
     */
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;

    /**
     * Registers a new user
     * @param data - Registration data including email, password, firstName, lastName
     * @returns Promise with success status and optional error message
     */
    register: (data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }) => Promise<{ success: boolean; error?: string }>;

    /**
     * Logs out the current user and clears session
     */
    logout: () => void;

    /**
     * Updates the current user's profile
     * @param data - Partial user data to update
     */
    updateProfile: (data: Partial<User>) => Promise<void>;

    /**
     * Checks if the current session is still valid
     * @returns true if session is valid, false otherwise
     */
    checkSession: () => boolean;

    /**
     * Clears the current error message
     */
    clearError: () => void;
}

/**
 * Authentication store using Zustand with persistence
 * 
 * Features:
 * - Zod validation for all inputs
 * - Data sanitization (XSS protection)
 * - AES encryption for sensitive data
 * - Session expiry (24h default)
 * - Rate limiting for login attempts
 * - Persistent storage with localStorage
 * 
 * @example
 * ```tsx
 * function LoginPage() {
 *   const { login, isLoading, error } = useAuthStore();
 *   
 *   const handleLogin = async () => {
 *     const result = await login(email, password);
 *     if (result.success) {
 *       // Redirect to dashboard
 *     }
 *   };
 * }
 * ```
 */
export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email, password) => {
                // Rate limiting
                if (!loginLimiter.canProceed('login')) {
                    const timeUntilReset = Math.ceil(loginLimiter.getTimeUntilReset('login') / 1000);
                    const errorMessage = `Trop de tentatives de connexion. Veuillez attendre ${timeUntilReset} secondes.`;
                    set({ error: errorMessage });
                    return { success: false, error: errorMessage };
                }

                // Validation avec Zod
                const validation = loginSchema.safeParse({ email, password });
                if (!validation.success) {
                    const errorMessage = validation.error.issues[0]?.message || 'Données invalides';
                    set({ error: errorMessage });
                    return { success: false, error: errorMessage };
                }

                set({ isLoading: true, error: null });
                try {
                    // Simulation d'une API - À remplacer par Firebase/Supabase
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Sanitize l'email
                    const sanitizedEmail = sanitizeString(validation.data.email);

                    // Pour la démo, créer un utilisateur
                    // En production, ceci serait la réponse du backend
                    const sessionExpiry = new Date(Date.now() + config.session.duration).toISOString();

                    const user: User = {
                        id: encryptData(Math.random().toString(36).substr(2, 9)),
                        email: sanitizedEmail,
                        firstName: sanitizedEmail.split('@')[0],
                        lastName: 'User',
                        role: 'guest',
                        verified: true,
                        createdAt: new Date().toISOString(),
                        sessionExpiry,
                    };

                    set({ user, isAuthenticated: true, isLoading: false, error: null });
                    return { success: true };
                } catch (error) {
                    const errorMessage = 'Échec de la connexion. Veuillez réessayer.';
                    set({ isLoading: false, error: errorMessage });
                    return { success: false, error: errorMessage };
                }
            },

            register: async (data) => {
                // Validation avec Zod
                const validation = registerSchema.safeParse(data);
                if (!validation.success) {
                    const errorMessage = validation.error.issues[0]?.message || 'Données invalides';
                    set({ error: errorMessage });
                    return { success: false, error: errorMessage };
                }

                set({ isLoading: true, error: null });
                try {
                    // Simulation d'une API
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    // Sanitize les données
                    const sanitizedData = {
                        email: sanitizeString(validation.data.email),
                        firstName: sanitizeString(validation.data.firstName),
                        lastName: sanitizeString(validation.data.lastName),
                    };

                    const sessionExpiry = new Date(Date.now() + config.session.duration).toISOString();

                    const user: User = {
                        id: encryptData(Math.random().toString(36).substr(2, 9)),
                        email: sanitizedData.email,
                        firstName: sanitizedData.firstName,
                        lastName: sanitizedData.lastName,
                        role: 'guest',
                        verified: false,
                        createdAt: new Date().toISOString(),
                        sessionExpiry,
                    };

                    set({ user, isAuthenticated: true, isLoading: false, error: null });
                    return { success: true };
                } catch (error) {
                    const errorMessage = 'Échec de l\'inscription. Veuillez réessayer.';
                    set({ isLoading: false, error: errorMessage });
                    return { success: false, error: errorMessage };
                }
            },

            logout: () => {
                set({ user: null, isAuthenticated: false, error: null });
                // Nettoyer le localStorage
                localStorage.removeItem('auth-storage');
                // Reset rate limiter
                loginLimiter.reset('login');
            },

            updateProfile: async (data) => {
                const currentUser = get().user;
                if (!currentUser) throw new Error('Aucun utilisateur connecté');

                set({ isLoading: true, error: null });
                try {
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Sanitize les données si présentes
                    const sanitizedData: Partial<User> = {};
                    if (data.firstName) sanitizedData.firstName = sanitizeString(data.firstName);
                    if (data.lastName) sanitizedData.lastName = sanitizeString(data.lastName);
                    if (data.email) sanitizedData.email = sanitizeString(data.email);

                    const updatedUser = { ...currentUser, ...sanitizedData };
                    set({ user: updatedUser, isLoading: false });
                } catch (error) {
                    const errorMessage = 'Échec de la mise à jour';
                    set({ isLoading: false, error: errorMessage });
                    throw new Error(errorMessage);
                }
            },

            checkSession: () => {
                const currentUser = get().user;
                if (!currentUser) return false;

                // Vérifier si la session a expiré
                const now = new Date().getTime();
                const expiry = new Date(currentUser.sessionExpiry).getTime();

                if (now > expiry) {
                    // Session expirée, déconnecter
                    get().logout();
                    return false;
                }

                return true;
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            // Ne persister que les données nécessaires
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

/**
 * Hook pour vérifier la session au chargement de l'application
 * À utiliser dans App.tsx ou un composant racine
 * 
 * @example
 * ```tsx
 * function App() {
 *   useSessionCheck();
 *   return <Routes>...</Routes>;
 * }
 * ```
 */
export function useSessionCheck() {
    const checkSession = useAuthStore(state => state.checkSession);
    const logout = useAuthStore(state => state.logout);

    React.useEffect(() => {
        // Vérifier la session au montage
        checkSession();

        // Vérifier périodiquement (toutes les 5 minutes)
        const interval = setInterval(() => {
            const stillValid = checkSession();
            if (!stillValid) {
                logout();
            }
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [checkSession, logout]);
}
