import React from 'react';
import { Eye, EyeOff, Layers, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const CmsEditor: React.FC = () => {
  const { cmsSections, toggleCmsSection } = useStore();

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <div className="border-b border-stone-800 pb-6">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
          STOREFRONT CONTENT MANAGEMENT
        </span>
        <h1 className="font-serif-heading text-3xl font-bold text-stone-100">Homepage Layout & Banner Configurator</h1>
        <p className="text-xs text-stone-400 mt-1">Control visibility and ordering of storefront experience modules.</p>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-4">
        <div className="space-y-3">
          {cmsSections.map((sec, idx) => (
            <div
              key={sec.id}
              className="bg-stone-950 border border-stone-800 p-4 rounded-xl flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-stone-400 font-mono flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <div>
                  <p className="font-semibold text-stone-200">{sec.title}</p>
                  <p className="text-[10px] text-stone-500 uppercase">Module Type: {sec.type}</p>
                </div>
              </div>

              <button
                onClick={() => toggleCmsSection(sec.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  sec.enabled
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-stone-900 text-stone-500 border border-stone-800'
                }`}
              >
                {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{sec.enabled ? 'Visible' : 'Hidden'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
