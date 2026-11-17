import React, { useEffect, useState } from 'react';
import { ArrowRight, Headphones, MessageCircle, PackageCheck, ShoppingBag, Truck, Smartphone, Watch, ChevronLeft, ChevronRight } from 'lucide-react';
import { STORE_CONTACT, WHATSAPP_WELCOME_MESSAGE } from '../data/contactInfo';

interface HeroBannerProps {
  onShopNow: () => void;
  onOpenTerms: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=1400&q=85',
    alt: 'Wireless earbuds',
    eyebrow: 'Wireless audio collection',
    title: 'Sound that moves with you.',
    detail: 'Wireless earbuds for music, calls and everyday life.',
  },
  {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=85',
    alt: 'Modern headphones',
    eyebrow: 'Headphones collection',
    title: 'Feel every beat.',
    detail: 'Discover stylish headphones and personal audio gear.',
  },
  {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85',
    alt: 'Elegant wrist watch',
    eyebrow: 'Watches collection',
    title: 'Style for every moment.',
    detail: 'Explore ladies, men’s, couple and smart watches.',
  },
  {
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=1400&q=85',
    alt: 'Mobile charger and cable accessories',
    eyebrow: 'Charging essentials',
    title: 'Power up your day.',
    detail: 'Chargers, cables, leads and power banks in one place.',
  },
  {
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=85',
    alt: 'Modern smartphone',
    eyebrow: 'Mobile accessories',
    title: 'Smart essentials. Smart choices.',
    detail: 'Useful mobile and digital accessories for everyday use.',
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const whatsappMessage = encodeURIComponent(WHATSAPP_WELCOME_MESSAGE);
  const slide = HERO_SLIDES[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => setActiveSlide((current) => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const showNext = () => setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-gradient-to-br from-[#F7F5FF] via-white to-[#EAF3FF] py-10 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-violet-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col items-start text-left lg:col-span-6">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-violet-800 shadow-sm sm:text-xs">
            <PackageCheck className="h-4 w-4 text-cyan-600" />
            Digital Accessories & Smart Gadgets
          </span>
          <h1 className="mb-5 font-heading text-5xl font-black leading-[1.02] tracking-[-0.045em] text-[#10234A] sm:text-6xl lg:text-7xl">
            HM <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">Digital Store</span>
          </h1>
          <h2 className="mb-4 max-w-xl font-heading text-2xl font-extrabold leading-snug text-[#142B55] sm:text-3xl">
            Upgrade your everyday with smarter accessories.
          </h2>
          <p className="mb-7 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Discover earbuds, headphones, ladies’ and men’s watches, couple watches, chargers, cables, power banks and mobile accessories — with Cash on Delivery all over Pakistan.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button onClick={onShopNow} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 via-blue-700 to-cyan-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-violet-900/20 transition hover:-translate-y-0.5 sm:w-auto">
              <ShoppingBag className="h-5 w-5 text-cyan-100" /> Browse Accessories <ArrowRight className="h-4 w-4 text-cyan-100" />
            </button>
            <a href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3.5 text-sm font-bold text-[#173B70] shadow-sm transition hover:border-violet-400 hover:bg-violet-50 sm:w-auto">
              <MessageCircle className="h-4 w-4 text-emerald-600" /> Ask on WhatsApp
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold text-[#31527D]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm"><Truck className="h-4 w-4 text-violet-600" /> COD all over Pakistan</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm"><PackageCheck className="h-4 w-4 text-cyan-600" /> Easy online ordering</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
          <div className="relative overflow-hidden rounded-[2rem] border border-violet-200 bg-[#0D1B3A] shadow-2xl shadow-violet-950/20">
            <img key={slide.image} src={slide.image} alt={slide.alt} className="aspect-[5/4] w-full object-cover transition-opacity duration-700 sm:aspect-[6/5] lg:aspect-[5/4]" fetchPriority={activeSlide === 0 ? 'high' : 'auto'} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08152F]/95 via-[#08152F]/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-200">{slide.eyebrow}</p>
              <p className="font-heading text-2xl font-extrabold sm:text-3xl">{slide.title}</p>
              <p className="mt-2 text-xs text-white/90 sm:text-sm">{slide.detail}</p>
            </div>
            <div className="absolute left-4 top-4 flex gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-violet-700 shadow-lg"><Headphones className="h-5 w-5" /></span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-blue-700 shadow-lg"><Smartphone className="h-5 w-5" /></span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-cyan-700 shadow-lg"><Watch className="h-5 w-5" /></span>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button type="button" onClick={showPrevious} aria-label="Previous banner slide" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-violet-800 shadow-lg transition hover:bg-white"><ChevronLeft className="h-5 w-5" /></button>
              <div className="flex items-center gap-1.5 rounded-full bg-slate-950/45 px-2.5 py-2">
                {HERO_SLIDES.map((item, index) => <button key={item.image} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show slide ${index + 1}`} aria-current={activeSlide === index ? 'true' : undefined} className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-5 bg-cyan-200' : 'w-2 bg-white/65 hover:bg-white'}`} />)}
              </div>
              <button type="button" onClick={showNext} aria-label="Next banner slide" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-violet-800 shadow-lg transition hover:bg-white"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
