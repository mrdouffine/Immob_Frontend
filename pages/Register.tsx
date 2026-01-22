import * as React from 'react';
const { useState } = React;
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../src/store/authStore';
import { registerSchema } from '../src/utils/validation';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setValidationErrors({});

    // Validation avec Zod
    const validation = registerSchema.safeParse(formData);

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

    const result = await register(formData);

    if (result.success) {
      navigate('/', { replace: true });
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

  // Indicateur de force du mot de passe
  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { strength, label: 'Faible', color: 'bg-red-500' };
    if (strength === 3) return { strength, label: 'Moyen', color: 'bg-yellow-500' };
    if (strength === 4) return { strength, label: 'Bon', color: 'bg-blue-500' };
    return { strength, label: 'Excellent', color: 'bg-green-500' };
  };

  const passwordStrength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary mb-4">
            <span className="material-symbols-outlined text-3xl">domain</span>
            <h1 className="text-2xl font-black">Immob</h1>
          </Link>
          <h2 className="text-3xl font-black text-[#171211] dark:text-white mb-2">Créer un compte</h2>
          <p className="text-slate-500 dark:text-gray-400">Rejoignez Immob dès aujourd'hui</p>
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold mb-2 text-[#171211] dark:text-white">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${validationErrors.firstName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-300 dark:border-zinc-700 focus:ring-primary'
                    } bg-white dark:bg-zinc-800 focus:ring-2 focus:outline-none transition-all`}
                  disabled={isLoading}
                  autoComplete="given-name"
                />
                {validationErrors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{validationErrors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-bold mb-2 text-[#171211] dark:text-white">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${validationErrors.lastName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-300 dark:border-zinc-700 focus:ring-primary'
                    } bg-white dark:bg-zinc-800 focus:ring-2 focus:outline-none transition-all`}
                  disabled={isLoading}
                  autoComplete="family-name"
                />
                {validationErrors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{validationErrors.lastName}</p>
                )}
              </div>
            </div>

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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border ${validationErrors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-slate-300 dark:border-zinc-700 focus:ring-primary'
                    } bg-white dark:bg-zinc-800 focus:ring-2 focus:outline-none transition-all`}
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold">{passwordStrength.label}</span>
                  </div>
                </div>
              )}
              {validationErrors.password && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {validationErrors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold mb-2 text-[#171211] dark:text-white">
                Confirmer le mot de passe
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${validationErrors.confirmPassword
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-slate-300 dark:border-zinc-700 focus:ring-primary'
                  } bg-white dark:bg-zinc-800 focus:ring-2 focus:outline-none transition-all`}
                placeholder="••••••••"
                disabled={isLoading}
                autoComplete="new-password"
              />
              {validationErrors.confirmPassword && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {validationErrors.confirmPassword}
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
                  <span>Inscription...</span>
                </>
              ) : (
                'Créer mon compte'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-gray-400">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
