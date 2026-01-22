import * as React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark p-4">
            <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-zinc-800">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-red-500 text-3xl">error</span>
                    </div>

                    <h1 className="text-2xl font-black mb-2 text-[#171211] dark:text-white">
                        Oups ! Une erreur est survenue
                    </h1>

                    <p className="text-slate-500 dark:text-gray-400 mb-6">
                        Nous sommes désolés, quelque chose s'est mal passé. Veuillez réessayer.
                    </p>

                    {process.env.NODE_ENV === 'development' && (
                        <details className="w-full mb-6 text-left">
                            <summary className="cursor-pointer text-sm font-bold text-slate-600 dark:text-gray-400 mb-2">
                                Détails de l'erreur (dev only)
                            </summary>
                            <pre className="text-xs bg-slate-100 dark:bg-zinc-800 p-4 rounded-lg overflow-auto max-h-40 text-red-600 dark:text-red-400">
                                {error.message}
                                {'\n\n'}
                                {error.stack}
                            </pre>
                        </details>
                    )}

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={resetErrorBoundary}
                            className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:brightness-110 transition-all"
                        >
                            Réessayer
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="flex-1 border border-slate-300 dark:border-zinc-700 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all"
                        >
                            Retour à l'accueil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
    const handleError = (error: Error, info: { componentStack: string }) => {
        // Log l'erreur (en production, envoyer à un service comme Sentry)
        console.error('Error caught by boundary:', error, info);

        // En production, vous pourriez envoyer à un service de monitoring
        // if (process.env.NODE_ENV === 'production') {
        //   sendToErrorTracking(error, info);
        // }
    };

    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={handleError}
            onReset={() => {
                // Reset l'état de l'application si nécessaire
                window.location.href = '/';
            }}
        >
            {children}
        </ReactErrorBoundary>
    );
}

export default ErrorBoundary;
