
import * as React from 'react';
import { Link } from 'react-router-dom';
import { usePropertyStore } from '../src/store/propertyStore';
import { useAuthStore } from '../src/store/authStore';

const Favorites: React.FC = () => {
    const { properties, favorites, toggleFavorite } = usePropertyStore();
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="text-center p-8">
                    <span className="material-symbols-outlined text-6xl text-[#876864] mb-4 block">favorite</span>
                    <h2 className="text-2xl font-bold mb-2">Connectez-vous pour voir vos favoris</h2>
                    <Link to="/login" className="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:brightness-110">
                        Se connecter
                    </Link>
                </div>
            </div>
        );
    }

    const favoriteProperties = properties.filter(p => favorites.includes(p.id));

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-8 py-6 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-[#171211] dark:text-white">Mes Favoris</h1>
                        <p className="text-slate-500 text-sm mt-1">{favoriteProperties.length} propriété{favoriteProperties.length > 1 ? 's' : ''} sauvegardée{favoriteProperties.length > 1 ? 's' : ''}</p>
                    </div>
                    <Link to="/" className="text-primary hover:underline font-bold">
                        ← Retour à la découverte
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-8 py-10">
                {favoriteProperties.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-300 dark:border-zinc-700">
                        <div className="size-20 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-3xl text-slate-400">favorite</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Aucun favori pour le moment</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-6">
                            Parcourez nos propriétés et cliquez sur le cœur pour sauvegarder vos préférées.
                        </p>
                        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:brightness-110">
                            Découvrir des propriétés
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteProperties.map(property => (
                            <div key={property.id} className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 hover:shadow-xl transition-shadow">
                                <div className="relative">
                                    <Link to={`/property/${property.id}`}>
                                        <img src={property.img} alt={property.desc} className="w-full h-64 object-cover" />
                                    </Link>
                                    <button
                                        onClick={() => toggleFavorite(property.id)}
                                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform"
                                    >
                                        <span className="material-symbols-outlined text-red-500 fill-1">favorite</span>
                                    </button>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-bold text-[#171211] dark:text-white">{property.loc}</h3>
                                        <div className="flex items-center gap-1">
                                            <span className="material-symbols-outlined text-sm fill-1">star</span>
                                            <span className="text-sm font-bold">{property.rate}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 mb-3">{property.desc}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-slate-500">{property.date}</p>
                                        <p className="font-bold text-[#171211] dark:text-white">
                                            {property.price} <span className="font-normal text-sm text-slate-500">/ nuit</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Favorites;
