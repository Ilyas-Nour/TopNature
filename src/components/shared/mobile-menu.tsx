'use client'

import React from 'react'
import Link from 'next/link'
import { X, ChevronRight, Instagram, Facebook, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
}

const MENU_ITEMS = [
    { label: 'Shop All', href: '/shop' },
    { label: 'New Arrivals', href: '/shop' },
    { label: 'Categories', href: '/categories' },
    { label: 'Our Story', href: '/about' },
    { label: 'The Journal', href: '/blog' },
    { label: 'Contact', href: '/contact' },
]

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm md:hidden"
                    />

                    {/* Menu Drawer */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 z-[101] w-[85%] max-w-sm bg-background shadow-2xl md:hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-8 border-b border-black/5">
                            <span className="text-2xl font-serif font-black tracking-tighter uppercase">
                                Top<span className="text-primary italic font-light">Nature.</span>
                            </span>
                            <button
                                onClick={onClose}
                                className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 active:scale-95 transition-all text-foreground/40"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 overflow-y-auto py-10 px-8">
                            <nav className="space-y-8">
                                {MENU_ITEMS.map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={onClose}
                                            className="flex items-center justify-between group"
                                        >
                                            <span className="text-3xl font-serif font-black text-foreground/80 group-active:text-primary transition-colors uppercase tracking-tight">
                                                {item.label}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-primary/30 group-hover:text-primary transition-colors" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>

                        {/* Footer / Socials */}
                        <div className="p-10 border-t border-black/5 bg-black/[0.02]">
                            <p className="text-[10px] uppercase tracking-[0.5em] font-black text-foreground/20 mb-8 italic">The Protocol Network</p>
                            <div className="flex gap-6">
                                {[
                                    { icon: Instagram, color: '#B89B5E' },
                                    { icon: Facebook, color: '#B89B5E' },
                                    { icon: MessageCircle, color: '#B89B5E' },
                                ].map((Social, i) => (
                                    <button
                                        key={i}
                                        className="w-14 h-14 rounded-full bg-white shadow-premium border border-black/5 flex items-center justify-center active:scale-90 transition-all hover:bg-primary hover:text-white group"
                                    >
                                        <Social.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
