import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/contactInfo';
import {
  X,
  ShoppingCart,
  Zap,
  PhoneCall,
  CheckCircle,
  Truck,
  Heart,
  Share2,
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductModal,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    showToast,
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProduct) return null;

  const isFavorite = isInWishlist(selectedProduct.id);
  const images = selectedProduct.gallery && selectedProduct.gallery.length > 0
    ? selectedProduct.gallery
    : [selectedProduct.image];

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: selectedProduct.name,
          text: `Check out ${selectedProduct.name} on Sasta Kitchen Bazar for only Rs. ${selectedProduct.price}!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied! 📋', 'Product link copied to clipboard.');
    }
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Sasta Kitchen Bazar!\n\nI want to order:\n📦 Product: ${selectedProduct.name}\n💰 Price: Rs. ${selectedProduct.price.toLocaleString()} x ${quantity} = Rs. ${(selectedProduct.price * quantity).toLocaleString()}\n\nPlease confirm availability and deliver via Cash on Delivery.`
    );
    window.open(`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-100 overflow-hidden my-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-stone-100 text-stone-600 flex items-center justify-center shadow-md transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image Gallery */}
          <div className="p-4 sm:p-6 bg-stone-50 flex flex-col justify-between">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200/80 mb-4 shadow-sm">
              <img
                src={images[activeImageIndex] || selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                      activeImageIndex === idx
                        ? 'border-[#173D30] ring-2 ring-[#173D30]/20'
                        : 'border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Urdu subtitle */}
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[#173D30] uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <span className="text-stone-400 font-mono text-[11px]">
                  SKU: {selectedProduct.id.toUpperCase()}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-heading leading-tight mb-1">
                {selectedProduct.name}
              </h2>

              {selectedProduct.urduName && (
                <p className="text-sm font-semibold text-emerald-800 mb-3">
                  {selectedProduct.urduName}
                </p>
              )}

              <div className="mb-4 flex items-center justify-between border-b border-stone-100 pb-4">
                <span className="text-xs font-semibold text-stone-500">Product details</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`rounded-full border p-2 transition ${
                      isFavorite ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                    title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    aria-label={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="rounded-full border border-stone-200 p-2 text-stone-600 transition hover:bg-stone-50"
                    title="Share product"
                    aria-label="Share product"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Price Display */}
              <div className="mb-4">
                <span className="text-3xl font-black text-[#65452F]">
                  Rs. {selectedProduct.price.toLocaleString()}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                {selectedProduct.description}
              </p>

              {/* Key Highlights */}
              {selectedProduct.highlights && selectedProduct.highlights.length > 0 && (
                <div className="mb-6 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
                  <p className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                    Key Features & Benefits:
                  </p>
                  <ul className="space-y-1.5">
                    {selectedProduct.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-xs font-bold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => setQuantity((q: number) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold transition"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-bold text-stone-900 min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q: number) => q + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold transition"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-emerald-700 font-medium">
                  {selectedProduct.stockCount} items available in stock
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-4 border-t border-stone-200">
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <button
                  onClick={() => {
                    addToCart(selectedProduct, quantity);
                    closeProductModal();
                  }}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-stone-100 px-3 py-3 text-xs font-bold text-stone-900 transition hover:bg-stone-200 cursor-pointer sm:px-4 sm:text-sm"
                >
                  <ShoppingCart className="w-4 h-4 text-[#173D30]" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => buyNow(selectedProduct)}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#C69A35] px-3 py-3 text-xs font-black text-[#30271F] shadow-md transition hover:bg-[#A77B20] cursor-pointer sm:px-4 sm:text-sm"
                >
                  <Zap className="w-4 h-4 fill-[#173D30]" />
                  <span>Buy Now (COD)</span>
                </button>
              </div>

              {/* WhatsApp direct order button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Order Directly on WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 pt-2 text-xs font-semibold text-stone-500">
                <Truck className="h-4 w-4 text-[#65452F]" />
                Cash on Delivery available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
