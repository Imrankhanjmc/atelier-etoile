import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 relative z-40 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6 hidden md:block" />
        <div className="flex-1 text-center font-sans tracking-wide flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>
            Complimentary white-glove shipping on orders over ₹2,499 · Use code <strong className="font-mono text-white">ATELIER20</strong> for 20% off
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-stone-400 hover:text-white transition-colors p-0.5"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
