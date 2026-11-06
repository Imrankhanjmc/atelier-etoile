import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Resilient image component enforcing Zero-Broken-Image policy.
 * Seamlessly falls back to a luxury editorial placeholder if network fails.
 */
export const SafeImage = ({
  src,
  alt = 'Atelier Garment',
  className = '',
  aspectRatio = 'aspect-[3/4]',
  fallbackTitle = 'Atelier Étoile'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-stone-100 ${aspectRatio} ${className}`}>
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-stone-100 to-stone-200 text-stone-500">
          <Sparkles className="w-6 h-6 text-stone-400 mb-2 stroke-[1.5]" />
          <span className="font-serif text-xs tracking-wider uppercase text-stone-600 text-center">
            {fallbackTitle}
          </span>
          <span className="text-[10px] tracking-widest text-stone-400 mt-1 uppercase">
            Signature Piece
          </span>
        </div>
      )}
    </div>
  );
};

export default SafeImage;
