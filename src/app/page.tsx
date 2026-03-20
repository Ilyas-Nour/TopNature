'use client'

import { PremiumHeroSlider } from "@/components/home/premium-hero-slider";
import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Moon, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Clean Energy",
      desc: "Natural protocols designed to restore your biological baseline without the crash."
    },
    {
      icon: Moon,
      title: "Restful Sleep",
      desc: "Essential nutrients formulated to help your mind and body recover deeply."
    },
    {
      icon: ShieldCheck,
      title: "Lab Tested",
      desc: "Every batch is verified for safety, purity, and potency. Professional standards only."
    }
  ];

  const categories = [
    { name: "Energy", href: "/shop?category=energy", color: "bg-primary/5", text: "Restore Focus" },
    { name: "Sleep", href: "/shop?category=sleep", color: "bg-accent/20", text: "Deep Recovery" },
    { name: "Health", href: "/shop?category=health", color: "bg-background-offset", text: "Daily Essentials" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PremiumHeroSlider />

      {/* Value Props */}
      <section className="section-padding bg-background-offset border-y border-border">
        <div className="container-wide grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-6 text-center md:text-left"
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-premium flex items-center justify-center text-primary mx-auto md:mx-0">
                <f.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-bold">{f.title}</h3>
              <p className="text-foreground-muted">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Grid Section */}
      <section className="section-padding">
        <div className="container-wide space-y-20">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Top Nature</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Your Health, <br />Perfected.</h2>
            </div>
            <Link href="/shop" className="text-[11px] uppercase tracking-[0.4em] font-bold text-foreground/40 hover:text-primary transition-colors pb-2 border-b border-border mb-4">
              Explore All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                id: '1',
                name: 'Pure Himalayan Shilajit',
                price: 650,
                imageUrl: 'https://images.unsplash.com/photo-1563203369-231a74e50d75?q=80&w=1200&auto=format&fit=crop',
                categoryName: 'Energy'
              },
              {
                id: '2',
                name: 'Organic Ashwagandha',
                price: 380,
                imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=1200&auto=format&fit=crop',
                categoryName: 'Sleep'
              },
              {
                id: '3',
                name: 'Magnesium Complex',
                price: 420,
                imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop',
                categoryName: 'Sleep'
              }
            ].map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                imageUrl={p.imageUrl}
                categoryName={p.categoryName}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Simple Categories */}
      <section className="section-padding bg-background pb-32">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((c, i) => (
              <Link
                key={i}
                href={c.href}
                className={`${c.color} p-12 rounded-3xl group transition-all hover:scale-[1.02] border border-transparent hover:border-border`}
              >
                <div className="space-y-4">
                  <h4 className="text-3xl font-bold tracking-tight">{c.name}</h4>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-foreground/40 group-hover:text-primary transition-colors">{c.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Mission */}
      <section className="py-32 bg-primary text-white text-center">
        <div className="container-wide px-6 space-y-12">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none max-w-4xl mx-auto">
                No secrets. Just standards.
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                We believe wellness should be simple. Every product we provide is sourced directly, tested thoroughly, and delivered with absolute transparency.
            </p>
            <div className="pt-8">
                <Link href="/about" className="px-12 py-6 border border-white/20 rounded-full hover:bg-white hover:text-primary transition-all font-bold uppercase tracking-widest text-xs">
                    Our Story
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
