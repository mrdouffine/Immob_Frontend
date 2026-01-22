/**
 * Accessibility utilities and helpers
 */

/**
 * Génère un ID unique pour les éléments ARIA
 */
export function generateAriaId(prefix: string = 'aria'): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Annonce un message aux lecteurs d'écran
 * @param message - Message à annoncer
 * @param priority - 'polite' (par défaut) ou 'assertive'
 */
export function announceToScreenReader(
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
): void {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Retirer après annonce
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Vérifie si l'utilisateur préfère le mode réduit de mouvement
 */
export function prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Vérifie si l'utilisateur préfère le mode sombre
 */
export function prefersDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Gère le focus trap dans un modal
 */
export function trapFocus(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable?.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable?.focus();
                e.preventDefault();
            }
        }
    };

    element.addEventListener('keydown', handleKeyDown);
    firstFocusable?.focus();

    // Retourner fonction de cleanup
    return () => {
        element.removeEventListener('keydown', handleKeyDown);
    };
}

/**
 * Crée un label accessible pour un bouton d'icône
 */
export function getIconButtonLabel(action: string, itemName?: string): string {
    if (itemName) {
        return `${action} ${itemName}`;
    }
    return action;
}

/**
 * Formate un nombre pour les lecteurs d'écran
 */
export function formatNumberForScreenReader(num: number): string {
    if (num === 0) return 'aucun';
    if (num === 1) return 'un';
    return num.toString();
}

/**
 * Crée un message accessible pour un état de chargement
 */
export function getLoadingMessage(context: string): string {
    return `Chargement ${context} en cours, veuillez patienter`;
}

/**
 * Crée un message accessible pour une erreur
 */
export function getErrorMessage(context: string, error?: string): string {
    if (error) {
        return `Erreur lors de ${context}: ${error}`;
    }
    return `Une erreur est survenue lors de ${context}`;
}
