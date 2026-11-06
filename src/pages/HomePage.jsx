import React, { useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, Sparkles, ChevronRight, Check } from 'lucide-react';
import { products, getFeaturedProducts, getNewArrivals, getBestSellers } from '../data/products';
import { categories } from '../data/categories';
import { collections, occasions } from '../data/collections';
import ProductCard from '../components/product/ProductCard';
import SafeImage from '../components/common/SafeImage';
import PriceDisplay from '../components/common/PriceDisplay';

export const HomePage = () => {
  const { openQuickView } = useOutletContext();

  const newArrivals = useMemo(() => getNewArrivals().slice(0, 4), []);
  const bestSellers = useMemo(() => getBestSellers().slice(0, 4), []);
  const featuredPieces = useMemo(() => getFeaturedProducts().slice(0, 4), []);

  // Complete the Look curation
  const lookbookPieces = useMemo(() => {
    return [
      products.find(p => p.id === 'women-06'), // Tailored wide-leg trousers
      products.find(p => p.id === 'women-12'), // Belted trench coat
      products.find(p => p.id === 'foot-01'), // Minimalist sneakers
      products.find(p => p.id === 'acc-01') // Structured leather tote
    ].filter(Boolean);
  }, []);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. Hero Campaign Banner (Split & Full Impact) */}
      <section className="relative overflow-hidden bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="text-xs uppercase tracking-widest text-stone-400 font-mono">
                Collection Hiver 2026 · Limited Series
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-balance">
                Architectural Elegance & Noble Fibres.
              </h1>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-lg font-sans">
                Experience bespoke silhouettes sculpted from pure Mongolian cashmere, Giza double-twisted cotton, and handmade Italian leather.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/shop?gender=women"
                  className="px-6 py-3.5 bg-stone-100 text-stone-950 text-xs font-semibold uppercase tracking-widest hover:bg-white transition-all shadow-md inline-flex items-center gap-2"
                >
                  Shop Women <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/shop?gender=men"
                  className="px-6 py-3.5 bg-transparent border border-stone-600 text-white text-xs font-semibold uppercase tracking-widest hover:border-white hover:bg-white/10 transition-all inline-flex items-center gap-2"
                >
                  Shop Men <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Campaign Photography */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-2xl">
                <SafeImage
                  src="/src/assets/images/hero_fashion_campaign_1793972420115.jpg"
                  alt="Atelier Campaign Hero Autumn Winter"
                  aspectRatio="aspect-[16/9]"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop by Department / Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-mono block">
              Curated Departments
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-wider font-semibold text-stone-800 hover:text-stone-600 flex items-center gap-1 group"
          >
            Explore Full Archive <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.slug}`}
              className="group flex flex-col space-y-3"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  aspectRatio="aspect-[3/4]"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors" />
                <div className="absolute inset-x-3 bottom-3 p-2 bg-white/95 backdrop-blur-xs text-center">
                  <span className="font-serif text-sm tracking-wide text-stone-900 block truncate">
                    {cat.name}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. New Arrivals Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-mono block">
              Just Unveiled
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-1">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop?collection=new-arrivals"
            className="text-xs uppercase tracking-wider font-semibold text-stone-800 hover:text-stone-600 flex items-center gap-1 group"
          >
            View All New Pieces <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>
      </section>

      {/* 4. Trending Collections Spotlight */}
      <section className="bg-stone-100/70 py-16 lg:py-20 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
              Seasonal Themes & Curations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900">
              Trending Collections
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-sans">
              Designed around deliberate lifestyles, from coastal resort linen to ceremonial festive heirlooms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {collections.slice(1, 4).map((col) => (
              <Link
                key={col.id}
                to={`/shop?collection=${col.slug}`}
                className="group relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-stone-200">
                  <SafeImage
                    src={col.image}
                    alt={col.name}
                    aspectRatio="aspect-[4/3]"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h3 className="font-serif text-xl text-stone-900 group-hover:text-stone-700 transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {col.tagline}
                    </p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-900 inline-flex items-center gap-1 pt-2">
                    Explore Collection <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-mono block">
              Iconic Pieces
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-1">
              Best Sellers
            </h2>
          </div>
          <Link
            to="/shop?sortBy=popularity"
            className="text-xs uppercase tracking-wider font-semibold text-stone-800 hover:text-stone-600 flex items-center gap-1 group"
          >
            Explore All Best Sellers <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={openQuickView}
            />
          ))}
        </div>
      </section>

      {/* 6. Shop by Occasion */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
            Wardrobe Curation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">
            Shop by Occasion
          </h2>
          <p className="text-xs text-stone-500">
            Select the setting, and let our ateliers dress your moment.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {occasions.map((occ) => (
            <Link
              key={occ.slug}
              to={`/shop?occasion=${occ.slug}`}
              className="p-5 text-center bg-stone-50 border border-stone-200 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all group"
            >
              <span className="font-serif text-base block font-medium group-hover:text-white transition-colors">
                {occ.name}
              </span>
              <span className="text-[10px] tracking-widest uppercase text-stone-400 group-hover:text-stone-300 mt-1 block">
                Discover
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Large Editorial Campaign Banner */}
      <section className="relative overflow-hidden bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="relative aspect-[16/9] overflow-hidden shadow-2xl">
                <SafeImage
                  src="/src/assets/images/campaign_resort_summer_1793972421288.jpg"
                  alt="Mediterranean Resort Editorial Collection"
                  aspectRatio="aspect-[16/9]"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6 text-left">
              <span className="text-xs uppercase tracking-widest text-stone-400 font-mono block">
                Editorial Showcase · Resort Series
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                Mediterranean Light & Fluid Silks.
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-sans">
                Linen relaxed shirts, wide-leg resort trousers, and bias-cut gowns tailored for unhurried evenings under warm coastal breezes.
              </p>
              <div>
                <Link
                  to="/shop?collection=summer-collection"
                  className="px-6 py-3.5 bg-white text-stone-900 text-xs font-semibold uppercase tracking-widest hover:bg-stone-200 transition-colors inline-flex items-center gap-2"
                >
                  Explore Resort Collection <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Style Inspiration / Complete the Look */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b border-stone-200 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-mono block">
              Editorial Styling
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 mt-1">
              Shop the Complete Look: The Milanese Uniform
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-sans">
            Curated 4-piece ensemble by Chief Stylist
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Lookbook Photography */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden shadow-lg bg-stone-100">
              <SafeImage
                src="/src/assets/images/editorial_streetwear_couture_1793972420394.jpg"
                alt="Milanese Streetwear Look"
                aspectRatio="aspect-[3/4]"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Individual Outfit Items */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            {lookbookPieces.map((piece) => (
              <ProductCard
                key={piece.id}
                product={piece}
                onQuickView={openQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials & Patron Proof */}
      <section className="bg-stone-50 py-16 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">
              Patron Testimonials
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900">
              Voices of our Discerning Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The cashmere double-breasted overcoat has an architectural presence I usually only find at Savile Row. The drape and weight are uncompromising.",
                author: "Julian V.",
                role: "Creative Director, Milan",
                product: "Cashmere Double-Breasted Overcoat"
              },
              {
                quote: "The Varanasi Organza Saree is a genuine work of heritage art. The kadwa gold work sparkles with quiet dignity rather than loud ostentation.",
                author: "Ananya S.",
                role: "Architect, New Delhi",
                product: "Varanasi Handwoven Organza Saree"
              },
              {
                quote: "Finding true French box-calf dress shoes with hand-shined mirror caps at this caliber has transformed my formal gala wardrobe entirely.",
                author: "Marc-Antoine D.",
                role: "Connoisseur, Paris",
                product: "Cap-Toe Oxford Formal Shoes"
              }
            ].map((t, idx) => (
              <div
                key={idx}
                className="p-6 bg-white border border-stone-200 flex flex-col justify-between space-y-4"
              >
                <p className="font-serif italic text-sm text-stone-700 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="pt-3 border-t border-stone-100 text-xs">
                  <span className="font-semibold text-stone-900 block font-sans">
                    {t.author}
                  </span>
                  <span className="text-stone-400 block">{t.role}</span>
                  <span className="text-amber-800 font-mono text-[11px] mt-1 block">
                    Verified Purchase: {t.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
