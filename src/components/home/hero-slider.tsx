'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const SLIDES = [
    {
        title: 'The Moroccan Ritual',
        subtitle: 'Ancient Wisdom • Botanical Mastery',
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=2000&auto=format&fit=crop',
        cta: 'Explore Argan & Rosehip'
    },
    {
        title: 'Pure. Organic. Essential.',
        subtitle: 'Uncompromised Purity for Your Skin',
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2000&auto=format&fit=crop',
        cta: 'Shop Collections'
    },
    {
        title: 'Science Meets Nature',
        subtitle: 'Bio-Active Formulations',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2000&auto=format&fit=crop',
        cta: 'View Serums'
    }
]

export function HeroSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 })
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    return (
        <section className="relative h-screen w-full overflow-hidden bg-white">
            <div className="h-full w-full" ref={emblaRef}>
                <div className="flex h-full">
                    {SLIDES.map((slide, index) => (
                        <div key={index} className="relative flex-[0_0_100%] h-full min-w-0">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                priority={index === 0}
                                className="object-cover brightness-[0.9]"
                            />

                            {/* Overlay Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                <AnimatePresence mode="wait">
                                    {selectedIndex === index && (
                                        <div className="space-y-8 max-w-4xl">
                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                                className="text-[11px] uppercase tracking-[0.5em] font-bold text-white mb-4"
                                            >
                                                {slide.subtitle}
                                            </motion.p>

                                            <motion.h1
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                                className="text-6xl md:text-8xl lg:text-9xl font-serif text-white font-bold leading-tight tracking-tighter"
                                            >
                                                {slide.title}
                                            </motion.h1>

                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.8, delay: 0.6 }}
                                                className="pt-8"
                                            >
                                                <Link
                                                    href="/shop"
                                                    className="inline-block px-12 py-5 bg-black text-white rounded-full text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-all active:scale-95 shadow-2xl"
                                                >
                                                    {slide.cta}
                                                </Link>
                                            </motion.div>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-12 left-0 w-full flex items-center justify-between px-12 z-20">
                <div className="hidden md:flex gap-4">
                    <button
                        onClick={scrollPrev}
                        className="p-4 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="p-4 border border-white/20 rounded-full text-white hover:bg-white hover:text-black transition-all backdrop-blur-sm"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Pagination Dots */}
                <div className="flex gap-3">
                    {SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => emblaApi?.scrollTo(i)}
                            className={`h-[2px] transition-all duration-500 ${selectedIndex === i ? 'w-24 bg-white' : 'w-8 bg-white/30'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white opacity-40">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll Down</span>
                <div className="w-[1px] h-12 bg-white" />
            </div>
        </section>
    )
}
