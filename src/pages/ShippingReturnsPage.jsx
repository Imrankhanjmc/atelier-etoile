import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';

export const ShippingReturnsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: 'Shipping & Returns Policy' }]} />

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          Client Privilege
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900">
          Shipping, Exchanges & White-Glove Logistics
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
          Atelier Étoile ensures your pieces arrive in pristine condition, wrapped in branded archival tissue and dust bags.
        </p>
      </div>

      {/* Shipping Grid */}
      <div className="space-y-6">
        <div className="border border-stone-200 bg-white p-6 space-y-4">
          <h2 className="font-serif text-xl text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
            <Truck className="w-5 h-5 text-stone-800" />
            1. Domestic & International Delivery
          </h2>
          <div className="space-y-3 text-xs text-stone-600 leading-relaxed font-sans">
            <p>
              • <strong>Complimentary Shipping:</strong> All domestic orders exceeding ₹2,499 qualify for complimentary white-glove courier shipping. Orders below this threshold carry a standard flat dispatch fee of ₹199.
            </p>
            <p>
              • <strong>Metro Dispatch (1-2 Days):</strong> Orders to Mumbai, Delhi NCR, and Bengaluru confirmed before 1:00 PM are dispatched same-day via express air logistics.
            </p>
            <p>
              • <strong>National Dispatch (2-4 Days):</strong> Service to remaining Indian states arrives via insured tier-1 courier partners with live SMS and tracking link updates.
            </p>
            <p>
              • <strong>Cash on Delivery:</strong> Available across all serviceable pincodes for orders up to ₹25,000.
            </p>
          </div>
        </div>

        {/* Returns & Exchanges */}
        <div className="border border-stone-200 bg-white p-6 space-y-4">
          <h2 className="font-serif text-xl text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-stone-800" />
            2. The 14-Day Complimentary Return Privilege
          </h2>
          <div className="space-y-3 text-xs text-stone-600 leading-relaxed font-sans">
            <p>
              We believe ordering fine clothing online should feel as relaxed as stepping into our salon. If a garment does not flatter your silhouette or match your expectations:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-stone-700">
              <li>You may request a complimentary doorstep exchange or return within 14 days of package receipt.</li>
              <li>Garments must remain unwashed, unworn, and unaltered with security ribbons and fabric seals attached.</li>
              <li>Our private courier will collect the package directly from your home or office address at your designated time slot.</li>
            </ul>
          </div>
        </div>

        {/* Refunds */}
        <div className="border border-stone-200 bg-white p-6 space-y-4">
          <h2 className="font-serif text-xl text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-stone-800" />
            3. Refund Disbursement
          </h2>
          <div className="space-y-3 text-xs text-stone-600 leading-relaxed font-sans">
            <p>
              Once your returned garment is received and cleared by our quality atelier staff, your refund is disbursed immediately:
            </p>
            <p>
              • <strong>Prepaid Orders (UPI / Card / Net Banking):</strong> Credited directly to your original payment source within 24 to 48 banking hours.
            </p>
            <p>
              • <strong>Cash on Delivery Orders:</strong> Transferred directly to your designated bank account or UPI handle via automated payment link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturnsPage;
