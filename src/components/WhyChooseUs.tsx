import React from 'react';
import { Banknote, Headphones, PackageCheck, Truck, ShieldCheck, Zap } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    { icon: <Zap className="h-6 w-6 text-[#1685E8]" />, title: 'Latest Digital Accessories', description: 'Explore earbuds, headphones, chargers, smart watches, power banks and useful mobile accessories.' },
    { icon: <Banknote className="h-6 w-6 text-[#1685E8]" />, title: 'Cash on Delivery', description: 'Place your order online and pay in cash when your parcel is delivered.' },
    { icon: <Headphones className="h-6 w-6 text-[#1685E8]" />, title: 'Customer Support', description: 'Contact our team by phone or WhatsApp for product questions and order assistance.' },
    { icon: <PackageCheck className="h-6 w-6 text-[#1685E8]" />, title: 'Easy Online Ordering', description: 'Browse products, check the listed price, add your selection to the cart and submit your order.' },
    { icon: <Truck className="h-6 w-6 text-[#1685E8]" />, title: 'Delivery All Over Pakistan', description: 'Enter your complete delivery address at checkout so your order can be arranged for delivery.' },
    { icon: <ShieldCheck className="h-6 w-6 text-[#1685E8]" />, title: 'Helpful Shopping Experience', description: 'Find everyday tech essentials in one convenient online store.' },
  ];
  return (
    <section className="border-b border-blue-100 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
          <span className="mb-2 inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#1558B0]">Why shop with us</span>
          <h2 className="font-heading text-2xl font-black tracking-tight text-[#10234A] sm:text-3xl md:text-4xl">Your Everyday Tech Store</h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-500 sm:text-sm">Useful accessories, simple ordering and delivery across Pakistan.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-[#F8FAFF] p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg sm:p-6">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50 transition group-hover:bg-blue-100">{benefit.icon}</span>
              <span><span className="block text-sm font-extrabold text-slate-900">{benefit.title}</span><span className="mt-1 block text-xs leading-relaxed text-slate-600">{benefit.description}</span></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
