import React, { useState } from 'react';
import { Truck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { checkPincodeDelivery } from '../../data/deliveryPincodes';

export const PincodeChecker = () => {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState(null);

  const handleCheck = (e) => {
    e.preventDefault();
    if (!pincode) return;
    const res = checkPincodeDelivery(pincode);
    setResult(res);
  };

  return (
    <div className="border border-stone-200 bg-stone-50/60 p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900">
        <Truck className="w-4 h-4 text-stone-700" />
        <span>Check Delivery & COD Availability</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '');
            setPincode(val);
            if (result) setResult(null);
          }}
          placeholder="Enter 6-digit Indian PIN Code (e.g. 110001)"
          className="flex-1 bg-white border border-stone-300 text-xs px-3 py-2 text-stone-900 placeholder:text-stone-400 font-mono tracking-wider focus:outline-none focus:border-stone-800"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1 shrink-0"
        >
          Check <ArrowRight className="w-3 h-3" />
        </button>
      </form>

      {result && (
        <div className="pt-2 text-xs border-t border-stone-200">
          {result.serviceable ? (
            <div className="space-y-1.5 text-stone-700">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Serviceable Area: {result.city}, {result.state}</span>
              </div>
              <div className="text-stone-600 pl-5.5 space-y-0.5">
                <p>• Estimated Delivery: <strong className="text-stone-900">{result.days}</strong></p>
                <p>• Cash on Delivery: <strong className="text-stone-900">{result.cod ? 'Available' : 'Prepaid Only'}</strong></p>
                {result.express && (
                  <p className="text-amber-800">• Same-day / Next-day Express eligible</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-rose-600">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{result.message}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PincodeChecker;
