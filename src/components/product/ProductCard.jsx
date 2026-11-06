import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import SafeImage from '../common/SafeImage';
import PriceDisplay from '../common/PriceDisplay';
import RatingStars from '../common/RatingStars';

export const ProductCard = ({ product, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const isSaved = isInWishlist(product.id);

  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sizes?.length === 1 && product.colors?.length === 1) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
    } else {
      onQuickView?.(product);
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <div
      className="group flex flex-col h-full bg-white transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Hover Actions */}
      <div className="relative overflow-hidden bg-stone-100 aspect-[3/4] cursor-pointer">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <SafeImage
            src={displayImage}
            alt={product.name}
            aspectRatio="aspect-[3/4]"
            className="transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 shadow-sm ${
            isSaved
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 backdrop-blur-xs'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : 'stroke-[1.75]'}`} />
        </button>

        {/* Quick Actions Hover Strip */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-stone-900 text-xs font-medium uppercase tracking-wider shadow-md backdrop-blur-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
          <button
            type="button"
            onClick={handleQuickAdd}
            className="p-2 bg-stone-900 hover:bg-stone-800 text-white shadow-md flex items-center justify-center transition-colors"
            title="Quick add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details (Clean metadata, no pill badges) */}
      <div className="pt-3 pb-1 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Brand & Subcategory */}
          <div className="text-[11px] text-stone-400 uppercase tracking-widest flex items-center gap-1.5 truncate">
            <span>{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.subCategory}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm font-medium text-stone-900 line-clamp-1 group-hover:text-stone-600 transition-colors">
            <Link to={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
        </div>

        {/* Price & Rating */}
        <div className="mt-2 pt-1 border-t border-stone-100 flex items-center justify-between">
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
          />
          <RatingStars rating={product.rating} count={product.reviewCount} showText={false} />
        </div>

        {/* Available Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((c, idx) => (
              <span
                key={idx}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-stone-300"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-stone-400 font-mono">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
