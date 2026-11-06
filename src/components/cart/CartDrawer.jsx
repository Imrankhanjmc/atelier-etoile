import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/currency';
import SafeImage from '../common/SafeImage';

export const CartDrawer = () => {
  const {
    cartItems,
    totalItemCount,
    subtotal,
    shippingFee,
    discountAmount,
    grandTotal,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 2499;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewBagClick = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:px-6 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              <h3 className="font-serif text-lg tracking-wide text-stone-900">
                Shopping Bag ({totalItemCount})
              </h3>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1 text-stone-400 hover:text-stone-900 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-stone-600 mb-1.5 font-sans">
                Add <span className="font-semibold text-stone-900 font-mono">{formatPrice(remainingForFreeShipping)}</span> more to unlock complimentary white-glove shipping.
              </p>
            ) : (
              <p className="text-stone-900 font-medium mb-1.5 font-sans flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                You unlocked complimentary shipping!
              </p>
            )}
            <div className="w-full bg-stone-200 h-1 overflow-hidden">
              <div
                className="bg-stone-900 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg text-stone-900">Your bag is empty</h4>
                  <p className="text-xs text-stone-500 max-w-xs">
                    Explore our curated seasonal collections and elevate your wardrobe.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="mt-2 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.itemKey}
                  className="flex gap-4 pb-5 border-b border-stone-100 last:border-b-0"
                >
                  <div className="w-20 h-24 shrink-0 overflow-hidden bg-stone-100">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      aspectRatio="aspect-[3/4]"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={() => setIsCartDrawerOpen(false)}
                          className="font-medium text-xs text-stone-900 hover:text-stone-600 truncate transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.itemKey)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-stone-500">
                        <span>Size: <strong className="text-stone-800">{item.size}</strong></span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2 h-2 rounded-full inline-block border border-stone-300"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          {item.color}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-stone-200">
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity - 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono text-xs text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, item.quantity + 1)}
                          className="p-1 hover:bg-stone-100 text-stone-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-mono text-xs font-semibold text-stone-900 tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Action Buttons */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-stone-50 border-t border-stone-200 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-600">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-sm text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span className="font-mono font-semibold tabular-nums text-base">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={handleViewBagClick}
                  className="w-full py-3 text-xs uppercase tracking-wider font-semibold border border-stone-300 hover:bg-stone-100 text-stone-800 transition-colors text-center"
                >
                  View Bag
                </button>
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3 text-xs uppercase tracking-wider font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  Checkout <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[10px] text-center text-stone-400">
                Taxes and duties calculated during final checkout step
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
