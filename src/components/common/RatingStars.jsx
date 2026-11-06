import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5.0, count = 0, size = 'w-3.5 h-3.5', showText = true }) => {
  const rounded = Math.round(rating * 10) / 10;

  return (
    <div className="flex items-center gap-1.5 text-xs text-stone-500">
      <div className="flex items-center text-amber-600">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= Math.round(rating)
                ? 'fill-amber-600 text-amber-600'
                : 'text-stone-300'
            }`}
          />
        ))}
      </div>
      {showText && (
        <span className="font-mono text-[11px] tracking-tight">
          {rounded} {count > 0 && <span className="text-stone-400">({count})</span>}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
