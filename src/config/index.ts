/**
 * Application configuration
 * Centralized configuration for all environment variables
 */

export const config = {
    /**
     * API base URL
     */
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',

    /**
     * Enable mock data (development only)
     */
    enableMock: import.meta.env.VITE_ENABLE_MOCK === 'true',

    /**
     * Logging level: 'debug' | 'info' | 'warn' | 'error'
     */
    logLevel: (import.meta.env.VITE_LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error',

    /**
     * Encryption key for sensitive data
     */
    encryptionKey: import.meta.env.VITE_ENCRYPTION_KEY || 'default-key',

    /**
     * Gemini API key
     */
    geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY,

    /**
     * Environment flags
     */
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
    mode: import.meta.env.MODE,

    /**
     * Feature flags
     */
    features: {
        aiSearch: true,
        messaging: true,
        payments: false, // Désactivé jusqu'à intégration backend
    },

    /**
     * Rate limiting configuration
     */
    rateLimits: {
        messages: { max: 10, windowMs: 60000 },
        searches: { max: 20, windowMs: 60000 },
        api: { max: 5, windowMs: 60000 },
        login: { max: 5, windowMs: 300000 },
    },

    /**
     * Session configuration
     */
    session: {
        duration: 24 * 60 * 60 * 1000, // 24 heures
        refreshThreshold: 60 * 60 * 1000, // 1 heure avant expiration
    },
} as const;

export type Config = typeof config;

export default config;
