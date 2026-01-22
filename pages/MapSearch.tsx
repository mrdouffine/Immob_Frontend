
import * as React from 'react';
const { useState, useMemo } = React;
import { Link } from 'react-router-dom';
import { usePropertyStore } from '../src/store/propertyStore';

const MapSearch: React.FC = () => {
  const { properties } = usePropertyStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showAmenitiesFilter, setShowAmenitiesFilter] = useState(false);

  const categories = ['Villas', 'Bord de mer', 'Cabanes', 'Campagne', 'Design', 'Piscines', 'Tendances', 'Îles', 'Arctique'];
  const amenities = ['Piscine', 'WiFi', 'Cuisine', 'Parking', 'Climatisation', 'Vue mer'];

  // Filtrer les propriétés
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Filtre par catégorie
      if (selectedCategory && prop.category !== selectedCategory) return false;

      // Filtre par prix
      const price = parseInt(prop.price.replace(/[^\d]/g, ''));
      if (price < priceRange[0] || price > priceRange[1]) return false;

      return true;
    });
  }, [properties, selectedCategory, priceRange, selectedAmenities]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark font-manrope">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-background-dark border-b border-[#f1f3f4] dark:border-white/10 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="text-primary-search">
              <span className="material-symbols-outlined text-3xl font-bold">domain</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Immob</h2>
          </Link>
          <div className="hidden lg:flex items-center bg-background-light dark:bg-white/5 rounded-full px-4 py-2 border border-[#f1f3f4] dark:border-white/10">
            <div className="flex items-center gap-3 px-3 border-r border-gray-300 dark:border-white/20">
              <span className="text-sm font-medium">N'importe où</span>
            </div>
            <div className="flex items-center gap-3 px-3 border-r border-gray-300 dark:border-white/20">
              <span className="text-sm font-medium">N'importe quand</span>
            </div>
            <div className="flex items-center gap-3 px-3">
              <span className="text-sm font-normal text-gray-500">Ajouter des voyageurs</span>
            </div>
            <button className="bg-primary-search text-white p-2 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">search</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            {['Logements', 'Expériences', 'Conciergerie'].map(item => (
              <a key={item} className="text-sm font-semibold hover:text-primary-search transition-colors" href="#">{item}</a>
            ))}
          </nav>
          <Link to="/profile" className="flex items-center gap-2 p-2 px-4 rounded-full border border-[#f1f3f4] dark:border-white/10 hover:shadow-md transition-shadow">
            <span className="material-symbols-outlined text-xl">menu</span>
            <div className="size-8 bg-gray-200 dark:bg-white/10 rounded-full" />
          </Link>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="sticky top-[65px] z-40 bg-white dark:bg-background-dark border-b border-[#f1f3f4] dark:border-white/10 px-6 py-4 shrink-0">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto overflow-x-auto hide-scrollbar">
          <div className="flex gap-3 shrink-0">
            {/* Prix Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowPriceFilter(!showPriceFilter);
                  setShowTypeFilter(false);
                  setShowAmenitiesFilter(false);
                }}
                className={`flex h-10 items-center justify-center gap-x-2 rounded-xl px-5 shadow-sm ${showPriceFilter ? 'bg-primary-search text-white' : 'bg-background-light dark:bg-white/5 border border-[#f1f3f4] dark:border-white/10'
                  }`}
              >
                <span className="text-sm font-semibold">Prix</span>
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
              {showPriceFilter && (
                <div className="absolute top-12 left-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 w-80 border border-gray-200 dark:border-zinc-700">
                  <h3 className="font-bold mb-4">Fourchette de prix</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div>
                        <label className="text-xs text-gray-500">Min</label>
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Max</label>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPriceFilter(false)}
                      className="w-full bg-primary-search text-white py-2 rounded-lg font-bold"
                    >
                      Appliquer
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Type Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowTypeFilter(!showTypeFilter);
                  setShowPriceFilter(false);
                  setShowAmenitiesFilter(false);
                }}
                className={`flex h-10 items-center justify-center gap-x-2 rounded-xl px-5 ${showTypeFilter || selectedCategory ? 'bg-primary-search text-white' : 'bg-background-light dark:bg-white/5 border border-[#f1f3f4] dark:border-white/10'
                  }`}
              >
                <span className="text-sm font-semibold">
                  {selectedCategory || 'Type de logement'}
                </span>
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
              {showTypeFilter && (
                <div className="absolute top-12 left-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 w-80 border border-gray-200 dark:border-zinc-700">
                  <h3 className="font-bold mb-4">Type de logement</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setShowTypeFilter(false);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 ${!selectedCategory ? 'bg-primary-search/10 text-primary-search font-bold' : ''
                        }`}
                    >
                      Tous les types
                    </button>
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowTypeFilter(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 ${selectedCategory === cat ? 'bg-primary-search/10 text-primary-search font-bold' : ''
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowAmenitiesFilter(!showAmenitiesFilter);
                  setShowPriceFilter(false);
                  setShowTypeFilter(false);
                }}
                className={`flex h-10 items-center justify-center gap-x-2 rounded-xl px-5 ${showAmenitiesFilter || selectedAmenities.length > 0 ? 'bg-primary-search text-white' : 'bg-background-light dark:bg-white/5 border border-[#f1f3f4] dark:border-white/10'
                  }`}
              >
                <span className="text-sm font-semibold">
                  Équipements {selectedAmenities.length > 0 && `(${selectedAmenities.length})`}
                </span>
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </button>
              {showAmenitiesFilter && (
                <div className="absolute top-12 left-0 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 w-80 border border-gray-200 dark:border-zinc-700">
                  <h3 className="font-bold mb-4">Équipements</h3>
                  <div className="space-y-2">
                    {amenities.map(amenity => (
                      <label key={amenity} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="w-5 h-5 rounded border-gray-300"
                        />
                        <span>{amenity}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAmenitiesFilter(false)}
                    className="w-full bg-primary-search text-white py-2 rounded-lg font-bold mt-4"
                  >
                    Appliquer
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategory || selectedAmenities.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000) && (
            <button
              onClick={() => {
                setSelectedCategory('');
                setSelectedAmenities([]);
                setPriceRange([0, 10000]);
              }}
              className="text-sm font-semibold text-primary-search hover:underline ml-4"
            >
              Effacer les filtres
            </button>
          )}
        </div>
      </div>

      {/* Split Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar Results */}
        <section className="w-full lg:w-[45%] xl:w-[40%] overflow-y-auto hide-scrollbar bg-white dark:bg-background-dark p-6 shrink-0">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              {filteredProperties.length} logement{filteredProperties.length > 1 ? 's' : ''} trouvé{filteredProperties.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredProperties.map((prop) => (
              <Link to={`/property/${prop.id}`} key={prop.id} className="group flex flex-col items-stretch justify-start rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white dark:bg-white/5 overflow-hidden border border-transparent hover:border-primary-search/30 transition-all duration-300">
                <div className="relative w-full aspect-[16/9] bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url("${prop.img}")` }}>
                  <button className="absolute top-4 right-4 size-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-primary-search transition-all">
                    <span className="material-symbols-outlined">favorite</span>
                  </button>
                  <div className="absolute bottom-4 left-4 bg-primary-search/90 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {prop.category}
                  </div>
                </div>
                <div className="flex flex-col p-5 gap-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight">{prop.loc}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{prop.desc}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm fill-1">star</span>
                      <span className="text-sm font-bold">{prop.rate}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                    <span className="text-2xl font-bold tracking-tighter">{prop.price} <span className="text-sm font-normal text-gray-500 tracking-normal">/ nuit</span></span>
                    <button className="bg-primary-search text-white text-sm font-bold py-2 px-6 rounded-lg hover:brightness-110 transition-all">Réserver</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Map View */}
        <section className="hidden lg:block flex-1 relative bg-[#e5e3df] dark:bg-[#1f2124]">
          <div className="absolute inset-0 grayscale-[0.2] opacity-80" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDHfkuqV_8sTODpVmLe9DaosZhmRY8TY74WBSWuEZ7I2rrkMHBJKBJIb18XTkjKt8QR-5sKbKx5uStSKKsCLkgiFVXEIYmfLzEp-x8f_b8OsddRndeXh1A42CCqy5x7-8lsHg3jSUI6U0uPSe4HZfjsHLOXJU-AEVkXQvmSgmCfhAMI1DhhOm4-N0YA0F6koxcEMGzuE7I5kjomcis2PqRqqX_bnYGK3zIRmxOUaIcqvR_lcRSO7Lb0OYQ2mP6xKCgBicebH4Kuwiw")', backgroundSize: 'cover' }}></div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
            <button className="bg-white dark:bg-background-dark shadow-lg rounded-full px-6 py-2 text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-lg">refresh</span> Rechercher dans cette zone
            </button>
          </div>

          {/* Map Pins */}
          {filteredProperties.slice(0, 5).map((prop, i) => (
            <div key={prop.id} className="map-pin z-10" style={{ top: `${30 + i * 15}%`, left: `${40 + i * 10}%` }}>
              <div className="bg-white dark:bg-background-dark px-3 py-1.5 rounded-full shadow-lg border border-primary-search/20 flex items-center gap-1 group cursor-pointer hover:bg-primary-search hover:text-white transition-colors">
                <span className="text-sm font-bold">{prop.price}</span>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default MapSearch;
