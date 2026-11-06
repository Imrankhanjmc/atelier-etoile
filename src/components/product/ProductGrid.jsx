import React from 'react';
import ProductCard from './ProductCard';

export const ProductGrid = ({
  products = [],
  isLoading = false,
  onQuickView,
  columns = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
}) => {
  if (isLoading) {
    return (
      <div className={`grid ${columns} gap-x-6 gap-y-10`}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div key={n} className="space-y-3 animate-pulse">
            <div className="bg-stone-200 aspect-[3/4] w-full" />
            <div className="h-3 bg-stone-200 w-1/3" />
            <div className="h-4 bg-stone-200 w-3/4" />
            <div className="h-3 bg-stone-200 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-20 text-center space-y-4">
        <h3 className="font-serif text-xl text-stone-900">No garments matched your criteria</h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Try loosening your filter selections or browse our complete archival catalog.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${columns} gap-x-5 sm:gap-x-6 gap-y-10 sm:gap-y-12`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
