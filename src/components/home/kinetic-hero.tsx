'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'
import { ArrowRight, Leaf, Sparkles } from 'lucide-react'

export function KineticHero() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [index, setIndex] = useState(0)
    
    const IMAGES = [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2600&auto=format&fit=crop", // Yoga Sunrise
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2600&auto=format&fit=crop", // Meditating
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2600&auto=format&fit=crop", // Workout
        "https://images.unsplash.com/photo-1483728642387-6c3bdd6c934c?q=80&w=2600&auto=format&fit=crop"  // Running Couple
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % IMAGES.length)
        }, 6000)
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

    const xLeaf = useTransform(springX, [0, 1920], [-20, 20])
    const yLeaf = useTransform(springY, [0, 1080], [-20, 20])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full bg-background overflow-hidden flex items-center justify-center pt-20"
        >
            {/* ATMOSPHERIC BACKGROUND GALLERY */}
            <motion.div
                style={{ y: yImg, scale: scaleHero, opacity: opacityHero }}
                className="absolute inset-0 z-0"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={IMAGES[index]}
                            alt="Sovereign Wellness"
                            fill
                            className="object-cover brightness-[0.85] contrast-[1.05]"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
            </motion.div>

            {/* DYNAMIC DEPTH ELEMENTS */}
            <motion.div
                style={{ x: xLeaf, y: yLeaf, rotate: -15 }}
                className="absolute top-1/4 left-10 z-10 opacity-20 hidden lg:block"
            >
                <Leaf className="w-32 h-32 text-primary" strokeWidth={0.5} />
            </motion.div>
            <motion.div
                style={{ x: useTransform(springX, [0, 1920], [30, -30]), y: useTransform(springY, [0, 1080], [30, -30]), rotate: 25 }}
                className="absolute bottom-1/4 right-10 z-10 opacity-20 hidden lg:block"
            >
                <Leaf className="w-40 h-40 text-primary" strokeWidth={0.5} />
            </motion.div>

            <div className="w-full px-4 md:px-12 relative z-20 flex flex-col items-center text-center">
                <motion.div
                    style={{ y: yText, opacity: opacityHero }}
                    className="max-w-7xl space-y-12 md:space-y-16"
                >
                    <div className="space-y-6 md:space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="flex items-center gap-6 px-8 py-3 rounded-full border border-primary/20 bg-white/40 backdrop-blur-xl shadow-premium mx-auto w-fit"
                        >
                            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.6em] font-black text-primary italic">
                                The Sovereign Solution
                            </span>
                        </motion.div>
                        
                        <motion.h1 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                            className="text-[14vw] md:text-[9vw] lg:text-[8vw] font-serif font-black tracking-tighter leading-[0.85] text-foreground uppercase italic"
                        >
                            Radiant <br />
                            <span className="not-italic font-light text-primary lowercase tracking-tight">Vitality.</span>
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="text-lg md:text-2xl lg:text-3xl text-foreground/60 font-medium italic max-w-4xl mx-auto leading-relaxed px-4 md:px-0"
                    >
                        The definitive solution for modern high-performance seekers. <br className="hidden md:block" />
                        Restore your biological baseline with extracts engineered for absolute energy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 pt-8"
                    >
                        <Link
                            href="/shop"
                            className="btn-incredible"
                        >
                            <span>Begin Transformation</span>
                        </Link>
                        <Link
                            href="/protocol"
                            className="w-full md:w-auto text-[11px] uppercase tracking-[0.5em] font-black text-foreground/40 hover:text-primary transition-all py-4"
                        >
                            The Science <span className="mx-4 opacity-20">/</span> Protocol
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* SCROLL INDICATOR */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
            >
                <span className="text-[9px] uppercase tracking-[0.6em] font-black text-foreground/20 italic">Descent into Nature</span>
                <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[1px] h-16 bg-gradient-to-b from-primary/40 to-transparent"
                />
            </motion.div>
        </section>
    )
}
