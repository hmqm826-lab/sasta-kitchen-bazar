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

function StoreApp() {
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'refund' | 'contact' | 'wishlist' | null>(null);

  // Use Pakistan Standard Time: light from 07:00 to 18:59, dark from 19:00 to 06:59.
  useEffect(() => {
    const updateThemeByPakistanTime = () => {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(new Date());
      const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? 0);
      document.documentElement.setAttribute('data-theme', hour >= 7 && hour < 19 ? 'light' : 'dark');
    };

    updateThemeByPakistanTime();
    const interval = window.setInterval(updateThemeByPakistanTime, 60 * 1000);
    return () => window.clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent text-inherit">
      <Header
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

      {/* One-tap WhatsApp chat to the primary Sales & Orders helpline. */}
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
