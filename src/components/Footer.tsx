import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/contactInfo';
import {
  Store,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Heart,
  Truck,
  ShieldCheck,
  Facebook,
  Instagram,
  ArrowRight,
} from 'lucide-react';

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
    <footer className="bg-[#173D30] text-white pt-16 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-800/60">
          {/* Brand Info (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F5A623] text-[#173D30] flex items-center justify-center font-bold shadow-md">
                <Store className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black tracking-tight text-white font-heading">
                    SASTA
                  </span>
                  <span className="text-2xl font-black tracking-tight text-[#F5A623] font-heading">
                    KITCHEN
                  </span>
                  <span className="text-2xl font-bold tracking-tight text-stone-200 font-heading">
                    BAZAR
                  </span>
                </div>
                <span className="text-[11px] font-bold text-amber-200 tracking-wider uppercase -mt-1 font-urdu">
                  ہر گھر کی ضرورت، اب سستی قیمت پر!
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm">
              Pakistan’s premier online destination for affordable kitchen gadgets, time-saving cooking accessories, and daily household organizers with 100% Cash on Delivery nationwide.
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-stone-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>Warehouse Hub: Shah Alam Market, Lahore & Bolton Market, Karachi</span>
              </div>
              <div className="flex items-start gap-2">
                <PhoneCall className="w-4 h-4 text-[#F5A623] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">WhatsApp & Calling Helplines:</p>
                  <p className="text-amber-200 font-mono font-bold text-xs">
                    <a href={`tel:${STORE_CONTACT.phone1Raw}`} className="hover:underline">{STORE_CONTACT.phone1}</a>
                    <span className="mx-1.5 text-stone-400">|</span>
                    <a href={`tel:${STORE_CONTACT.phone2Raw}`} className="hover:underline">{STORE_CONTACT.phone2}</a>
                  </p>
                  <p className="text-[11px] text-stone-400">{STORE_CONTACT.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
                <span>Email: {STORE_CONTACT.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F5A623] hover:text-[#173D30] flex items-center justify-center transition"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#F5A623] hover:text-[#173D30] flex items-center justify-center transition"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition"
                title={`WhatsApp Chat (${STORE_CONTACT.phone1})`}
              >
                <PhoneCall className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${STORE_CONTACT.phone2WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#173D30] hover:bg-[#235846] text-white border border-emerald-600 flex items-center justify-center transition"
                title={`WhatsApp Chat (${STORE_CONTACT.phone2})`}
              >
                <PhoneCall className="w-4 h-4 text-[#F5A623]" />
              </a>
            </div>
          </div>

          {/* Quick Links (Col 3) */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#F5A623]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onScrollToSection('hero')}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5A623]" />
                  <span>Home Page</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('products-catalog')}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5A623]" />
                  <span>Shop All Products</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('best-sellers')}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5A623]" />
                  <span>Our Best Sellers</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('flash-deals')}
                  className="hover:text-white transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-[#F5A623]" />
                  <span>Hot Deals & Discounts</span>
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${STORE_CONTACT.phone2WhatsApp}?text=Assalam-o-Alaikum%2C%20mujhe%20apna%20order%20track%20karna%20hai`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1.5 text-amber-200 font-semibold"
                >
                  <Truck className="w-3 h-3" />
                  <span>Track Courier Order (TCS)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Top Categories (Col 4) */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#F5A623]">
              Popular Categories
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => handleCategoryClick(c.name)}
                    className="hover:text-white transition text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust & Policies (Col 5) */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#F5A623]">
              Customer Care & Policies
            </h3>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  className="hover:text-white transition text-left"
                >
                  7-Day Return & Refund Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-white transition text-left"
                >
                  Terms & Conditions (COD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-white transition text-left"
                >
                  Privacy & Data Security
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=Assalam-o-Alaikum%2C%20mujhe%20parcel%20ke%20baray%20mein%20issue%20report%20karna%20hai`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition text-left block text-emerald-300 font-semibold"
                >
                  Report a Parcel Damage / Issue
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="block text-[11px] font-bold uppercase text-stone-400 mb-1.5">
                Accepted Payment Options:
              </span>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
                <span className="px-2 py-0.5 rounded bg-black/30 border border-white/10 text-amber-200">
                  Cash on Delivery (COD)
                </span>
                <span className="px-2 py-0.5 rounded bg-black/30 border border-white/10 text-white">
                  JazzCash
                </span>
                <span className="px-2 py-0.5 rounded bg-black/30 border border-white/10 text-white">
                  EasyPaisa
                </span>
                <span className="px-2 py-0.5 rounded bg-black/30 border border-white/10 text-white">
                  Meezan Bank
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Sasta Kitchen Bazar. All rights reserved. Quality Products • Affordable Prices • Happy Homes.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => onOpenPolicy('privacy')} className="hover:text-white transition">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onOpenPolicy('terms')} className="hover:text-white transition">
              Terms of Service
            </button>
            <span>•</span>
            <button onClick={() => onOpenPolicy('refund')} className="hover:text-white transition">
              Return Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
