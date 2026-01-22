import toast, { Toaster, Toast } from 'react-hot-toast';

/**
 * Toast notification utilities
 * Wrapper autour de react-hot-toast pour une API cohérente
 */

export const notify = {
    /**
     * Affiche un toast de succès
     */
    success: (message: string, duration?: number) => {
        return toast.success(message, {
            duration: duration || 3000,
            position: 'top-right',
            style: {
                background: '#10b981',
                color: '#fff',
                fontWeight: 'bold',
            },
            iconTheme: {
                primary: '#fff',
                secondary: '#10b981',
            },
        });
    },

    /**
     * Affiche un toast d'erreur
     */
    error: (message: string, duration?: number) => {
        return toast.error(message, {
            duration: duration || 4000,
            position: 'top-right',
            style: {
                background: '#ef4444',
                color: '#fff',
                fontWeight: 'bold',
            },
            iconTheme: {
                primary: '#fff',
                secondary: '#ef4444',
            },
        });
    },

    /**
     * Affiche un toast d'information
     */
    info: (message: string, duration?: number) => {
        return toast(message, {
            duration: duration || 3000,
            position: 'top-right',
            icon: 'ℹ️',
            style: {
                background: '#3b82f6',
                color: '#fff',
                fontWeight: 'bold',
            },
        });
    },

    /**
     * Affiche un toast d'avertissement
     */
    warning: (message: string, duration?: number) => {
        return toast(message, {
            duration: duration || 3500,
            position: 'top-right',
            icon: '⚠️',
            style: {
                background: '#f59e0b',
                color: '#fff',
                fontWeight: 'bold',
            },
        });
    },

    /**
     * Affiche un toast de chargement
     */
    loading: (message: string) => {
        return toast.loading(message, {
            position: 'top-right',
            style: {
                background: '#6b7280',
                color: '#fff',
                fontWeight: 'bold',
            },
        });
    },

    /**
     * Affiche un toast personnalisé
     */
    custom: (message: string, options?: Partial<Toast>) => {
        return toast(message, options);
    },

    /**
     * Ferme un toast spécifique
     */
    dismiss: (toastId?: string) => {
        toast.dismiss(toastId);
    },

    /**
     * Ferme tous les toasts
     */
    dismissAll: () => {
        toast.dismiss();
    },

    /**
     * Promise toast - affiche loading puis success/error
     */
    promise: <T,>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((error: any) => string);
        }
    ) => {
        return toast.promise(
            promise,
            messages,
            {
                position: 'top-right',
                style: {
                    fontWeight: 'bold',
                },
            }
        );
    },
};

/**
 * Composant Toaster à ajouter dans App.tsx
 */
export { Toaster };

export default notify;
