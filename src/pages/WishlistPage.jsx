import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import SafeImage from '../components/common/SafeImage';
import PriceDisplay from '../components/common/PriceDisplay';
import Breadcrumb from '../components/common/Breadcrumb';

export const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openQuickView } = useOutletContext();

  const handleAddToCart = (product) => {
    if (product.sizes?.length === 1 && product.colors?.length === 1) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
    } else {
      openQuickView?.(product);
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />
        <div className="max-w-md mx-auto text-center py-16 px-4 bg-stone-50 border border-stone-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center mx-auto text-stone-500">
            <Heart className="w-8 h-8 stroke-[1.2]" />
          </div>
          <h2 className="font-serif text-2xl text-stone-900">Your Wishlist is Empty</h2>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Save garments while browsing to compare silhouettes and build your dream capsule wardrobe.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Explore Runway Pieces <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />

      <div className="pb-4 border-b border-stone-200 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-3xl text-stone-900">
            My Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Curated archive of pieces saved for your upcoming events and seasonal styling.
          </p>
        </div>
        <Link
          to="/shop"
          className="text-xs uppercase tracking-wider font-semibold text-stone-800 hover:text-stone-600 hidden sm:inline-flex items-center gap-1"
        >
          Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col justify-between border border-stone-200 bg-white p-3 space-y-3 shadow-xs hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
              <Link to={`/product/${product.slug}`}>
                <SafeImage
                  src={product.images?.[0]}
                  alt={product.name}
                  aspectRatio="aspect-[3/4]"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-stone-500 hover:text-rose-600 rounded-full shadow-sm transition-colors"
                title="Remove from wishlist"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-mono">
                  {product.brand}
                </span>
                <Link
                  to={`/product/${product.slug}`}
                  className="font-medium text-xs text-stone-900 line-clamp-1 hover:text-stone-600 transition-colors"
                >
                  {product.name}
                </Link>
              </div>

              <div className="pt-1">
                <PriceDisplay
                  price={product.price}
                  originalPrice={product.originalPrice}
                  discount={product.discount}
                  size="text-xs"
                />
              </div>

              {/* Sizes Available */}
              {product.sizes && (
                <div className="text-[11px] text-stone-400 truncate">
                  Sizes: <span className="text-stone-600">{product.sizes.join(', ')}</span>
                </div>
              )}

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full py-2.5 mt-2 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Select Variant & Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
