'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const SLIDES = [
    {
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2600&auto=format&fit=crop",
        tag: "Botanical Mastery",
        title: "The Garden of \nBiological Assets.",
        sub: "Sovereign extracts for those who architect their own reality through the prism of nature."
    },
    {
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2600&auto=format&fit=crop",
        tag: "Neural Resilience",
        title: "Total Focus \nWithout Contrast.",
        sub: "Nootropic protocols engineered to align your brain's biological baseline with extreme demand."
    }
]

export function KineticHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [index, setIndex] = useState(0)
    
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % SLIDES.length)
        }, 8000)
        return () => clearInterval(timer)
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
    const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })

    const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0])
    const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.1])
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center"
        >
            {/* CINEMATIC ATMOSPHERE */}
            <motion.div
                style={{ y: yImg, scale: scaleHero, opacity: opacityHero }}
                className="absolute inset-0 z-0"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 1.15 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={SLIDES[index].image}
                            alt="Elite Wellness"
                            fill
                            className="object-cover brightness-[0.6] contrast-[1.1]"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />
            </motion.div>

            <div className="container-wide relative z-20 text-center">
                <motion.div
                    style={{ y: yText, opacity: opacityHero }}
                    className="max-w-6xl mx-auto space-y-16"
                >
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                            className="flex items-center gap-6 px-10 py-4 rounded-full border border-white/10 glass shadow-premium mx-auto w-fit"
                        >
                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.7em] font-bold text-white italic">
                                {SLIDES[index].tag}
                            </span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                            className="text-[12vw] md:text-[8vw] lg:text-[7vw] font-serif font-light tracking-tighter leading-[0.8] text-white"
                        >
                            {SLIDES[index].title.split('\n').map((line, i) => (
                                <span key={i} className={i % 2 === 1 ? 'italic block lg:pl-40' : 'block'}>
                                    {line}
                                </span>
                            ))}
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1.5 }}
                        className="text-xl md:text-3xl text-white/50 font-serif italic max-w-3xl mx-auto leading-relaxed"
                    >
                        {SLIDES[index].sub}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-12 pt-12"
                    >
                        <Link href="/shop" className="btn-primary px-16 group">
                            Explore The Vault <ArrowRight className="inline ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
                        </Link>
                        <Link href="/about" className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/30 hover:text-white transition-all duration-500">
                           Our Pedigree
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* SCROLL INDICATOR - BOUTIQUE STYLE */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 2 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8"
            >
                <span className="text-[9px] uppercase tracking-[0.8em] font-bold text-white/20 italic">Descent into the Vault</span>
                <motion.div
                    animate={{ scaleY: [0, 1, 0], originY: 0 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-24 bg-gradient-to-b from-primary/60 to-transparent"
                />
            </motion.div>
        </section>
    )
}
