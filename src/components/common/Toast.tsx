import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-sm">
      <div className="bg-stone-900 border border-amber-500/40 text-stone-100 px-4 py-3 rounded-xl shadow-2xl flex items-start space-x-3 backdrop-blur-lg">
        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="flex-1 text-xs leading-relaxed font-medium">
          {toastMessage}
        </div>
      </div>
    </div>
  );
};
