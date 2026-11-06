import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, RefreshCw, Truck, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
      addToast('Thank you for subscribing to Atelier Étoile Gazettes.', 'success');
      setEmail('');
    } else {
      addToast('Please enter a valid email address.', 'error');
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 font-sans border-t border-stone-800">
      {/* Brand Trust Bar */}
      <div className="border-b border-stone-800/80 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-start gap-3.5">
            <Truck className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Complimentary Shipping
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                On all orders over ₹2,499 with express delivery options.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <RefreshCw className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                14-Day Returns & Exchanges
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                Complimentary doorstep pickup with zero friction.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Certified Craftsmanship
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                Authentic noble fabrics from European & Indian looms.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Clock className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Concierge Assistance
              </h4>
              <p className="text-xs text-stone-400 mt-1">
                Styling advice and sizing assistance available 7 days a week.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <span className="font-serif text-2xl tracking-tight text-white block">
              ATELIER ÉTOILE
            </span>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An international fashion house founded on timeless tailoring, tactile luxury materials, and contemporary architectural drape. Crafted for discerning tastemakers.
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-white block mb-2">
                Join the Atelier Gazette
              </span>
              <p className="text-xs text-stone-400 mb-3">
                Receive private invitations to seasonal launches, archive sales, and editorial styling stories.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 py-2">
                  <Check className="w-4 h-4" />
                  <span>You are subscribed to the Atelier Gazette.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="bg-stone-900 border border-stone-800 text-xs px-4 py-3 text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-stone-500 flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-stone-100 text-stone-950 px-5 text-xs font-semibold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/shop?gender=men" className="hover:text-white transition-colors">
                  Men's Sartorial & Casual
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=women" className="hover:text-white transition-colors">
                  Women's Runway & Dresses
                </Link>
              </li>
              <li>
                <Link to="/shop?category=kids" className="hover:text-white transition-colors">
                  Little Atelier (Kids)
                </Link>
              </li>
              <li>
                <Link to="/shop?category=footwear" className="hover:text-white transition-colors">
                  Handcrafted Footwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="hover:text-white transition-colors">
                  Leather Goods & Accessories
                </Link>
              </li>
              <li>
                <Link to="/shop?collection=festive-collection" className="hover:text-white transition-colors">
                  Festive Heritage Couture
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/size-guide" className="hover:text-white transition-colors">
                  Size & Fit Guide
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-white transition-colors">
                  Shipping & Expedited Delivery
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* The Maison */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Atelier Étoile
                </Link>
              </li>
              <li>
                <Link to="/style-guide" className="hover:text-white transition-colors">
                  Editorial Style Guide
                </Link>
              </li>
              <li>
                <Link to="/fabric-guide" className="hover:text-white transition-colors">
                  Fabric & Sustainability Guide
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-strip */}
        <div className="mt-14 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} ATELIER ÉTOILE S.A. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Currency: INR (₹)</span>
            <span>·</span>
            <span>Atelier Paris · Mumbai · Milan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
