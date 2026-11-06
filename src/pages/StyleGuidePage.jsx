import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import SafeImage from '../components/common/SafeImage';

export const StyleGuidePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumb items={[{ label: 'Fashion Style Guide' }]} />

      <div className="max-w-3xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
          Curated Editorial Directives
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 leading-tight">
          The Atelier Principles of Effortless Dressing
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
          How to build a high-impact capsule wardrobe combining tailored suiting, relaxed European resortwear, and timeless festive heirlooms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/3] bg-stone-100 overflow-hidden shadow-sm">
          <SafeImage
            src="/src/assets/images/editorial_streetwear_couture_1793972420394.jpg"
            alt="Tailored Trousers and Overcoat Styling"
            aspectRatio="aspect-[4/3]"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4 text-xs text-stone-600 leading-relaxed font-sans">
          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
            Chapter 01 · Proportional Volume
          </span>
          <h2 className="font-serif text-2xl text-stone-900">
            Balancing Structured Shoulders with Fluid Lower Lines
          </h2>
          <p>
            When pairing an oversized tailored overcoat or boxy blazer, anchor the silhouette with clean pleat-front trousers that break softly over the shoe arch. This preserves authority without appearing stiff.
          </p>
          <p>
            Avoid competing bulky items. If the coat provides sculptural presence, keep inner layers whisper-light with Supima crewnecks or fine gauge merino turtlenecks.
          </p>
          <div>
            <Link
              to="/shop?category=trousers"
              className="text-stone-900 font-semibold underline uppercase tracking-wider inline-flex items-center gap-1"
            >
              Discover Tailored Trousers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pt-8 border-t border-stone-200">
        <div className="order-2 md:order-1 space-y-4 text-xs text-stone-600 leading-relaxed font-sans">
          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
            Chapter 02 · Tonal Harmony
          </span>
          <h2 className="font-serif text-2xl text-stone-900">
            Monochrome Neutrals: Sand, Chalk, and Slate
          </h2>
          <p>
            The easiest route to quiet luxury is dressing in close tonal registers. Pair an oat-milk linen shirt with sand-khaki resort trousers and natural calfskin slide mules.
          </p>
          <p>
            The interplay of divergent textures (slubbed linen, brushed cotton, and vegetable-tanned leather) creates subtle visual interest without requiring saturated neon colors or distracting logos.
          </p>
          <div>
            <Link
              to="/shop?collection=summer-collection"
              className="text-stone-900 font-semibold underline uppercase tracking-wider inline-flex items-center gap-1"
            >
              Shop the Summer Resort Curation <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2 aspect-[4/3] bg-stone-100 overflow-hidden shadow-sm">
          <SafeImage
            src="/src/assets/images/campaign_resort_summer_1793972421288.jpg"
            alt="Resort Monochrome Linen Styling"
            aspectRatio="aspect-[4/3]"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default StyleGuidePage;
