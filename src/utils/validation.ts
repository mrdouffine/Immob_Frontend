import { z } from 'zod';

// Schémas de validation
export const loginSchema = z.object({
    email: z.string()
        .min(1, 'Email requis')
        .email('Email invalide'),
    password: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
        .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
        .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre'),
});

export const registerSchema = z.object({
    email: z.string()
        .min(1, 'Email requis')
        .email('Email invalide'),
    password: z.string()
        .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
        .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
        .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
        .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
        .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
    confirmPassword: z.string(),
    firstName: z.string()
        .min(2, 'Le prénom doit contenir au moins 2 caractères')
        .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
        .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, 'Le prénom ne peut contenir que des lettres'),
    lastName: z.string()
        .min(2, 'Le nom doit contenir au moins 2 caractères')
        .max(50, 'Le nom ne peut pas dépasser 50 caractères')
        .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, 'Le nom ne peut contenir que des lettres'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
});

export const messageSchema = z.object({
    content: z.string()
        .min(1, 'Le message ne peut pas être vide')
        .max(1000, 'Le message ne peut pas dépasser 1000 caractères')
        .trim(),
});

export const propertySearchSchema = z.object({
    destination: z.string().max(100).optional(),
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
    guests: z.number().min(1).max(20).optional(),
});

// Types TypeScript dérivés des schémas
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type PropertySearchInput = z.infer<typeof propertySearchSchema>;

// Helper pour sanitizer les strings (protection XSS basique)
export function sanitizeString(str: string): string {
    return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .trim();
}

// Helper pour valider et sanitizer
export function validateAndSanitize<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
    try {
        const validated = schema.parse(data);
        return { success: true, data: validated };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.issues.map(e => e.message),
            };
        }
        return {
            success: false,
            errors: ['Erreur de validation'],
        };
    }
}
