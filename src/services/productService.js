import { products } from '../data/products';
import { categories } from '../data/categories';
import { collections } from '../data/collections';

/**
 * Product Service Layer
 * Simulates async REST API calls so this can be swapped with real endpoints instantly.
 */
export const productService = {
  // Query products with extensive multi-facet filtering and sorting
  getProducts: async ({
    category,
    gender,
    subCategory,
    collection,
    search,
    minPrice,
    maxPrice,
    sizes = [],
    colors = [],
    fabric,
    occasion,
    season,
    minRating,
    inStockOnly,
    sortBy = 'popularity',
    page = 1,
    limit = 24
  } = {}) => {
    // Artificial small delay for realistic UX feeling
    await new Promise((r) => setTimeout(r, 60));

    let filtered = [...products];

    if (gender && gender !== 'all') {
      filtered = filtered.filter(p => p.gender === gender || p.gender === 'unisex');
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (subCategory && subCategory !== 'all') {
      filtered = filtered.filter(p => p.subCategory.toLowerCase() === subCategory.toLowerCase());
    }

    if (collection && collection !== 'all') {
      filtered = filtered.filter(p => p.collection.toLowerCase() === collection.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.colors.some(c => c.name.toLowerCase().includes(q))
      );
    }

    if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    if (sizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(s => sizes.includes(s)));
    }

    if (colors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(c => colors.includes(c.name)));
    }

    if (fabric && fabric !== 'all') {
      filtered = filtered.filter(p => p.fabric.toLowerCase().includes(fabric.toLowerCase()));
    }

    if (occasion && occasion !== 'all') {
      filtered = filtered.filter(p => p.occasion.toLowerCase() === occasion.toLowerCase());
    }

    if (season && season !== 'all') {
      filtered = filtered.filter(p => p.season.toLowerCase() === season.toLowerCase() || p.season === 'all-season');
    }

    if (minRating) {
      filtered = filtered.filter(p => p.rating >= Number(minRating));
    }

    if (inStockOnly) {
      filtered = filtered.filter(p => p.availableStock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginatedItems = filtered.slice(startIndex, startIndex + limit);

    return {
      products: paginatedItems,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: startIndex + limit < total
    };
  },

  getProductBySlug: async (slug) => {
    await new Promise((r) => setTimeout(r, 40));
    const item = products.find(p => p.slug === slug || p.id === slug);
    if (!item) throw new Error('Product not found');
    return item;
  },

  getCategories: async () => {
    return categories;
  },

  getCollections: async () => {
    return collections;
  },

  getSearchSuggestions: async (query) => {
    if (!query || query.trim().length < 2) return [];
    const q = query.trim().toLowerCase();
    
    // Return max 6 relevant products + category matches
    const matchedProducts = products
      .filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.subCategory.toLowerCase().includes(q))
      .slice(0, 5);

    return matchedProducts;
  }
};
