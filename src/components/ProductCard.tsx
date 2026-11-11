import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, Heart, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, buyNow, openProductModal, toggleWishlist, isInWishlist, cart } = useStore();
  const isFavorite = isInWishlist(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);
  const inCartQuantity = cartItem ? cartItem.quantity : 0;

  return (
    <article className="group relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[#65452F]/40 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {product.isBestSeller && (
          <span className="absolute left-2 top-2 rounded-md bg-[#E0B64E] px-2 py-1 text-[9px] font-extrabold uppercase text-[#30271F] shadow sm:text-[10px]">
            Featured
          </span>
        )}

        <div className="absolute bottom-2 right-2 flex flex-col gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md backdrop-blur transition ${
              isFavorite ? 'bg-rose-500 text-white' : 'bg-white/95 text-stone-700 hover:text-rose-600'
            }`}
            title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); openProductModal(product); }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-stone-700 shadow-md backdrop-blur transition hover:text-[#65452F]"
            title="Quick view"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-3 sm:p-4">
        <div>
          <div className="mb-1 flex items-center justify-between gap-2 text-[10px] sm:text-[11px]">
            <span className="min-w-0 truncate font-semibold uppercase tracking-wide text-stone-500">{product.category}</span>
            {product.urduName && <span className="max-w-[46%] truncate font-medium text-emerald-700">{product.urduName}</span>}
          </div>
          <h3
            onClick={() => openProductModal(product)}
            className="line-clamp-2 cursor-pointer text-xs font-bold leading-snug text-stone-900 transition-colors group-hover:text-[#65452F] sm:text-sm"
            title={product.name}
          >
            {product.name}
          </h3>
        </div>

        <div className="mt-3 border-t border-stone-100 pt-3">
          <div className="mb-2.5 flex flex-wrap items-center justify-between gap-1.5">
            <span className="text-base font-black tracking-tight text-[#65452F] sm:text-lg">Rs. {product.price.toLocaleString()}</span>
            <span className={`rounded px-1.5 py-0.5 text-[9px] font-bold sm:text-[10px] ${
              product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              disabled={!product.inStock}
              className={`flex min-h-10 items-center justify-center gap-1 rounded-xl px-1.5 text-[10px] font-bold transition disabled:cursor-not-allowed disabled:opacity-50 sm:px-2 sm:text-xs ${
                inCartQuantity > 0
                  ? 'border border-emerald-300 bg-emerald-50 text-[#65452F] hover:bg-emerald-100'
                  : 'bg-stone-100 text-stone-800 hover:bg-[#65452F] hover:text-white'
              }`}
              title="Add to cart"
            >
              {inCartQuantity > 0 ? <Check className="h-3.5 w-3.5 flex-shrink-0" /> : <ShoppingCart className="h-3.5 w-3.5 flex-shrink-0" />}
              <span className="truncate">{inCartQuantity > 0 ? `In Cart (${inCartQuantity})` : 'Add to Cart'}</span>
            </button>
            <button
              onClick={() => buyNow(product)}
              disabled={!product.inStock}
              className="flex min-h-10 items-center justify-center gap-1 rounded-xl bg-[#C69A35] px-1.5 text-[10px] font-extrabold text-[#30271F] shadow-sm transition hover:bg-[#A77B20] disabled:cursor-not-allowed disabled:opacity-50 sm:px-2 sm:text-xs"
              title="Buy now with Cash on Delivery"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
