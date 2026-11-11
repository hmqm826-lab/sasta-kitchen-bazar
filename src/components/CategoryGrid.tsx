import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  UtensilsCrossed,
  Zap,
  Boxes,
  Flame,
  Home,
  Sparkles,
  Bath,
  FolderKanban,
  Clock,
  Wrench,
  ChevronRight,
} from 'lucide-react';

interface CategoryGridProps {
  onCategorySelected: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelected }) => {
  const { categories, activeCategory, setActiveCategory } = useStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-emerald-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-500" />;
      case 'Home':
        return <Home className="w-5 h-5 text-sky-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-500" />;
      case 'Bath':
        return <Bath className="w-5 h-5 text-blue-500" />;
      case 'FolderKanban':
        return <FolderKanban className="w-5 h-5 text-teal-600" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-indigo-500" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-amber-600" />;
      default:
        return <UtensilsCrossed className="w-5 h-5" />;
    }
  };

  const handleSelectCategory = (catName: string) => {
    setActiveCategory(catName);
    onCategorySelected();
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173D30] mb-1">
              <span className="w-6 h-0.5 bg-[#F5A623]"></span>
              Browse Collections
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#173D30] tracking-tight font-heading">
              Shop by Categories
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Discover smart kitchen gadgets and everyday home essentials organized for you.
            </p>
          </div>

          <button
            onClick={() => handleSelectCategory('all')}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#173D30] hover:text-[#235846] transition group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 10 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name;

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.name)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 hover:shadow-lg ${
                  isSelected
                    ? 'ring-2 ring-[#173D30] border-transparent bg-emerald-50/50 shadow-md'
                    : 'border-stone-200 hover:border-[#173D30]/40 bg-white'
                }`}
              >
                {/* Image */}
                <div className="relative h-28 sm:h-32 overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/20 to-transparent" />
                  
                  {/* Floating Icon */}
                  <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm shadow flex items-center justify-center">
                    {getIcon(cat.iconName)}
                  </div>

                  {/* Urdu Subtitle Badge */}
                  <div className="absolute bottom-2 right-2.5 px-2 py-0.5 rounded bg-black/50 backdrop-blur-xs text-[11px] text-amber-200 font-medium">
                    {cat.urduTitle}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="font-bold text-xs sm:text-sm text-stone-800 group-hover:text-[#173D30] transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <div className="flex items-center justify-between mt-1 text-[11px] text-stone-500">
                    <span>{cat.itemCount}+ Items</span>
                    <span className="text-[#173D30] font-semibold group-hover:translate-x-0.5 transition-transform">
                      Explore &rarr;
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
