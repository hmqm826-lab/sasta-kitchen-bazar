import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT, WHATSAPP_WELCOME_MESSAGE } from '../data/contactInfo';
import { supabase, ADMIN_EMAIL } from '../lib/supabase';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  LayoutDashboard,
  Store,
  ChevronDown,
  Sun,
  Moon,
  RefreshCw
} from 'lucide-react';

interface HeaderProps {
  onOpenWishlist: () => void;
  onOpenContact: () => void;
  onScrollToSection: (sectionId: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onUseAutoTheme: () => void;
  autoTheme: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWishlist,
  onOpenContact,
  onScrollToSection,
  theme,
  onToggleTheme,
  onUseAutoTheme,
  autoTheme,
}) => {
  const {
    cart,
    wishlist,
    setIsCartOpen,
    isAdminOpen,
    setIsAdminOpen,
    products,
    categories,
    activeCategory,
    setActiveCategory,
    openProductModal,
    cartTotal,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Show the Admin Panel button only to the signed-in admin account
  useEffect(() => {
    let active = true;
    const openAdminLoginFromPrivateLink = () => {
      if (window.location.hash === '#admin') setIsAdminOpen(true);
    };
    openAdminLoginFromPrivateLink();
    window.addEventListener('hashchange', openAdminLoginFromPrivateLink);
    supabase.auth.getSession().then(({ data }) => {
      if (active) setIsAuthorizedAdmin(data.session?.user.email?.toLowerCase() === ADMIN_EMAIL);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setIsAuthorizedAdmin(session?.user.email?.toLowerCase() === ADMIN_EMAIL);
    });
    return () => {
      active = false;
      window.removeEventListener('hashchange', openAdminLoginFromPrivateLink);
      listener.subscription.unsubscribe();
    };
  }, [setIsAdminOpen]);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filtered products for search autocomplete
  const searchSuggestions = searchInput.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
            (p.urduName && p.urduName.includes(searchInput)) ||
            p.tags.some((t) => t.toLowerCase().includes(searchInput.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    onScrollToSection('products-catalog');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-stone-200">
      {/* Top Notification Announcement Bar */}
      <div className="bg-[#173D30] text-white text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 font-medium">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 bg-[#F5A623] text-[#173D30] font-bold px-2 py-0.5 rounded text-[11px] uppercase tracking-wider">
              🇵🇰 Pakistan COD
            </span>
            <span className="text-stone-100 hidden md:inline">
              Cash on Delivery All Over Pakistan
            </span>
            <span className="text-stone-100 md:hidden">
              Cash on Delivery All Over Pakistan!
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-200">
            <div className="flex items-center gap-1.5 font-medium">
              <PhoneCall className="w-3.5 h-3.5 text-[#F5A623]" />
              <span className="text-stone-300">Helpline:</span>
              <a
                href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${encodeURIComponent(WHATSAPP_WELCOME_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5A623] transition-colors font-bold text-white underline decoration-[#F5A623]/40"
              >
                {STORE_CONTACT.phone1}
              </a>

            </div>
            <span className="text-stone-500 hidden sm:inline">|</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-2 sm:gap-6">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            

              

              

              <button
                onClick={() => onScrollToSection('best-sellers')}
                className="px-4 py-3 font-medium text-stone-700 hover:text-[#173D30] transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" /> Best Sellers
              </button>

            </div>

            {/* Right Contact Link */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenContact}
                className="text-xs font-semibold text-stone-600 hover:text-[#173D30] transition py-3"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-5 py-4 animate-in slide-in-from-top-4">
          <div className="flex flex-col gap-1 pb-4 border-b border-stone-200">
            <button
              onClick={() => {
                setActiveCategory('all');
                onScrollToSection('hero');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 rounded-lg font-semibold text-stone-800 hover:bg-stone-100"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveCategory('all');
                onScrollToSection('products-catalog');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 rounded-lg font-semibold text-stone-800 hover:bg-stone-100"
            >
              Shop All Products
            </button>
            <button
              onClick={() => {
                onScrollToSection('best-sellers');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 rounded-lg font-semibold text-stone-800 hover:bg-stone-100 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#F5A623]" /> Best Sellers
            </button>
          </div>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-4 mb-2 px-3">
            Browse Categories
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {categories.filter((cat) => cat.name === 'Earbuds').map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`text-left text-xs p-2.5 rounded-lg border transition ${
                  activeCategory === cat.name
                    ? 'bg-emerald-50 text-[#173D30] font-bold border-emerald-300'
                    : 'bg-stone-50 text-stone-700 border-stone-100 hover:bg-stone-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="w-full text-center py-2.5 bg-stone-100 text-stone-800 font-semibold text-xs rounded-xl"
            >
              Contact Support
            </button>
            <a
              href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${encodeURIComponent(WHATSAPP_WELCOME_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{STORE_CONTACT.phone1}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
