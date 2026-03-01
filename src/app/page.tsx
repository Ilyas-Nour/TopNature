'use client'

import { KineticHero } from "@/components/home/kinetic-hero";
import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";
import Image from "next/image";
import { useRef } from 'react';
import { ArrowRight, Shield, Sprout, Ship, Leaf, Brain } from 'lucide-react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';

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

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 5]);

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 text-white/80">
            <div className="max-w-xs transition-opacity hover:opacity-100 opacity-80">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-primary block mb-4 italic text-nowrap">Sanctuary Protocol</span>
              <p className="text-sm font-bold leading-relaxed uppercase tracking-widest text-foreground/90">Validated in Casablanca & EU Biotech Centers.</p>
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

      {/* PANORAMIC EVOLUTION WORKSPACE */}
      <motion.section
        ref={sectionRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={revealVariants}
        className="w-full section-padding-large bg-background overflow-hidden relative"
      >
        {/* ATMOSPHERIC DEPTH */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />

        <div className="w-full px-6 md:px-12 lg:px-24 mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 lg:gap-32 items-center lg:items-start">

            {/* LEFT: EDITORIAL NARRATIVE */}
            <div className="w-full lg:w-1/2 space-y-16 lg:sticky lg:top-40">
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <span className="w-16 h-[1px] bg-primary" />
                  <span className="text-[11px] uppercase tracking-[0.8em] font-bold text-primary italic">The Organic Evolution</span>
                </div>
                <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-serif font-black tracking-tighter leading-[0.9] text-foreground">
                  The Art of <br />
                  <span className="italic font-light text-primary">Botanical</span> <br />
                  Harmony.
                </h2>
                <div className="pt-8">
                  <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed font-medium italic max-w-xl">
                    Inspired by the profound intelligence of wild flora, our sanctuary protocols represent the zenith of botanical synthesis.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="space-y-6 group cursor-default"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-4xl font-serif font-black text-primary/20 group-hover:text-primary transition-colors italic">01</span>
                    <h3 className="text-2xl font-black uppercase tracking-widest">Neuro-Clarity</h3>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed italic group-hover:text-foreground transition-colors">
                    Molecular precision at the neural junction. Clearing inflammation to unveil native cognitive radiance.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="space-y-6 group cursor-default"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-4xl font-serif font-black text-primary/20 group-hover:text-primary transition-colors italic">02</span>
                    <h3 className="text-2xl font-black uppercase tracking-widest">Solar Axis</h3>
                  </div>
                  <p className="text-sm text-foreground/70 leading-relaxed italic group-hover:text-foreground transition-colors">
                    Endocrine synchronization via sun-drenched sanctuary extracts. True biological homeostasis.
                  </p>
                </motion.div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
              <motion.div
                style={{
                  y: yParallax,
                  rotateZ: rotateParallax
                }}
                className="relative aspect-[4/5] rounded-[4rem] md:rounded-[6rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-black/5 p-4 bg-white"
              >
                <div className="relative w-full h-full rounded-[3rem] md:rounded-[5rem] overflow-hidden">
                  <Image
                    src="/images/botanical-harmony.png"
                    alt="Botanical Harmony Masterpiece"
                    fill
                    priority
                    className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[10s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {/* FLOATING TEXTURE OVERLAY */}
                  <div className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstripe-light.png')]" />
                </div>
              </motion.div>

              {/* DECORATIVE ELEMENTS */}
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

              <div className="absolute top-1/2 -right-6 lg:-right-12 vertical-text">
                <span className="text-[10px] uppercase tracking-[1em] font-black text-primary/20 whitespace-nowrap">EXTRACT.22.X // SANCTUARY</span>
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
        className="w-full section-padding bg-[#F2EDE9] relative"
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')] pointer-events-none" />
        <div className="w-full px-6 md:px-12 lg:px-24 mx-auto relative z-10">
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
                  <h3 className="text-4xl md:text-5xl lg:text-5xl font-sans font-black text-white uppercase tracking-tighter leading-none">{sortedFeatured[0].name}</h3>
                  <p className="text-white/80 text-lg md:text-xl max-w-xl font-medium italic leading-relaxed hidden md:block">{sortedFeatured[0].description}</p>
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
                <p className="text-xs text-foreground/60 font-mono italic max-w-xs uppercase tracking-widest">Protocol.32.X // Active Monitoring Enabled</p>
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
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium italic">
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
