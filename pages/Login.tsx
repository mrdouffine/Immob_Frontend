import * as React from 'react';
const { useState } = React;
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../src/store/authStore';
import { loginSchema } from '../src/utils/validation';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationErrors({});

    // Validation avec Zod
    const validation = loginSchema.safeParse(formData);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach((err: any) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur du champ modifié
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary mb-4">
            <span className="material-symbols-outlined text-3xl">domain</span>
            <h1 className="text-2xl font-black">Immob</h1>
          </Link>
          <h2 className="text-3xl font-black text-[#171211] dark:text-white mb-2">Bon retour !</h2>
          <p className="text-slate-500 dark:text-gray-400">Connectez-vous à votre compte</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-zinc-800">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
              <span className="material-symbols-outlined text-red-500 text-xl">error</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-red-800 dark:text-red-200">{error}</p>
              </div>
              <button onClick={clearError} className="text-red-500 hover:text-red-700">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2 text-[#171211] dark:text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${validationErrors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 dark:border-zinc-700 focus:ring-primary'
                  } bg-white dark:bg-zinc-800 focus:ring-2 focus:outline-none transition-all`}
                placeholder="votre@email.com"
                disabled={isLoading}
                autoComplete="email"
              />
              {validationErrors.email && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-2 text-[#171211] dark:text-white">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${validationErrors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 dark:border-zinc-700 focus:ring-primary'
                  } bg-white dark:bg-zinc-800 focus:ring-2 focus:outline-none transition-all`}
                placeholder="••••••••"
                disabled={isLoading}
                autoComplete="current-password"
              />
              {validationErrors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {validationErrors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>

          {/* Info pour la démo */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-xs text-blue-800 dark:text-blue-200 font-bold mb-1">
              ℹ️ Mode Démonstration
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Utilisez n'importe quel email et un mot de passe valide (8+ caractères, 1 majuscule, 1 chiffre) pour tester l'application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
