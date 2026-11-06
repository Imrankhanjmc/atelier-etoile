import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { categories } from '../../data/categories';
import { occasions } from '../../data/collections';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults = 0
}) => {
  const brands = [
    'Atelier Étoile Studio',
    'Atelier Sartorial',
    'Atelier Étoile Couture',
    'Atelier Denim',
    'Atelier Calzature',
    'Atelier Heritage',
    'Little Atelier'
  ];

  const standardSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'EU 40', 'EU 41', 'EU 42', 'EU 43'];

  const colorOptions = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#18181B' },
    { name: 'Sand', hex: '#D6C7B2' },
    { name: 'Navy', hex: '#1E293B' },
    { name: 'Olive', hex: '#556B2F' },
    { name: 'Camel', hex: '#C19A6B' },
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Sage', hex: '#848E7C' },
    { name: 'Burgundy', hex: '#4A1525' }
  ];

  const fabricOptions = ['Cotton', 'Silk', 'Linen', 'Wool', 'Denim', 'Cashmere', 'Leather'];

  const handleSizeToggle = (size) => {
    const current = filters.sizes || [];
    const updated = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size];
    onFilterChange('sizes', updated);
  };

  const handleColorToggle = (colorName) => {
    const current = filters.colors || [];
    const updated = current.includes(colorName)
      ? current.filter((c) => c !== colorName)
      : [...current, colorName];
    onFilterChange('colors', updated);
  };

  return (
    <div className="w-full space-y-7 text-xs font-sans">
      {/* Filter Header with Clear All */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <span className="font-semibold uppercase tracking-wider text-stone-900">
          Filters ({totalResults})
        </span>
        <button
          onClick={onClearFilters}
          className="text-stone-500 hover:text-stone-900 flex items-center gap-1 uppercase tracking-wider text-[11px] font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Clear All
        </button>
      </div>

      {/* Category / Department */}
      <div className="space-y-2.5">
        <h4 className="font-semibold uppercase tracking-wider text-stone-900">
          Department
        </h4>
        <div className="space-y-1.5">
          {[
            { id: 'all', label: 'All Garments' },
            { id: 'men', label: "Men's Apparel" },
            { id: 'women', label: "Women's Apparel" },
            { id: 'kids', label: "Kids' Collection" },
            { id: 'footwear', label: 'Footwear' },
            { id: 'accessories', label: 'Accessories' }
          ].map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900"
            >
              <input
                type="radio"
                name="category_filter"
                checked={(filters.category || 'all') === cat.id}
                onChange={() => onFilterChange('category', cat.id === 'all' ? '' : cat.id)}
                className="w-3.5 h-3.5 accent-stone-900 text-stone-900"
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Slider / Inputs */}
      <div className="space-y-2.5">
        <h4 className="font-semibold uppercase tracking-wider text-stone-900">
          Price Range
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min ₹"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            className="w-full p-2 border border-stone-300 text-xs text-stone-900 font-mono focus:outline-none focus:border-stone-800"
          />
          <span className="text-stone-400">–</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            className="w-full p-2 border border-stone-300 text-xs text-stone-900 font-mono focus:outline-none focus:border-stone-800"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            { label: 'Under ₹2,500', max: 2500 },
            { label: '₹2,500 - ₹5,000', min: 2500, max: 5000 },
            { label: 'Above ₹5,000', min: 5000 }
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => {
                onFilterChange('minPrice', preset.min || '');
                onFilterChange('maxPrice', preset.max || '');
              }}
              className="px-2 py-1 text-[11px] bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-2.5">
        <h4 className="font-semibold uppercase tracking-wider text-stone-900">
          Sizes
        </h4>
        <div className="grid grid-cols-4 gap-1.5">
          {standardSizes.map((size) => {
            const isSelected = (filters.sizes || []).includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`py-1.5 text-center text-xs border font-medium uppercase tracking-wider transition-colors ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-2.5">
        <h4 className="font-semibold uppercase tracking-wider text-stone-900">
          Palette
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {colorOptions.map((color) => {
            const isSelected = (filters.colors || []).includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => handleColorToggle(color.name)}
                className={`flex items-center gap-1.5 p-1.5 border text-left transition-colors ${
                  isSelected
                    ? 'border-stone-900 bg-stone-100 font-semibold'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[11px] text-stone-800 truncate">{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fabric / Noble Material */}
      <div className="space-y-2.5">
        <h4 className="font-semibold uppercase tracking-wider text-stone-900">
          Noble Fabric
        </h4>
        <div className="space-y-1.5">
          {fabricOptions.map((fabric) => (
            <label
              key={fabric}
              className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900"
            >
              <input
                type="radio"
                name="fabric_filter"
                checked={filters.fabric === fabric}
                onChange={() => onFilterChange('fabric', filters.fabric === fabric ? '' : fabric)}
                className="w-3.5 h-3.5 accent-stone-900"
              />
              <span>{fabric}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div className="space-y-2.5">
        <h4 className="font-semibold uppercase tracking-wider text-stone-900">
          Occasion
        </h4>
        <div className="space-y-1.5">
          {occasions.map((occ) => (
            <label
              key={occ.slug}
              className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900"
            >
              <input
                type="radio"
                name="occasion_filter"
                checked={filters.occasion === occ.slug}
                onChange={() => onFilterChange('occasion', filters.occasion === occ.slug ? '' : occ.slug)}
                className="w-3.5 h-3.5 accent-stone-900"
              />
              <span>{occ.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2.5">
        <h4 className="font-semibold uppercase tracking-wider text-stone-900">
          Atelier Sub-Labels
        </h4>
        <div className="space-y-1.5">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer text-stone-600 hover:text-stone-900"
            >
              <input
                type="radio"
                name="brand_filter"
                checked={filters.brand === brand}
                onChange={() => onFilterChange('brand', filters.brand === brand ? '' : brand)}
                className="w-3.5 h-3.5 accent-stone-900"
              />
              <span className="truncate">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In-Stock Only Toggle */}
      <div className="pt-2 border-t border-stone-200">
        <label className="flex items-center gap-2 cursor-pointer text-stone-800 font-medium">
          <input
            type="checkbox"
            checked={!!filters.inStockOnly}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
            className="w-4 h-4 accent-stone-900 text-stone-900 rounded-none"
          />
          <span>In-Stock Ready to Ship Only</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
