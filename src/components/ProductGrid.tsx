import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import {
  Sparkles,
  ArrowUpDown,
  Filter,
  Tag,
  PackageX,
} from 'lucide-react';

interface ProductGridProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  sectionTitle = 'Our Best Selling Products',
  sectionSubtitle = 'Quality tested kitchen tools and household organizers trusted by thousands of Pakistani families.',
}) => {
  const {
    products,
    categories,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'bestsellers' | 'new' | 'under1000'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }

      // Tab filter
      if (activeTab === 'bestsellers' && !p.isBestSeller) return false;
      if (activeTab === 'new' && !p.isNewArrival) return false;
      if (activeTab === 'under1000' && p.price > 1000) return false;

      // In stock only filter
      if (inStockOnly && !p.inStock) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesUrdu = p.urduName && p.urduName.includes(query);
        const matchesTag = p.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesCategory && !matchesUrdu && !matchesTag) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // featured default
    });
  }, [products, activeCategory, activeTab, inStockOnly, searchQuery, sortBy]);

  return (
    <section id="products-catalog" className="py-12 sm:py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173D30] mb-1">
              <span className="w-6 h-0.5 bg-[#F5A623]"></span>
              Explore the Collection
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#173D30] tracking-tight font-heading">
              {activeCategory !== 'all' ? activeCategory : sectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-2xl">
              {sectionSubtitle}
            </p>
          </div>

          {/* Result Count */}
          <div className="text-xs font-semibold text-stone-500 bg-white px-3 py-1.5 rounded-lg border border-stone-200 self-start md:self-auto">
            Showing <span className="font-bold text-[#173D30]">{filteredProducts.length}</span> items
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-2 border-b border-stone-200/70">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#173D30] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            All Products
          </button>

          <button
            onClick={() => setActiveTab('bestsellers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'bestsellers'
                ? 'bg-[#173D30] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
            Best Sellers
          </button>

          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'new'
                ? 'bg-[#173D30] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            New Arrivals
          </button>

          <button
            onClick={() => setActiveTab('under1000')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'under1000'
                ? 'bg-[#173D30] text-white shadow-sm'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Tag className="w-3.5 h-3.5 text-emerald-600" />
            Under Rs. 1,000
          </button>
        </div>

        {/* Controls Bar: Category Selector & Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs">
          {/* Category Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 hidden sm:inline">Category:</span>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#173D30]"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* In stock toggle */}
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 ml-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#173D30] focus:ring-[#173D30] border-stone-300"
              />
              <span>In Stock Only</span>
            </label>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-xs font-bold text-stone-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#173D30]"
            >
              <option value="featured">Featured & Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active search warning tag */}
        {searchQuery.trim() && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <p className="text-xs text-stone-700">
              Showing search results for: <span className="font-bold text-[#173D30]">"{searchQuery}"</span>
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
              <PackageX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-800 mb-1">No products match your filters</h3>
            <p className="text-xs text-stone-500 mb-6">
              Try resetting your category or search term to discover other items.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveTab('all');
                setSearchQuery('');
                setInStockOnly(false);
              }}
              className="px-5 py-2.5 bg-[#173D30] text-white font-bold text-xs rounded-xl hover:bg-[#235846] transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
