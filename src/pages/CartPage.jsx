import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Tag,
  X,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/currency';
import SafeImage from '../components/common/SafeImage';
import Breadcrumb from '../components/common/Breadcrumb';

export const CartPage = () => {
  const {
    cartItems,
    subtotal,
    shippingFee,
    discountAmount,
    grandTotal,
    appliedCouponCode,
    couponResult,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleMoveToWishlist = (item) => {
    removeFromCart(item.itemKey);
    toggleWishlist({
      id: item.productId,
      name: item.name,
      slug: item.slug,
      brand: item.brand,
      price: item.price,
      originalPrice: item.originalPrice,
      images: [item.image]
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <Breadcrumb items={[{ label: 'Shopping Bag' }]} />
        <div className="max-w-md mx-auto text-center py-16 px-4 bg-stone-50 border border-stone-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center mx-auto text-stone-500">
            <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
          </div>
          <h2 className="font-serif text-2xl text-stone-900">Your Shopping Bag is Empty</h2>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Discover our latest runway silhouettes, heritage festive wear, and luxury footwear.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors"
            >
              Explore Catalogue <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb items={[{ label: 'Shopping Bag' }]} />

      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-3xl text-stone-900">
          Shopping Bag ({cartItems.length} {cartItems.length === 1 ? 'Garment' : 'Garments'})
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Review your chosen pieces, sizes, and quantities before simulated checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Items List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-stone-200 divide-y divide-stone-200 bg-white">
            {cartItems.map((item) => (
              <div key={item.itemKey} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-5">
                {/* Product Image */}
                <div className="w-24 sm:w-28 aspect-[3/4] shrink-0 bg-stone-100 overflow-hidden">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    aspectRatio="aspect-[3/4]"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[11px] text-stone-400 uppercase tracking-widest block font-mono">
                          {item.brand}
                        </span>
                        <Link
                          to={`/product/${item.slug}`}
                          className="font-serif text-base text-stone-900 hover:text-stone-600 transition-colors font-medium"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <span className="font-mono text-sm font-semibold text-stone-900 tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* Variant specs */}
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-stone-600">
                      <span>Size: <strong className="text-stone-900">{item.size}</strong></span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        Color:
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <strong className="text-stone-900">{item.color}</strong>
                      </span>
                      <span>·</span>
                      <span className="font-mono text-stone-400">SKU: {item.sku}</span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Item Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-stone-500">Qty:</span>
                      <div className="flex items-center border border-stone-300 bg-white">
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                          className="p-1.5 hover:bg-stone-100 text-stone-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono text-xs text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                          className="p-1.5 hover:bg-stone-100 text-stone-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-stone-400 font-mono">
                        ({formatPrice(item.price)} each)
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <button
                        onClick={() => handleMoveToWishlist(item)}
                        className="text-stone-600 hover:text-stone-900 flex items-center gap-1 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5" /> Move to Wishlist
                      </button>
                      <button
                        onClick={() => removeFromCart(item.itemKey)}
                        className="text-stone-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link
              to="/shop"
              className="text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-stone-600 inline-flex items-center gap-1.5"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-6">
          {/* Summary Box */}
          <div className="border border-stone-200 bg-stone-50 p-6 space-y-5">
            <h3 className="font-serif text-lg text-stone-900 pb-3 border-b border-stone-200">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-stone-600 font-sans">
              <div className="flex justify-between">
                <span>Garments Subtotal</span>
                <span className="font-mono text-stone-900 tabular-nums">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Coupon Discount ({appliedCouponCode})</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-mono text-stone-900 tabular-nums">
                  {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-stone-400 text-[11px]">
                <span>Luxury Packaging & Dust Bag</span>
                <span className="uppercase text-emerald-700 font-medium">Included</span>
              </div>

              <div className="flex justify-between pt-3 border-t border-stone-200 font-medium text-stone-900 text-sm">
                <span>Grand Total</span>
                <span className="font-mono font-semibold text-lg tabular-nums">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Coupon Application */}
            <div className="pt-2 border-t border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-700 block mb-2">
                Promotional Code
              </span>

              {appliedCouponCode ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Applied: <strong className="font-mono">{appliedCouponCode}</strong></span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-stone-800 p-0.5"
                    title="Remove coupon"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter ATELIER20 or WELCOME10"
                    className="flex-1 bg-white border border-stone-300 px-3 py-2 text-xs uppercase font-mono tracking-wider focus:outline-none focus:border-stone-800"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Sample Coupons Suggestion */}
              <div className="mt-2 text-[10px] text-stone-500 space-y-1">
                <span>Available codes: </span>
                <span className="font-mono font-semibold text-stone-800">ATELIER20</span> (20% off),{' '}
                <span className="font-mono font-semibold text-stone-800">WELCOME10</span> (10% off)
              </div>
            </div>

            {/* Checkout Action */}
            <div className="pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
