import React from 'react';
import { ArrowRight, Headphones, MessageCircle, PackageCheck, ShoppingBag, Truck, Smartphone, Watch } from 'lucide-react';
import { STORE_CONTACT, WHATSAPP_WELCOME_MESSAGE } from '../data/contactInfo';

interface HeroBannerProps {
  onShopNow: () => void;
  onOpenTerms: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  const whatsappMessage = encodeURIComponent(WHATSAPP_WELCOME_MESSAGE);

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-gradient-to-br from-[#F5F8FF] via-white to-[#EAF2FF] py-10 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#2F80ED]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#00B8D9]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col items-start text-left lg:col-span-6">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#174EA6] shadow-sm sm:text-xs">
            <PackageCheck className="h-4 w-4 text-[#00A8CC]" />
            Digital Accessories & Smart Gadgets
          </span>
          <h1 className="mb-5 font-heading text-5xl font-black leading-[1.02] tracking-[-0.045em] text-[#10234A] sm:text-6xl lg:text-7xl">
            HM <span className="text-[#1685E8]">Digital Store</span>
          </h1>
          <h2 className="mb-4 max-w-xl font-heading text-2xl font-extrabold leading-snug text-[#142B55] sm:text-3xl">
            Upgrade your everyday with smarter accessories.
          </h2>
          <p className="mb-7 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Discover wireless earbuds, headphones, smart watches, chargers, power banks and mobile accessories — all in one place, with Cash on Delivery all over Pakistan.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button onClick={onShopNow} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1558B0] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#0D3978] sm:w-auto">
              <ShoppingBag className="h-5 w-5 text-[#8DEBFF]" /> Browse Accessories <ArrowRight className="h-4 w-4 text-[#8DEBFF]" />
            </button>
            <a href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3.5 text-sm font-bold text-[#173B70] shadow-sm transition hover:border-blue-400 hover:bg-blue-50 sm:w-auto">
              <MessageCircle className="h-4 w-4 text-emerald-600" /> Ask on WhatsApp
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold text-[#31527D]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 shadow-sm"><Truck className="h-4 w-4 text-[#1685E8]" /> COD all over Pakistan</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 shadow-sm"><PackageCheck className="h-4 w-4 text-[#1685E8]" /> Easy online ordering</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-[#0D1B3A] shadow-2xl shadow-blue-950/20">
            <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85" alt="Modern smartphone and digital accessories" className="aspect-[5/4] w-full object-cover sm:aspect-[6/5] lg:aspect-[5/4]" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08152F]/90 via-[#08152F]/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#8DEBFF]">Technology for everyday life</p>
              <p className="font-heading text-2xl font-extrabold sm:text-3xl">Small gadgets. Big convenience.</p>
              <p className="mt-2 text-xs text-white/85 sm:text-sm">Audio, charging, wearable and mobile accessories.</p>
            </div>
            <div className="absolute right-4 top-4 flex gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#1558B0] shadow-lg"><Headphones className="h-5 w-5" /></span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#1558B0] shadow-lg"><Smartphone className="h-5 w-5" /></span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#1558B0] shadow-lg"><Watch className="h-5 w-5" /></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
