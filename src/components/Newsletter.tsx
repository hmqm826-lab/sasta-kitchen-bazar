import React, { useState } from 'react';
import { Mail, CheckCircle2, Copy, Sparkles, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Newsletter: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! 🎉', 'You have unlocked the 10% OFF discount coupon code!');
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('SASTA10');
    setCopied(true);
    showToast('Coupon Copied! ✂️', 'Code "SASTA10" copied to clipboard. Paste at checkout for 10% off.');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="py-14 sm:py-16 bg-[#173D30] text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#F5A623] text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VIP Kitchen Club Deals</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight font-heading mb-3">
          Stay Updated With Sasta Kitchen Bazar
        </h2>

        <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
          Subscribe to receive weekly flash deals, newly arrived kitchen gadgets, and secret discount coupons directly in your inbox.
        </p>

        {!subscribed ? (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-stretch justify-center max-w-md mx-auto gap-2.5"
          >
            <div className="relative flex-1">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-stone-400 border border-white/20 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:bg-white/20 transition"
              />
              <Mail className="w-4 h-4 text-stone-300 absolute left-3.5 top-3.5" />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#F5A623] hover:bg-[#e09315] text-[#173D30] font-black text-xs sm:text-sm rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-md mx-auto animate-in zoom-in-95">
            <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm mb-2">
              <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
              <span>Congratulations! Your Discount Code is Ready</span>
            </div>
            <p className="text-xs text-stone-300 mb-4">
              Use code below during checkout for an extra 10% discount on your entire order:
            </p>

            <div className="flex items-center justify-between bg-black/40 px-4 py-2.5 rounded-xl border border-white/20">
              <span className="font-mono font-black text-lg text-[#F5A623] tracking-widest">
                SASTA10
              </span>
              <button
                onClick={copyCoupon}
                className="flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-lg transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        )}

        <p className="text-[11px] text-stone-400 mt-4">
          No spam ever. Unsubscribe at any time with a single click.
        </p>
      </div>
    </section>
  );
};
