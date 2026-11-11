import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/contactInfo';
import {
  CheckCircle2,
  X,
  Printer,
  PhoneCall,
  Truck,
  ArrowRight,
  PackageCheck,
  MapPin,
  Clock,
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { lastOrder, setLastOrder } = useStore();

  if (!lastOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppTrack = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Sasta Kitchen Bazar!\n\nI recently placed an order on your website:\n🔖 Order ID: ${lastOrder.id}\n👤 Name: ${lastOrder.customerName}\n💰 Total: Rs. ${lastOrder.total.toLocaleString()}\n\nPlease confirm my order and share courier tracking updates.`
    );
    window.open(`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Success Banner */}
        <div className="p-6 bg-gradient-to-r from-[#173D30] to-[#1c4839] text-white text-center relative">
          <button
            onClick={() => setLastOrder(null)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-[#F5A623] text-[#173D30] flex items-center justify-center mx-auto mb-3 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-heading mb-1">
            Order Placed Successfully!
          </h2>
          <p className="text-xs sm:text-sm text-stone-200">
            Shukriya {lastOrder.customerName}! Your order has been registered.
          </p>

          <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono font-bold tracking-wider text-amber-300 border border-white/20">
            Order ID: {lastOrder.id}
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Delivery Promise Card */}
          <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
            <Truck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-stone-700">
              <p className="font-bold text-emerald-950">Estimated Delivery: 2 to 4 Working Days</p>
              <p className="text-stone-600 mt-0.5">
                Our team will call or WhatsApp you on <b>{lastOrder.customerPhone}</b> for verbal dispatch verification.
              </p>
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
            <p className="font-bold text-stone-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#173D30]" />
              Shipping Destination
            </p>
            <p className="font-bold text-stone-900">{lastOrder.customerName}</p>
            <p className="text-stone-600">{lastOrder.address}</p>
            <p className="text-stone-600 font-semibold">{lastOrder.city}, Pakistan</p>
            <p className="text-stone-600 mt-1">Phone / WhatsApp: <b>{lastOrder.customerPhone}</b></p>
            {lastOrder.notes && (
              <p className="mt-1 text-stone-500 italic">Notes: "{lastOrder.notes}"</p>
            )}
          </div>

          {/* Items Breakdown */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden">
            <div className="bg-stone-100 px-4 py-2 text-xs font-bold text-stone-700 flex justify-between">
              <span>Ordered Items ({lastOrder.items.length})</span>
              <span>Amount</span>
            </div>
            <div className="divide-y divide-stone-100 p-3 space-y-2">
              {lastOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover rounded-lg border border-stone-200"
                    />
                    <div>
                      <p className="font-semibold text-stone-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-[11px] text-stone-500">Qty: {item.quantity} × Rs. {item.product.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="bg-stone-50 p-3 text-xs border-t border-stone-200 space-y-1">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal:</span>
                <span>Rs. {lastOrder.subtotal.toLocaleString()}</span>
              </div>
              {lastOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Discount:</span>
                  <span>- Rs. {lastOrder.discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>Delivery:</span>
                <span>{lastOrder.shippingFee === 0 ? 'FREE' : `Rs. ${lastOrder.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-stone-900 pt-1 border-t border-stone-200">
                <span>Total Payable (COD):</span>
                <span className="text-[#173D30]">Rs. {lastOrder.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleWhatsAppTrack}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Send Order Confirmation to Store WhatsApp</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handlePrint}
                className="py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={() => setLastOrder(null)}
                className="py-2.5 bg-[#173D30] hover:bg-[#235846] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
