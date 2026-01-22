
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      <header className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Mon Compte</h1>
          <button onClick={() => navigate('/login')} className="text-sm font-bold text-primary">Déconnexion</button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Sidebar Profil */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-slate-200 dark:border-zinc-800 shadow-xl shadow-black/5 text-center">
              <div className="relative inline-block mb-4">
                <div className="size-32 rounded-full bg-slate-200 dark:bg-zinc-800 border-4 border-white dark:border-zinc-800 shadow-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-slate-400">person</span>
                </div>
                <button className="absolute bottom-0 right-0 bg-white dark:bg-zinc-700 p-2 rounded-full shadow-md border border-slate-100">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </button>
              </div>
              <h2 className="text-2xl font-black">Profil</h2>
              <p className="text-slate-500 text-sm mb-6">Membre Immob</p>

              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-zinc-800 rounded-xl">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                  <span className="text-sm font-semibold">Identité vérifiée</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-zinc-800 rounded-xl">
                  <span className="material-symbols-outlined text-primary">reviews</span>
                  <span className="text-sm font-semibold">0 avis reçus</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu Principal */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h3 className="text-2xl font-bold mb-6">Prochains voyages</h3>
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-slate-200 dark:border-zinc-800 shadow-sm text-center">
                <span className="material-symbols-outlined text-4xl opacity-20 mb-2">flight_takeoff</span>
                <p className="text-slate-500">Aucun voyage prévu pour le moment.</p>
                <button onClick={() => navigate('/')} className="mt-4 text-primary font-bold text-sm">Explorer les destinations</button>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6">Paramètres du profil</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: 'person', label: 'Infos personnelles', desc: 'Nom, e-mail et numéro' },
                  { icon: 'security', label: 'Sécurité', desc: 'Mot de passe et authentification' },
                  { icon: 'payments', label: 'Paiements', desc: 'Gérer vos cartes de crédit' },
                  { icon: 'notifications', label: 'Notifications', desc: 'Préférences de message' },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 hover:border-primary transition-colors cursor-pointer group">
                    <span className="material-symbols-outlined text-primary mb-3 group-hover:scale-110 transition-transform">{item.icon}</span>
                    <h4 className="font-bold">{item.label}</h4>
                    <p className="text-slate-500 text-xs">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
