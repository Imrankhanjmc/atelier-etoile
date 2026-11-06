import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import Breadcrumb from '../components/common/Breadcrumb';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Styling & Sizing Inquiries',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all inquiry fields.', 'error');
      return;
    }
    setSubmitted(true);
    addToast('Your inquiry has been received by our private client concierge.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: 'Concierge & Contact' }]} />

      <div className="max-w-2xl space-y-2">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          Private Client Services
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900">
          Atelier Concierge Assistance
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
          Whether you need bespoke sizing consultation, fabric advice, or corporate gifting assistance, our client advisors are at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 border border-stone-200 bg-white p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-xl text-stone-900">Inquiry Received</h3>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Thank you, <strong className="text-stone-900">{formData.name}</strong>. An Atelier Client Advisor will respond within 4 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'Styling & Sizing Inquiries', message: '' });
                }}
                className="mt-4 px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Sharma"
                    className="w-full p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="patron@domain.com"
                    className="w-full p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Subject / Nature of Inquiry
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2.5 border border-stone-300 text-stone-900 bg-white focus:outline-none focus:border-stone-900"
                >
                  <option value="Styling & Sizing Inquiries">Styling & Sizing Consultation</option>
                  <option value="Order Tracking & Logistics">Order Tracking & Logistics</option>
                  <option value="Returns & Exchange Request">Returns & Exchange Request</option>
                  <option value="Bespoke & Bridal Inquiries">Bespoke Couture & Bridal</option>
                  <option value="Corporate & VIP Gifting">Corporate & VIP Gifting</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-stone-700 uppercase tracking-wider block">
                  Message *
                </label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your inquiry, sizing questions, or event timeline..."
                  className="w-full p-2.5 border border-stone-300 text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Dispatch Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Info Details */}
        <div className="lg:col-span-5 space-y-6 text-xs text-stone-600">
          <div className="border border-stone-200 bg-stone-50 p-6 space-y-4">
            <h3 className="font-serif text-lg text-stone-900 pb-2 border-b border-stone-200">
              Direct Contact Lines
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Telephone Concierge</span>
                  <p className="font-mono text-stone-700">+91 (022) 4893 2000 / +1 (800) 840-2026</p>
                  <p className="text-[11px] text-stone-400">Toll-free daily 9:00 AM – 8:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Client Correspondence</span>
                  <p className="font-mono text-stone-700">concierge@ateliertoile.com</p>
                  <p className="text-[11px] text-stone-400">Guaranteed response within 4 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Styling Salon Hours</span>
                  <p>Monday through Sunday, 10:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-900 block">Flagship Salon</span>
                  <p>Atelier Étoile, Level 3, Palladium Luxury Wing, Senapati Bapat Marg, Lower Parel, Mumbai 400013</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
