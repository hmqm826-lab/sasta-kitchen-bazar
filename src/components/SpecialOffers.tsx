import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Flame, Clock, ArrowRight, Zap, ShoppingBag } from 'lucide-react';

interface SpecialOffersProps {
  onGrabDeal: () => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ onGrabDeal }) => {
  const { products, openProductModal, buyNow } = useStore();

  // Dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hotDealProducts = products.filter((p) => p.isHotDeal).slice(0, 3);

  return (
    <section id="flash-deals" className="py-12 sm:py-16 bg-gradient-to-r from-[#173D30] via-[#1b4637] to-[#173D30] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Banner Header with Timer */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-emerald-800/60 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5A623] text-stone-900 text-xs font-black uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5 fill-stone-900" />
              <span>Limited Time Sasti Deals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight font-heading">
              Hot Deals & Special Discounts
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1">
              Top kitchen picks at slashed prices. Stock is strictly limited on flash deal items!
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-3 bg-black/25 backdrop-blur-md px-5 py-3 rounded-2xl border border-emerald-700/50 self-start lg:self-center">
            <Clock className="w-5 h-5 text-[#F5A623] animate-pulse" />
            <div className="flex items-center gap-2 text-center">
              <div>
                <span className="block font-black text-xl sm:text-2xl font-mono text-[#F5A623] leading-none">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-semibold text-stone-300">Hours</span>
              </div>
              <span className="font-bold text-xl text-stone-400 -mt-3">:</span>
              <div>
                <span className="block font-black text-xl sm:text-2xl font-mono text-[#F5A623] leading-none">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-semibold text-stone-300">Mins</span>
              </div>
              <span className="font-bold text-xl text-stone-400 -mt-3">:</span>
              <div>
                <span className="block font-black text-xl sm:text-2xl font-mono text-[#F5A623] leading-none">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span className="text-[9px] uppercase font-semibold text-stone-300">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Hot Deals Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotDealProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl text-stone-800 overflow-hidden shadow-xl border border-emerald-900/30 flex flex-col group hover:-translate-y-1 transition-all duration-300"
            >
              {/* Product Image & Badges */}
              <div className="relative h-48 overflow-hidden bg-stone-100">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 bg-red-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-white" />
                  <span>{prod.discountPercentage}% OFF</span>
                </div>

                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  Stock: {prod.stockCount} Left
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#173D30]">
                    {prod.category}
                  </span>
                  <h3
                    onClick={() => openProductModal(prod)}
                    className="font-bold text-sm text-stone-900 mt-0.5 line-clamp-1 hover:text-[#173D30] cursor-pointer"
                  >
                    {prod.name}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                    {prod.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div>
                      <span className="text-lg font-black text-[#173D30]">
                        Rs. {prod.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-400 line-through ml-2">
                        Rs. {prod.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Save Rs. {(prod.originalPrice - prod.price).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => openProductModal(prod)}
                      className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition text-center"
                    >
                      Quick View
                    </button>
                    <button
                      onClick={() => buyNow(prod)}
                      className="w-full py-2 bg-[#F5A623] hover:bg-[#e09315] text-[#173D30] text-xs font-black rounded-xl shadow transition flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Grab Deal CTA Button */}
        <div className="mt-8 text-center">
          <button
            onClick={onGrabDeal}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#F5A623] hover:bg-[#e09315] text-[#173D30] font-black text-sm rounded-xl shadow-lg transition-transform hover:scale-105 cursor-pointer uppercase tracking-wider"
          >
            <span>Grab Your Deal Now! Browse All Discounts</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
