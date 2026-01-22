
import * as React from 'react';
const { useState } = React;
import { Link } from 'react-router-dom';
import { useHostStore } from '../src/store/hostStore';
import { useAuthStore } from '../src/store/authStore';

const ManageListings: React.FC = () => {
  const { properties } = useHostStore();
  const { user } = useAuthStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const handleEdit = (propertyId: string) => {
    alert(`Édition de la propriété ${propertyId} - Fonctionnalité à venir !`);
  };

  const handleDelete = (propertyId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
      alert(`Suppression de la propriété ${propertyId} - Fonctionnalité à venir !`);
    }
  };

  const handleToggleStatus = (propertyId: string, currentStatus: boolean) => {
    alert(`Propriété ${currentStatus ? 'désactivée' : 'activée'} - Fonctionnalité à venir !`);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link to="/host" className="text-primary hover:underline text-sm font-bold">
                ← Retour au dashboard
              </Link>
            </div>
            <h1 className="text-3xl font-black text-[#171211] dark:text-white">Vos annonces</h1>
            <p className="text-slate-500 text-sm mt-1">
              {properties.length} propriété{properties.length > 1 ? 's' : ''} • Gérez vos biens et leurs disponibilités
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:brightness-110 shadow-lg shadow-primary/20 transition-all"
          >
            <span className="material-symbols-outlined">add</span> Créer une annonce
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-10">
        {properties.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-300 dark:border-zinc-700">
            <div className="size-20 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl text-slate-400">home_work</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Aucune annonce pour le moment</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              Commencez à gagner des revenus en mettant votre propriété en location.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:brightness-110"
            >
              Créer ma première annonce
            </button>
          </div>
        ) : (
          // Properties Grid
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">home</span>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Propriétés actives</p>
                </div>
                <p className="text-3xl font-black">{properties.filter(p => p.isActive).length}</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-green-500 text-2xl">event</span>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Réservations totales</p>
                </div>
                <p className="text-3xl font-black">{properties.reduce((sum, p) => sum + p.bookings, 0)}</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-blue-500 text-2xl">payments</span>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Revenus totaux</p>
                </div>
                <p className="text-3xl font-black">{properties.reduce((sum, p) => sum + p.revenue, 0).toLocaleString('fr-FR')} €</p>
              </div>
            </div>

            {/* Properties List */}
            <div className="space-y-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-64 h-48 md:h-auto relative">
                      <img src={property.img} alt={property.desc} className="w-full h-full object-cover" />
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${property.isActive ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                        }`}>
                        {property.isActive ? 'Active' : 'Inactive'}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#171211] dark:text-white mb-1">{property.desc}</h3>
                          <p className="text-sm text-slate-500 flex items-center gap-1 mb-3">
                            <span className="material-symbols-outlined text-sm">location_on</span>
                            {property.loc}
                          </p>
                          <div className="flex items-center gap-4 text-sm mb-3">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">star</span>
                              <span className="font-bold">{property.rate}</span>
                            </span>
                            <span className="text-slate-500">•</span>
                            <span className="text-slate-500">{property.bookings} réservations</span>
                            <span className="text-slate-500">•</span>
                            <span className="font-bold text-primary">{property.revenue.toLocaleString('fr-FR')} € de revenus</span>
                          </div>

                          {/* Traffic Stats */}
                          <div className="flex items-center gap-4 text-xs bg-slate-50 dark:bg-zinc-800 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm text-blue-500">visibility</span>
                              <div>
                                <p className="font-bold text-[#171211] dark:text-white">{property.views.toLocaleString('fr-FR')}</p>
                                <p className="text-slate-500">Vues</p>
                              </div>
                              <span className={`text-xs font-bold ${property.viewsGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {property.viewsGrowth > 0 ? '+' : ''}{property.viewsGrowth}%
                              </span>
                            </div>
                            <div className="w-px h-8 bg-slate-200 dark:bg-zinc-700"></div>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm text-purple-500">touch_app</span>
                              <div>
                                <p className="font-bold text-[#171211] dark:text-white">{property.clicks.toLocaleString('fr-FR')}</p>
                                <p className="text-slate-500">Clics</p>
                              </div>
                            </div>
                            <div className="w-px h-8 bg-slate-200 dark:bg-zinc-700"></div>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm text-green-500">trending_up</span>
                              <div>
                                <p className="font-bold text-[#171211] dark:text-white">{property.conversionRate}%</p>
                                <p className="text-slate-500">Conversion</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-primary">{property.price}</p>
                          <p className="text-xs text-slate-500">par nuit</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-zinc-800">
                        <button
                          onClick={() => handleEdit(property.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold text-sm hover:bg-blue-600 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                          Modifier
                        </button>
                        <button
                          onClick={() => handleToggleStatus(property.id, property.isActive)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-colors ${property.isActive
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                            : 'bg-green-500 text-white hover:bg-green-600'
                            }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {property.isActive ? 'pause' : 'play_arrow'}
                          </span>
                          {property.isActive ? 'Désactiver' : 'Activer'}
                        </button>
                        <Link
                          to={`/property/${property.id}`}
                          className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-lg font-bold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          Aperçu
                        </Link>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-bold text-sm hover:bg-red-600 transition-colors ml-auto"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black">Créer une nouvelle annonce</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Titre de l'annonce</label>
                <input
                  type="text"
                  placeholder="Ex: Villa moderne avec vue mer"
                  className="w-full border border-slate-300 dark:border-zinc-700 rounded-lg px-4 py-3 bg-white dark:bg-zinc-800"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Localisation</label>
                <input
                  type="text"
                  placeholder="Ex: Saint-Tropez, France"
                  className="w-full border border-slate-300 dark:border-zinc-700 rounded-lg px-4 py-3 bg-white dark:bg-zinc-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Prix par nuit (€)</label>
                  <input
                    type="number"
                    placeholder="1000"
                    className="w-full border border-slate-300 dark:border-zinc-700 rounded-lg px-4 py-3 bg-white dark:bg-zinc-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Catégorie</label>
                  <select className="w-full border border-slate-300 dark:border-zinc-700 rounded-lg px-4 py-3 bg-white dark:bg-zinc-800">
                    <option>Villas</option>
                    <option>Bord de mer</option>
                    <option>Cabanes</option>
                    <option>Campagne</option>
                    <option>Design</option>
                    <option>Piscines</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    alert('Création d\'annonce - Fonctionnalité à venir !');
                    setShowCreateModal(false);
                  }}
                  className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:brightness-110"
                >
                  Créer l'annonce
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border border-slate-300 dark:border-zinc-700 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-zinc-800"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListings;
