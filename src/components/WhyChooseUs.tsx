import React from 'react';
import { Banknote, Headphones, House, PackageCheck, Truck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: <House className="h-6 w-6 text-[#65452F]" />,
      title: 'Kitchen & Home Essentials',
      description: 'Explore handy gadgets, cooking accessories, storage solutions and useful everyday home products.',
    },
    {
      icon: <Banknote className="h-6 w-6 text-[#65452F]" />,
      title: 'Cash on Delivery',
      description: 'Place your order online and pay in cash when your parcel is delivered.',
    },
    {
      icon: <Headphones className="h-6 w-6 text-[#65452F]" />,
      title: 'Direct Customer Support',
      description: 'Contact our team by phone or WhatsApp for product questions and order assistance.',
    },
    {
      icon: <PackageCheck className="h-6 w-6 text-[#65452F]" />,
      title: 'Easy Online Ordering',
      description: 'Browse products, check the listed price, add your selection to the cart and submit your order.',
    },
    {
      icon: <Truck className="h-6 w-6 text-[#65452F]" />,
      title: 'Delivery All Over Pakistan',
      description: 'Enter your complete delivery address at checkout so your order can be arranged for delivery.',
    },
  ];

  return (
    <section className="border-b border-stone-200 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
          <span className="mb-2 inline-flex rounded-full bg-[#F0E9DA] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#65452F]">A simpler way to shop</span>
          <h2 className="font-heading text-2xl font-black tracking-tight text-[#493020] sm:text-3xl md:text-4xl">
            Shop Kitchen & Home Essentials at Sasta Kitchen Bazar
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-stone-500 sm:text-sm">
            Find useful everyday products and place your order with Cash on Delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.title} className="group flex items-start gap-4 rounded-2xl border border-stone-200 bg-[#FFFEFA] p-5 transition hover:-translate-y-0.5 hover:border-[#65452F]/30 hover:shadow-md sm:p-6">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-[#F0E9DA] transition group-hover:bg-[#E7D8BC]">
                {benefit.icon}
              </span>
              <span>
                <span className="block text-sm font-extrabold text-stone-900">{benefit.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-stone-600">{benefit.description}</span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
