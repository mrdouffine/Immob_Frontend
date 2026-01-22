import * as React from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const { useState } = React;

const AISearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [sources, setSources] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);
    setSources([]);

    try {
      // Initialisation avec l'API Key de l'environnement (Vite standard)
      const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY || (process as any).env?.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("Clé API Gemini manquante. Veuillez configurer VITE_GEMINI_API_KEY.");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: query }] }],
        generationConfig: {
          maxOutputTokens: 1000,
        }
      });

      const responseText = result.response.text();

      if (responseText) {
        setResponse(responseText);
        // Extraction des chunks de grounding pour les sources (optionnel selon le modèle)
        const candidates = (result.response as any).candidates;
        const chunks = candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        setSources(chunks);
      } else {
        setError("L'assistant n'a pas pu formuler de réponse ou le format est inattendu.");
      }

    } catch (err: any) {
      console.error("Erreur AISearch:", err);
      setError("Une erreur technique est survenue. Vérifiez votre connexion ou réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] dark:bg-[#1a1c1e] font-display">
      <main className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center">
        <div className="text-center mb-12 animate-in fade-in duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            IA Concierge Active
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-[#171211] dark:text-white">
            Où commence votre <span className="text-primary italic">prochaine histoire</span> ?
          </h1>
          <p className="text-[#876864] dark:text-[#876864] max-w-xl mx-auto font-medium">
            L'intelligence artificielle au service de vos désirs immobiliers les plus exclusifs.
          </p>
        </div>

        <div className="w-full max-w-2xl relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-teal-500/20 rounded-[2rem] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-2 rounded-[2rem] shadow-2xl">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              type="text"
              placeholder="Cherchez 'Une villa ultra-moderne face à la mer à Ibiza'..."
              className="flex-1 bg-transparent border-none outline-none px-6 py-4 text-lg font-medium placeholder:text-slate-300 dark:text-white"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-primary text-white size-14 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 disabled:opacity-50"
            >
              {loading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <span className="material-symbols-outlined text-2xl font-bold">search</span>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 rounded-2xl bg-red-50 text-red-600 text-sm font-bold flex items-center gap-3 animate-in slide-in-from-top-4">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        )}

        {response && (
          <div className="mt-16 w-full max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="glass-effect rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="material-symbols-outlined text-9xl">auto_awesome</span>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-xl md:text-2xl leading-relaxed font-medium text-slate-800 dark:text-slate-200 whitespace-pre-wrap">
                  {response}
                </p>
              </div>

              {sources.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-zinc-800">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    Sources et Références Immob
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sources.map((source, i) => (
                      <div key={i} className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-100 dark:border-zinc-800 hover:border-primary/30 transition-colors">
                        <p className="text-xs font-bold truncate mb-1">{source.title || "Propriété vérifiée"}</p>
                        <p className="text-[10px] text-slate-500 line-clamp-2">{source.snippet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-3xl">
          {[
            { icon: 'diamond', label: 'Ultra Luxe' },
            { icon: 'security', label: 'Sérénité' },
            { icon: 'verified', label: 'Vérifié' },
            { icon: 'auto_awesome', label: 'IA Native' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-default">
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">{item.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AISearch;
