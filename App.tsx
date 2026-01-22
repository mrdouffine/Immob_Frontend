import * as React from 'react';
const { useState, lazy, Suspense } = React;
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';
import { useSessionCheck } from './src/store/authStore';

// Lazy loading des pages pour optimiser le bundle
const Discovery = lazy(() => import('./pages/Discovery'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const MapSearch = lazy(() => import('./pages/MapSearch'));
const Payment = lazy(() => import('./pages/Payment'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const ManageListings = lazy(() => import('./pages/ManageListings'));
const AISearch = lazy(() => import('./pages/AISearch'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Bookings = lazy(() => import('./pages/Bookings'));
const MessageCenter = lazy(() => import('./pages/MessageCenter'));
const HostDashboard = lazy(() => import('./pages/HostDashboard'));

// Composant de chargement
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      <p className="text-slate-500 dark:text-gray-400 font-medium">Chargement...</p>
    </div>
  </div>
);

const NavigationOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-4 left-4 z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={isOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
        aria-expanded={isOpen}
      >
        <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu_open'}</span>
      </button>
      {isOpen && (
        <nav
          className="absolute bottom-16 left-0 bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-4 w-64 flex flex-col gap-2 border border-slate-200 dark:border-zinc-700"
          role="navigation"
          aria-label="Menu de navigation principal"
        >
          <p className="text-xs font-bold uppercase text-slate-400 mb-2 px-2">Navigation Immob</p>
          <Link onClick={() => setIsOpen(false)} to="/login" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">login</span> Connexion</Link>
          <Link onClick={() => setIsOpen(false)} to="/register" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">person_add</span> Inscription</Link>
          <Link onClick={() => setIsOpen(false)} to="/" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">explore</span> Découverte</Link>
          <Link onClick={() => setIsOpen(false)} to="/favorites" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">favorite</span> Favoris</Link>
          <Link onClick={() => setIsOpen(false)} to="/bookings" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">event</span> Réservations</Link>
          <Link onClick={() => setIsOpen(false)} to="/ai-search" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">smart_toy</span> Assistant IA</Link>
          <Link onClick={() => setIsOpen(false)} to="/messages" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">chat</span> Messages</Link>
          <Link onClick={() => setIsOpen(false)} to="/host" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">dashboard</span> Dashboard Hôte</Link>
          <Link onClick={() => setIsOpen(false)} to="/manage-listings" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">list_alt</span> Gérer mes biens</Link>
          <Link onClick={() => setIsOpen(false)} to="/profile" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">person</span> Mon Profil</Link>
          <Link onClick={() => setIsOpen(false)} to="/map" className="p-2 hover:bg-primary/10 rounded-lg flex items-center gap-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"><span className="material-symbols-outlined text-sm" aria-hidden="true">map</span> Carte</Link>
        </nav>
      )}
    </div>
  );
};

const App: React.FC = () => {
  // Vérifier la session au chargement
  useSessionCheck();

  return (
    <ErrorBoundary>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Discovery />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/messages" element={<MessageCenter />} />
              <Route path="/host" element={<HostDashboard />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/map" element={<MapSearch />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/manage-listings" element={<ManageListings />} />
              <Route path="/ai-search" element={<AISearch />} />
            </Routes>
          </Suspense>
          <NavigationOverlay />
          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: 'inherit',
              },
            }}
          />
        </div>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;
