import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const SortDropdown = ({ value, onChange }) => {
  const options = [
    { value: 'popularity', label: 'Popularity & Editorial Demand' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'discount', label: 'Seasonal Discount' },
    { value: 'rating', label: 'Customer Rating' },
  ];

  return (
    <div className="flex items-center gap-2 text-xs text-stone-600">
      <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
      <span className="font-semibold uppercase tracking-wider text-stone-400 hidden sm:inline">
        Sort:
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border border-stone-200 text-stone-800 text-xs px-2.5 py-1.5 focus:outline-none focus:border-stone-800 transition-colors"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
