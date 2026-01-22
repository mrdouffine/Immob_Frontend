
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useHostStore } from '../src/store/hostStore';
import { useAuthStore } from '../src/store/authStore';

const HostDashboard: React.FC = () => {
  const { stats, properties, upcomingArrivals } = useHostStore();
  const { user } = useAuthStore();

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-manrope">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#dde4e3] dark:border-gray-700 bg-white dark:bg-background-dark flex flex-col h-screen sticky top-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-host rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">domain</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#121716] dark:text-white text-lg font-extrabold leading-none tracking-tight">Immob</h1>
            <p className="text-[#688280] dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Hôte Pro</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-host/10 text-primary-host">
            <span className="material-symbols-outlined text-[22px]">grid_view</span>
            <p className="text-sm font-semibold">Aperçu</p>
          </div>
          <Link to="/manage-listings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#688280] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[22px]">apartment</span>
            <p className="text-sm font-medium">Mes Annonces</p>
          </Link>
          <Link to="/messages" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#688280] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[22px]">chat_bubble</span>
            <p className="text-sm font-medium">Messages</p>
            <span className="ml-auto bg-primary-host text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">3</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-[#dde4e3] dark:border-gray-700">
          <Link to="/manage-listings" className="w-full flex items-center justify-center gap-2 bg-primary-host hover:bg-[#1f6e68] text-white py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm">
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Ajouter une annonce</span>
          </Link>
          <div className="mt-4 flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-gray-200 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400">person</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold truncate dark:text-white">{user?.firstName || 'Hôte'}</p>
              <p className="text-[10px] text-[#688280] uppercase font-bold tracking-tighter">Compte</p>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-sm">settings</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[#121716] dark:text-white text-4xl font-black leading-tight tracking-tight">Tableau de bord de l'hôte</h2>
            <p className="text-[#688280] dark:text-gray-400 text-sm mt-2">Bienvenue, {user?.firstName || 'Hôte'} ! Voici un aperçu de vos performances.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-[#dde4e3] dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="material-symbols-outlined text-primary-host text-2xl">payments</span>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">+12%</span>
              </div>
              <p className="text-[#688280] dark:text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Revenu Total</p>
              <p className="text-[#121716] dark:text-white text-3xl font-black leading-tight">{stats.totalRevenue.toLocaleString('fr-FR')} €</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-[#dde4e3] dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="material-symbols-outlined text-primary-host text-2xl">trending_up</span>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">+5%</span>
              </div>
              <p className="text-[#688280] dark:text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Taux d'occupation</p>
              <p className="text-[#121716] dark:text-white text-3xl font-black leading-tight">{stats.occupancyRate}%</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-[#dde4e3] dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="material-symbols-outlined text-primary-host text-2xl">star</span>
                <span className="text-xs text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full font-bold">★ {stats.averageRating}</span>
              </div>
              <p className="text-[#688280] dark:text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Note des Voyageurs</p>
              <p className="text-[#121716] dark:text-white text-3xl font-black leading-tight">{stats.averageRating.toFixed(2)}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-[#dde4e3] dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="material-symbols-outlined text-primary-host text-2xl">home</span>
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-bold">{stats.activeListings} actives</span>
              </div>
              <p className="text-[#688280] dark:text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Annonces Actives</p>
              <p className="text-[#121716] dark:text-white text-3xl font-black leading-tight">{stats.activeListings}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-[#dde4e3] dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <span className="material-symbols-outlined text-blue-500 text-2xl">visibility</span>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-bold">+14%</span>
              </div>
              <p className="text-[#688280] dark:text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Vues Totales</p>
              <p className="text-[#121716] dark:text-white text-3xl font-black leading-tight">{properties.reduce((sum, p) => sum + p.views, 0).toLocaleString('fr-FR')}</p>
            </div>
          </div>

          {/* Properties List */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-[#dde4e3] dark:border-gray-700 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#121716] dark:text-white">Vos Propriétés</h3>
              <Link to="/manage-listings" className="text-primary-host text-sm font-bold hover:underline">Voir tout</Link>
            </div>
            <div className="space-y-4">
              {properties.map(property => (
                <div key={property.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <img src={property.img} alt={property.desc} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="font-bold text-[#121716] dark:text-white">{property.desc}</h4>
                    <p className="text-sm text-[#688280]">{property.loc}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-[#688280]">{property.bookings} réservations</span>
                      <span className="text-xs font-bold text-primary-host">{property.revenue.toLocaleString('fr-FR')} € de revenus</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#121716] dark:text-white">{property.price}</p>
                    <p className="text-xs text-[#688280]">par nuit</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Arrivals */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-[#dde4e3] dark:border-gray-700">
            <h3 className="text-xl font-bold text-[#121716] dark:text-white mb-6">Prochaines arrivées</h3>
            {upcomingArrivals.length === 0 ? (
              <div className="text-center py-8 text-[#688280]">
                <span className="material-symbols-outlined text-4xl mb-2 block">event</span>
                <p className="text-sm font-bold">Aucune arrivée prévue</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingArrivals.map(arrival => (
                  <div key={arrival.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <div>
                      <p className="font-bold text-[#121716] dark:text-white">{arrival.guestName}</p>
                      <p className="text-sm text-[#688280]">{arrival.propertyName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#121716] dark:text-white">
                        {new Date(arrival.checkIn).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                      </p>
                      <p className="text-xs text-[#688280]">{arrival.guests} voyageur{arrival.guests > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostDashboard;
