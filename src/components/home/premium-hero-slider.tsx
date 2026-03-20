'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = [
    {
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2600&auto=format&fit=crop",
        tag: "Nature's Purity",
        title: "Simplified.",
        sub: "Highest-grade natural solutions for your daily performance."
    },
    {
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2600&auto=format&fit=crop",
        tag: "Botanical Focus",
        title: "Effective.",
        sub: "Scientifically backed, lab-tested, and direct from source."
    },
    {
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2600&auto=format&fit=crop",
        tag: "Daily Rhythm",
        title: "Restorative.",
        sub: "Deep sleep and consistent energy for the modern lifestyle."
    },
    {
        image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2600&auto=format&fit=crop",
        tag: "Elite Standards",
        title: "Proven.",
        sub: "A curated collection of the world's most potent natural extracts."
    }
]

export function PremiumHeroSlider() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % SLIDES.length)
        }, 7000)
        return () => clearInterval(timer)
    }, [])

    const next = () => setIndex((prev) => (prev + 1) % SLIDES.length)
    const prev = () => setIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)

    return (
        <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                >
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 8, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={SLIDES[index].image}
                            alt={SLIDES[index].title}
                            fill
                            className="object-cover brightness-[0.7] contrast-[1.1]"
                            priority
                        />
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            
            {/* Content Container */}
            <div className="relative z-20 container-wide h-full flex flex-col justify-center px-6 lg:px-12">
                <motion.div
                    key={`content-${index}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl space-y-8 md:space-y-12"
                >
                    <div className="space-y-4 md:space-y-6">
                        <span className="inline-block text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold text-white/60">
                            {SLIDES[index].tag}
                        </span>
                        <h1 className="text-6xl md:text-[9vw] lg:text-[8vw] font-bold tracking-tighter leading-none text-white uppercase italic">
                            {SLIDES[index].title}
                        </h1>
                    </div>
                    
                    <p className="text-xl md:text-3xl text-white/70 max-w-2xl leading-relaxed font-medium italic">
                        {SLIDES[index].sub}
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 md:pt-10">
                        <Link href="/shop" className="btn-primary bg-white text-primary border-transparent">
                            Explore Top Nature
                        </Link>
                        <Link href="/about" className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white transition-colors py-4">
                            Our Standards <span className="ml-4 opacity-20">/</span> Heritage
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-12 right-6 lg:right-12 z-30 flex items-center gap-6">
                <div className="flex gap-2">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-1 transition-all duration-500 rounded-full ${index === i ? 'w-12 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                        />
                    ))}
                </div>
                <div className="flex gap-4">
                    <button onClick={prev} className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={next} className="p-4 rounded-full border border-white/10 text-white hover:bg-white hover:text-black transition-all">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Bottom Progress Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 z-30">
                <motion.div
                    key={`bar-${index}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                    className="h-full bg-primary"
                />
            </div>
        </section>
    )
}
