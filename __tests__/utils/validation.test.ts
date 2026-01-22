import { describe, it, expect } from '@jest/globals';
import {
    loginSchema,
    registerSchema,
    messageSchema,
    sanitizeString,
    validateAndSanitize,
} from '../../src/utils/validation';

describe('loginSchema', () => {
    it('should accept valid email and password', () => {
        const result = loginSchema.safeParse({
            email: 'test@example.com',
            password: 'Test123!@#',
        });
        expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
        const result = loginSchema.safeParse({
            email: 'not-an-email',
            password: 'Test123!@#',
        });
        expect(result.success).toBe(false);
    });

    it('should reject password without uppercase', () => {
        const result = loginSchema.safeParse({
            email: 'test@example.com',
            password: 'test123!@#',
        });
        expect(result.success).toBe(false);
    });

    it('should reject password without number', () => {
        const result = loginSchema.safeParse({
            email: 'test@example.com',
            password: 'TestTest!@#',
        });
        expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
        const result = loginSchema.safeParse({
            email: 'test@example.com',
            password: 'Test1!',
        });
        expect(result.success).toBe(false);
    });
});

describe('registerSchema', () => {
    const validData = {
        email: 'test@example.com',
        password: 'Test123!@#',
        confirmPassword: 'Test123!@#',
        firstName: 'John',
        lastName: 'Doe',
    };

    it('should accept valid registration data', () => {
        const result = registerSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    it('should reject mismatched passwords', () => {
        const result = registerSchema.safeParse({
            ...validData,
            confirmPassword: 'Different123!',
        });
        expect(result.success).toBe(false);
    });

    it('should reject password without special character', () => {
        const result = registerSchema.safeParse({
            ...validData,
            password: 'Test1234',
            confirmPassword: 'Test1234',
        });
        expect(result.success).toBe(false);
    });

    it('should reject firstName with numbers', () => {
        const result = registerSchema.safeParse({
            ...validData,
            firstName: 'John123',
        });
        expect(result.success).toBe(false);
    });

    it('should reject lastName with special characters', () => {
        const result = registerSchema.safeParse({
            ...validData,
            lastName: 'Doe@#$',
        });
        expect(result.success).toBe(false);
    });

    it('should reject too short firstName', () => {
        const result = registerSchema.safeParse({
            ...validData,
            firstName: 'J',
        });
        expect(result.success).toBe(false);
    });

    it('should reject too long firstName', () => {
        const result = registerSchema.safeParse({
            ...validData,
            firstName: 'A'.repeat(51),
        });
        expect(result.success).toBe(false);
    });
});

describe('messageSchema', () => {
    it('should accept valid message', () => {
        const result = messageSchema.safeParse({
            content: 'Hello, this is a valid message!',
        });
        expect(result.success).toBe(true);
    });

    it('should reject empty message', () => {
        const result = messageSchema.safeParse({
            content: '',
        });
        expect(result.success).toBe(false);
    });

    it('should reject too long message', () => {
        const result = messageSchema.safeParse({
            content: 'A'.repeat(1001),
        });
        expect(result.success).toBe(false);
    });

    it('should trim whitespace', () => {
        const result = messageSchema.safeParse({
            content: '  Hello  ',
        });
        expect(result.success).toBe(true);
    });
});

describe('sanitizeString', () => {
    it('should escape HTML tags', () => {
        const result = sanitizeString('<script>alert("xss")</script>');
        expect(result).not.toContain('<script>');
        expect(result).toContain('&lt;script&gt;');
    });

    it('should escape quotes', () => {
        const result = sanitizeString('Hello "world"');
        expect(result).toContain('&quot;');
    });

    it('should escape apostrophes', () => {
        const result = sanitizeString("It's a test");
        expect(result).toContain('&#x27;');
    });

    it('should trim whitespace', () => {
        const result = sanitizeString('  Hello  ');
        expect(result).toBe('Hello');
    });

    it('should handle multiple dangerous characters', () => {
        const result = sanitizeString('<div>"test"</div>');
        expect(result).not.toContain('<');
        expect(result).not.toContain('>');
        expect(result).not.toContain('"');
    });
});

describe('validateAndSanitize', () => {
    it('should return success for valid data', () => {
        const result = validateAndSanitize(loginSchema, {
            email: 'test@example.com',
            password: 'Test123!@#',
        });
        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.email).toBe('test@example.com');
        }
    });

    it('should return errors for invalid data', () => {
        const result = validateAndSanitize(loginSchema, {
            email: 'invalid',
            password: 'weak',
        });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.errors.length).toBeGreaterThan(0);
        }
    });
});
