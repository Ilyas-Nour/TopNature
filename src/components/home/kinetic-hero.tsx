'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants } from 'framer-motion'
import { ArrowRight, Leaf, Sparkles } from 'lucide-react'

export function KineticHero() {
    const containerRef = useRef<HTMLDivElement>(null)
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

    // Animation Variants
    const titleContainer: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.5
            }
        }
    }

    const titleItem: Variants = {
        hidden: { opacity: 0, y: 60, rotateX: 45 },
        show: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { duration: 1.2, ease: "easeOut" }
        }
    }

    const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0])
    const scaleHero = useTransform(scrollYProgress, [0, 1], [1.05, 1.15])

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen md:h-[90vh] lg:h-screen w-full bg-[#FCFAF7] overflow-hidden flex items-center justify-center pt-20"
        >
            {/* ATMOSPHERIC BACKGROUND */}
            <motion.div
                style={{ y: yImg, scale: scaleHero, opacity: opacityHero }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&q=100&w=2600"
                    alt="Botanical Pinnacle"
                    fill
                    className="object-cover opacity-[0.15] saturate-[0.8] scale-110"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FCFAF7]/40 to-[#FCFAF7]" />
            </motion.div>

            {/* DYNAMIC DEPTH ELEMENTS (Leaves following mouse) */}
            <motion.div
                style={{ x: useTransform(springX, [0, 1920], [-20, 20]), y: useTransform(springY, [0, 1080], [-20, 20]) }}
                className="absolute top-1/4 -left-20 pointer-events-none z-10 opacity-10 rotate-[-15deg] hidden lg:block"
            >
                <Leaf className="w-64 h-64 text-primary" strokeWidth={0.5} />
            </motion.div>
            <motion.div
                style={{ x: useTransform(springX, [0, 1920], [30, -30]), y: useTransform(springY, [0, 1080], [30, -30]) }}
                className="absolute bottom-1/4 -right-20 pointer-events-none z-10 opacity-10 rotate-[25deg] hidden lg:block"
            >
                <Leaf className="w-80 h-80 text-primary" strokeWidth={0.5} />
            </motion.div>

            <div className="w-full max-w-[1400px] px-8 md:px-12 relative z-20">
                <div className="flex flex-col items-center text-center space-y-12 md:space-y-16">
                    {/* TOP BADGE */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="flex items-center gap-6 px-10 py-4 rounded-full border border-primary/20 bg-white/40 backdrop-blur-xl shadow-premium group cursor-default"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        >
                            <Sparkles className="w-5 h-5 text-primary" />
                        </motion.div>
                        <span className="text-[11px] uppercase tracking-[0.6em] font-black text-primary italic">
                            The Pinnacle of Wellness
                        </span>
                    </motion.div>

                    {/* HERO TITLE - STAGGERED REVEAL */}
                    <motion.div
                        variants={titleContainer}
                        initial="hidden"
                        animate="show"
                        className="space-y-6 md:space-y-8"
                    >
                        <div className="overflow-hidden">
                            <motion.h1
                                variants={titleItem}
                                className="text-[9vw] md:text-[7vw] lg:text-[5.5rem] font-serif font-black text-foreground leading-[0.95] tracking-tighter uppercase"
                            >
                                Botanical <br />
                                <span className="text-primary italic font-light lowercase">Intelligence.</span>
                            </motion.h1>
                        </div>

                        <motion.div
                            variants={titleItem}
                            className="max-w-2xl mx-auto pt-2"
                        >
                            <p className="text-xl md:text-2xl text-foreground/75 font-medium leading-relaxed tracking-tight italic">
                                Sythesizing the world's rarest extracts into <span className="text-foreground font-black not-italic border-b border-primary/20 pb-1">refined protocols</span> for the modern spirit.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.4 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 pt-2"
                    >
                        <Link
                            href="/shop"
                            className="group relative px-14 py-5 md:px-16 md:py-6 bg-foreground text-background rounded-full overflow-hidden transition-all active:scale-95 shadow-premium"
                        >
                            <span className="relative z-10 text-[12px] uppercase tracking-[0.5em] font-black text-white">
                                Explore Atelier
                            </span>
                            <motion.div
                                className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"
                            />
                        </Link>

                        <Link href="/about" className="group flex items-center gap-8 md:gap-10 text-foreground/30 hover:text-primary transition-all">
                            <span className="text-[11px] md:text-[12px] uppercase tracking-[0.5em] font-black border-b border-transparent group-hover:border-primary pb-1">Philosophy</span>
                            <ArrowRight className="w-5 h-5 opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* SCROLL INDICATOR */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1.5 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
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
