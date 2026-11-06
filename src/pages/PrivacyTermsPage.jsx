import React from 'react';
import Breadcrumb from '../components/common/Breadcrumb';

export const PrivacyTermsPage = ({ mode = 'privacy' }) => {
  const isPrivacy = mode === 'privacy';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumb items={[{ label: isPrivacy ? 'Privacy Policy' : 'Terms & Conditions' }]} />

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          Legal & Governance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900">
          {isPrivacy ? 'Atelier Privacy Policy' : 'Terms of Client Service'}
        </h1>
        <p className="text-xs text-stone-500 font-mono">
          Last revised: January 2026 · Atelier Étoile S.A.
        </p>
      </div>

      <div className="border border-stone-200 bg-white p-6 sm:p-8 space-y-6 text-xs text-stone-600 leading-relaxed font-sans">
        {isPrivacy ? (
          <>
            <section className="space-y-2">
              <h3 className="font-serif text-base text-stone-900">1. Data Collection & Client Discretion</h3>
              <p>
                Atelier Étoile respects the sanctity of patron privacy. We collect client contact coordinates solely to execute order fulfillment, white-glove dispatch, and private salon styling consultations. We never sell or license client information to third-party commercial marketing brokerages.
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-serif text-base text-stone-900">2. Transactional Security</h3>
              <p>
                All payment transmissions are processed through PCI-DSS Level 1 compliant financial gateways with end-to-end 256-bit encryption. No payment card credentials or CVV codes are retained on local servers.
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-serif text-base text-stone-900">3. Local Storage Usage</h3>
              <p>
                This application utilizes client-side local browser storage strictly for retaining your active shopping bag, saved wishlist items, and personal tailoring sizing preferences between visits.
              </p>
            </section>
          </>
        ) : (
          <>
            <section className="space-y-2">
              <h3 className="font-serif text-base text-stone-900">1. Acceptance of Terms</h3>
              <p>
                By accessing this digital atelier, purchasing garments, or utilizing our concierge services, patrons agree to be bound by the terms outlined herein.
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-serif text-base text-stone-900">2. Authenticity & Intellectual Property</h3>
              <p>
                All textile patterns, tailoring silhouettes, brand wordmarks, and editorial photography are the exclusive intellectual property of Atelier Étoile S.A. Reproduction without prior written authorization is strictly prohibited.
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-serif text-base text-stone-900">3. Garment Availability & Sizing</h3>
              <p>
                Due to the limited handloom runs of select silk and cashmere pieces, availability is subject to real-time inventory reconciliation. In the event of an inventory discrepancy, orders will be refunded immediately.
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default PrivacyTermsPage;
