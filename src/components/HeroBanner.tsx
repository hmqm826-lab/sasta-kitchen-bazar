import React, { useEffect, useState } from 'react';
import { ArrowRight, Headphones, MessageCircle, PackageCheck, ShoppingBag, Truck, Smartphone, Watch, ChevronLeft, ChevronRight } from 'lucide-react';
import { STORE_CONTACT, WHATSAPP_WELCOME_MESSAGE } from '../data/contactInfo';

interface HeroBannerProps {
  onShopNow: () => void;
  onOpenTerms: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://www.apple.com/v/iphone-18-pro/e/images/overview/product-viewer/3d_viewer__hgotqf9hvvee_large.jpg',
    alt: 'iPhone 18 Pro Max shown front and back without a pouch or case',
    eyebrow: 'iPhone 18 Pro Max',
    title: 'Pro. Without compromise.',
    detail: 'A clean, uncovered view of the iPhone 18 Pro Max.',
  },
  {
    image: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/42-cell-aluminum-rosegold-sport-band-lightblush-s10?.v=1724549376970&fmt=jpeg&hei=2000&qlt=95&wid=2000',
    alt: 'Apple Watch in rose gold with light blush sport band',
    eyebrow: 'Apple Watch',
    title: 'A smarter everyday.',
    detail: 'Apple Watch with a clean, premium finish.',
  },
  {
    image: 'https://st-troy.mncdn.com/Content/media/ProductImg/original/mhwk4tua-airpods-max-2-gece-yarisi-639094209166146356.jpg',
    alt: 'Apple AirPods Max over-ear headphones without a pouch',
    eyebrow: 'AirPods Max',
    title: 'Hear the difference.',
    detail: 'Over-ear Apple headphones, shown on their own.',
  },
  {
    image: 'https://istore.am/product_image/2487/1757939902_b3e47e53c727475095da.jpg',
    alt: 'Apple AirPods Pro earbuds with open charging case',
    eyebrow: 'Apple Earbuds',
    title: 'Small. Powerful. Beautiful.',
    detail: 'Wireless earbuds with their charging case.',
  },
  {
    image: 'https://www.motabhaielectronics.com/cdn/shop/files/WebsiteProductCatalog2_6357497d-079f-4b2c-8bfc-37fd6cade68a_1600x.jpg?v=1695290575',
    alt: 'Apple genuine 20W USB-C power adapter',
    eyebrow: 'Genuine Apple Adapter',
    title: 'Power, made simple.',
    detail: 'Apple USB-C power adapter. Cable shown separately.',
  },
  {
    image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQKJ3?.v=eWhIbHZMN3dwcDZ4bXdld1BTZFBVamV5anh5cFo1c1prUGQ5ZHBXUzY4Mmk0MUtKM1cwZkI0WFZOa2NIRHpiRHJSd3NRNlBrUkNpQkIyQjhrbHZqb2c&fmt=jpeg&hei=1200&qlt=90&traceId=1&wid=1200',
    alt: 'Apple USB-C charge cable displayed separately',
    eyebrow: 'Apple USB-C Cable',
    title: 'The right connection.',
    detail: 'A separate Apple USB-C charge cable.',
  },
  {
    image: 'https://us.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-multiple-wallet--M82072_PM2_Front%20view.jpg',
    alt: 'Black Louis Vuitton men’s wallet',
    eyebrow: 'Men’s Wallet',
    title: 'A classic everyday essential.',
    detail: 'A sleek black wallet for men.',
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const whatsappMessage = encodeURIComponent(WHATSAPP_WELCOME_MESSAGE);
  const slide = HERO_SLIDES[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);

  const showPrevious = () => setActiveSlide((current) => (current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const showNext = () => setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);

  return (
    <section id="hero" className="relative isolate overflow-hidden bg-[#F5F5F7] py-10 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-black/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col items-start text-left lg:col-span-6">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#1D1D1F] shadow-sm sm:text-xs">
            <PackageCheck className="h-4 w-4 text-[#0071E3]" />
            Digital Accessories & Smart Gadgets
          </span>
          <h1 className="mb-5 font-heading text-5xl font-black leading-[1.02] tracking-[-0.045em] text-[#1D1D1F] sm:text-6xl lg:text-7xl">
            HM <span className="bg-gradient-to-r from-[#1D1D1F] to-[#6E6E73] bg-clip-text text-transparent">Digital Store</span>
          </h1>
          <h2 className="mb-4 max-w-xl font-heading text-2xl font-extrabold leading-snug text-[#1D1D1F] sm:text-3xl">
            Upgrade your everyday with smarter accessories.
          </h2>
          <p className="mb-7 max-w-xl text-sm leading-relaxed text-[#6E6E73] sm:text-base">
            Discover earbuds, headphones, ladies’ and men’s watches, couple watches, chargers, cables, power banks and mobile accessories — with Cash on Delivery all over Pakistan.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <button onClick={onShopNow} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0071E3] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-black/10 transition hover:-translate-y-0.5 sm:w-auto">
              <ShoppingBag className="h-5 w-5 text-cyan-100" /> Browse Accessories <ArrowRight className="h-4 w-4 text-cyan-100" />
            </button>
            <a href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#D2D2D7] bg-white px-6 py-3.5 text-sm font-bold text-[#1D1D1F] shadow-sm transition hover:border-[#0071E3] hover:bg-[#F5F5F7] sm:w-auto">
              <MessageCircle className="h-4 w-4 text-emerald-600" /> Ask on WhatsApp
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-3 text-xs font-semibold text-[#424245]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm"><Truck className="h-4 w-4 text-[#0071E3]" /> COD all over Pakistan</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 shadow-sm"><PackageCheck className="h-4 w-4 text-[#0071E3]" /> Easy online ordering</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:col-span-6 lg:max-w-none">
          <div className="product-showcase-panel relative overflow-hidden rounded-[2rem] border shadow-2xl">
            <img key={slide.image} src={slide.image} alt={slide.alt} className="product-showcase-image aspect-[5/4] w-full object-contain transition-opacity duration-700 sm:aspect-[6/5] lg:aspect-[5/4]" fetchPriority={activeSlide === 0 ? 'high' : 'auto'} />
            <div className="product-showcase-shade absolute inset-0 bg-gradient-to-t from-[#24170f]/35 via-transparent to-transparent" />
            <div className="product-showcase-caption absolute bottom-0 left-0 right-0 p-5 sm:p-7">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-white/90">{slide.eyebrow}</p>
              <p className="font-heading text-2xl font-extrabold sm:text-3xl">{slide.title}</p>
              <p className="mt-2 text-xs text-white/90 sm:text-sm">{slide.detail}</p>
            </div>
            <div className="absolute left-4 top-4 flex gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#1D1D1F] shadow-lg"><Headphones className="h-5 w-5" /></span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#0071E3] shadow-lg"><Smartphone className="h-5 w-5" /></span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 text-[#0071E3] shadow-lg"><Watch className="h-5 w-5" /></span>
            </div>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <button type="button" onClick={showPrevious} aria-label="Previous banner slide" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1D1D1F] shadow-lg transition hover:bg-white"><ChevronLeft className="h-5 w-5" /></button>
              <div className="flex items-center gap-1.5 rounded-full bg-slate-950/45 px-2.5 py-2">
                {HERO_SLIDES.map((item, index) => <button key={item.image} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show slide ${index + 1}`} aria-current={activeSlide === index ? 'true' : undefined} className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-5 bg-cyan-200' : 'w-2 bg-white/65 hover:bg-white'}`} />)}
              </div>
              <button type="button" onClick={showNext} aria-label="Next banner slide" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1D1D1F] shadow-lg transition hover:bg-white"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
