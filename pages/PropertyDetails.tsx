import * as React from 'react';
import { useParams } from 'react-router-dom';
import { properties } from '../data/properties';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const property = properties.find(p => p.id === id) || properties[0]; // Fallback sur le premier si non trouvé

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#171211] dark:text-white antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[#e5dddc] bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 lg:px-20 py-3">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-3xl font-bold">domain</span>
              <h2 className="text-xl font-extrabold tracking-tight">Immob</h2>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Séjours</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Expériences</a>
              <a className="text-sm font-semibold hover:text-primary transition-colors" href="#">Conciergerie</a>
            </nav>
          </div>
          <div className="flex-1 max-w-md px-8 hidden sm:block">
            <div className="flex items-center bg-[#f4f1f0] dark:bg-zinc-800 rounded-full px-4 py-2 border border-transparent focus-within:border-primary/30 transition-all shadow-sm">
              <span className="material-symbols-outlined text-primary text-xl">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-[#876864]" placeholder="Rechercher des destinations" type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden lg:block text-sm font-bold hover:bg-[#f4f1f0] dark:hover:bg-zinc-800 px-4 py-2 rounded-full transition-colors">Mettre mon bien en location</button>
            <div className="flex items-center gap-2 border border-[#e5dddc] dark:border-zinc-700 rounded-full p-1.5 pl-3 hover:shadow-md transition-shadow cursor-pointer bg-white dark:bg-zinc-900">
              <span className="material-symbols-outlined">menu</span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">person</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 lg:px-20 py-8">
        {/* Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">{property.desc} à {property.loc}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
              <span className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-sm fill-1">star</span> {property.rate}
              </span>
              <span className="text-[#876864] underline">0 commentaires</span>
              <span className="text-[#876864]">•</span>
              <span className="text-[#876864] underline cursor-pointer">{property.loc}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#f4f1f0] dark:hover:bg-zinc-800 transition-colors font-semibold text-sm">
              <span className="material-symbols-outlined text-lg">share</span> Partager
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#f4f1f0] dark:hover:bg-zinc-800 transition-colors font-semibold text-sm">
              <span className="material-symbols-outlined text-lg">favorite</span> Enregistrer
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[400px] lg:h-[560px] mb-12 rounded-xl overflow-hidden">
          <div className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
            <div className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDesxfKcIjaD2qJpvJvo2SLWIv9MQBFqi6jftnDMZ4goi5mJD27lqeWVgK_PgwBPOvOg_zksz6l_dbZdTm5U6MqDEAT2O3em2NRAjf3qqjvQFpT7m9tEt5AV2_LKDXC-6FgEJaszu_kIPO8Qrh_8h-l0GxVizoJRz7myNhloLeJZe9J08p45Ee11QCGzKh-FPsO5lTptM5Hf4RXTaqW_zN1riee0kOrGeBXNuq9AJzdPYCvtGMmYIQApv-jsazV5G73FUaU8D9mHiQ")' }} />
          </div>
          {[
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAQchE-OG5Gx5HZnZ-JXeSQ_XcFT-rP406bWiM-F3wQZF1vpJKIXushYdJ9rRpk4De4ik9KpkjdOgfv0rIyq2wbqGrvd-S0-PUU6oRHFPvCVahLMbKSZTv5QmPGXffSrFNFY6TbjCDOFHglnAg8NmWGrbe2bDY9qc674-ekWPxsQlgmltBpQN2c6YftSYdvfMKYSgeSJwz9dgcRSZyaLYkw__3jlwg_C6_SGkRAUBJIy8_WWymwhSX8uVEk2MRRyc6aRovmriaJfx4",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDMuuoVbo3U-ABtZXA9K8uJKiDGwjticMBldtKh27KRgVEm_n34R0Jp0Brx3F00d-ym2DGLP988LWITVMDgQUMp-8wiw_dVXyqnIfdHSQBkBesTByY1mosUxUtScYPyTCJiQl6ba3RIsSQYReAJCCy6GcesgNEXHYteWCaX6qM-XfjcksS20v8hUXj7bJ4N-Uf6zQD0SGyfQTfFZpJS_gsMmduivoyzJRKTWi3xyU7Jz0X0wtdqM6ZjmGj1WiP2uzUF5PpF8f9fIQM",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBLWPRiIPX0FO4VbWboHy0iMSjqnC3BdQXFzCHRkQj6uatpqLGtZxaN9NJytLgejgdhPwN9ff55HBcMW1-ZAeS24ST6juIl3rce6MO4m7iG4lD6Vv6H_cVSegDemVkVJOrpOl_B1wf82kzJYrOwUNigSVV6wECQjEgE_IVMoKEbGyj60K76dRR1QAzXg9E150VUOuujQehomXbXX2tVXtpLR2nui9o9BGVvOl53MUz3w07-nqQtRjdpI6i33MjB48rJAsNgEG8jvpM",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDYpmQ59bqASpxNDA8hAPSKGKKnwzMMLPLKNAAjs6u2nNBbZ0wKuDaBwQrmvWu_oZKlNidZikL6GEQBlYQH2fFv9WBT4-jLZh6H4VKTysv6MrDP51v4AFZcfnlrSxlYX9VsUJX3xiHIf2Hr_V0EGKaXfcTelMS6-aUMkTXx6gPlWCi2-op-OnFoGLjgU5sr1rgOcNKQKSoeJjEJeZSnG-sibmzemOS5THQr-1Ot6tcGtXqp_lo9wJ-fbfsXotdC0ObyF_Odbti_wz0"
          ].map((url, i) => (
            <div key={i} className="relative group cursor-pointer overflow-hidden">
              <div className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url("${url}")` }} />
              {i === 3 && (
                <button className="absolute bottom-4 right-4 bg-white text-[#171211] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg border border-black/10">
                  <span className="material-symbols-outlined text-lg">grid_view</span> Afficher toutes les photos
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Info Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div className="flex items-center justify-between pb-10 border-b border-[#e5dddc]">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">Logement entier hébergé par {property.details?.host || 'Hôte'}</h2>
                <p className="text-[#876864] font-medium">
                  {property.details ? `${property.details.guests} voyageurs • ${property.details.bedrooms} chambres • ${property.details.beds} lits • ${property.details.baths} salles de bain` : 'Capacité et détails à confirmer'}
                </p>
              </div>
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-white shadow-md flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-slate-400">person</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {[
                { icon: 'chef_hat', title: 'Chef privé inclus', desc: 'Expérience culinaire de classe mondiale avec des ingrédients locaux.' },
                { icon: 'pool', title: 'Piscine à débordement', desc: 'Piscine avec une vue imprenable sur l\'océan.' },
                { icon: 'calendar_today', title: 'Annulation gratuite pendant 48 heures', desc: 'Bénéficiez d\'un remboursement complet si vous changez d\'avis dans les 48 heures suivant la réservation.' },
              ].map((f, i) => (
                <div key={i} className="flex gap-4">
                  <span className="material-symbols-outlined text-3xl text-[#171211] dark:text-white">{f.icon}</span>
                  <div>
                    <h3 className="font-bold">{f.title}</h3>
                    <p className="text-[#876864] text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-b border-[#e5dddc]"></div>
            <div className="flex flex-col gap-4">
              <p className="text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
                {property.desc}. Découvrez ce lieu unique pour un séjour inoubliable.
              </p>
              <button className="flex items-center gap-1 font-bold underline decoration-primary underline-offset-4 text-sm mt-2">En savoir plus <span className="material-symbols-outlined text-sm">chevron_right</span></button>
            </div>
          </div>

          {/* Booking Widget */}
          <div className="relative">
            <div className="sticky top-28 bg-white dark:bg-zinc-900 border border-[#e5dddc] dark:border-zinc-700 rounded-2xl p-6 shadow-xl shadow-[#171211]/5">
              <div className="flex justify-between items-end mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black">{property.price}</span>
                  <span className="text-[#876864] font-medium">par nuit</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-bold">
                  <span className="material-symbols-outlined text-primary text-sm fill-1">star</span> {property.rate}
                </div>
              </div>
              <div className="flex flex-col border border-[#e5dddc] dark:border-zinc-700 rounded-xl overflow-hidden mb-4">
                <div className="flex border-b border-[#e5dddc] dark:border-zinc-700">
                  <div className="flex-1 p-3 border-r border-[#e5dddc] dark:border-zinc-700 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <p className="text-[10px] font-black uppercase text-[#171211] dark:text-zinc-400">Arrivée</p>
                    <p className="text-sm font-medium opacity-50">Date</p>
                  </div>
                  <div className="flex-1 p-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                    <p className="text-[10px] font-black uppercase text-[#171211] dark:text-zinc-400">Départ</p>
                    <p className="text-sm font-medium opacity-50">Date</p>
                  </div>
                </div>
                <div className="p-3 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black uppercase text-[#171211] dark:text-zinc-400">Voyageurs</p>
                    <p className="text-sm font-medium">1 voyageur</p>
                  </div>
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 mb-4">Réserver</button>
              <p className="text-center text-sm text-[#876864] mb-6">Aucun débit pour le moment</p>
              <div className="pt-6 border-t border-[#e5dddc] dark:border-zinc-700 flex justify-between">
                <span className="text-lg font-black">Total</span>
                <span className="text-lg font-black">{property.price}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetails;
