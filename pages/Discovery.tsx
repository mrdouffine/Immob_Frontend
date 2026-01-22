
import * as React from 'react';
const { useState, useEffect } = React;
import { useNavigate, Link } from 'react-router-dom';
import { usePropertyStore } from '../src/store/propertyStore';

const Discovery: React.FC = () => {
  const navigate = useNavigate();
  const { properties, selectedCategory, setSelectedCategory, getPropertiesByCategory, toggleFavorite, favorites } = usePropertyStore();
  const [activeCategory, setActiveCategory] = useState('Villas');
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [searchDestination, setSearchDestination] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  // Filtrage initial basé sur la catégorie par défaut
  const [visibleProperties, setVisibleProperties] = useState<any[]>([]);

  // Charger les propriétés de la catégorie active
  useEffect(() => {
    const filtered = getPropertiesByCategory(activeCategory);
    setVisibleProperties(filtered);
  }, [activeCategory, properties]);

  // Fonction de recherche par destination
  const handleSearch = () => {
    if (!searchDestination.trim()) {
      const filtered = getPropertiesByCategory(activeCategory);
      setVisibleProperties(filtered);
      return;
    }
    const filtered = properties.filter(p =>
      p.category === activeCategory &&
      p.loc.toLowerCase().includes(searchDestination.toLowerCase())
    );
    setVisibleProperties(filtered);
    setShowSearchModal(false);
  };

  const categories = [
    { icon: 'castle', label: 'Villas' },
    { icon: 'beach_access', label: 'Bord de mer' },
    { icon: 'local_fire_department', label: 'Tendances', fill: true },
    { icon: 'cabin', label: 'Cabanes' },
    { icon: 'park', label: 'Campagne' },
    { icon: 'architecture', label: 'Design' },
    { icon: 'pool', label: 'Piscines' },
    { icon: 'landscape', label: 'Arctique' },
    { icon: 'maps', label: 'Îles' },
  ];

  const handleCategoryChange = (label: string) => {
    setActiveCategory(label);
    setSearchDestination(''); // Reset search
    setVisibleProperties(properties.filter(p => p.category === label));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowMore = () => {
    setIsMoreLoading(true);
    setTimeout(() => {
      const more = properties.filter(p => p.category === activeCategory).map(p => ({
        ...p,
        id: `${p.id}-extra-${Math.random().toString(36).substr(2, 9)}`
      }));
      setVisibleProperties(prev => [...prev, ...more]);
      setIsMoreLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#171211] dark:text-[#faf8f5] min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-[#f4f1f0] dark:border-[#3d3f42]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between h-20 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="text-primary group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined text-4xl">apartment</span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-[#171211] dark:text-white">Immob</h1>
          </Link>
          <div className="hidden md:flex flex-1 max-w-lg relative">
            <div className="flex items-center w-full h-12 bg-white dark:bg-[#3d3f42] border border-[#f4f1f0] dark:border-none rounded-full shadow-sm hover:shadow-md transition-all px-2">
              <button
                onClick={() => setShowSearchModal(!showSearchModal)}
                className="flex-1 px-4 text-left text-xs font-bold border-r border-[#f4f1f0] dark:border-[#2c2e30] hover:bg-gray-50 dark:hover:bg-gray-700 rounded-l-full transition-colors"
              >
                {searchDestination || 'DESTINATION'}
              </button>
              <button className="flex-1 px-4 text-left text-xs font-bold border-r border-[#f4f1f0] dark:border-[#2c2e30]">QUAND</button>
              <button className="flex-1 px-4 text-left text-xs font-normal text-[#876864] dark:text-gray-400">AJOUTER</button>
              <button
                onClick={handleSearch}
                className="bg-primary text-white p-2 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
              >
                <span className="material-symbols-outlined text-lg">search</span>
              </button>
            </div>
            {showSearchModal && (
              <div className="absolute top-14 left-0 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 z-50 border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-bold mb-2">Rechercher une destination</label>
                <input
                  type="text"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Ville, pays..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary outline-none bg-white dark:bg-gray-700"
                  autoFocus
                />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSearch}
                    className="flex-1 bg-primary text-white py-2 rounded-xl font-bold hover:bg-primary-dark transition-colors"
                  >
                    Rechercher
                  </button>
                  <button
                    onClick={() => { setSearchDestination(''); setShowSearchModal(false); handleSearch(); }}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Effacer
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/host" className="hidden lg:block text-sm font-black hover:bg-[#f4f1f0] dark:hover:bg-[#3d3f42] px-4 py-2 rounded-full transition-colors uppercase tracking-wider text-[10px]">Devenir Hôte</Link>
            <button onClick={() => navigate('/profile')} className="flex items-center gap-2 p-1 pl-3 border border-[#f4f1f0] dark:border-[#3d3f42] rounded-full hover:shadow-md transition-shadow bg-white dark:bg-[#3d3f42]">
              <span className="material-symbols-outlined text-xl">menu</span>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-primary">account_circle</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Category Nav */}
      <nav className="bg-white dark:bg-background-dark border-b border-[#f4f1f0] dark:border-[#3d3f42] sticky top-20 z-40 shadow-sm overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center gap-10 h-20 overflow-x-auto no-scrollbar scroll-smooth">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => handleCategoryChange(cat.label)}
              className={`flex flex-col items-center gap-2 min-w-[56px] pb-3 transition-all border-b-2 outline-none ${activeCategory === cat.label ? 'opacity-100 border-primary text-primary' : 'opacity-40 hover:opacity-100 border-transparent hover:border-gray-200'}`}
            >
              <span className={`material-symbols-outlined ${cat.fill ? 'fill-1' : ''}`}>{cat.icon}</span>
              <span className="text-[11px] font-black whitespace-nowrap uppercase tracking-tight">{cat.label}</span>
            </button>
          ))}
          <div className="flex-grow"></div>
          <button className="flex items-center gap-2 px-5 py-3 border border-[#f4f1f0] dark:border-[#3d3f42] rounded-xl text-xs font-black hover:bg-background-light dark:hover:bg-[#3d3f42] shrink-0 uppercase tracking-widest shadow-sm">
            <span className="material-symbols-outlined text-sm">tune</span> Filtres
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10">
        <div className="mb-10 flex items-baseline justify-between border-b border-[#f4f1f0] dark:border-[#3d3f42] pb-6">
          <h2 className="text-4xl font-black tracking-tighter uppercase">{activeCategory}</h2>
          <span className="text-xs font-black opacity-30 uppercase tracking-[0.2em]">{visibleProperties.length} Biens exclusifs</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12">
          {visibleProperties.length > 0 ? (
            visibleProperties.map((item) => (
              <div key={item.id} className="group cursor-pointer animate-in fade-in slide-in-from-bottom-2 duration-500" onClick={() => navigate(`/property/${item.id}`)}>
                <div className="relative aspect-[4/5] w-full mb-4 overflow-hidden rounded-3xl shadow-xl shadow-black/5">
                  <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url("${item.img}")` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleFavorite(item.id);
                    }}
                    className="absolute top-5 right-5 text-white/90 hover:text-red-500 transition-all z-10 hover:scale-125"
                  >
                    <span className={`material-symbols-outlined drop-shadow-lg ${favorites.includes(item.id) ? 'fill-1 text-red-500' : ''}`}>favorite</span>
                  </button>
                  <div className="absolute bottom-5 left-5 right-5 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-80">{item.desc}</p>
                    <h3 className="font-black text-lg leading-none">{item.loc}</h3>
                  </div>
                </div>
                <div className="flex justify-between items-start px-1">
                  <div className="space-y-1">
                    <p className="text-[#876864] dark:text-gray-400 text-xs font-black uppercase tracking-widest">{item.date}</p>
                    <p className="text-lg"><span className="font-black">{item.price}</span> <span className="text-xs opacity-50 uppercase font-bold tracking-tighter">/ nuit</span></p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-black bg-white dark:bg-zinc-800 px-2 py-1.5 rounded-full shadow-sm border border-[#f4f1f0] dark:border-[#3d3f42]">
                    <span className="material-symbols-outlined text-[12px] text-primary fill-1">star</span>
                    {item.rate}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-32 text-center bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-[#f4f1f0] dark:border-[#3d3f42]">
              <span className="material-symbols-outlined text-8xl opacity-10 mb-4">castle</span>
              <p className="text-2xl font-black opacity-40 uppercase tracking-widest">En cours de sélection...</p>
              <p className="text-sm opacity-30 mt-2">Nous préparons les meilleurs séjours {activeCategory.toLowerCase()} pour vous.</p>
            </div>
          )}
        </div>

        {visibleProperties.length > 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Plus d'options disponibles</p>
            <button
              onClick={handleShowMore}
              disabled={isMoreLoading}
              className="px-12 py-5 bg-[#171211] dark:bg-white text-white dark:text-[#171211] rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-2xl shadow-black/20 text-xs flex items-center gap-3"
            >
              {isMoreLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Chargement...
                </>
              ) : (
                'Explorer davantage'
              )}
            </button>
          </div>
        )}
      </main>

      {/* Map FAB */}
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => navigate('/map')}
          className="flex items-center gap-4 px-10 py-5 bg-[#171211] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all border border-white/10 group"
        >
          <span className="text-xs font-black tracking-[0.2em] uppercase">Carte Immersion</span>
          <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">map</span>
        </button>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 w-full bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-[#f4f1f0] dark:border-[#3d3f42] flex justify-around py-5 px-6 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        {[
          { icon: 'explore', label: 'Explorer', path: '/', active: true },
          { icon: 'favorite', label: 'Favoris', path: '/profile' },
          { icon: 'chat_bubble', label: 'Messages', path: '/messages' },
          { icon: 'account_circle', label: 'Profil', path: '/profile' },
        ].map((item, i) => (
          <Link key={i} to={item.path} className={`flex flex-col items-center gap-1.5 transition-all ${item.active ? 'text-primary' : 'opacity-30'}`}>
            <span className={`material-symbols-outlined ${item.active ? 'fill-1 scale-110' : ''}`}>{item.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discovery;
