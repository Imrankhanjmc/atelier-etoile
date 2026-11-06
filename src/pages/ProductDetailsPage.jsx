import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate, useOutletContext } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Share2,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Maximize2,
  X,
  Plus,
  Minus
} from 'lucide-react';
import { productService } from '../services/productService';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useRecentlyViewed } from '../context/RecentlyViewedContext';
import { useToast } from '../context/ToastContext';
import SafeImage from '../components/common/SafeImage';
import PriceDisplay from '../components/common/PriceDisplay';
import RatingStars from '../components/common/RatingStars';
import Breadcrumb from '../components/common/Breadcrumb';
import PincodeChecker from '../components/product/PincodeChecker';
import ProductCard from '../components/product/ProductCard';

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();
  const { addToast } = useToast();
  const { openQuickView, openSizeGuide } = useOutletContext();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFullscreenImageOpen, setIsFullscreenImageOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('specifications');

  // Load product
  useEffect(() => {
    let active = true;
    setIsLoading(true);

    productService
      .getProductBySlug(slug)
      .then((data) => {
        if (active) {
          setProduct(data);
          setSelectedColor(data.colors?.[0] || null);
          setSelectedSize(data.sizes?.[0] || '');
          setSelectedImage(0);
          setQuantity(1);
          setIsLoading(false);
          addRecentlyViewed(data);
        }
      })
      .catch((err) => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [slug]);

  const isSaved = product ? isInWishlist(product.id) : false;

  // Variant matching
  const matchedVariant = useMemo(() => {
    if (!product) return null;
    return product.variants?.find(
      (v) => v.size === selectedSize && v.color === (selectedColor?.name || '')
    );
  }, [product, selectedSize, selectedColor]);

  const availableStock = matchedVariant ? matchedVariant.stock : (product?.availableStock || 0);
  const isOutOfStock = availableStock <= 0;

  // Related products from same category or collection
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
      .slice(0, 4);
  }, [product]);

  // Actions
  const handleAddToCart = () => {
    if (!product || isOutOfStock) return;
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (!product || isOutOfStock) return;
    const added = addToCart(product, selectedSize, selectedColor, quantity);
    if (added) {
      navigate('/checkout');
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Garment URL copied to clipboard.', 'success');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
          <div className="lg:col-span-7 bg-stone-200 aspect-[3/4] w-full" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-4 bg-stone-200 w-1/4" />
            <div className="h-8 bg-stone-200 w-3/4" />
            <div className="h-6 bg-stone-200 w-1/3" />
            <div className="h-24 bg-stone-200 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl text-stone-900">Garment Not Found</h2>
        <p className="text-xs text-stone-500">
          This piece may have been archived or moved to another seasonal collection.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Shop', href: '/shop' },
          { label: product.category, href: `/shop?category=${product.category}` },
          { label: product.name }
        ]}
      />

      {/* Main PDP Grid (Sticky Gallery Left, Sticky Purchase Module Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Gallery (7 cols on Desktop) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image Container */}
          <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden group">
            <SafeImage
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              aspectRatio="aspect-[3/4]"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Fullscreen Trigger */}
            <button
              onClick={() => setIsFullscreenImageOpen(true)}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-stone-800 shadow-md backdrop-blur-xs transition-colors"
              title="View High-Resolution Image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-[3/4] bg-stone-100 overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-stone-900 ring-1 ring-stone-900'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Purchase Module (5 cols on Desktop, Contiguous) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-400 uppercase tracking-widest font-mono">
              <span>{product.brand}</span>
              <span>SKU: {matchedVariant?.sku || product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center justify-between pt-1">
              <RatingStars rating={product.rating} count={product.reviewCount} />
              <button
                onClick={handleShare}
                className="text-stone-400 hover:text-stone-900 text-xs flex items-center gap-1 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>

            <div className="pt-2">
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                size="text-2xl"
              />
              <span className="text-[11px] text-stone-400 block mt-1">
                Inclusive of all taxes & luxury duties
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans border-t border-b border-stone-200 py-4">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-stone-900">
                  Color: <strong className="font-medium text-stone-700">{selectedColor?.name}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor?.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-8 h-8 rounded-full border-2 p-0.5 transition-all ${
                        isSelected ? 'border-stone-900 scale-110' : 'border-transparent hover:border-stone-300'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-stone-300 shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Size Selector with Size Guide trigger */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-stone-900">
                  Select Size
                </span>
                <button
                  type="button"
                  onClick={() => openSizeGuide?.(product.category)}
                  className="text-stone-700 hover:text-stone-900 underline text-xs font-medium"
                >
                  Size Guide & Measurements
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-semibold uppercase tracking-wider border transition-colors ${
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

          {/* Quantity & Stock Status */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-3">
              <span className="font-semibold uppercase tracking-wider text-stone-900">
                Quantity:
              </span>
              <div className="flex items-center border border-stone-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-stone-100 text-stone-600 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono text-xs text-stone-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(availableStock || 10, quantity + 1))}
                  className="p-2 hover:bg-stone-100 text-stone-600 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div>
              {availableStock > 0 ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1 font-mono">
                  <Check className="w-3.5 h-3.5" /> {availableStock} Units Available
                </span>
              ) : (
                <span className="text-rose-600 font-medium">Sold Out for this Variant</span>
              )}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 py-3.5 px-6 bg-stone-900 text-white hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                {isOutOfStock ? 'Sold Out' : 'Add to Bag'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 border transition-colors ${
                  isSaved
                    ? 'border-rose-300 bg-rose-50 text-rose-600'
                    : 'border-stone-300 hover:border-stone-900 text-stone-700'
                }`}
                title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={isOutOfStock}
              className="w-full py-3.5 px-6 bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 disabled:bg-stone-200 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              Express Checkout
            </button>
          </div>

          {/* Pincode & Delivery Checker */}
          <div className="pt-2">
            <PincodeChecker />
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-stone-200 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-stone-500" />
              <span>Complimentary insured shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-stone-500" />
              <span>14-day return privilege</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications & Details Tabs */}
      <section className="pt-8 border-t border-stone-200">
        <div className="flex border-b border-stone-200 gap-8 overflow-x-auto">
          {[
            { id: 'specifications', label: 'Garment Specifications' },
            { id: 'fabric', label: 'Noble Fabric & Origin' },
            { id: 'care', label: 'Washing & Care Instructions' },
            { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-px whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-400 hover:text-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-xs text-stone-700">
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-400 uppercase tracking-wider">Gender / Cut</span>
                <span className="font-medium text-stone-900 capitalize">{product.gender}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-stone-100">
                <span className="text-stone-400 uppercase tracking-wider">Clothing Type</span>
                <span className="font-medium text-stone-900 capitalize">{product.subCategory}</span>
              </div>
              {product.fabric && (
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-400 uppercase tracking-wider">Fabric Composition</span>
                  <span className="font-medium text-stone-900">{product.fabric}</span>
                </div>
              )}
              {product.fit && (
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-400 uppercase tracking-wider">Fit Profile</span>
                  <span className="font-medium text-stone-900">{product.fit}</span>
                </div>
              )}
              {product.pattern && (
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-400 uppercase tracking-wider">Pattern & Finish</span>
                  <span className="font-medium text-stone-900">{product.pattern}</span>
                </div>
              )}
              {product.sleeveType && (
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-400 uppercase tracking-wider">Sleeve Configuration</span>
                  <span className="font-medium text-stone-900">{product.sleeveType}</span>
                </div>
              )}
              {product.neckType && (
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-400 uppercase tracking-wider">Collar / Neckline</span>
                  <span className="font-medium text-stone-900">{product.neckType}</span>
                </div>
              )}
              {product.occasion && (
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-400 uppercase tracking-wider">Intended Occasion</span>
                  <span className="font-medium text-stone-900 capitalize">{product.occasion}</span>
                </div>
              )}
              {product.season && (
                <div className="flex justify-between py-2 border-b border-stone-100">
                  <span className="text-stone-400 uppercase tracking-wider">Seasonality</span>
                  <span className="font-medium text-stone-900 capitalize">{product.season}</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'fabric' && (
            <div className="max-w-2xl space-y-4 text-xs text-stone-600 leading-relaxed font-sans">
              <h4 className="font-serif text-base text-stone-900">
                Ethical Sourcing & Heritage Milling
              </h4>
              <p>
                This garment is constructed utilizing <strong className="text-stone-900">{product.fabric}</strong>. Our ateliers source directly from certified sustainable family-owned mills in Western Europe and master artisan clusters across India.
              </p>
              <p>
                Each bolt of cloth undergoes thorough pre-shrinkage baths, colorfastness testing, and fiber density verification before pattern-cutting commences, ensuring lifetime durability.
              </p>
            </div>
          )}

          {activeTab === 'care' && (
            <div className="max-w-2xl space-y-4 text-xs text-stone-600 leading-relaxed">
              <h4 className="font-serif text-base text-stone-900">
                Preserving Your Investment Piece
              </h4>
              <p className="bg-stone-50 border border-stone-200 p-4 font-mono text-stone-800">
                {product.careInstructions || 'Dry clean recommended. Wash inside out with like colors.'}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-stone-500">
                <li>Never expose natural silks or wools to direct high-heat dryers.</li>
                <li>Store on contoured cedar or padded hangers to maintain shoulder geometry.</li>
                <li>Steam gently from the interior to relax travel creases without flattening surface weave.</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-serif text-4xl text-stone-900">{product.rating}</span>
                <div>
                  <RatingStars rating={product.rating} count={product.reviewCount} />
                  <span className="text-xs text-stone-500 font-sans block mt-0.5">
                    100% of reviewers recommend this garment
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-stone-100">
                {[
                  {
                    author: 'Clara M.',
                    rating: 5,
                    title: 'Remarkable craftsmanship and drape',
                    comment: 'The quality of the material is immediately tangible upon opening the box. Fits true to size with a tailored yet breathable silhouette.'
                  },
                  {
                    author: 'David R.',
                    rating: 5,
                    title: 'Worth every rupee',
                    comment: 'Subtle luxury without screaming logos. Wore it to an evening reception and received endless inquiries about the designer.'
                  }
                ].map((rev, idx) => (
                  <div key={idx} className="p-4 bg-stone-50 border border-stone-200 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-stone-900 font-sans">{rev.author}</span>
                      <RatingStars rating={rev.rating} showText={false} />
                    </div>
                    <strong className="block text-stone-800 font-serif pt-1">{rev.title}</strong>
                    <p className="text-stone-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-stone-200 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-stone-400 font-mono block">
                Atelier Recommendations
              </span>
              <h2 className="font-serif text-2xl text-stone-900 mt-1">
                You May Also Admire
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={openQuickView} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 1 && (
        <section className="pt-12 border-t border-stone-200 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-mono block">
              Archive History
            </span>
            <h2 className="font-serif text-2xl text-stone-900 mt-1">
              Recently Viewed
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {recentlyViewed
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={openQuickView} />
              ))}
          </div>
        </section>
      )}

      {/* Fullscreen Image Zoom Modal */}
      {isFullscreenImageOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreenImageOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.images[selectedImage] || product.images[0]}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
