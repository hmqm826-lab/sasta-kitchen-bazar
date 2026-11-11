import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCw, Star, Tag, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onShopNow: () => void;
  onExploreDeals: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow, onExploreDeals }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-emerald-50/20 to-white pt-6 pb-12 sm:py-16">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#F5A623]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#173D30]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/10 border border-emerald-900/20 text-[#173D30] text-xs font-bold mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#F5A623] animate-pulse" />
              <span>Har Ghar Ki Zaroorat, Ab Sasti Qeemat Par!</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#173D30] tracking-tight leading-[1.1] mb-4 font-heading">
              Welcome to <br className="hidden sm:inline" />
              <span className="text-[#173D30]">Sasta Kitchen</span>{' '}
              <span className="text-[#F5A623]">Bazar</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-stone-700 font-medium max-w-xl mb-3 leading-relaxed">
              Smart Kitchen Solutions & Everyday Home Essentials at Unbeatable Wholesale Prices!
            </p>

            <p className="text-xs sm:text-sm text-stone-500 font-medium max-w-lg mb-8 leading-relaxed">
              Shop smart, save more, live better. Upgrade your cooking and household experience with Pakistan's most trusted budget-friendly kitchen store.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#173D30] hover:bg-[#235846] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-[#173D30]/25 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#F5A623] group-hover:scale-110 transition-transform" />
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreDeals}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-stone-50 text-[#173D30] font-bold text-sm sm:text-base rounded-xl border-2 border-[#173D30]/20 hover:border-[#173D30] shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Tag className="w-4 h-4 text-[#F5A623]" />
                <span>Explore Deals (Upto 60% Off)</span>
              </button>
            </div>

            {/* Customer Rating Proof */}
            <div className="flex items-center gap-4 pt-4 border-t border-stone-200/80 w-full max-w-md">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Customer"
                />
                <div className="inline-flex h-9 w-9 rounded-full ring-2 ring-white bg-[#173D30] text-white text-xs font-bold items-center justify-center">
                  25k+
                </div>
              </div>
              <div>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-extrabold text-stone-800 ml-1.5">4.9 / 5</span>
                </div>
                <p className="text-xs text-stone-500 font-medium">Over 25,000+ Happy Pakistani Homes</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Collage / Featured Deal Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85"
                  alt="Modern Pakistani Kitchen Setup"
                  className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="bg-[#F5A623] text-stone-900 font-extrabold text-xs uppercase px-2.5 py-1 rounded w-max mb-1 shadow">
                    Weekly Special
                  </span>
                  <p className="text-xl font-bold font-heading">Smart Kitchen Gadget Combos</p>
                  <p className="text-xs text-stone-200 mt-0.5">Save up to Rs. 1,500 on bestselling household bundles</p>
                </div>
              </div>

              {/* Floating Discount Badge */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-[#F5A623] text-[#173D30] p-3 sm:p-4 rounded-2xl shadow-xl border-2 border-white flex flex-col items-center justify-center text-center rotate-6 hover:rotate-0 transition-transform">
                <span className="text-xs font-black uppercase tracking-tight">SAVE UP TO</span>
                <span className="text-2xl sm:text-3xl font-black font-heading leading-none">60%</span>
                <span className="text-[10px] font-bold uppercase mt-0.5">OFF SALE</span>
              </div>

              {/* Floating Delivery Trust Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#173D30] flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-[#173D30]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-800">Cash on Delivery</p>
                  <p className="text-[11px] text-stone-500">Pay at your doorstep in PKR</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Bottom Trust Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mt-12 sm:mt-16 pt-8 border-t border-stone-200">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-stone-200/70 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#173D30]/10 text-[#173D30] flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-800">Nationwide COD</p>
              <p className="text-[11px] text-stone-500">All Pakistan delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-stone-200/70 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#F5A623]/15 text-stone-800 flex items-center justify-center flex-shrink-0">
              <Tag className="w-5 h-5 text-[#F5A623]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-800">Sasti Wholesale Rates</p>
              <p className="text-[11px] text-stone-500">Direct factory prices</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-stone-200/70 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-800">7-Day Easy Return</p>
              <p className="text-[11px] text-stone-500">Replacement guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/80 border border-stone-200/70 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#173D30] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#173D30]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-stone-800">Checked Before Dispatch</p>
              <p className="text-[11px] text-stone-500">100% quality verified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
