import { describe, it, expect } from '@jest/globals';
import {
    encryptData,
    decryptData,
    hashData,
    generateToken,
    isValidEncryptedData
} from '../../src/utils/crypto';

describe('Crypto Utils', () => {
    describe('encryptData', () => {
        it('should encrypt a string', () => {
            const data = 'sensitive data';
            const encrypted = encryptData(data);

            expect(encrypted).toBeTruthy();
            expect(encrypted).not.toBe(data);
            expect(typeof encrypted).toBe('string');
        });

        it('should produce different output for same input (due to IV)', () => {
            const data = 'test data';
            const encrypted1 = encryptData(data);
            const encrypted2 = encryptData(data);

            // AES with random IV should produce different ciphertext
            expect(encrypted1).not.toBe(encrypted2);
        });

        it('should handle empty string', () => {
            const encrypted = encryptData('');
            expect(encrypted).toBeTruthy();
        });

        it('should handle special characters', () => {
            const data = '!@#$%^&*()_+{}[]|\\:";\'<>?,./';
            const encrypted = encryptData(data);
            expect(encrypted).toBeTruthy();
        });

        it('should handle unicode characters', () => {
            const data = '你好世界 🌍 مرحبا';
            const encrypted = encryptData(data);
            expect(encrypted).toBeTruthy();
        });
    });

    describe('decryptData', () => {
        it('should decrypt encrypted data', () => {
            const original = 'secret message';
            const encrypted = encryptData(original);
            const decrypted = decryptData(encrypted);

            expect(decrypted).toBe(original);
        });

        it('should handle empty encrypted string', () => {
            const decrypted = decryptData('');
            expect(decrypted).toBe('');
        });

        it('should return empty string for invalid encrypted data', () => {
            const decrypted = decryptData('invalid-encrypted-data');
            expect(decrypted).toBe('');
        });

        it('should decrypt unicode correctly', () => {
            const original = '你好 🎉';
            const encrypted = encryptData(original);
            const decrypted = decryptData(encrypted);

            expect(decrypted).toBe(original);
        });
    });

    describe('hashData', () => {
        it('should hash a string', () => {
            const data = 'password123';
            const hash = hashData(data);

            expect(hash).toBeTruthy();
            expect(typeof hash).toBe('string');
            expect(hash.length).toBe(64); // SHA-256 produces 64 hex characters
        });

        it('should produce same hash for same input', () => {
            const data = 'consistent data';
            const hash1 = hashData(data);
            const hash2 = hashData(data);

            expect(hash1).toBe(hash2);
        });

        it('should produce different hash for different input', () => {
            const hash1 = hashData('data1');
            const hash2 = hashData('data2');

            expect(hash1).not.toBe(hash2);
        });

        it('should handle empty string', () => {
            const hash = hashData('');
            expect(hash).toBeTruthy();
            expect(hash.length).toBe(64);
        });
    });

    describe('generateToken', () => {
        it('should generate a random token', () => {
            const token = generateToken();

            expect(token).toBeTruthy();
            expect(typeof token).toBe('string');
        });

        it('should generate different tokens', () => {
            const token1 = generateToken();
            const token2 = generateToken();

            expect(token1).not.toBe(token2);
        });

        it('should respect custom length', () => {
            const token = generateToken(16);
            expect(token).toBeTruthy();
            // Length in hex is double the byte length
            expect(token.length).toBe(32);
        });

        it('should generate tokens of default length', () => {
            const token = generateToken();
            expect(token.length).toBe(64); // 32 bytes = 64 hex chars
        });
    });

    describe('isValidEncryptedData', () => {
        it('should return true for valid encrypted data', () => {
            const encrypted = encryptData('test data');
            expect(isValidEncryptedData(encrypted)).toBe(true);
        });

        it('should return false for invalid encrypted data', () => {
            expect(isValidEncryptedData('invalid')).toBe(false);
        });

        it('should return false for empty string', () => {
            expect(isValidEncryptedData('')).toBe(false);
        });

        it('should return false for random string', () => {
            expect(isValidEncryptedData('random-string-123')).toBe(false);
        });
    });

    describe('Encryption/Decryption Round Trip', () => {
        it('should maintain data integrity through encrypt/decrypt cycle', () => {
            const testCases = [
                'simple text',
                'Text with numbers 123',
                'Special chars !@#$%',
                '你好世界',
                '🎉🎊🎈',
                JSON.stringify({ key: 'value', nested: { data: 123 } }),
                'Very long text '.repeat(100),
            ];

            testCases.forEach(testCase => {
                const encrypted = encryptData(testCase);
                const decrypted = decryptData(encrypted);
                expect(decrypted).toBe(testCase);
            });
        });
    });
});
