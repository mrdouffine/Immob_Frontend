import { describe, it, expect } from '@jest/globals';
import {
    announceToScreenReader,
    prefersReducedMotion,
    prefersDarkMode,
    getIconButtonLabel,
    formatNumberForScreenReader,
    getLoadingMessage,
    getErrorMessage,
} from '../../src/utils/accessibility';

describe('Accessibility Utils', () => {
    describe('announceToScreenReader', () => {
        it('should create and remove announcement element', (done) => {
            const message = 'Test announcement';
            announceToScreenReader(message);

            // Check if element was created
            const announcements = document.querySelectorAll('[role="status"]');
            expect(announcements.length).toBeGreaterThan(0);

            // Check if it gets removed
            setTimeout(() => {
                const afterAnnouncements = document.querySelectorAll('[role="status"]');
                expect(afterAnnouncements.length).toBe(0);
                done();
            }, 1100);
        });

        it('should set correct aria-live attribute for polite', () => {
            announceToScreenReader('Polite message', 'polite');
            const element = document.querySelector('[aria-live="polite"]');
            expect(element).toBeTruthy();
        });

        it('should set correct aria-live attribute for assertive', () => {
            announceToScreenReader('Assertive message', 'assertive');
            const element = document.querySelector('[aria-live="assertive"]');
            expect(element).toBeTruthy();
        });
    });

    describe('prefersReducedMotion', () => {
        it('should return a boolean', () => {
            const result = prefersReducedMotion();
            expect(typeof result).toBe('boolean');
        });
    });

    describe('prefersDarkMode', () => {
        it('should return a boolean', () => {
            const result = prefersDarkMode();
            expect(typeof result).toBe('boolean');
        });
    });

    describe('getIconButtonLabel', () => {
        it('should return action only when no item name', () => {
            const label = getIconButtonLabel('Supprimer');
            expect(label).toBe('Supprimer');
        });

        it('should combine action and item name', () => {
            const label = getIconButtonLabel('Supprimer', 'Photo de profil');
            expect(label).toBe('Supprimer Photo de profil');
        });

        it('should handle empty strings', () => {
            const label = getIconButtonLabel('', '');
            expect(label).toBe(' ');
        });
    });

    describe('formatNumberForScreenReader', () => {
        it('should return "aucun" for 0', () => {
            expect(formatNumberForScreenReader(0)).toBe('aucun');
        });

        it('should return "un" for 1', () => {
            expect(formatNumberForScreenReader(1)).toBe('un');
        });

        it('should return string number for other values', () => {
            expect(formatNumberForScreenReader(5)).toBe('5');
            expect(formatNumberForScreenReader(42)).toBe('42');
            expect(formatNumberForScreenReader(100)).toBe('100');
        });

        it('should handle negative numbers', () => {
            expect(formatNumberForScreenReader(-5)).toBe('-5');
        });
    });

    describe('getLoadingMessage', () => {
        it('should create loading message with context', () => {
            const message = getLoadingMessage('des données');
            expect(message).toBe('Chargement des données en cours, veuillez patienter');
        });

        it('should handle different contexts', () => {
            expect(getLoadingMessage('de la page')).toContain('de la page');
            expect(getLoadingMessage('du profil')).toContain('du profil');
        });
    });

    describe('getErrorMessage', () => {
        it('should create error message without specific error', () => {
            const message = getErrorMessage('chargement');
            expect(message).toBe('Une erreur est survenue lors de chargement');
        });

        it('should include specific error when provided', () => {
            const message = getErrorMessage('connexion', 'Timeout');
            expect(message).toBe('Erreur lors de connexion: Timeout');
        });

        it('should handle different contexts', () => {
            expect(getErrorMessage('sauvegarde')).toContain('sauvegarde');
            expect(getErrorMessage('suppression', 'Permission refusée')).toContain('Permission refusée');
        });
    });
});
