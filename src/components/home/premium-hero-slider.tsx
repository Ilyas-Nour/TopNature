'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

const SLIDES = [
    {
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2600&auto=format&fit=crop",
        tag: "Nature's Restoration",
        title: "The Alchemist's Garden.",
        sub: "Highest-grade botanical solutions, ethically sourced and laboratory-verified for pure performance."
    },
    {
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2600&auto=format&fit=crop",
        tag: "Cognitive Luxury",
        title: "Total Focus.",
        sub: "Unlock the architect within. Nootropic protocols designed for long-term neural resilience."
    },
    {
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2600&auto=format&fit=crop",
        tag: "Vital Force",
        title: "True Sustenance.",
        sub: "Revitalize your biological baseline with ancient minerals and modern scientific precision."
    }
]

export function PremiumHeroSlider() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % SLIDES.length)
        }, 8000)
        return () => clearInterval(timer)
    }, [])

    const next = () => setIndex((prev) => (prev + 1) % SLIDES.length)
    const prev = () => setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <motion.div
                        initial={{ scale: 1.15 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 10, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={SLIDES[index].image}
                            alt={SLIDES[index].title}
                            fill
                            className="object-cover brightness-[0.7] contrast-[1.05]"
                            priority
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
            <div className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            
            {/* Content Container */}
            <div className="relative z-20 container-wide h-full flex flex-col justify-center">
                <div className="max-w-5xl space-y-12 md:space-y-16">
                    <motion.div
                        key={`content-${index}`}
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.6em] font-bold text-primary">
                                {SLIDES[index].tag}
                            </span>
                            <h1 className="text-[14vw] md:text-[10vw] lg:text-[9vw] xl:text-[8vw] font-serif font-light tracking-tighter leading-[0.85] text-white">
                                {SLIDES[index].title.split(' ').map((word, i) => (
                                    <span key={i} className={i % 2 === 1 ? 'italic block pl-[0.5em]' : 'block'}>
                                        {word}
                                    </span>
                                ))}
                            </h1>
                        </div>
                        
                        <p className="text-xl md:text-2xl text-white/60 max-w-2xl leading-relaxed font-sans font-medium">
                            {SLIDES[index].sub}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                            <Link href="/shop" className="btn-primary group">
                                Explore The Collection 
                                <ArrowRight className="inline ml-3 w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" />
                            </Link>
                            <Link href="/about" className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white transition-all duration-500">
                                Our Pedigree
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Nav Controls */}
            <div className="absolute bottom-12 right-6 lg:right-20 z-30 flex items-center gap-12">
                <div className="hidden lg:flex gap-4">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-0.5 transition-all duration-700 ${index === i ? 'w-24 bg-primary' : 'w-12 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
                <div className="flex gap-4">
                    <button onClick={prev} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500">
                        <ChevronLeft strokeWidth={1} className="w-6 h-6" />
                    </button>
                    <button onClick={next} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-500">
                        <ChevronRight strokeWidth={1} className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Pagination numbers */}
            <div className="absolute top-1/2 right-6 lg:right-20 transform -translate-y-1/2 z-30 hidden xl:flex flex-col gap-8 text-[11px] font-bold tracking-[0.4em] text-white/20">
                {SLIDES.map((_, i) => (
                    <span 
                        key={i} 
                        className={`transition-all duration-700 vertical-text ${index === i ? 'text-primary scale-125' : ''}`}
                    >
                        0{i + 1}
                    </span>
                ))}
            </div>
        </section>
    )
}
