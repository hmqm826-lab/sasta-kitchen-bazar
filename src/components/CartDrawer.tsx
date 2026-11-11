import React from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/contactInfo';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, PhoneCall } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    shippingFee,
    cartTotal,
  } = useStore();

  if (!isCartOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrderCart = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map((item, idx) => `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}) - Rs. ${(item.product.price * item.quantity).toLocaleString()}`)
      .join('\n');

    const msg = encodeURIComponent(
      `Assalam-o-Alaikum Sasta Kitchen Bazar!\n\nI want to place an order for the following items:\n\n${itemsList}\n\nSubtotal: Rs. ${cartSubtotal.toLocaleString()}\nDelivery charges: Rs. ${shippingFee.toLocaleString()}\nTotal: Rs. ${cartTotal.toLocaleString()}\n\nPlease confirm my order via Cash on Delivery.`
    );

    window.open(`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden bg-black/60 backdrop-blur-xs">
      <div
        className="flex h-full w-full max-w-md flex-col justify-between bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 p-4 sm:p-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#65452F] text-[#E0B64E]">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-base font-extrabold text-stone-900">Shopping Cart</h2>
              <p className="text-xs font-medium text-stone-500">{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in your cart</p>
            </div>
          </div>
          <button onClick={() => setIsCartOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-200" aria-label="Close cart">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
          {cart.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <h3 className="mb-1 text-base font-bold text-stone-800">Your cart is empty</h3>
              <p className="mx-auto mb-6 max-w-xs text-xs text-stone-500">Browse kitchen gadgets and home essentials, then add your favourites here.</p>
              <button onClick={() => setIsCartOpen(false)} className="min-h-11 rounded-xl bg-[#65452F] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#493020]">
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id} className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-stone-50 p-3">
                <img src={item.product.image} alt={item.product.name} className="h-18 w-18 flex-shrink-0 rounded-xl border border-stone-200 object-cover" loading="lazy" />
                <div className="min-w-0 flex-1">
                  <h4 className="line-clamp-2 text-xs font-bold text-stone-800">{item.product.name}</h4>
                  <p className="mt-0.5 text-[11px] font-medium text-stone-500">Rs. {item.product.price.toLocaleString()} each</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <div className="flex items-center overflow-hidden rounded-lg border border-stone-300 bg-white">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center text-stone-600 transition hover:bg-stone-100" aria-label="Decrease quantity">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-7 px-2 text-center text-xs font-bold text-stone-800">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center text-stone-600 transition hover:bg-stone-100" aria-label="Increase quantity">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#65452F]">Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                      <button onClick={() => removeFromCart(item.product.id)} className="rounded-lg p-2 text-stone-400 transition hover:bg-rose-50 hover:text-rose-600" title="Remove item" aria-label="Remove item">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="space-y-3 border-t border-stone-200 bg-stone-50 p-4 sm:p-5">
            <div className="space-y-2 pt-1 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-800">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery charges</span>
                <span className="font-semibold text-stone-800">Rs. {shippingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-stone-200 pt-2 text-sm font-black text-stone-900 sm:text-base">
                <span>Total payable</span>
                <span className="text-[#65452F]">Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <p className="text-right text-[10px] text-stone-500">Payment method: Cash on Delivery</p>
            </div>

            <div className="space-y-2 pt-1">
              <button onClick={handleProceedToCheckout} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#65452F] text-xs font-black text-white shadow-lg transition hover:bg-[#493020] sm:text-sm">
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4 text-[#E0B64E]" />
              </button>
              <button onClick={handleWhatsAppOrderCart} className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700">
                <PhoneCall className="h-4 w-4" />
                <span>Order via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
