import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useOutletContext } from 'react-router-dom';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { productService } from '../services/productService';
import ProductGrid from '../components/product/ProductGrid';
import FilterSidebar from '../components/filters/FilterSidebar';
import FilterDrawer from '../components/filters/FilterDrawer';
import SortDropdown from '../components/filters/SortDropdown';
import Breadcrumb from '../components/common/Breadcrumb';

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openQuickView } = useOutletContext();

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract filter states from URL search params
  const categoryParam = searchParams.get('category') || '';
  const genderParam = searchParams.get('gender') || '';
  const subCategoryParam = searchParams.get('subCategory') || '';
  const collectionParam = searchParams.get('collection') || '';
  const searchQuery = searchParams.get('search') || '';
  const sortByParam = searchParams.get('sortBy') || 'popularity';
  const minPriceParam = searchParams.get('minPrice') || '';
  const maxPriceParam = searchParams.get('maxPrice') || '';
  const fabricParam = searchParams.get('fabric') || '';
  const occasionParam = searchParams.get('occasion') || '';
  const inStockParam = searchParams.get('inStock') === 'true';

  const sizesParam = useMemo(() => {
    const s = searchParams.get('sizes');
    return s ? s.split(',') : [];
  }, [searchParams]);

  const colorsParam = useMemo(() => {
    const c = searchParams.get('colors');
    return c ? c.split(',') : [];
  }, [searchParams]);

  // Combined filters object
  const currentFilters = useMemo(() => ({
    category: categoryParam,
    gender: genderParam,
    subCategory: subCategoryParam,
    collection: collectionParam,
    search: searchQuery,
    minPrice: minPriceParam,
    maxPrice: maxPriceParam,
    fabric: fabricParam,
    occasion: occasionParam,
    sizes: sizesParam,
    colors: colorsParam,
    inStockOnly: inStockParam,
  }), [
    categoryParam,
    genderParam,
    subCategoryParam,
    collectionParam,
    searchQuery,
    minPriceParam,
    maxPriceParam,
    fabricParam,
    occasionParam,
    sizesParam,
    colorsParam,
    inStockParam,
  ]);

  // Load products when filters or sort changes
  useEffect(() => {
    let active = true;
    setIsLoading(true);

    productService.getProducts({
      category: categoryParam,
      gender: genderParam,
      subCategory: subCategoryParam,
      collection: collectionParam,
      search: searchQuery,
      minPrice: minPriceParam,
      maxPrice: maxPriceParam,
      sizes: sizesParam,
      colors: colorsParam,
      fabric: fabricParam,
      occasion: occasionParam,
      inStockOnly: inStockParam,
      sortBy: sortByParam,
      page: 1,
      limit: 60
    }).then((res) => {
      if (active) {
        setProducts(res.products);
        setTotalCount(res.total);
        setIsLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, [
    categoryParam,
    genderParam,
    subCategoryParam,
    collectionParam,
    searchQuery,
    minPriceParam,
    maxPriceParam,
    sizesParam,
    colorsParam,
    fabricParam,
    occasionParam,
    inStockParam,
    sortByParam
  ]);

  // Handlers to update URL search parameters
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (key === 'sizes') {
      if (value && value.length > 0) {
        newParams.set('sizes', value.join(','));
      } else {
        newParams.delete('sizes');
      }
    } else if (key === 'colors') {
      if (value && value.length > 0) {
        newParams.set('colors', value.join(','));
      } else {
        newParams.delete('colors');
      }
    } else if (key === 'inStockOnly') {
      if (value) {
        newParams.set('inStock', 'true');
      } else {
        newParams.delete('inStock');
      }
    } else {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    }

    setSearchParams(newParams);
  };

  const handleClearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (sortByParam) newParams.set('sortBy', sortByParam);
    setSearchParams(newParams);
  };

  const handleSortChange = (newSort) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sortBy', newSort);
    setSearchParams(newParams);
  };

  // Active filter chip count & tags
  const activeFilterChips = useMemo(() => {
    const chips = [];
    if (searchQuery) chips.push({ key: 'search', label: `Search: "${searchQuery}"` });
    if (genderParam) chips.push({ key: 'gender', label: `Gender: ${genderParam}` });
    if (categoryParam) chips.push({ key: 'category', label: `Dept: ${categoryParam}` });
    if (subCategoryParam) chips.push({ key: 'subCategory', label: `Type: ${subCategoryParam}` });
    if (collectionParam) chips.push({ key: 'collection', label: `Collection: ${collectionParam}` });
    if (fabricParam) chips.push({ key: 'fabric', label: `Fabric: ${fabricParam}` });
    if (occasionParam) chips.push({ key: 'occasion', label: `Occasion: ${occasionParam}` });
    if (minPriceParam || maxPriceParam) {
      chips.push({
        key: 'price',
        label: `₹${minPriceParam || '0'} – ₹${maxPriceParam || 'Max'}`
      });
    }
    sizesParam.forEach((s) => chips.push({ key: 'size-single', value: s, label: `Size: ${s}` }));
    colorsParam.forEach((c) => chips.push({ key: 'color-single', value: c, label: `Color: ${c}` }));
    if (inStockParam) chips.push({ key: 'inStockOnly', label: 'In-Stock Only' });

    return chips;
  }, [
    searchQuery,
    genderParam,
    categoryParam,
    subCategoryParam,
    collectionParam,
    fabricParam,
    occasionParam,
    minPriceParam,
    maxPriceParam,
    sizesParam,
    colorsParam,
    inStockParam
  ]);

  const removeChip = (chip) => {
    if (chip.key === 'size-single') {
      const updated = sizesParam.filter((s) => s !== chip.value);
      updateFilter('sizes', updated);
    } else if (chip.key === 'color-single') {
      const updated = colorsParam.filter((c) => c !== chip.value);
      updateFilter('colors', updated);
    } else if (chip.key === 'price') {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('minPrice');
      newParams.delete('maxPrice');
      setSearchParams(newParams);
    } else {
      updateFilter(chip.key, '');
    }
  };

  // Page title computation
  const pageTitle = useMemo(() => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (collectionParam) {
      return collectionParam
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
    if (genderParam) {
      return `${genderParam.charAt(0).toUpperCase() + genderParam.slice(1)}'s Collection`;
    }
    if (categoryParam) {
      return categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
    }
    return 'Complete Atelier Catalogue';
  }, [searchQuery, collectionParam, genderParam, categoryParam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Shop', href: '/shop' },
          { label: pageTitle }
        ]}
      />

      {/* Header with Title and Sorting Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-stone-200 gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-mono">
            Showing <strong className="text-stone-900 font-semibold">{totalCount}</strong> pieces in catalog
          </p>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-stone-300 text-xs font-medium text-stone-800 hover:bg-stone-50"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters {activeFilterChips.length > 0 && `(${activeFilterChips.length})`}
          </button>

          {/* Sort Dropdown */}
          <SortDropdown value={sortByParam} onChange={handleSortChange} />
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-xs text-stone-400 font-mono">Active filters:</span>
          {activeFilterChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => removeChip(chip)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 transition-colors"
            >
              <span>{chip.label}</span>
              <X className="w-3 h-3 text-stone-500" />
            </button>
          ))}
          <button
            onClick={handleClearAllFilters}
            className="text-xs text-stone-500 hover:text-stone-900 underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Two-Column Layout (Sidebar + Product Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start pt-2">
        {/* Left Sticky Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-28 bg-white pr-4">
          <FilterSidebar
            filters={currentFilters}
            onFilterChange={updateFilter}
            onClearFilters={handleClearAllFilters}
            totalResults={totalCount}
          />
        </aside>

        {/* Right Product Grid */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={products}
            isLoading={isLoading}
            onQuickView={openQuickView}
            columns="grid-cols-2 sm:grid-cols-2 md:grid-cols-3"
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={currentFilters}
        onFilterChange={updateFilter}
        onClearFilters={handleClearAllFilters}
        totalResults={totalCount}
      />
    </div>
  );
};

export default ProductsPage;
