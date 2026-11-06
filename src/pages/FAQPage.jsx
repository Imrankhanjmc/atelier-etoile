import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';

export const FAQPage = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      category: 'Orders & Deliveries',
      q: 'What are the delivery timelines across India and internationally?',
      a: 'Orders shipped across metro hubs (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai) are typically delivered within 2-3 business days. Tier 2 and Tier 3 cities receive deliveries within 3-5 business days. Express next-day delivery is available for select pincodes.'
    },
    {
      category: 'Orders & Deliveries',
      q: 'Is Cash on Delivery (COD) supported?',
      a: 'Yes, Cash on Delivery is supported for serviceable Indian pin codes on orders up to ₹25,000. For security reasons and high-value bridal couture items exceeding ₹25,000, prepaid payment via UPI, Credit Card, or Net Banking is required.'
    },
    {
      category: 'Sizing & Tailoring',
      q: 'How do I choose the correct size for tailored suits and dresses?',
      a: 'Our garments are patterned according to standard European luxury tailoring proportions. We advise consulting our detailed Size & Measurement Guide before ordering. If you are between sizes, we recommend selecting the larger size for structured pieces so your local tailor can refine the silhouette, or consult our Concierge for personalized measurement advice.'
    },
    {
      category: 'Sizing & Tailoring',
      q: 'Are custom alterations or custom hem lengths available?',
      a: 'Select tailored trousers are delivered with generous blind hem allowances that allow up to 2 inches of length extension or shortening by your personal alterationist.'
    },
    {
      category: 'Returns & Exchanges',
      q: 'What is the Atelier Étoile return and exchange policy?',
      a: 'We offer an unhurried 14-day complimentary doorstep return and exchange privilege. Garments must be unworn, undamaged, and returned with all original tags, security ribbons, and branded garment bags intact.'
    },
    {
      category: 'Returns & Exchanges',
      q: 'How are refunds processed for returned pieces?',
      a: 'Upon inspection at our fulfillment facility, refunds are initiated within 48 hours to your original mode of payment (UPI or Card), or via direct bank transfer for Cash on Delivery orders.'
    },
    {
      category: 'Noble Fabrics & Care',
      q: 'How should I care for pure silk, cashmere, and handloom fabrics?',
      a: 'Delicate silks, raw tussar, and pure wool items should be professionally dry cleaned. Linen and combed cotton pieces may be washed on gentle cold cycles and ironed while slightly damp to preserve natural fiber softness.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Frequently Asked Questions' }]} />

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          Customer Advisory
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-sans">
          Clear answers regarding sizing, logistics, payment methods, and garment maintenance.
        </p>
      </div>

      <div className="border border-stone-200 divide-y divide-stone-200 bg-white">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="transition-colors">
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-stone-50"
              >
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-mono mb-1">
                    {faq.category}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                    {faq.q}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 shrink-0 transform transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 text-xs text-stone-600 leading-relaxed font-sans border-t border-stone-50 pt-2 animate-in fade-in duration-150">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-8 bg-stone-50 border border-stone-200 text-center space-y-3">
        <h4 className="font-serif text-lg text-stone-900">Have a Question Not Listed Here?</h4>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          Our client advisors are on call 7 days a week to assist with wardrobe consultations.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition-colors"
        >
          Contact Atelier Concierge <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default FAQPage;
