/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AdminAccess } from './components/AdminAccess';
import { PolicyModals } from './components/PolicyModals';
import { ToastContainer } from './components/ToastContainer';
import { STORE_CONTACT } from './data/contactInfo';
import { PhoneCall, MessageCircle, X } from 'lucide-react';

function StoreApp() {
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'refund' | 'contact' | 'wishlist' | null>(null);
  const [isWhatsAppPopupOpen, setIsWhatsAppPopupOpen] = useState(false);

  // Automatically use a light theme during the day and a dark theme at night.
  useEffect(() => {
    const updateThemeByLocalTime = () => {
      const hour = new Date().getHours();
      document.documentElement.setAttribute('data-theme', hour >= 7 && hour < 19 ? 'light' : 'dark');
    };
    updateThemeByLocalTime();
    const interval = window.setInterval(updateThemeByLocalTime, 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-inherit">
      {/* Site Header */}
      <Header
        onOpenWishlist={() => setPolicyType('wishlist')}
        onOpenContact={() => setPolicyType('contact')}
        onScrollToSection={scrollToSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Section 4: Hero Banner */}
        <HeroBanner onShopNow={() => scrollToSection('products-catalog')} />

        <div id="best-sellers">
          <ProductGrid
            sectionTitle="Explore Kitchen & Home Essentials"
            sectionSubtitle="Browse useful kitchen gadgets, accessories, storage solutions and everyday home essentials."
          />
        </div>

        <WhyChooseUs />
      </main>

      {/* Section 12: Footer */}
      <Footer
        onOpenPolicy={(type) => setPolicyType(type)}
        onScrollToSection={scrollToSection}
      />

      {/* Floating WhatsApp Action Widget (Both Numbers: 0307-0008988 & 0371-6053822) */}
      <aside aria-label="Customer Support" className="fixed bottom-6 left-6 z-40">
        <div className="relative">
          {isWhatsAppPopupOpen && (
            <div className="absolute bottom-16 left-0 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 mb-2 animate-in fade-in slide-in-from-bottom-2 text-stone-800">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-3">
                <div>
                  <h4 className="font-extrabold text-xs text-[#173D30]">WhatsApp Helpline</h4>
                  <p className="text-[10px] text-stone-500">Choose helpline to chat or call:</p>
                </div>
                <button
                  onClick={() => setIsWhatsAppPopupOpen(false)}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-600 transition"
                  aria-label="Close helpline menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <a
                  href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 rounded-xl transition border border-emerald-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-emerald-700 font-bold block">{STORE_CONTACT.phone1Label}</span>
                    <span className="text-xs font-black font-mono">{STORE_CONTACT.phone1}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${STORE_CONTACT.phone2WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 bg-stone-50 hover:bg-stone-100 text-stone-900 rounded-xl transition border border-stone-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#173D30] text-white flex items-center justify-center font-bold flex-shrink-0">
                    <PhoneCall className="w-4 h-4 text-[#F5A623]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-stone-600 font-bold block">{STORE_CONTACT.phone2Label}</span>
                    <span className="text-xs font-black font-mono">{STORE_CONTACT.phone2}</span>
                  </div>
                </a>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsWhatsAppPopupOpen(!isWhatsAppPopupOpen)}
            className="group flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
            title="Chat on WhatsApp (0307-0008988 / 0371-6053822)"
          >
            <div className="relative">
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F5A623] rounded-full animate-ping" />
            </div>
            <span className="hidden sm:inline font-bold text-xs tracking-wide">
              WhatsApp: {STORE_CONTACT.phone1} | {STORE_CONTACT.phone2}
            </span>
          </button>
        </div>
      </aside>

      {/* Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <AdminAccess />
      <PolicyModals type={policyType} onClose={() => setPolicyType(null)} />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <StoreApp />
    </StoreProvider>
  );
}
