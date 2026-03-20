'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function MinimalHero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-background">
            <div className="container-wide px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                
                {/* Text Content */}
                <div className="space-y-10 z-10 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                            Premium Wellness
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none text-foreground">
                            Simplified.
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground-muted max-w-lg leading-relaxed">
                            Highest-grade natural supplements for energy, sleep, and focus. Pure, lab-tested, and effective protocols for your daily life.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-6"
                    >
                        <Link href="/shop" className="btn-primary w-full sm:w-auto">
                            Shop Essentials
                        </Link>
                        <Link href="/about" className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground hover:text-primary transition-colors py-4">
                            Our Standards
                        </Link>
                    </motion.div>
                </div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-premium bg-background-offset"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2600&auto=format&fit=crop"
                        alt="Simple Wellness"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </motion.div>
            </div>
        </section>
    )
}
