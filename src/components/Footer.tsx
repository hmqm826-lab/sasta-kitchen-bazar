import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT, WHATSAPP_WELCOME_MESSAGE } from '../data/contactInfo';
import { Store, PhoneCall, ArrowRight, MessageCircle, Clock3 } from 'lucide-react';

interface FooterProps {
  onOpenPolicy: (type: 'privacy' | 'terms' | 'refund') => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPolicy, onScrollToSection }) => {
  const { categories, setActiveCategory } = useStore();

  const handleCategoryClick = (catName: string) => {
    setActiveCategory(catName);
    onScrollToSection('products-catalog');
  };

  return (
    <footer className="border-t border-[#493020] bg-[#30271F] pb-8 pt-12 text-white sm:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-9 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="inline-flex max-w-full items-center gap-2.5">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#E0B64E] text-[#30271F] shadow-md"><Store className="h-6 w-6" /></span>
              <span className="min-w-0">
                <span className="block font-heading text-base font-black leading-tight tracking-tight sm:text-xl">SASTA KITCHEN BAZAR</span>
                <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-wider text-[#E0B64E] sm:text-[10px]">Har Ghar Ki Zaroorat</span>
              </span>
            </a>
            <p className="max-w-sm text-xs leading-relaxed text-stone-300 sm:text-sm">
              Explore useful kitchen gadgets, cooking accessories, storage solutions and everyday home essentials. Cash on Delivery is available All Over Pakistan.
            </p>
            <div className="flex flex-col gap-3 text-xs text-stone-200">
              <div className="flex items-start gap-2">
                <PhoneCall className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#E0B64E]" />
                <div>
                  <p className="font-semibold text-white">Sales & Orders</p>
                  <a href={`tel:${STORE_CONTACT.phone1Raw}`} className="font-mono font-bold text-[#E0B64E] hover:underline">{STORE_CONTACT.phone1}</a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#E0B64E]" />
                <div>
                  <p className="font-semibold text-white">Customer Support</p>
                  <a href={`tel:${STORE_CONTACT.phone2Raw}`} className="font-mono font-bold text-[#E0B64E] hover:underline">{STORE_CONTACT.phone2}</a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock3 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#E0B64E]" />
                <div>
                  <p className="font-semibold text-white">Support Hours</p>
                  <p className="font-mono font-bold text-[#E0B64E]">{STORE_CONTACT.hours}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <a href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${encodeURIComponent(WHATSAPP_WELCOME_MESSAGE)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700">
                <MessageCircle className="h-4 w-4" /> WhatsApp Sales
              </a>
              <a href={`https://wa.me/${STORE_CONTACT.phone2WhatsApp}?text=${encodeURIComponent(WHATSAPP_WELCOME_MESSAGE)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-white/20 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/10">
                <MessageCircle className="h-4 w-4" /> WhatsApp Support
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#E0B64E]">Quick Links</h3>
            <ul className="space-y-3 text-xs text-stone-300">
              <li><button onClick={() => onScrollToSection('hero')} className="inline-flex items-center gap-2 transition hover:text-white"><ArrowRight className="h-3 w-3 text-[#E0B64E]" /> Home</button></li>
              <li><button onClick={() => onScrollToSection('products-catalog')} className="inline-flex items-center gap-2 transition hover:text-white"><ArrowRight className="h-3 w-3 text-[#E0B64E]" /> Shop All Products</button></li>
              <li><button onClick={() => onScrollToSection('best-sellers')} className="inline-flex items-center gap-2 transition hover:text-white"><ArrowRight className="h-3 w-3 text-[#E0B64E]" /> Featured Products</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#E0B64E]">Shop Categories</h3>
            <ul className="space-y-3 text-xs text-stone-300">
              {categories.slice(0, 8).map((category) => (
                <li key={category.id}>
                  <button onClick={() => handleCategoryClick(category.name)} className="text-left transition hover:text-white">{category.name}</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#E0B64E]">Customer Information</h3>
            <ul className="space-y-3 text-xs text-stone-300">
              <li><button onClick={() => onOpenPolicy('refund')} className="text-left transition hover:text-white">Returns & Refunds</button></li>
              <li><button onClick={() => onOpenPolicy('terms')} className="text-left transition hover:text-white">Terms & Conditions</button></li>
              <li><button onClick={() => onOpenPolicy('privacy')} className="text-left transition hover:text-white">Privacy Policy</button></li>
            </ul>
            <div className="pt-2">
              <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-wide text-stone-400">Payment Method</span>
              <span className="inline-flex rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-bold text-[#E0B64E]">Cash on Delivery (COD)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-7 text-center text-[11px] text-stone-400 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Sasta Kitchen Bazar. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => onOpenPolicy('privacy')} className="transition hover:text-white">Privacy</button>
            <button onClick={() => onOpenPolicy('terms')} className="transition hover:text-white">Terms</button>
            <button onClick={() => onOpenPolicy('refund')} className="transition hover:text-white">Returns</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
