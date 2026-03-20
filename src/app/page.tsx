'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PremiumHeroSlider } from "@/components/home/premium-hero-slider"
import { ProductCard } from "@/components/ui/product-card"
import { ArrowUpRight, Sparkles } from 'lucide-react'

export default function Home() {
    const transformationRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: transformationRef,
        offset: ["start end", "end start"]
    })

    const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])

    return (
        <div className="flex flex-col min-h-screen">
            <PremiumHeroSlider />

            {/* Trust Signals / Features */}
            <section className="py-20 border-b border-border bg-white overflow-hidden relative">
                <div className="container-wide">
                    <div className="flex flex-wrap items-center justify-between gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
                        <span className="text-[10px] font-bold tracking-[0.6em] uppercase italic">Purity Verified</span>
                        <span className="text-[10px] font-bold tracking-[0.6em] uppercase italic">100% Organic</span>
                        <span className="text-[10px] font-bold tracking-[0.6em] uppercase italic">Direct Sourced</span>
                        <span className="text-[10px] font-bold tracking-[0.6em] uppercase italic">Lab Tested</span>
                    </div>
                </div>
            </section>

            {/* The Vault - Best Sellers */}
            <section className="section-padding bg-background-offset">
                <div className="container-wide">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32 md:mb-48">
                        <div className="space-y-8 max-w-2xl">
                            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary block">The Collection</span>
                            <h2 className="text-7xl md:text-9xl lg:text-[8vw] font-serif font-light leading-[0.8] tracking-tighter">
                                The <span className="italic">Essential</span> <br /> Protocols.
                            </h2>
                        </div>
                        <Link href="/shop" className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/40 hover:text-primary transition-all duration-700 pb-2 border-b border-border">
                            Explore The Vault <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-32">
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
                                name: 'Organic Ashwagandha KSM-66',
                                price: 350,
                                imageUrl: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=1200&auto=format&fit=crop',
                                categoryName: 'Sleep'
                            },
                            {
                                id: '3',
                                name: 'Lions Mane Neuro-Extract',
                                price: 480,
                                imageUrl: 'https://images.unsplash.com/photo-1628243344914-6c5513d07243?q=80&w=1200&auto=format&fit=crop',
                                categoryName: 'Mind'
                            }
                        ].map((p, i) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <ProductCard {...p} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Parallax Marketing Section - The Transformation */}
            <section ref={transformationRef} className="section-padding bg-black text-white relative overflow-hidden h-[120vh] flex items-center">
                <motion.div 
                    style={{ y: yParallax }}
                    className="absolute inset-0 opacity-40 pointer-events-none"
                >
                    <Image 
                        src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2600&auto=format&fit=crop" 
                        alt="Aesthetic Background"
                        fill
                        className="object-cover scale-110"
                    />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black z-0" />
                
                <div className="relative z-10 container-wide grid grid-cols-1 lg:grid-cols-2 gap-32 lg:gap-56 items-center">
                    <div className="space-y-16">
                        <div className="space-y-8">
                            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary block">Our Philosophy</span>
                            <h2 className="text-6xl md:text-8xl lg:text-[7vw] font-serif font-light leading-[0.85] tracking-tighter">
                                Excellence is <br /><span className="italic pl-20 lg:pl-40">Biological.</span>
                            </h2>
                        </div>
                        <p className="text-2xl text-white/40 leading-relaxed font-serif italic max-w-xl">
                            "We don't sell supplements. We sell the architecture of human performance. Every molecule is curated for those who demand the absolute peak of reality."
                        </p>
                        <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/10">
                            {[
                                { title: '01', sub: 'Purity Protocols', desc: 'Every batch verified.' },
                                { title: '02', sub: 'Direct Sourcing', desc: 'From heritage biomes.' }
                            ].map((item, i) => (
                                <div key={i} className="space-y-4">
                                    <span className="text-primary font-serif italic text-3xl">{item.title}</span>
                                    <h4 className="text-[10px] uppercase tracking-widest font-bold tracking-[0.4em]">{item.sub}</h4>
                                    <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative aspect-[3/4] rounded-[5rem] overflow-hidden group shadow-2xl"
                    >
                        <Image 
                            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1200&auto=format&fit=crop" 
                            alt="Wellness"
                            fill
                            className="object-cover transition-transform duration-2000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply opacity-50 transition-opacity group-hover:opacity-0" />
                    </motion.div>
                </div>
            </section>

            {/* Mission / SEO Section */}
            <section className="section-padding bg-background">
                <div className="container-wide text-center space-y-24">
                    <div className="max-w-5xl mx-auto space-y-16">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="w-12 h-12 mx-auto"
                        >
                            <Sparkles className="w-full h-full text-primary opacity-30" />
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.9] tracking-tighter italic lg:px-20">
                            "A better life begins with a higher standard for what you put into your body."
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-16">
                            <Link href="/about" className="btn-secondary px-20">
                                Our Standards
                            </Link>
                            <Link href="/shop" className="btn-primary px-20">
                                Shop The Vault
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
