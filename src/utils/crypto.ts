import CryptoJS from 'crypto-js';

// Clé de chiffrement (en production, devrait venir d'une variable d'environnement)
// Compatible avec Jest et Vite
const ENCRYPTION_KEY = typeof import.meta !== 'undefined'
    ? (import.meta.env?.VITE_ENCRYPTION_KEY || 'immob-default-key-change-in-production')
    : (process.env.VITE_ENCRYPTION_KEY || 'immob-default-key-change-in-production');

/**
 * Chiffre une chaîne de caractères avec AES
 * @param data - Données à chiffrer
 * @returns Données chiffrées en base64
 */
export function encryptData(data: string): string {
    try {
        return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
    } catch (error) {
        console.error('Encryption failed:', error);
        return data; // Fallback en cas d'erreur
    }
}

/**
 * Déchiffre une chaîne de caractères chiffrée avec AES
 * @param encryptedData - Données chiffrées
 * @returns Données déchiffrées
 */
export function decryptData(encryptedData: string): string {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption failed:', error);
        return ''; // Retourner vide en cas d'erreur
    }
}

/**
 * Hash une chaîne avec SHA256
 * @param data - Données à hasher
 * @returns Hash en hexadécimal
 */
export function hashData(data: string): string {
    return CryptoJS.SHA256(data).toString();
}

/**
 * Génère un token aléatoire sécurisé
 * @param length - Longueur du token (par défaut 32)
 * @returns Token aléatoire
 */
export function generateToken(length: number = 32): string {
    const randomBytes = CryptoJS.lib.WordArray.random(length);
    return randomBytes.toString();
}

/**
 * Vérifie si une donnée chiffrée est valide
 * @param encryptedData - Données chiffrées à vérifier
 * @returns true si valide, false sinon
 */
export function isValidEncryptedData(encryptedData: string): boolean {
    try {
        const decrypted = decryptData(encryptedData);
        return decrypted.length > 0;
    } catch {
        return false;
    }
}
