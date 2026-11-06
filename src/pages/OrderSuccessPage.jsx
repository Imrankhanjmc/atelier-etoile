import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatPrice } from '../utils/currency';

export const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    // Trigger festive luxury celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#18181B', '#78716C', '#C19A6B']
      });
    } catch (e) {
      // Ignore if canvas isn't supported
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Success Hero Confirmation */}
      <div className="text-center space-y-4 py-8 border-b border-stone-200">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
        </div>
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-mono font-semibold">
            Order Confirmed & Preparing for Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900">
            Thank you for shopping with Atelier Étoile
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto font-sans pt-1">
            Order Reference: <strong className="font-mono text-stone-900 font-semibold">{orderId}</strong>
          </p>
        </div>

        <div className="p-3 bg-stone-50 border border-stone-200 max-w-lg mx-auto text-xs text-stone-600 flex items-center justify-center gap-2">
          <Mail className="w-4 h-4 text-stone-500" />
          <span>A dispatch confirmation & tracking dossier has been generated for your records.</span>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      {order && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Purchased Items */}
          <div className="border border-stone-200 bg-white p-6 space-y-4">
            <h3 className="font-serif text-lg text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
              <Package className="w-4 h-4 text-stone-700" />
              Purchased Garments ({order.items?.length || 0})
            </h3>

            <div className="divide-y divide-stone-100 space-y-3">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex gap-4 pt-3 first:pt-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 object-cover bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs space-y-1">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-mono">
                      {item.brand}
                    </span>
                    <h4 className="font-medium text-stone-900 truncate font-serif text-sm">
                      {item.name}
                    </h4>
                    <p className="text-stone-500 text-[11px]">
                      Size: <strong className="text-stone-800">{item.size}</strong> · Color: <strong className="text-stone-800">{item.color}</strong> · Qty: {item.quantity}
                    </p>
                    <span className="font-mono font-semibold text-stone-900 block tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Financials */}
          <div className="space-y-6">
            {/* Delivery Details */}
            <div className="border border-stone-200 bg-white p-6 space-y-3 text-xs">
              <h3 className="font-serif text-base text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                <Truck className="w-4 h-4 text-stone-700" />
                Shipping Coordinates
              </h3>
              <div className="text-stone-700 space-y-1">
                <p className="font-semibold text-stone-900">{order.customer?.fullName}</p>
                <p>{order.customer?.address} {order.customer?.apartment ? `, ${order.customer?.apartment}` : ''}</p>
                <p>{order.customer?.city}, {order.customer?.state} - {order.customer?.pincode}</p>
                <p className="font-mono text-stone-500">{order.customer?.phone} · {order.customer?.email}</p>
              </div>
              <div className="pt-2 text-[11px] text-stone-500">
                Payment: <strong className="uppercase text-stone-900">{order.payment?.method}</strong> ({order.payment?.status})
              </div>
              {order.gift?.isGift && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 text-stone-800 text-[11px] mt-2">
                  <strong>Gift Service:</strong> &ldquo;{order.gift?.message || 'Bespoke ribbons & note included'}&rdquo;
                </div>
              )}
            </div>

            {/* Financial Summary */}
            <div className="border border-stone-200 bg-stone-50 p-6 space-y-3 text-xs text-stone-600 font-sans">
              <h3 className="font-serif text-base text-stone-900 pb-2 border-b border-stone-200">
                Financial Summary
              </h3>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-stone-900 tabular-nums">{formatPrice(order.pricing?.subtotal)}</span>
              </div>
              {order.pricing?.discountAmount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Coupon Savings</span>
                  <span className="font-mono tabular-nums">-{formatPrice(order.pricing?.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-stone-900 tabular-nums">
                  {order.pricing?.shippingFee === 0 ? 'Complimentary' : formatPrice(order.pricing?.shippingFee)}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 font-medium text-stone-900 text-sm">
                <span>Total Paid</span>
                <span className="font-mono font-semibold text-base tabular-nums">
                  {formatPrice(order.pricing?.grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="pt-6 text-center">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors shadow-md"
        >
          Continue Exploring Collections <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
