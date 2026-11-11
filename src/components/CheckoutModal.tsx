import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/contactInfo';
import {
  X,
  ShieldCheck,
  Truck,
  PhoneCall,
  CheckCircle2,
  Lock,
  CreditCard,
  Banknote,
  Smartphone,
  AlertCircle,
} from 'lucide-react';

const PAKISTAN_CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Gujranwala',
  'Sialkot',
  'Quetta',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Sukkur',
  'Wah Cantt',
  'Other City',
];

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartSubtotal,
    shippingFee,
    cartTotal,
    discountAmount,
    couponCode,
    createOrder,
    showToast,
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Lahore',
    customCity: '',
    address: '',
    notes: '',
    paymentMethod: 'cod' as 'cod' | 'jazzcash' | 'easypaisa' | 'bank',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid Pakistani mobile / WhatsApp number (e.g. 03001234567)');
      return;
    }

    if (!formData.address.trim() || formData.address.length < 8) {
      setErrorMsg('Please enter complete delivery address with house/street number');
      return;
    }

    setIsSubmitting(true);

    const chosenCity = formData.city === 'Other City' ? (formData.customCity || 'Pakistan') : formData.city;

    setTimeout(() => {
      createOrder({
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email || undefined,
        city: chosenCity,
        address: formData.address,
        notes: formData.notes || undefined,
        items: cart.map((i) => ({ product: i.product, quantity: i.quantity })),
        subtotal: cartSubtotal,
        shippingFee,
        discount: discountAmount,
        couponCode: couponCode || undefined,
        total: cartTotal,
        paymentMethod: formData.paymentMethod,
      });

      setIsSubmitting(false);
    }, 400);
  };

  const handleWhatsAppCheckoutDirect = () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      setErrorMsg('Please fill in your Name, Phone, and Address before sending to WhatsApp');
      return;
    }

    const chosenCity = formData.city === 'Other City' ? (formData.customCity || 'Pakistan') : formData.city;

    const itemsText = cart
      .map(
        (item, idx) =>
          `• ${item.product.name} (x${item.quantity}) - Rs. ${(item.product.price * item.quantity).toLocaleString()}`
      )
      .join('\n');

    const msg = encodeURIComponent(
      `Assalam-o-Alaikum Sasta Kitchen Bazar!\n\n` +
      `I want to confirm my order via Cash on Delivery:\n\n` +
      `👤 Customer Name: ${formData.name}\n` +
      `📞 WhatsApp / Phone: ${formData.phone}\n` +
      `📍 City: ${chosenCity}\n` +
      `🏠 Complete Address: ${formData.address}\n` +
      (formData.notes ? `📝 Note: ${formData.notes}\n` : '') +
      `\n🛒 Ordered Items:\n${itemsText}\n\n` +
      `💵 Total Payable on Delivery: Rs. ${cartTotal.toLocaleString()}\n\n` +
      `Please ship via TCS / Leopard Courier. Shukriya!`
    );

    window.open(`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${msg}`, '_blank');

    // Also register order in local state
    createOrder({
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email || undefined,
      city: chosenCity,
      address: formData.address,
      notes: formData.notes || undefined,
      items: cart.map((i) => ({ product: i.product, quantity: i.quantity })),
      subtotal: cartSubtotal,
      shippingFee,
      discount: discountAmount,
      couponCode: couponCode || undefined,
      total: cartTotal,
      paymentMethod: 'cod',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#173D30] to-[#1c4839] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5A623] text-[#173D30] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black font-heading">
                Cash on Delivery Checkout
              </h2>
              <p className="text-xs text-stone-200">
                Doorstep delivery across all cities in Pakistan
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Customer Information */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#173D30] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#173D30] flex items-center justify-center text-[10px]">
                1
              </span>
              Delivery Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Muhammad Kashif"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#173D30] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0300-1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#173D30] focus:bg-white"
                />
                <span className="text-[10px] text-stone-500 mt-0.5 block">
                  Courier rider will call on this number for delivery.
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  City <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#173D30] focus:bg-white"
                >
                  {PAKISTAN_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {formData.city === 'Other City' && (
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Enter Your City Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    value={formData.customCity}
                    onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#173D30]"
                  />
                </div>
              )}

              <div className={formData.city === 'Other City' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#173D30]"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Complete Street Address <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                placeholder="House #, Street #, Mohallah / Sector / Block, Landmark"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-1 focus:ring-[#173D30] focus:bg-white"
              />
            </div>

            <div className="mt-2">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Order Notes / Special Instructions <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Call before arriving, or leave with gatekeeper"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl"
              />
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div className="pt-3 border-t border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#173D30] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#173D30] flex items-center justify-center text-[10px]">
                2
              </span>
              Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Cash on Delivery */}
              <label
                className={`flex flex-col p-3 rounded-2xl border-2 cursor-pointer transition ${
                  formData.paymentMethod === 'cod'
                    ? 'border-[#173D30] bg-emerald-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Banknote className="w-4 h-4 text-emerald-800" />
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="text-[#173D30] focus:ring-[#173D30]"
                  />
                </div>
                <span className="text-xs font-bold text-stone-800">Cash on Delivery</span>
                <span className="text-[10px] text-stone-500">Pay cash to courier rider</span>
              </label>

              {/* JazzCash / EasyPaisa */}
              <label
                className={`flex flex-col p-3 rounded-2xl border-2 cursor-pointer transition ${
                  formData.paymentMethod === 'jazzcash'
                    ? 'border-[#173D30] bg-emerald-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Smartphone className="w-4 h-4 text-amber-600" />
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="jazzcash"
                    checked={formData.paymentMethod === 'jazzcash'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'jazzcash' })}
                    className="text-[#173D30] focus:ring-[#173D30]"
                  />
                </div>
                <span className="text-xs font-bold text-stone-800">JazzCash / EasyPaisa</span>
                <span className="text-[10px] text-stone-500">Fast online mobile transfer</span>
              </label>

              {/* Bank Transfer */}
              <label
                className={`flex flex-col p-3 rounded-2xl border-2 cursor-pointer transition ${
                  formData.paymentMethod === 'bank'
                    ? 'border-[#173D30] bg-emerald-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'bank' })}
                    className="text-[#173D30] focus:ring-[#173D30]"
                  />
                </div>
                <span className="text-xs font-bold text-stone-800">Direct Bank Transfer</span>
                <span className="text-[10px] text-stone-500">Meezan / HBL / UBL</span>
              </label>
            </div>

            {/* Note for JazzCash / EasyPaisa / Bank */}
            {formData.paymentMethod !== 'cod' && (
              <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <p className="font-bold mb-0.5">Payment Account Details:</p>
                <p>• <b>JazzCash / EasyPaisa (Number 1):</b> {STORE_CONTACT.phone1} (Title: {STORE_CONTACT.bankTitle})</p>
                <p>• <b>JazzCash / EasyPaisa (Number 2):</b> {STORE_CONTACT.phone2} (Title: {STORE_CONTACT.bankTitle})</p>
                <p>• <b>Meezan Bank:</b> {STORE_CONTACT.meezanBank} (Title: {STORE_CONTACT.bankTitle})</p>
                <p className="mt-1.5 text-[11px] text-stone-600">
                  Please send screenshot of payment receipt on WhatsApp at <b>{STORE_CONTACT.phone1}</b> or <b>{STORE_CONTACT.phone2}</b> with your order ID.
                </p>
              </div>
            )}
          </div>

          {/* Section 3: Order Summary Table */}
          <div className="pt-3 border-t border-stone-200 bg-stone-50 p-4 rounded-2xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              Order Summary ({cart.length} Products)
            </h3>

            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-semibold text-stone-800">Rs. {cartSubtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount ({couponCode}):</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping / Courier Fee:</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase">FREE</span>
                  ) : (
                    `Rs. ${shippingFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>Total Payable:</span>
                <span className="text-[#173D30]">Rs. {cartTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 bg-[#173D30] hover:bg-[#235846] text-white font-black text-sm rounded-2xl shadow-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
              <span>
                {isSubmitting ? 'Confirming Order...' : 'Confirm Order (Cash on Delivery)'}
              </span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppCheckoutDirect}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Confirm & Order via WhatsApp</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Safe & Secure Checkout • Open parcel verification available</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
