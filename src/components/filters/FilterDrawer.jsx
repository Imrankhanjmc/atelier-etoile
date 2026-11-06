import React from 'react';
import { X } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

export const FilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  totalResults = 0
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <span className="font-serif text-lg tracking-tight text-stone-900">
              Refine Atelier Search
            </span>
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-stone-900"
              aria-label="Close filters drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            <FilterSidebar
              filters={filters}
              onFilterChange={onFilterChange}
              onClearFilters={onClearFilters}
              totalResults={totalResults}
            />
          </div>

          {/* Footer Action */}
          <div className="p-4 bg-stone-50 border-t border-stone-200">
            <button
              onClick={onClose}
              className="w-full py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-stone-800 transition-colors"
            >
              Show {totalResults} Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
