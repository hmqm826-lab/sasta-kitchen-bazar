import React from 'react';
import {
  Banknote,
  ShieldCheck,
  Truck,
  Sparkles,
  RefreshCw,
  Headphones,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: <Banknote className="w-6 h-6 text-[#173D30]" />,
      bg: 'bg-emerald-100',
      title: 'Affordable Sasti Prices',
      urdu: 'کم قیمت، بہترین معیار',
      description:
        'Direct wholesale rates without middleman commissions. Maximum savings on every kitchen essential.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-700" />,
      bg: 'bg-emerald-100',
      title: 'Tested Quality Products',
      urdu: 'مکمل چیک شدہ پروڈکٹس',
      description:
        'Every vegetable chopper, slicer, and gadget is rigorously inspected for durability before parcel packing.',
    },
    {
      icon: <Truck className="w-6 h-6 text-[#F5A623]" />,
      bg: 'bg-amber-100',
      title: 'Cash on Delivery Nationwide',
      urdu: 'پورے پاکستان میں کیش آن ڈیلیوری',
      description:
        'Pay with confidence at your doorstep. Serving Karachi, Lahore, Islamabad, and 200+ cities & towns.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-100',
      title: 'Fast 2-4 Days Express Dispatch',
      urdu: 'تیز ترین ٹی سی ایس ڈیلیوری',
      description:
        'Quick shipment via premium courier partners (TCS, Leopard, Trax) with live SMS & tracking.',
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-[#173D30]" />,
      bg: 'bg-emerald-100',
      title: '7-Day Easy Return & Exchange',
      urdu: '7 دن کی آسان واپسی کی سہولت',
      description:
        'Peace of mind guarantee. If a product arrives defective or broken, we replace it promptly without hassle.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-emerald-800" />,
      bg: 'bg-emerald-100',
      title: '24/7 WhatsApp Helpline',
      urdu: 'ہمہ وقت واٹس ایپ سپورٹ',
      description:
        'Have a question or need advice on product usage? Our friendly support team is always a message away.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#173D30] text-xs font-bold uppercase tracking-wider mb-2">
            <span>Why Shop With Us?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#173D30] tracking-tight font-heading">
            Why Choose Sasta Kitchen Bazar?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            We are dedicated to making Pakistani homes modern, organized, and smart without burning a hole in your pocket.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-[#173D30]/40 hover:bg-emerald-50/20 transition-all duration-300 hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${b.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {b.icon}
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-stone-900 text-sm sm:text-base group-hover:text-[#173D30] transition-colors">
                    {b.title}
                  </h3>
                </div>
                <p className="text-xs font-semibold text-emerald-800 mb-2 font-urdu">
                  {b.urdu}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
