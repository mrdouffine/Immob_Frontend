
import * as React from 'react';

const Payment: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-slate-100">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <span className="material-symbols-outlined">domain</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight">Immob</h2>
            </div>
          </div>
          <div className="size-10 rounded-full bg-slate-200 border-2 border-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-400">person</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">Confirmation et paiement</h1>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8">
            <section className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-32 aspect-[4/3] rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-300 text-3xl">image</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Réservation</p>
                <h3 className="font-bold text-lg">Votre futur séjour</h3>
                <div className="flex items-center gap-1 text-sm opacity-80">
                  <span className="material-symbols-outlined text-sm text-yellow-500 fill-1">star</span>
                  <span>4,98 • Avis</span>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold">Dates</p>
                  <button className="text-primary text-sm font-semibold hover:underline">Modifier</button>
                </div>
                <p className="opacity-70">Dates sélectionnées</p>
              </div>
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold">Voyageurs</p>
                  <button className="text-primary text-sm font-semibold hover:underline">Modifier</button>
                </div>
                <p className="opacity-70">Nombre de voyageurs</p>
              </div>
            </section>

            <section className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <h3 className="font-bold mb-4">Envoyez un message à l'hôte</h3>
              <textarea className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 focus:ring-primary focus:border-primary text-sm p-4" placeholder="Bonjour Elena, nous venons pour notre anniversaire de mariage..." rows={4}></textarea>
            </section>
          </div>

          <aside className="lg:w-[400px]">
            <div className="sticky top-28 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 space-y-6">
              <h2 className="text-2xl font-bold">Récapitulatif du prix</h2>
              <div className="space-y-4 border-b border-slate-100 dark:border-slate-700 pb-6">
                <div className="flex justify-between"><span className="opacity-70">Prix par nuit</span><span>-- €</span></div>
                <div className="flex justify-between"><span className="opacity-70">Frais de service Immob</span><span>-- €</span></div>
                <div className="flex justify-between"><span className="opacity-70">Taxes de séjour</span><span>-- €</span></div>
              </div>
              <div className="flex justify-between items-center text-lg font-bold"><span>Total (EUR)</span><span className="text-2xl">-- €</span></div>

              <div className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-2 border-primary rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer bg-primary/5">
                    <span className="material-symbols-outlined">credit_card</span>
                    <span className="text-xs font-bold">Carte</span>
                  </div>
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer hover:bg-slate-50">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                    <span className="text-xs font-bold">PayPal</span>
                  </div>
                </div>
                <input className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 p-4 text-sm" placeholder="Numéro de carte" />
                <div className="grid grid-cols-2 gap-3">
                  <input className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 p-4 text-sm" placeholder="MM / AA" />
                  <input className="rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 p-4 text-sm" placeholder="CVV" />
                </div>
              </div>

              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg hover:brightness-110 transition-all">Confirmer et payer</button>
              <div className="flex items-center justify-center gap-2 opacity-50 text-xs">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span>Paiement sécurisé crypté SSL</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Payment;
