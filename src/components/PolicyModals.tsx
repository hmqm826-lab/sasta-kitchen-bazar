import { X, ShieldCheck, RefreshCw, FileText, PhoneCall, Mail, MapPin, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_CONTACT } from '../data/contactInfo';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'refund' | 'contact' | 'wishlist' | null;
  onClose: () => void;
}

export const PolicyModals: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  const { wishlist, products, addToCart, toggleWishlist, openProductModal } = useStore();

  if (!type) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#173D30] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            {type === 'refund' && <RefreshCw className="w-5 h-5 text-[#F5A623]" />}
            {type === 'privacy' && <ShieldCheck className="w-5 h-5 text-[#F5A623]" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-[#F5A623]" />}
            {type === 'contact' && <PhoneCall className="w-5 h-5 text-[#F5A623]" />}
            {type === 'wishlist' && <span className="text-lg">❤️</span>}

            <h3 className="font-black text-base font-heading">
              {type === 'refund' && '7-Day Easy Return & Refund Policy'}
              {type === 'privacy' && 'Privacy Policy & Data Security'}
              {type === 'terms' && 'Terms & Conditions of Service'}
              {type === 'contact' && 'Contact Us & Courier Tracking'}
              {type === 'wishlist' && `My Wishlist (${wishlistProducts.length} Saved)`}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto text-xs sm:text-sm text-stone-700 space-y-4 leading-relaxed">
          {type === 'refund' && (
            <>
              <p className="font-bold text-stone-900">Our Customer Satisfaction Guarantee:</p>
              <p>
                At <b>Sasta Kitchen Bazar</b>, we strive to ensure you receive 100% genuine and fully functioning kitchen accessories and home gadgets.
              </p>
              <h4 className="font-bold text-[#173D30]">1. Eligibility for Return / Replacement:</h4>
              <ul className="list-disc list-inside space-y-1 text-stone-600">
                <li>Defective, malfunctioning, or broken item received upon parcel arrival.</li>
                <li>Incorrect item or color dispatched compared to your invoice order.</li>
                <li>Claim must be initiated within <b>7 days</b> of courier delivery.</li>
              </ul>
              <h4 className="font-bold text-[#173D30]">2. Simple Return Process:</h4>
              <p>
                1. Take a short 10-second unboxing video or clear photo of the defective item.
                <br />
                2. WhatsApp our customer care at <b>{STORE_CONTACT.phone1}</b> or <b>{STORE_CONTACT.phone2}</b> with your Order ID.
                <br />
                3. Our courier rider will deliver your replacement or process your JazzCash/EasyPaisa refund within 3 business days.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p className="font-bold text-stone-900">Cash on Delivery & Shopping Guidelines:</p>
              <p>
                By placing an order on Sasta Kitchen Bazar, you agree to these standard terms:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-stone-600">
                <li><b>Order Confirmation:</b> A verification phone call or WhatsApp message is sent prior to courier dispatch. Orders without valid phone numbers cannot be shipped.</li>
                <li><b>Courier Delivery:</b> Standard shipping takes 2 to 4 working days via TCS, Leopard, or Trax Courier across Pakistan.</li>
                <li><b>Payment:</b> Cash is to be handed to the rider at your delivery address. Riders cannot open sealed parcels before payment due to courier policies, but your order is protected by our 7-Day Exchange Policy.</li>
                <li><b>Pricing:</b> All product prices are quoted in Pakistani Rupees (PKR) and include local sales taxes.</li>
              </ul>
            </>
          )}

          {type === 'privacy' && (
            <>
              <p className="font-bold text-stone-900">Your Privacy is Fully Protected:</p>
              <p>
                We only collect necessary delivery details (Your Name, Phone Number, City, and Postal Address) exclusively for courier parcel fulfillment.
              </p>
              <p>
                We <b>never sell, rent, or share</b> your contact details with external third-party advertisers. All order history and customer details are stored securely.
              </p>
            </>
          )}

          {type === 'contact' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <p className="font-bold text-[#173D30] text-sm mb-1">Official WhatsApp & Phone Helpline</p>
                <p className="text-xs text-stone-600 mb-3">
                  Aap in dono numbers par WhatsApp message ya call kar ke order book, track ya product ki inquiry kar sakte hain:
                </p>

                {/* Number 1 */}
                <div className="bg-white p-3 rounded-xl border border-emerald-200 mb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Helpline 1 (Sales & Direct Orders)
                    </span>
                    <span className="text-base font-black text-stone-900 font-mono">
                      {STORE_CONTACT.phone1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${STORE_CONTACT.phone1WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg inline-flex items-center gap-1 shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Chat</span>
                    </a>
                    <a
                      href={`tel:${STORE_CONTACT.phone1Raw}`}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg inline-flex items-center gap-1 border border-stone-200"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>

                {/* Number 2 */}
                <div className="bg-white p-3 rounded-xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      Helpline 2 (Customer Support & Tracking)
                    </span>
                    <span className="text-base font-black text-stone-900 font-mono">
                      {STORE_CONTACT.phone2}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${STORE_CONTACT.phone2WhatsApp}?text=Assalam-o-Alaikum%20Sasta%20Kitchen%20Bazar`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg inline-flex items-center gap-1 shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Chat</span>
                    </a>
                    <a
                      href={`tel:${STORE_CONTACT.phone2Raw}`}
                      className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg inline-flex items-center gap-1 border border-stone-200"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Call</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#173D30] flex-shrink-0 mt-0.5" />
                  <span><b>Wholesale Hub:</b> {STORE_CONTACT.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#173D30] flex-shrink-0" />
                  <span><b>Support Email:</b> {STORE_CONTACT.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 flex items-center justify-center font-bold text-[#173D30]">⏰</span>
                  <span><b>Timings:</b> {STORE_CONTACT.hours}</span>
                </div>
              </div>
            </div>
          )}

          {type === 'wishlist' && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-stone-400 text-4xl mb-2">🤍</p>
                  <p className="font-bold text-stone-800">Your wishlist is empty</p>
                  <p className="text-xs text-stone-500 mt-1">
                    Click the heart icon on any product to save it for later.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                      <div
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                        onClick={() => {
                          openProductModal(p);
                          onClose();
                        }}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 rounded-xl object-cover border border-stone-200"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-xs text-stone-900 truncate">{p.name}</p>
                          <p className="text-xs font-black text-[#173D30]">
                            Rs. {p.price.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            addToCart(p, 1);
                            onClose();
                          }}
                          className="px-3 py-1.5 bg-[#173D30] text-white font-bold text-xs rounded-lg hover:bg-[#235846] transition"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                          title="Remove from wishlist"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
