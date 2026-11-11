import React from 'react';
import { ArrowRight, Headphones, MessageCircle, PackageCheck, ShoppingBag, Truck } from 'lucide-react';
import { STORE_CONTACT } from '../data/contactInfo';

interface HeroBannerProps {
  onShopNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  const whatsappMessage = encodeURIComponent('Assalam-o-Alaikum Sasta Kitchen Bazar! I have a question about your products.');

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-[#F7F3E9] via-white to-[#F0E9DA] py-8 sm:py-14 lg:py-16">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#C69A35]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#65452F]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col items-start text-left lg:col-span-6">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#65452F]/15 bg-white/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#65452F] shadow-sm sm:text-xs">
            <PackageCheck className="h-4 w-4 text-[#C69A35]" />
            Everyday Kitchen & Home Essentials
          </span>

          <h1 className="mb-4 font-heading text-4xl font-black leading-[1.05] tracking-tight text-[#493020] sm:text-5xl lg:text-6xl">
            Sasta Kitchen <span className="text-[#C69A35]">Bazar</span>
          </h1>

          <h2 className="mb-3 max-w-xl font-heading text-xl font-bold leading-snug text-[#493020] sm:text-2xl">
            Useful finds for your kitchen and home.
          </h2>

          <p className="mb-7 max-w-xl text-sm leading-relaxed text-stone-600 sm:text-base">
            Explore practical kitchen gadgets, cooking accessories, storage solutions and everyday home essentials — with Cash on Delivery across Pakistan.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button
              onClick={onShopNow}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#65452F] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#65452F]/20 transition hover:-translate-y-0.5 hover:bg-[#493020] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A35] focus-visible:ring-offset-2 sm:w-auto"
            >
              <ShoppingBag className="h-5 w-5 text-[#E0B64E]" />
              Browse Products
              <ArrowRight className="h-4 w-4 text-[#E0B64E]" />
            </button>

            <a
              href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#65452F]/25 bg-white px-6 py-3.5 text-sm font-bold text-[#493020] shadow-sm transition hover:border-[#65452F] hover:bg-[#F7F3E9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C69A35] focus-visible:ring-offset-2 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4 text-emerald-700" />
              Ask on WhatsApp
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
          <div className="relative overflow-hidden rounded-[1.75rem] border-4 border-white bg-white shadow-2xl shadow-[#493020]/10">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85"
              alt="A bright, organized modern kitchen"
              className="aspect-[5/4] w-full object-cover sm:aspect-[6/5] lg:aspect-[5/4]"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24180F]/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#F4D18A]">Make space for smarter living</p>
              <p className="font-heading text-2xl font-extrabold sm:text-3xl">Simple tools. Easier everyday tasks.</p>
              <p className="mt-2 text-xs text-white/85 sm:text-sm">Kitchen accessories, handy gadgets and home organization essentials.</p>
            </div>
          </div>

          <div className="absolute -bottom-4 left-3 flex items-center gap-3 rounded-2xl border border-stone-100 bg-white/95 p-3 shadow-xl backdrop-blur sm:-left-5 sm:p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0E9DA] text-[#65452F]">
              <Truck className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xs font-extrabold text-stone-800 sm:text-sm">Cash on Delivery</span>
              <span className="block text-[10px] text-stone-500 sm:text-xs">Pay when your order arrives</span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-3 px-4 sm:mt-16 sm:grid-cols-3 sm:px-6">
        <div className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white/85 p-4 shadow-sm">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F0E9DA] text-[#65452F]"><Truck className="h-5 w-5" /></span>
          <span><span className="block text-sm font-extrabold text-stone-800">Cash on Delivery</span><span className="text-xs text-stone-500">Across Pakistan</span></span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white/85 p-4 shadow-sm">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F0E9DA] text-[#65452F]"><ShoppingBag className="h-5 w-5" /></span>
          <span><span className="block text-sm font-extrabold text-stone-800">Kitchen & Home</span><span className="text-xs text-stone-500">Useful everyday products</span></span>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-stone-200/80 bg-white/85 p-4 shadow-sm">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#F0E9DA] text-[#65452F]"><Headphones className="h-5 w-5" /></span>
          <span><span className="block text-sm font-extrabold text-stone-800">Customer Support</span><span className="text-xs text-stone-500">Contact us on WhatsApp</span></span>
        </div>
      </div>
    </section>
  );
};
