import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, ShoppingCart, Heart, Eye, Zap, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    buyNow,
    openProductModal,
    toggleWishlist,
    isInWishlist,
    cart,
  } = useStore();

  const isFavorite = isInWishlist(product.id);
  const cartItem = cart.find((i) => i.product.id === product.id);
  const inCartQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="group bg-white rounded-2xl border border-stone-200 hover:border-[#173D30]/40 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative">
      {/* Top Image Container */}
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discountPercentage > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-rose-600 text-white font-extrabold text-[11px] px-2 py-0.5 rounded-md shadow flex items-center gap-0.5">
            <span>-{product.discountPercentage}%</span>
          </div>
        )}

        {/* Best Seller Badge */}
        {product.isBestSeller && (
          <div className="absolute top-2.5 right-2.5 bg-[#F5A623] text-[#173D30] font-black text-[10px] uppercase px-2 py-0.5 rounded-md shadow">
            Best Seller
          </div>
        )}

        {/* Quick Action Floating Buttons (Wishlist & Quick View) */}
        <div className="absolute right-2.5 bottom-2.5 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all ${
              isFavorite
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-white/90 text-stone-700 hover:bg-white hover:text-rose-600'
            }`}
            title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openProductModal(product);
            }}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 hover:text-[#173D30] flex items-center justify-center backdrop-blur-md shadow-md transition-all"
            title="Quick Preview"
            aria-label="Quick Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Urdu subtitle */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-semibold text-stone-500 uppercase tracking-wider">
              {product.category}
            </span>
            {product.urduName && (
              <span className="text-emerald-700 font-medium text-[11px] truncate max-w-[120px]">
                {product.urduName}
              </span>
            )}
          </div>

          {/* Title */}
          <h3
            onClick={() => openProductModal(product)}
            className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-[#173D30] transition-colors line-clamp-2 cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-bold text-stone-700">{product.rating}</span>
            <span className="text-[10px] text-stone-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing & Stock Status */}
        <div className="mt-3 pt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-2.5">
            <div>
              <span className="text-base sm:text-lg font-black text-[#173D30] tracking-tight">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through ml-1.5 font-medium">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* In Stock Pill */}
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                product.inStock
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-600'
              }`}
            >
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              disabled={!product.inStock}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer ${
                inCartQuantity > 0
                  ? 'bg-emerald-50 text-[#173D30] border border-emerald-300 hover:bg-emerald-100'
                  : 'bg-stone-100 hover:bg-[#173D30] hover:text-white text-stone-800'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Add to shopping cart"
            >
              {inCartQuantity > 0 ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>In Cart ({inCartQuantity})</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>

            <button
              onClick={() => buyNow(product)}
              disabled={!product.inStock}
              className="py-2 px-2 bg-[#F5A623] hover:bg-[#e09315] text-[#173D30] font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Buy now with 1-click checkout"
            >
              <Zap className="w-3.5 h-3.5 fill-[#173D30]" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
