import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/contactInfo';
import { supabase, ADMIN_EMAIL } from '../lib/supabase';
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  PhoneCall,
  ShieldCheck,
  Truck,
  Sparkles,
  Flame,
  LayoutDashboard,
  Store,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onOpenWishlist: () => void;
  onOpenContact: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWishlist,
  onOpenContact,
  onScrollToSection,
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
    supabase.auth.getSession().then(({ data }) => {
      if (active) setIsAuthorizedAdmin(data.session?.user.email?.toLowerCase() === ADMIN_EMAIL);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setIsAuthorizedAdmin(session?.user.email?.toLowerCase() === ADMIN_EMAIL);
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

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
              Cash on Delivery All Over Pakistan | Free Delivery over Rs. 2,999!
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
                href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5A623] transition-colors font-bold text-white underline decoration-[#F5A623]/40"
              >
                {STORE_CONTACT.phone1}
              </a>
              <span className="text-stone-500">|</span>
              <a
                href={`https://wa.me/${STORE_CONTACT.phone2WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5A623] transition-colors font-bold text-white underline decoration-[#F5A623]/40"
              >
                {STORE_CONTACT.phone2}
              </a>
            </div>
            <span className="text-stone-500 hidden sm:inline">|</span>
            <span className="hidden sm:inline flex items-center gap-1 text-emerald-300">
              <Truck className="w-3.5 h-3.5" /> 2-4 Days TCS Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#173D30] text-[#F5A623] flex items-center justify-center shadow-md shadow-[#173D30]/20 group-hover:scale-105 transition-transform duration-200">
                <Store className="w-6 h-6 text-[#F5A623]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#173D30] font-heading">
                    SASTA
                  </span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-[#F5A623] font-heading">
                    KITCHEN
                  </span>
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#292929] font-heading hidden xs:inline">
                    BAZAR
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#173D30]/80 tracking-wider uppercase -mt-1">
                  Har Ghar Ki Zaroorat!
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar with Predictive Dropdown */}
          <div ref={searchContainerRef} className="flex-1 max-w-xl hidden md:block relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search kitchen gadgets, choppers, spice racks, organizers..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-11 pr-24 py-2.5 bg-stone-50 border border-stone-300 rounded-full text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#173D30] focus:border-transparent transition-all shadow-inner"
              />
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3" />
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
                  className="absolute right-20 top-3 text-stone-400 hover:text-stone-600 text-xs px-1"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => {
                  if (searchInput.trim()) {
                    onScrollToSection('products-catalog');
                    setIsSearchFocused(false);
                  }
                }}
                className="absolute right-1 top-1 bottom-1 px-4 bg-[#173D30] hover:bg-[#235846] text-white text-xs font-semibold rounded-full transition flex items-center gap-1"
              >
                Search
              </button>
            </div>

            {/* Suggestions Overlay */}
            {isSearchFocused && searchInput.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                <div className="p-2 border-b border-stone-100 flex items-center justify-between bg-stone-50 text-xs text-stone-500 font-medium">
                  <span>Found {searchSuggestions.length} matching products</span>
                  <span className="text-[11px] text-[#173D30] font-semibold">Press Enter to view all</span>
                </div>
                {searchSuggestions.length > 0 ? (
                  <div className="divide-y divide-stone-100 max-h-80 overflow-y-auto">
                    {searchSuggestions.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          openProductModal(prod);
                          setIsSearchFocused(false);
                        }}
                        className="p-3 flex items-center gap-3 hover:bg-emerald-50/50 cursor-pointer transition-colors"
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-lg border border-stone-200 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-stone-800 truncate">{prod.name}</p>
                          <p className="text-xs text-emerald-800 font-urdu">{prod.urduName}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sm font-bold text-[#173D30]">Rs. {prod.price.toLocaleString()}</span>
                            <span className="text-xs text-stone-400 line-through">Rs. {prod.originalPrice.toLocaleString()}</span>
                            <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                              -{prod.discountPercentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-stone-500 text-sm">
                    No products found for "{searchInput}". Try searching "chopper", "rack", or "mop".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-xl text-stone-700 hover:text-[#173D30] hover:bg-stone-100 transition-colors"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F5A623] text-stone-900 font-bold text-[11px] rounded-full flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-stone-100 hover:bg-[#173D30] text-stone-800 hover:text-white px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 group border border-stone-200"
              title="Open Shopping Cart"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-[#173D30] group-hover:text-[#F5A623] transition-colors" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#F5A623] text-stone-900 font-extrabold text-[11px] rounded-full flex items-center justify-center shadow-sm">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] text-stone-500 group-hover:text-stone-300 font-medium -mb-0.5 uppercase tracking-wider">
                  My Cart
                </span>
                <span className="text-xs font-bold text-[#173D30] group-hover:text-white">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>
            </button>

            {/* Store Admin Portal Switcher - visible only to the authenticated admin */}
            {isAuthorizedAdmin && (
              <button
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                  isAdminOpen
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
                title="Admin Dashboard (Manage products & orders)"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-800" />
                <span className="hidden md:inline">Admin Panel</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, gadgets, essentials..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-20 py-2 bg-stone-50 border border-stone-300 rounded-full text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#173D30]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <button
              onClick={() => {
                if (searchInput.trim()) {
                  onScrollToSection('products-catalog');
                }
              }}
              className="absolute right-1 top-1 bottom-1 px-3 bg-[#173D30] text-white text-[11px] font-bold rounded-full"
            >
              Find
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#FAF8F5] border-t border-stone-200 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between text-sm">
            {/* Left Nav Links */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  onScrollToSection('hero');
                }}
                className={`px-4 py-3 font-semibold transition-colors flex items-center gap-1.5 ${
                  activeCategory === 'all'
                    ? 'text-[#173D30] border-b-2 border-[#173D30] bg-white/60'
                    : 'text-stone-700 hover:text-[#173D30]'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => {
                  setActiveCategory('all');
                  onScrollToSection('products-catalog');
                }}
                className="px-4 py-3 font-semibold text-stone-700 hover:text-[#173D30] transition-colors"
              >
                Shop All
              </button>

              <button
                onClick={() => handleCategoryClick('Kitchen Accessories')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeCategory === 'Kitchen Accessories'
                    ? 'text-[#173D30] border-b-2 border-[#173D30] font-bold bg-white/60'
                    : 'text-stone-700 hover:text-[#173D30]'
                }`}
              >
                Kitchen Accessories
              </button>

              <button
                onClick={() => handleCategoryClick('Kitchen Gadgets')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeCategory === 'Kitchen Gadgets'
                    ? 'text-[#173D30] border-b-2 border-[#173D30] font-bold bg-white/60'
                    : 'text-stone-700 hover:text-[#173D30]'
                }`}
              >
                Kitchen Gadgets
              </button>

              <button
                onClick={() => handleCategoryClick('Kitchen Storage & Organizers')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeCategory === 'Kitchen Storage & Organizers'
                    ? 'text-[#173D30] border-b-2 border-[#173D30] font-bold bg-white/60'
                    : 'text-stone-700 hover:text-[#173D30]'
                }`}
              >
                Storage & Organizers
              </button>

              <button
                onClick={() => handleCategoryClick('Home Essentials')}
                className={`px-4 py-3 font-medium transition-colors ${
                  activeCategory === 'Home Essentials'
                    ? 'text-[#173D30] border-b-2 border-[#173D30] font-bold bg-white/60'
                    : 'text-stone-700 hover:text-[#173D30]'
                }`}
              >
                Home Essentials
              </button>

              <button
                onClick={() => onScrollToSection('best-sellers')}
                className="px-4 py-3 font-medium text-stone-700 hover:text-[#173D30] transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" /> Best Sellers
              </button>

              <button
                onClick={() => onScrollToSection('flash-deals')}
                className="px-4 py-3 font-bold text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
              >
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" /> Hot Deals
              </button>
            </div>

            {/* Right Contact Link */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenContact}
                className="text-xs font-semibold text-stone-600 hover:text-[#173D30] transition py-3"
              >
                Contact Us & Tracking
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
            <button
              onClick={() => {
                onScrollToSection('flash-deals');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2.5 px-3 rounded-lg font-semibold text-orange-600 hover:bg-orange-50 flex items-center gap-2"
            >
              <Flame className="w-4 h-4 fill-orange-500" /> Hot Deals & Discounts
            </button>
          </div>

          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mt-4 mb-2 px-3">
            Browse Categories
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {categories.map((cat) => (
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
              Customer Support & Tracking
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{STORE_CONTACT.phone1}</span>
              </a>
              <a
                href={`https://wa.me/${STORE_CONTACT.phone2WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-2 bg-[#173D30] hover:bg-[#235846] text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#F5A623]" />
                <span>{STORE_CONTACT.phone2}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
