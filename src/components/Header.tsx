import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT, WHATSAPP_WELCOME_MESSAGE } from '../data/contactInfo';
import { supabase, ADMIN_EMAIL } from '../lib/supabase';
import {
  Search, ShoppingCart, Heart, Menu, X, PhoneCall, Sparkles,
  LayoutDashboard, Store, Sun, Moon, RefreshCw, Crown
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
  onOpenWishlist, onOpenContact, onScrollToSection,
  theme, onToggleTheme, onUseAutoTheme, autoTheme,
}) => {
  const {
    cart, wishlist, setIsCartOpen, setIsAdminOpen, products,
    categories, activeCategory, setActiveCategory, openProductModal, cartTotal,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    const openPrivateAdminLink = () => {
      if (window.location.hash === '#admin') setIsAdminOpen(true);
    };
    openPrivateAdminLink();
    window.addEventListener('hashchange', openPrivateAdminLink);
    supabase.auth.getSession().then(({ data }) => {
      if (active) setIsAuthorizedAdmin(data.session?.user.email?.toLowerCase() === ADMIN_EMAIL);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setIsAuthorizedAdmin(session?.user.email?.toLowerCase() === ADMIN_EMAIL);
    });
    return () => {
      active = false;
      window.removeEventListener('hashchange', openPrivateAdminLink);
      listener.subscription.unsubscribe();
    };
  }, [setIsAdminOpen]);

  useEffect(() => {
    const closeOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', closeOutside);
    return () => document.removeEventListener('mousedown', closeOutside);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const searchSuggestions = searchInput.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        p.category.toLowerCase().includes(searchInput.toLowerCase()) ||
        (p.urduName && p.urduName.includes(searchInput)) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchInput.toLowerCase()))
      ).slice(0, 5)
    : [];

  const chooseCategory = (category: string) => {
    setActiveCategory(category);
    onScrollToSection('products-catalog');
    setMobileMenuOpen(false);
  };
  const chooseProduct = (product: typeof products[number]) => {
    openProductModal(product);
    setSearchInput('');
    setIsSearchFocused(false);
  };
  const refreshPage = () => window.location.reload();

  return (
    <header className="sticky top-0 z-40 border-b border-[#8b693e] bg-[#3b281b] text-[#fff0d3] shadow-lg">
      <div className="bg-[#24170f] px-3 py-1.5 text-center text-[11px] font-bold tracking-wide text-[#f4dba8]">
        🇵🇰 CASH ON DELIVERY ALL OVER PAKISTAN
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={() => onScrollToSection('hero')}
            aria-label="Go to home"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9b713c] text-[#fff0d3] shadow-md"
          >
            <Store className="h-6 w-6" />
          </button>
          <button onClick={() => onScrollToSection('hero')} className="min-w-0 text-left">
            <span className="hm-brand-title relative block truncate text-lg font-black leading-tight tracking-tight text-[#fff0d3] sm:text-2xl">HM DIGITAL STORE<Crown aria-hidden="true" className="hm-brand-crown absolute -top-4 left-[17px] h-4 w-4 sm:-top-5 sm:left-[25px] sm:h-5 sm:w-5" /></span>
            <span className="block text-[9px] font-bold tracking-wider text-[#e7c995] sm:text-[11px]">ELECTRONICS &amp; ALL PRODUCTS</span>
          </button>
        </div>

        <div ref={searchContainerRef} className="relative order-3 w-full sm:order-none sm:w-auto sm:flex-1 sm:max-w-md">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setIsSearchFocused(false);
              onScrollToSection('products-catalog');
            }}
            className="flex h-10 overflow-hidden rounded-full border border-[#d8b66f] bg-[#fffaf0] shadow-inner"
          >
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search earbuds, headphones, phones..."
              className="min-w-0 flex-1 bg-transparent px-4 text-sm text-[#352315] outline-none placeholder:text-[#a78c65]"
            />
            <button type="submit" className="m-0.5 rounded-full bg-[#d8b66f] px-4 text-xs font-extrabold text-[#2d1d10] hover:bg-[#edcf8b]">Search</button>
          </form>
          {isSearchFocused && searchSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-xl border border-[#c7a76a] bg-[#fffaf0] text-[#352315] shadow-2xl">
              {searchSuggestions.map((product) => (
                <button key={product.id} onClick={() => chooseProduct(product)} className="block w-full border-b border-[#eadcc4] px-4 py-3 text-left text-sm hover:bg-[#f4ead7]">
                  <span className="block font-bold">{product.name}</span>
                  <span className="text-xs text-[#806846]">{product.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button onClick={onToggleTheme} className="flex h-9 items-center gap-1 rounded-xl border border-[#b89459] bg-[#fff8eb] px-2.5 text-xs font-bold text-[#3a281b] hover:bg-[#f1dfbd]">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          <button onClick={onUseAutoTheme} className={`hidden h-9 items-center gap-1 rounded-xl border px-2.5 text-xs font-bold sm:flex ${autoTheme ? 'border-[#f0d69c] bg-[#d8b66f] text-[#2d1d10]' : 'border-[#b89459] bg-[#fff8eb] text-[#3a281b]'}`}>
            <Sparkles className="h-4 w-4" /> Auto
          </button>
          <button onClick={refreshPage} aria-label="Refresh page" className="flex h-9 items-center gap-1 rounded-xl border border-[#b89459] bg-[#fff8eb] px-2.5 text-xs font-bold text-[#3a281b] hover:bg-[#f1dfbd]">
            <RefreshCw className="h-4 w-4" /><span className="hidden sm:inline">Refresh</span>
          </button>
          <button onClick={onOpenWishlist} aria-label="Wishlist" className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#fff8eb] text-[#3a281b] hover:bg-[#f1dfbd]">
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && <span className="absolute -right-1 -top-1 rounded-full bg-[#d8b66f] px-1.5 text-[10px] font-bold text-[#2d1d10]">{wishlist.length}</span>}
          </button>
          <button onClick={() => setIsCartOpen(true)} className="flex h-9 items-center gap-1 rounded-xl bg-[#fff8eb] px-2.5 text-[#3a281b] hover:bg-[#f1dfbd]">
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden text-left sm:block"><span className="block text-[10px] font-bold">MY CART</span><span className="block text-[9px]">Rs. {cartTotal}</span></span>
            {totalCartCount > 0 && <span className="rounded-full bg-[#d8b66f] px-1.5 text-[10px] font-black">{totalCartCount}</span>}
          </button>
          {isAuthorizedAdmin && (
            <button onClick={() => setIsAdminOpen(true)} className="hidden h-9 items-center gap-1 rounded-xl border border-[#e0bd79] bg-[#fff8eb] px-3 text-xs font-bold text-[#5a3c20] sm:flex">
              <LayoutDashboard className="h-4 w-4" /> Admin Panel
            </button>
          )}
          <button onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle menu" className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#b89459] text-[#fff0d3] lg:hidden">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <nav className="hidden border-t border-[#8b693e]/60 bg-[#2d1e14] lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-3 sm:px-5">
          <button onClick={() => { setActiveCategory('all'); onScrollToSection('hero'); }} className="px-4 py-3 text-sm font-bold text-[#f5dcae] hover:bg-[#5a402b]">Home</button>
          <button onClick={() => chooseCategory('all')} className="px-4 py-3 text-sm font-bold text-[#f5dcae] hover:bg-[#5a402b]">Shop All</button>
          {categories.map((category) => (
            <button key={category.id} onClick={() => chooseCategory(category.name)} className={`whitespace-nowrap px-3 py-3 text-sm hover:bg-[#5a402b] ${activeCategory === category.name ? 'font-extrabold text-[#f2cf83]' : 'text-[#f5e8d0]'}`}>
              {category.name}
            </button>
          ))}
          <button onClick={() => onScrollToSection('best-sellers')} className="whitespace-nowrap px-3 py-3 text-sm font-semibold text-[#f2cf83] hover:bg-[#5a402b]"><Sparkles className="mr-1 inline h-4 w-4" />Best Sellers</button>
          <button onClick={onOpenContact} className="ml-auto whitespace-nowrap px-3 py-3 text-xs font-bold text-[#f5e8d0] hover:text-[#f2cf83]">Contact Us</button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-[#8b693e] bg-[#2d1e14] px-4 py-3 text-[#fff0d3] lg:hidden">
          <button onClick={() => { setActiveCategory('all'); onScrollToSection('hero'); setMobileMenuOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left font-semibold hover:bg-[#5a402b]">Home</button>
          <button onClick={() => chooseCategory('all')} className="block w-full rounded-lg px-3 py-2 text-left font-semibold hover:bg-[#5a402b]">Shop All Products</button>
          {categories.map((category) => (
            <button key={category.id} onClick={() => chooseCategory(category.name)} className="block w-full rounded-lg px-3 py-2 text-left hover:bg-[#5a402b]">{category.name}</button>
          ))}
          <button onClick={() => { onScrollToSection('best-sellers'); setMobileMenuOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left font-semibold text-[#f2cf83]"><Sparkles className="mr-2 inline h-4 w-4" />Best Sellers</button>
          <button onClick={() => { onOpenContact(); setMobileMenuOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left font-semibold hover:bg-[#5a402b]">Contact Us</button>
          <a href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${encodeURIComponent(WHATSAPP_WELCOME_MESSAGE)}`} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#128c7e] px-4 py-2.5 font-bold text-white"><PhoneCall className="h-4 w-4" />WhatsApp Sales</a>
        </div>
      )}
    </header>
  );
};
