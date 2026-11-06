import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  Building,
  Gift,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { isValidEmail, isValidPhone, isValidIndianPincode } from '../utils/validation';
import { formatPrice } from '../utils/currency';
import Breadcrumb from '../components/common/Breadcrumb';

export const CheckoutPage = () => {
  const {
    cartItems,
    subtotal,
    shippingFee,
    discountAmount,
    grandTotal,
    appliedCouponCode,
    clearCart
  } = useCart();
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    country: 'India',
    isGift: false,
    giftMessage: '',
    orderNotes: '',
    paymentMethod: 'upi',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty, redirect
  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl text-stone-900">Your bag is empty</h2>
        <p className="text-xs text-stone-500">
          Please add garments to your bag before proceeding to checkout.
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full legal name is required.';
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
      errs.email = 'A valid email address is required for dispatch updates.';
    }
    if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
      errs.phone = 'Valid 10-digit Indian phone number required.';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!formData.pincode.trim() || !isValidIndianPincode(formData.pincode)) {
      errs.pincode = 'Valid 6-digit Indian PIN code required (e.g. 110001).';
    }

    if (formData.paymentMethod === 'upi' && formData.upiId && !formData.upiId.includes('@')) {
      errs.upiId = 'Please enter a valid VPA / UPI ID (e.g. user@okhdfcbank).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        },
        items: cartItems,
        pricing: {
          subtotal,
          shippingFee,
          discountAmount,
          grandTotal,
          appliedCouponCode,
        },
        payment: {
          method: formData.paymentMethod,
          status: formData.paymentMethod === 'cod' ? 'Pending on Delivery' : 'Paid (Simulated)',
        },
        gift: {
          isGift: formData.isGift,
          message: formData.giftMessage,
        },
        notes: formData.orderNotes,
      };

      const createdOrder = await orderService.createOrder(orderPayload);
      clearCart();
      navigate(`/order-success/${createdOrder.orderId}`, { state: { order: createdOrder } });
    } catch (err) {
      console.error('Order simulation error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumb
        items={[
          { label: 'Shopping Bag', href: '/cart' },
          { label: 'Checkout' }
        ]}
      />

      <div className="pb-4 border-b border-stone-200">
        <h1 className="font-serif text-3xl text-stone-900">
          Atelier Checkout & Dispatch
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Complete your delivery coordinates and select simulated payment options.
        </p>
      </div>

      {/* Simulated Notice */}
      <div className="p-3.5 bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>
          <strong>Demonstration Storefront:</strong> This checkout executes a realistic simulated client flow. No actual charges will be deducted from your cards or bank accounts.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Shipping Coordinates & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Customer Information */}
          <div className="border border-stone-200 bg-white p-6 space-y-4">
            <h3 className="font-serif text-lg text-stone-900 pb-2 border-b border-stone-100">
              1. Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Vikramaditya Sharma"
                  className={`w-full p-2.5 border text-stone-900 focus:outline-none ${
                    errors.fullName ? 'border-rose-500 bg-rose-50' : 'border-stone-300 focus:border-stone-900'
                  }`}
                />
                {errors.fullName && <p className="text-rose-600 text-[11px]">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="patron@domain.com"
                  className={`w-full p-2.5 border text-stone-900 focus:outline-none ${
                    errors.email ? 'border-rose-500 bg-rose-50' : 'border-stone-300 focus:border-stone-900'
                  }`}
                />
                {errors.email && <p className="text-rose-600 text-[11px]">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit Mobile (e.g. 9876543210)"
                  className={`w-full p-2.5 border text-stone-900 font-mono focus:outline-none ${
                    errors.phone ? 'border-rose-500 bg-rose-50' : 'border-stone-300 focus:border-stone-900'
                  }`}
                />
                {errors.phone && <p className="text-rose-600 text-[11px]">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* 2. Delivery Address */}
          <div className="border border-stone-200 bg-white p-6 space-y-4">
            <h3 className="font-serif text-lg text-stone-900 pb-2 border-b border-stone-100">
              2. Delivery Destination
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, building name, street"
                  className={`w-full p-2.5 border text-stone-900 focus:outline-none ${
                    errors.address ? 'border-rose-500 bg-rose-50' : 'border-stone-300 focus:border-stone-900'
                  }`}
                />
                {errors.address && <p className="text-rose-600 text-[11px]">{errors.address}</p>}
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Apartment, Suite, Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="Apartment, suite, landmark, floor"
                  className="w-full p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai, New Delhi"
                  className={`w-full p-2.5 border text-stone-900 focus:outline-none ${
                    errors.city ? 'border-rose-500 bg-rose-50' : 'border-stone-300 focus:border-stone-900'
                  }`}
                />
                {errors.city && <p className="text-rose-600 text-[11px]">{errors.city}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  PIN Code *
                </label>
                <input
                  type="text"
                  name="pincode"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6-digit PIN (e.g. 400001)"
                  className={`w-full p-2.5 border text-stone-900 font-mono focus:outline-none ${
                    errors.pincode ? 'border-rose-500 bg-rose-50' : 'border-stone-300 focus:border-stone-900'
                  }`}
                />
                {errors.pincode && <p className="text-rose-600 text-[11px]">{errors.pincode}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  State / Region
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full p-2.5 border border-stone-300 text-stone-900 bg-white focus:outline-none focus:border-stone-900"
                >
                  {[
                    'Maharashtra',
                    'Delhi',
                    'Karnataka',
                    'Tamil Nadu',
                    'Telangana',
                    'West Bengal',
                    'Gujarat',
                    'Rajasthan',
                    'Uttar Pradesh',
                    'Kerala',
                    'Punjab',
                    'Haryana'
                  ].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  disabled
                  className="w-full p-2.5 border border-stone-200 bg-stone-100 text-stone-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Gift & Order Notes */}
          <div className="border border-stone-200 bg-white p-6 space-y-4 text-xs">
            <h3 className="font-serif text-lg text-stone-900 pb-2 border-b border-stone-100">
              3. Packaging & Inscription
            </h3>

            <label className="flex items-center gap-2.5 cursor-pointer text-stone-800 font-medium">
              <input
                type="checkbox"
                name="isGift"
                checked={formData.isGift}
                onChange={handleChange}
                className="w-4 h-4 accent-stone-900"
              />
              <span className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-700" />
                This order is a gift — Include complimentary bespoke ribbon wrapping & calligraphy card
              </span>
            </label>

            {formData.isGift && (
              <div className="pt-2 space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Gift Card Message
                </label>
                <textarea
                  name="giftMessage"
                  rows={2}
                  value={formData.giftMessage}
                  onChange={handleChange}
                  placeholder="Inscribe a message to the recipient (e.g. With warmest admiration...)"
                  className="w-full p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>
            )}

            <div className="pt-2 space-y-1">
              <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                Order Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleChange}
                placeholder="e.g. Leave with building concierge, ring bell twice"
                className="w-full p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
              />
            </div>
          </div>

          {/* 4. Payment Demonstration Options */}
          <div className="border border-stone-200 bg-white p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-serif text-lg text-stone-900">
                4. Payment Method
              </h3>
              <div className="flex items-center gap-1 text-[11px] text-stone-500">
                <Lock className="w-3.5 h-3.5 text-stone-400" /> 256-Bit SSL Encrypted
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {/* Option: UPI */}
              <label
                className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-colors ${
                  formData.paymentMethod === 'upi' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 accent-stone-900"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-700" /> UPI Instant (GPay / PhonePe / Paytm / BHIM)
                    </span>
                    <span className="text-[10px] uppercase font-mono text-emerald-700">Recommended</span>
                  </div>
                  <p className="text-stone-500">
                    Fastest zero-fee instant checkout via your favorite UPI app.
                  </p>
                  {formData.paymentMethod === 'upi' && (
                    <div className="pt-2">
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleChange}
                        placeholder="Enter UPI VPA (e.g. yourname@okhdfcbank)"
                        className="w-full p-2 border border-stone-300 font-mono text-stone-900 text-xs focus:outline-none focus:border-stone-900"
                      />
                      {errors.upiId && <p className="text-rose-600 text-[11px] mt-1">{errors.upiId}</p>}
                    </div>
                  )}
                </div>
              </label>

              {/* Option: Cards */}
              <label
                className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-colors ${
                  formData.paymentMethod === 'card' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 accent-stone-900"
                />
                <div className="flex-1 space-y-1">
                  <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-stone-700" /> Credit / Debit Card (Visa, Mastercard, Amex, RuPay)
                  </span>
                  <p className="text-stone-500">
                    International & domestic premium luxury cards supported.
                  </p>
                  {formData.paymentMethod === 'card' && (
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="Card Number (Demo: 4242 4242 ...)"
                        className="col-span-2 p-2 border border-stone-300 font-mono text-stone-900 text-xs focus:outline-none"
                      />
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="p-2 border border-stone-300 font-mono text-stone-900 text-xs focus:outline-none"
                      />
                      <input
                        type="password"
                        name="cardCvc"
                        maxLength={4}
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="CVV / CVC"
                        className="p-2 border border-stone-300 font-mono text-stone-900 text-xs focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </label>

              {/* Option: Net Banking */}
              <label
                className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-colors ${
                  formData.paymentMethod === 'netbanking' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={formData.paymentMethod === 'netbanking'}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 accent-stone-900"
                />
                <div className="flex-1 space-y-1">
                  <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-stone-700" /> Net Banking (HDFC, ICICI, SBI, Axis, Kotak)
                  </span>
                  <p className="text-stone-500">
                    Direct bank gateway authorization.
                  </p>
                </div>
              </label>

              {/* Option: COD */}
              <label
                className={`flex items-start gap-3 p-3.5 border cursor-pointer transition-colors ${
                  formData.paymentMethod === 'cod' ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                  className="w-4 h-4 mt-0.5 accent-stone-900"
                />
                <div className="flex-1 space-y-1">
                  <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Banknote className="w-4 h-4 text-stone-700" /> Cash on Delivery (COD)
                  </span>
                  <p className="text-stone-500">
                    Inspect the garment packaging upon courier arrival and pay cash or UPI.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Review & Confirmation Action (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-stone-200 bg-stone-50 p-6 space-y-5 sticky top-28">
            <h3 className="font-serif text-lg text-stone-900 pb-3 border-b border-stone-200">
              Order Review ({cartItems.length} items)
            </h3>

            {/* Itemized Mini List */}
            <div className="max-h-60 overflow-y-auto divide-y divide-stone-200 pr-1 space-y-2">
              {cartItems.map((item) => (
                <div key={item.itemKey} className="flex gap-3 pt-2 first:pt-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-16 object-cover bg-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h5 className="font-medium text-stone-900 truncate">{item.name}</h5>
                    <div className="text-stone-500 text-[11px] mt-0.5">
                      Size: {item.size} · Color: {item.color}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-stone-400">Qty: {item.quantity}</span>
                      <span className="font-mono font-medium text-stone-900 tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600 font-sans">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-stone-900 tabular-nums">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Savings ({appliedCouponCode})</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-stone-900 tabular-nums">
                  {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between pt-3 border-t border-stone-200 font-medium text-stone-900 text-sm">
                <span>Total Amount</span>
                <span className="font-mono font-semibold text-lg tabular-nums">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-400 text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 shadow-xl"
              >
                {isSubmitting ? (
                  <span>Dispatching Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-center text-stone-400 leading-relaxed">
              By confirming, you authorize dispatch processing according to Atelier Étoile's 14-day exchange privilege.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
