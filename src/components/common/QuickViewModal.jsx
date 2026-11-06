import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SafeImage from '../common/SafeImage';
import PriceDisplay from '../common/PriceDisplay';
import RatingStars from '../common/RatingStars';

export const QuickViewModal = ({ product, isOpen, onClose, onOpenSizeGuide }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setSelectedSize(product.sizes?.[0] || '');
      setQuantity(1);
      setActiveImage(0);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const isSaved = isInWishlist(product.id);

  // Variant matching
  const matchedVariant = product.variants?.find(
    (v) => v.size === selectedSize && v.color === (selectedColor?.name || '')
  );
  const currentStock = matchedVariant ? matchedVariant.stock : product.availableStock;
  const isOutOfStock = currentStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const success = addToCart(product, selectedSize, selectedColor, quantity);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white shadow-2xl border border-stone-200 overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-1.5 bg-white/90 hover:bg-white text-stone-600 hover:text-stone-900 shadow-xs transition-colors"
          aria-label="Close Quick View"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Column */}
        <div className="w-full md:w-1/2 bg-stone-100 flex flex-col justify-between overflow-hidden">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <SafeImage
              src={product.images[activeImage] || product.images[0]}
              alt={product.name}
              aspectRatio="aspect-[3/4]"
              className="w-full h-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="flex gap-2 p-3 bg-stone-50 border-t border-stone-200 overflow-x-auto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-14 h-16 shrink-0 overflow-hidden border-2 transition-all ${
                    activeImage === idx ? 'border-stone-900' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} preview ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Brand & Category */}
            <div className="text-[11px] uppercase tracking-widest text-stone-400 flex items-center gap-1.5">
              <span>{product.brand}</span>
              <span>·</span>
              <span className="capitalize">{product.category}</span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-xl sm:text-2xl text-stone-900 leading-snug">
              {product.name}
            </h2>

            {/* Rating & Reviews */}
            <RatingStars rating={product.rating} count={product.reviewCount} />

            {/* Pricing */}
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              size="text-xl"
            />

            <p className="text-xs text-stone-600 leading-relaxed border-t border-b border-stone-100 py-3">
              {product.description}
            </p>

            {/* Color Swatch Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 uppercase tracking-wider font-semibold">
                    Color: <strong className="text-stone-900 font-sans">{selectedColor?.name}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor?.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                          isSelected ? 'border-stone-900 scale-110' : 'border-transparent hover:border-stone-300'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="block w-full h-full rounded-full border border-stone-300"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-stone-500 uppercase tracking-wider font-semibold">
                    Select Size
                  </span>
                  <button
                    onClick={() => onOpenSizeGuide?.(product.category)}
                    className="text-stone-600 hover:text-stone-900 underline text-xs font-medium"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-xs font-medium uppercase tracking-wider border transition-colors ${
                          isSelected
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock status indicator */}
            <div className="text-xs flex items-center gap-2">
              {currentStock > 0 ? (
                <span className="text-emerald-700 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" /> In stock ({currentStock} available)
                </span>
              ) : (
                <span className="text-rose-600 font-medium">
                  Currently out of stock in this size/color
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-3 border-t border-stone-100">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 py-3 px-4 bg-stone-900 text-white hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 border transition-colors ${
                  isSaved
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-stone-300 hover:border-stone-900 text-stone-700'
                }`}
                title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="block text-center text-xs text-stone-600 hover:text-stone-900 font-medium tracking-wide"
            >
              View full specifications & customer reviews →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
