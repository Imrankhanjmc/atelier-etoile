import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Feather, Globe } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import SafeImage from '../components/common/SafeImage';

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumb items={[{ label: 'About the Maison' }]} />

      {/* Hero Narrative */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          The Heritage of Atelier Étoile
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 leading-tight">
          Crafting architectural clothing with uncompromising noble fibers.
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
          Founded on the intersection of Parisian silhouette discipline, Milanese sartorial heritage, and master Indian textile craftsmanship, Atelier Étoile designs for individuals who celebrate subtlety, texture, and permanent elegance.
        </p>
      </div>

      {/* Editorial Image Hero */}
      <div className="relative aspect-[16/9] overflow-hidden shadow-lg bg-stone-900">
        <SafeImage
          src="/src/assets/images/hero_fashion_campaign_1793972420115.jpg"
          alt="Atelier Étoile Paris Design Studio"
          aspectRatio="aspect-[16/9]"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        <div className="p-6 bg-stone-50 border border-stone-200 space-y-3">
          <Feather className="w-6 h-6 text-stone-800" />
          <h3 className="font-serif text-lg text-stone-900">1. Tactile Noble Materials</h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            We bypass synthetic blends in favor of 100% Giza Egyptian cotton, Mongolian cashmere, Normandy flax linen, and Katan organza silk. The texture of true luxury is unmistakable.
          </p>
        </div>

        <div className="p-6 bg-stone-50 border border-stone-200 space-y-3">
          <ShieldCheck className="w-6 h-6 text-stone-800" />
          <h3 className="font-serif text-lg text-stone-900">2. Architectural Precision</h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            Every garment begins with mathematical proportional drawings. Lapels are proportioned to chest balances, waists are sculpted with internal floating canvases, and hems are hand-blinded.
          </p>
        </div>

        <div className="p-6 bg-stone-50 border border-stone-200 space-y-3">
          <Globe className="w-6 h-6 text-stone-800" />
          <h3 className="font-serif text-lg text-stone-900">3. Conscious Longevity</h3>
          <p className="text-xs text-stone-600 leading-relaxed font-sans">
            We reject ephemeral fashion seasons. Every piece is constructed to be worn for decades, developing unique character and patina alongside its owner.
          </p>
        </div>
      </div>

      {/* Ateliers Worldwide */}
      <div className="border-t border-stone-200 pt-12 space-y-6">
        <div className="max-w-xl space-y-2">
          <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
            Global Locations
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">
            Design Studios & Master Workshops
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-600">
          <div className="p-5 border border-stone-200 bg-white space-y-1.5">
            <h4 className="font-serif text-base text-stone-900">Paris Atelier</h4>
            <p className="text-stone-400 font-mono">75001 Rue Saint-Honoré, Paris</p>
            <p className="text-stone-600 pt-1">Haute couture pattern-making, bias draping, and editorial styling headquarters.</p>
          </div>

          <div className="p-5 border border-stone-200 bg-white space-y-1.5">
            <h4 className="font-serif text-base text-stone-900">Milan Tailoring Studio</h4>
            <p className="text-stone-400 font-mono">Via Monte Napoleone, Milano</p>
            <p className="text-stone-600 pt-1">Bespoke menswear suiting, virgin wool sourcing, and artisanal leather shoemaking.</p>
          </div>

          <div className="p-5 border border-stone-200 bg-white space-y-1.5">
            <h4 className="font-serif text-base text-stone-900">Heritage Weaving Loom</h4>
            <p className="text-stone-400 font-mono">Varanasi & Chanderi, India</p>
            <p className="text-stone-600 pt-1">Master kadwa handloom weaving, raw silk spinning, and ceremonial zardozi craft.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-10 bg-stone-900 text-white text-center space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl">Experience the Collection</h3>
        <p className="text-xs text-stone-300 max-w-md mx-auto">
          Explore our seasonal archive or book a bespoke styling appointment with our private client team.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-stone-950 text-xs font-semibold uppercase tracking-widest hover:bg-stone-200 transition-colors"
          >
            Explore Catalogue <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
