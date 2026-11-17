import React from 'react';
import { useStore } from '../context/StoreContext';
import { Zap, Boxes, Sparkles, Clock, Wrench, ChevronRight, Headphones, Smartphone, Package } from 'lucide-react';

interface CategoryGridProps { onCategorySelected: () => void; }

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelected }) => {
  const { categories, activeCategory, setActiveCategory } = useStore();
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-cyan-500" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-blue-600" />;
      case 'Clock': return <Clock className="w-5 h-5 text-indigo-500" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-sky-600" />;
      default: return <Package className="w-5 h-5" />;
    }
  };
  const handleSelectCategory = (catName: string) => { setActiveCategory(catName); onCategorySelected(); };

  return (
    <section className="border-b border-blue-100 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1558B0]"><span className="h-0.5 w-6 bg-[#00B8D9]" /> Browse Collections</div>
            <h2 className="font-heading text-2xl font-black tracking-tight text-[#10234A] sm:text-3xl">Explore Digital Accessories</h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">Find the gadgets and everyday tech essentials you need.</p>
          </div>
          <button onClick={() => handleSelectCategory('all')} className="group inline-flex cursor-pointer items-center gap-1 self-start text-xs font-bold text-[#1558B0] transition hover:text-[#00A8CC] sm:self-auto">
            <span>View All Categories</span><ChevronRight className="h-4 w-4 text-[#00A8CC] transition-transform group-hover:translate-x-1" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.name;
            return (
              <button key={cat.id} type="button" onClick={() => handleSelectCategory(cat.name)} className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${isSelected ? 'border-blue-500 ring-2 ring-blue-200 shadow-md' : 'border-slate-200 bg-white hover:border-blue-300'}`}>
                <div className="relative h-28 overflow-hidden bg-slate-100 sm:h-32">
                  <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/15 to-transparent" />
                  <div className="absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-[#1558B0] shadow">{getIcon(cat.iconName)}</div>
                  <div className="absolute bottom-2 right-2.5 rounded bg-black/55 px-2 py-0.5 text-[10px] font-semibold text-cyan-100">{cat.urduTitle}</div>
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-1 text-xs font-bold text-slate-800 transition-colors group-hover:text-[#1558B0] sm:text-sm">{cat.name}</h3>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500"><span>{cat.itemCount}+ Items</span><span className="font-semibold text-[#1558B0]">Explore →</span></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
