import React from 'react';
import { formatPrice } from '../../utils/currency';

export const PriceDisplay = ({
  price,
  originalPrice,
  discount,
  size = 'text-sm',
  className = ''
}) => {
  return (
    <div className={`flex items-baseline gap-2 font-mono tabular-nums ${className}`}>
      <span className={`font-medium text-stone-900 ${size}`}>
        {formatPrice(price)}
      </span>
      {originalPrice && originalPrice > price && (
        <>
          <span className="text-xs text-stone-400 line-through">
            {formatPrice(originalPrice)}
          </span>
          {discount && discount > 0 && (
            <span className="text-xs font-sans text-rose-700 tracking-tight font-medium">
              -{discount}%
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default PriceDisplay;
