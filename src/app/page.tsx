'use client'

import { KineticHero } from "@/components/home/kinetic-hero";
import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Shield, Sprout, Ship, Leaf, Brain } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function Home() {
  const featuredProducts = [
    {
      id: '1',
      name: 'Himalayan Shilajit Resin',
      price: 450,
      imageUrls: ['https://images.unsplash.com/photo-1615485247881-2292025776d6?q=80&w=1000&auto=format&fit=crop'],
      description: 'The ancient "conqueror of mountains" – purified for peak human radiance.',
      category: { name: 'Resin' }
    },
    {
      id: '2',
      name: 'Ashwagandha KSM-66',
      price: 280,
      imageUrls: ['https://images.unsplash.com/photo-1628151015629-5777dfaf79dc?q=80&w=1000&auto=format&fit=crop'],
      description: 'The premier adaptogen for adrenal serenity and hormonal balance.',
      category: { name: 'Extract' }
    },
    {
      id: '3',
      name: 'Tongkat Ali 200:1',
      price: 320,
      imageUrls: ['https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1000&auto=format&fit=crop'],
      description: 'Male vitality optimization through high-fidelity root synthesis.',
      category: { name: 'Extract' }
    }
  ];

  const sortedFeatured = featuredProducts;

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <KineticHero />

      {/* BOTANICAL TRUST BAR */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={revealVariants}
        className="w-full bg-background-deep py-12 md:py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')]" />
        <div className="w-full px-8 md:px-12 lg:px-24 mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 text-white/50">
            <div className="max-w-xs transition-opacity hover:opacity-100 opacity-60">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-primary block mb-4 italic text-nowrap">Sanctuary Protocol</span>
              <p className="text-sm font-bold leading-relaxed uppercase tracking-widest text-foreground/80">Validated in Casablanca & EU Biotech Centers.</p>
            </div>

            <div className="flex flex-wrap gap-12 lg:gap-24">
              <div className="flex items-center gap-8 group">
                <Sprout className="w-6 h-6 text-primary" />
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black">Organic Sourcing</p>
                  <p className="text-[12px] italic opacity-60">Pure Wild Extracts</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group">
                <Shield className="w-6 h-6 text-primary" />
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black">Safety Protocol</p>
                  <p className="text-[12px] italic opacity-60">Clinically Verified</p>
                </div>
              </div>
              <div className="flex items-center gap-8 group">
                <Ship className="w-6 h-6 text-primary" />
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black">Global Transit</p>
                  <p className="text-[12px] italic opacity-60">Prio Security Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SUN-DRENCHED SCIENCE SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="w-full section-padding-large bg-background overflow-hidden relative pt-40 md:pt-56"
      >
        <div className="absolute top-1/2 right-0 w-[1000px] h-[1000px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full px-6 md:px-12 lg:px-24 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-6 text-center lg:text-left">
                <span className="text-[11px] uppercase tracking-[0.6em] font-bold text-primary italic">The Organic Evolution</span>
                <h2 className="font-serif font-black tracking-tight text-foreground">
                  The Art of <br />
                  <span className="italic font-light text-primary">Botanical</span> <br />
                  Harmony.
                </h2>
                <div className="h-[1px] w-20 bg-primary/30 mx-auto lg:mx-0 mt-8" />
              </div>
              <p className="text-xl text-foreground/50 leading-relaxed font-medium italic text-center lg:text-left">
                Inspired by the profound intelligence of wild flora, our sanctuary protocols represent the zenith of botanical synthesis.
              </p>

              <div className="space-y-16 pt-12">
                <div className="flex items-start gap-12 group">
                  <div className="text-6xl font-serif font-black text-black/[0.03] group-hover:text-primary/20 h-14 flex items-center transition-all duration-1000 italic">01</div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase tracking-tight text-foreground/80 group-hover:text-foreground transition-all">Neuro-Clarity</h3>
                    <p className="text-base text-foreground/30 max-w-sm group-hover:text-foreground/60 transition-colors italic">Clearing neuro-inflammation to sharpen neural radiance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-12 group border-t border-black/5 pt-16">
                  <div className="text-6xl font-serif font-black text-black/[0.03] group-hover:text-primary/20 h-14 flex items-center transition-all duration-1000 italic">02</div>
                  <div className="space-y-4">
                    <h3 className="text-3xl font-black uppercase tracking-tight text-foreground/80 group-hover:text-foreground transition-all">Solar Axis</h3>
                    <p className="text-base text-foreground/30 max-w-sm group-hover:text-foreground/60 transition-colors italic">Endocrine homeostasis via clinical-grade sanctuary extracts.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[4/5] md:aspect-video lg:aspect-square max-h-[70vh] rounded-[5rem] overflow-hidden shadow-2xl border border-black/5 group bg-white p-4">
                <div className="relative w-full h-full rounded-[4rem] overflow-hidden bg-[#0A1410]/5">
                  <Image
                    src="https://images.unsplash.com/photo-1582218771059-7d1ad0766ee2?q=100&w=2600&auto=format&fit=crop"
                    alt="Sanctuary Process"
                    fill
                    priority
                    className="object-cover scale-105 group-hover:scale-110 transition-all duration-[5s]"
                  />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CINEMATIC BENTO SHOWCASE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="w-full section-padding bg-[#FCFAF7]"
      >
        <div className="w-full px-6 md:px-12 lg:px-24 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center lg:items-end gap-12 mb-24 text-center md:text-left">
            <div className="space-y-4">
              <span className="text-[11px] uppercase tracking-[0.8em] font-black text-primary italic">Botanical Selection</span>
              <h2 className="font-serif font-black tracking-tight leading-[1.1] text-foreground uppercase">
                Cultivated <br /> Mastery.
              </h2>
            </div>
            <Link
              href="/shop"
              className="group flex items-center gap-6 text-[12px] uppercase tracking-[0.6em] font-black text-foreground/40 hover:text-primary transition-all pb-4 border-b border-black/5"
            >
              Explore Full Catalog <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
            {/* LARGE HERO BENTO */}
            {sortedFeatured[0] && (
              <div className="lg:col-span-8 lg:row-span-2 relative group rounded-[4rem] overflow-hidden border border-black/5 bg-white shadow-2xl min-h-[500px]">
                <Image
                  src={sortedFeatured[0].imageUrls[0]}
                  alt={sortedFeatured[0].name}
                  fill
                  className="object-cover transition-transform duration-[6s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-x-8 md:inset-x-12 bottom-8 md:bottom-12 space-y-6">
                  <div className="flex items-center gap-6">
                    <span className="px-6 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl text-[10px] uppercase tracking-[0.4em] font-black text-white">Advanced Protocol</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-white uppercase tracking-tighter leading-none">{sortedFeatured[0].name}</h3>
                  <p className="text-white/60 text-lg md:text-xl max-w-xl font-medium italic leading-relaxed hidden md:block">{sortedFeatured[0].description}</p>
                  <Link href={`/shop`} className="inline-flex items-center gap-8 py-5 px-12 bg-primary text-white rounded-full uppercase tracking-[0.4em] font-black text-[12px] hover:bg-white hover:text-black transition-all shadow-solar-glow">
                    View Protocol <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            )}

            {/* SECONDARY BENTOS */}
            {sortedFeatured.slice(1).map((product: any, i) => (
              <div key={product.id} className="lg:col-span-4 relative group rounded-[4rem] overflow-hidden border border-black/5 bg-white shadow-xl min-h-[350px]">
                <Image
                  src={product.imageUrls[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-[5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-x-10 bottom-10 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-sans font-black text-white uppercase tracking-tighter leading-tight">{product.name}</h3>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-primary font-bold tracking-widest uppercase text-xs">{product.price.toFixed(0)} MAD</span>
                    <Link href={`/shop`} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <div className="lg:col-span-4 relative rounded-[4rem] border border-primary/20 bg-white shadow-xl flex items-center justify-center p-12 overflow-hidden opacity-80 min-h-[250px]">
              <div className="text-center space-y-6 relative z-10">
                <Brain className="w-16 h-16 text-primary mx-auto opacity-40" />
                <span className="block text-[10px] uppercase tracking-[0.6em] font-black text-primary">Biotech Synthesis</span>
                <p className="text-xs text-foreground/40 font-mono italic max-w-xs uppercase tracking-widest">Protocol.32.X // Active Monitoring Enabled</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ALABASTER PHILOSOPHY SPLIT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="w-full bg-background-deep section-padding-large relative overflow-hidden"
      >
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="w-full px-6 md:px-12 lg:px-24 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-24">
            <div className="relative order-2 lg:order-1">
              <div className="relative w-full h-[600px] md:h-[800px] rounded-[5rem] overflow-hidden shadow-2xl border border-white/5 bg-background p-4">
                <div className="relative w-full h-full rounded-[4rem] overflow-hidden bg-white/5">
                  <Image
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=100&w=2000&auto=format&fit=crop"
                    alt="Sanctuary Philosophy"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-[6s]"
                  />
                  <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 space-y-12">
              <div className="space-y-6">
                <span className="text-[11px] uppercase tracking-[0.8em] font-black text-primary block italic">Our Manifest</span>
                <h2 className="font-serif font-black tracking-tight text-white uppercase">
                  Botanical <br /> Heritage. <br /> <span className="italic font-light text-primary">Organic</span> <br /> Purity.
                </h2>
                <div className="h-[1px] w-24 bg-primary/30 mt-8" />
              </div>
              <p className="text-xl md:text-2xl text-white/50 leading-relaxed font-medium italic">
                We bridge the gap between ancient sanctuary regimens and high-fidelity botanical synthesis. Every extract is a testament to the enduring wisdom of the Earth.
              </p>
              <div className="pt-10">
                <Link
                  href="/about"
                  className="group relative px-12 md:px-20 py-6 md:py-8 bg-primary text-white rounded-full overflow-hidden transition-all active:scale-95 inline-block shadow-2xl text-center"
                >
                  <span className="relative z-10 text-[12px] uppercase tracking-[0.6em] font-black text-white">Learn Protocol</span>
                  <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                  <div className="absolute inset-0 bg-primary group-hover:bg-white transition-colors" />
                  <span className="relative z-10 text-[12px] uppercase tracking-[0.6em] font-black text-white group-hover:text-black">Learn Protocol</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
