'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React from 'react'

export function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait">
            <div key={pathname} className="w-full">
                {/* MAIN CONTENT FADE */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                >
                    {children}
                </motion.div>

                {/* TOP CURTAIN (Obsidian) */}
                <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ originY: 1 }}
                    className="fixed inset-0 bg-[#0A1410] z-[999] pointer-events-none"
                />

                {/* BOTTOM CURTAIN (Aged Gold) */}
                <motion.div
                    initial={{ scaleY: 1 }}
                    animate={{ scaleY: 0 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                    style={{ originY: 0 }}
                    className="fixed inset-0 bg-[#D4AF37] z-[1000] pointer-events-none"
                />
            </div>
        </AnimatePresence>
    )
}
