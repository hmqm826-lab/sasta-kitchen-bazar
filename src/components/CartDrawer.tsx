import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/contactInfo';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Truck,
  Tag,
  PhoneCall,
  CheckCircle,
} from 'lucide-react';

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
    discountAmount,
    couponCode,
    applyCoupon,
    removeCoupon,
    freeShippingThreshold,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrderCart = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.name} (Qty: ${item.quantity}) - Rs. ${(
            item.product.price * item.quantity
          ).toLocaleString()}`
      )
      .join('\n');

    const msg = encodeURIComponent(
      `Assalam-o-Alaikum Sasta Kitchen Bazar!\n\nI want to place an order for the following items:\n\n${itemsList}\n\nSubtotal: Rs. ${cartSubtotal.toLocaleString()}\nDelivery: ${
        shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee}`
      }\nTotal: Rs. ${cartTotal.toLocaleString()}\n\nPlease confirm my order via Cash on Delivery.`
    );

    window.open(`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#173D30] text-[#F5A623] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-stone-900 text-base font-heading">
                Shopping Cart
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-emerald-50/80 border-b border-emerald-100 text-xs">
          <div className="flex items-center justify-between font-semibold text-[#173D30] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-700" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <b className="text-stone-900">Rs. {remainingForFreeShipping.toLocaleString()}</b> more for <b className="text-emerald-700">FREE Delivery</b>!
                </span>
              ) : (
                <span className="text-emerald-800 font-bold flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> Congratulations! You got FREE Delivery!
                </span>
              )}
            </span>
            <span className="font-bold text-[11px]">{progressPercent}%</span>
          </div>

          {/* Bar */}
          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#173D30] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-400">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-base font-bold text-stone-800 mb-1">Your cart is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto mb-6">
                Looks like you haven't added any kitchen gadgets or essentials yet.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#173D30] text-white text-xs font-bold rounded-xl hover:bg-[#235846] transition"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex items-start gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200/80 transition"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 object-cover rounded-xl border border-stone-200 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-800 line-clamp-1">
                    {item.product.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-medium mt-0.5">
                    Rs. {item.product.price.toLocaleString()} each
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-stone-100 text-stone-600 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-stone-800 min-w-[1.8rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-stone-100 text-stone-600 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#173D30]">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Coupon & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Coupon Code Input */}
            {couponCode ? (
              <div className="flex items-center justify-between bg-emerald-100/70 border border-emerald-300 px-3 py-2 rounded-xl text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <Tag className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Promo {couponCode} applied</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-rose-700 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. SASTA10)"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-stone-300 rounded-xl uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-[#173D30]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold rounded-xl transition"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-stone-800">
                  Rs. {cartSubtotal.toLocaleString()}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount:</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery across Pakistan:</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    `Rs. ${shippingFee}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm sm:text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Amount:</span>
                <span className="text-[#173D30]">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[10px] text-stone-500 text-right">
                Includes all taxes • Cash on Delivery available
              </p>
            </div>

            {/* Checkout Action Button */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-[#173D30] hover:bg-[#235846] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Proceed to Checkout (COD)</span>
                <ArrowRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsAppOrderCart}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Instant Order via WhatsApp</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
