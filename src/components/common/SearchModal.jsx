import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { productService } from '../../services/productService';
import SafeImage from './SafeImage';
import PriceDisplay from './PriceDisplay';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSuggestions([]);
    }
  }, [isOpen]);

  useEffect(() => {
    let active = true;
    if (query.trim().length >= 2) {
      setIsLoading(true);
      productService.getSearchSuggestions(query).then((results) => {
        if (active) {
          setSuggestions(results);
          setIsLoading(false);
        }
      });
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
    return () => {
      active = false;
    };
  }, [query]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectProduct = (slug) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleCategoryClick = (category) => {
    onClose();
    navigate(`/shop?category=${category}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white shadow-2xl border border-stone-200 overflow-hidden">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center px-4 py-3.5 border-b border-stone-200">
          <Search className="w-5 h-5 text-stone-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tailored blazers, silk sarees, linen shirts, sneakers..."
            className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700 mr-2"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-stone-500 hover:text-stone-900 uppercase tracking-wider font-medium border border-stone-200"
          >
            ESC
          </button>
        </form>

        {/* Results / Quick Categories */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {isLoading && (
            <div className="py-6 text-center text-xs text-stone-400 uppercase tracking-widest">
              Searching Atelier Archives...
            </div>
          )}

          {!isLoading && suggestions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-stone-400 pb-1 border-b border-stone-100">
                <span>Matching Garments ({suggestions.length})</span>
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-stone-900 hover:underline flex items-center gap-1 font-sans capitalize"
                >
                  View all results <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div className="divide-y divide-stone-100">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="flex items-center gap-3 py-2.5 px-2 hover:bg-stone-50 cursor-pointer transition-colors group"
                  >
                    <div className="w-12 h-14 shrink-0 overflow-hidden">
                      <SafeImage
                        src={product.images[0]}
                        alt={product.name}
                        aspectRatio="aspect-[3/4]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                        {product.brand} · {product.category}
                      </span>
                      <h4 className="text-xs font-medium text-stone-900 truncate group-hover:text-amber-800 transition-colors">
                        {product.name}
                      </h4>
                      <PriceDisplay
                        price={product.price}
                        originalPrice={product.originalPrice}
                        discount={product.discount}
                        size="text-xs"
                      />
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-900 shrink-0 transform group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && query.trim().length >= 2 && suggestions.length === 0 && (
            <div className="py-8 text-center space-y-2">
              <p className="text-sm text-stone-700 font-serif">
                No matching garments found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-stone-400">
                Try searching by clothing type (e.g. linen, dress, kurta, sneaker) or explore popular categories below.
              </p>
            </div>
          )}

          {/* Quick Category Discovery */}
          {(!query || suggestions.length === 0) && (
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block">
                Popular Categories
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Men's T-Shirts", cat: 'men' },
                  { label: "Women's Dresses", cat: 'women' },
                  { label: 'Italian Footwear', cat: 'footwear' },
                  { label: 'Ethnic Couture', cat: 'women' },
                  { label: 'Office Tailoring', cat: 'men' },
                  { label: 'Handcrafted Accessories', cat: 'accessories' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCategoryClick(item.cat)}
                    className="px-3 py-1.5 text-xs bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 transition-colors tracking-wide"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Shortcut */}
        <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-400">
          <span>Press Enter to search entire catalogue</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="w-3 h-3" /> Select
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
