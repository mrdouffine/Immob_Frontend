
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useBookingStore } from '../src/store/bookingStore';
import { useAuthStore } from '../src/store/authStore';

const Bookings: React.FC = () => {
    const { bookings, cancelBooking } = useBookingStore();
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
                <div className="text-center p-8">
                    <span className="material-symbols-outlined text-6xl text-[#876864] mb-4 block">event</span>
                    <h2 className="text-2xl font-bold mb-2">Connectez-vous pour voir vos réservations</h2>
                    <Link to="/login" className="inline-block mt-4 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:brightness-110">
                        Se connecter
                    </Link>
                </div>
            </div>
        );
    }

    const getStatusBadge = (status: string) => {
        const badges = {
            confirmed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirmée' },
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'En attente' },
            cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Annulée' },
            completed: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Terminée' },
        };
        const badge = badges[status as keyof typeof badges];
        return (
            <span className={`${badge.bg} ${badge.text} px-3 py-1 rounded-full text-xs font-bold`}>
                {badge.label}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const calculateNights = (checkIn: string, checkOut: string) => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diff = end.getTime() - start.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 px-8 py-6 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-[#171211] dark:text-white">Mes Réservations</h1>
                        <p className="text-slate-500 text-sm mt-1">{bookings.length} réservation{bookings.length > 1 ? 's' : ''}</p>
                    </div>
                    <Link to="/" className="text-primary hover:underline font-bold">
                        ← Retour à la découverte
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-8 py-10">
                {bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-white dark:bg-zinc-900 rounded-3xl border border-dashed border-slate-300 dark:border-zinc-700">
                        <div className="size-20 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-3xl text-slate-400">event</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">Aucune réservation</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-6">
                            Vous n'avez pas encore de réservation. Découvrez nos propriétés et réservez votre prochaine escapade !
                        </p>
                        <Link to="/" className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:brightness-110">
                            Découvrir des propriétés
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map(booking => (
                            <div key={booking.id} className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
                                <div className="flex flex-col md:flex-row">
                                    {/* Image */}
                                    <div className="md:w-64 h-48 md:h-auto">
                                        <img src={booking.propertyImage} alt={booking.propertyName} className="w-full h-full object-cover" />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-[#171211] dark:text-white mb-1">{booking.propertyName}</h3>
                                                <p className="text-sm text-slate-500 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                                    {booking.propertyLocation}
                                                </p>
                                            </div>
                                            {getStatusBadge(booking.status)}
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Arrivée</p>
                                                <p className="font-bold text-sm">{formatDate(booking.checkIn)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Départ</p>
                                                <p className="font-bold text-sm">{formatDate(booking.checkOut)}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Voyageurs</p>
                                                <p className="font-bold text-sm">{booking.guests} personne{booking.guests > 1 ? 's' : ''}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Durée</p>
                                                <p className="font-bold text-sm">{calculateNights(booking.checkIn, booking.checkOut)} nuit{calculateNights(booking.checkIn, booking.checkOut) > 1 ? 's' : ''}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-zinc-800">
                                            <div>
                                                <p className="text-xs text-slate-500 mb-1">Prix total</p>
                                                <p className="text-2xl font-black text-primary">{booking.totalPrice.toLocaleString('fr-FR')} €</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link to={`/property/${booking.propertyId}`} className="px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                                                    Voir la propriété
                                                </Link>
                                                {booking.status === 'pending' && (
                                                    <button
                                                        onClick={() => {
                                                            if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
                                                                cancelBooking(booking.id);
                                                            }
                                                        }}
                                                        className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors"
                                                    >
                                                        Annuler
                                                    </button>
                                                )}
                                                {booking.status === 'confirmed' && (
                                                    <Link to="/messages" className="px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all">
                                                        Contacter l'hôte
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
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

export default Bookings;
