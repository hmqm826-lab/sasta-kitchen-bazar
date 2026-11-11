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
import { MessageCircle } from 'lucide-react';

type ThemePreference = 'auto' | 'light' | 'dark';

function StoreApp() {
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'refund' | 'contact' | 'wishlist' | null>(null);
  const [themePreference, setThemePreference] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') return 'auto';
    const saved = window.localStorage.getItem('skb-theme-preference');
    return saved === 'light' || saved === 'dark' ? saved : 'auto';
  });
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('skb-theme-preference');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light';
  });

  // Automatic theme follows Pakistan Standard Time unless the visitor chooses manually.
  useEffect(() => {
    const updateTheme = () => {
      if (themePreference === 'light' || themePreference === 'dark') {
        setActiveTheme(themePreference);
        document.documentElement.setAttribute('data-theme', themePreference);
        return;
      }
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(new Date());
      const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
      const nextTheme = hour >= 7 && hour < 19 ? 'light' : 'dark';
      setActiveTheme(nextTheme);
      document.documentElement.setAttribute('data-theme', nextTheme);
    };

    updateTheme();
    const interval = window.setInterval(updateTheme, 60 * 1000);
    return () => window.clearInterval(interval);
  }, [themePreference]);

  const toggleTheme = () => {
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    setThemePreference(nextTheme);
    setActiveTheme(nextTheme);
    window.localStorage.setItem('skb-theme-preference', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-inherit">
      <Header
        theme={activeTheme}
        onToggleTheme={toggleTheme}
        onOpenWishlist={() => setPolicyType('wishlist')}
        onOpenContact={() => setPolicyType('contact')}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        <HeroBanner onShopNow={() => scrollToSection('products-catalog')} />
        <div id="best-sellers">
          <ProductGrid
            sectionTitle="Explore Kitchen & Home Essentials"
            sectionSubtitle="Browse useful kitchen gadgets, accessories, storage solutions and everyday home essentials."
          />
        </div>
        <WhyChooseUs />
      </main>

      <Footer
        onOpenPolicy={(type) => setPolicyType(type)}
        onScrollToSection={scrollToSection}
      />

      <a
        href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar%2C%20mujhe%20maloomat%20chahiye.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Sasta Kitchen Bazar on WhatsApp at ${STORE_CONTACT.phone1}`}
        title={`Chat on WhatsApp: ${STORE_CONTACT.phone1}`}
        className="fixed bottom-5 left-5 z-50 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#16A34A] px-4 py-3 text-sm font-bold text-white shadow-xl transition hover:scale-105 hover:bg-[#15803D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-400"
      >
        <MessageCircle className="h-5 w-5" />
        <span>WhatsApp Chat</span>
      </a>

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
