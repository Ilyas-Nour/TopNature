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
                        className="fixed inset-y-0 left-0 z-[101] w-[85%] max-w-sm bg-white shadow-2xl md:hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <span className="text-xl font-serif font-bold">TopNature</span>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 overflow-y-auto py-8 px-6">
                            <nav className="space-y-6">
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
                                            <span className="text-2xl font-serif font-bold text-black/80 group-active:text-black transition-colors">
                                                {item.label}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-black/20" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                        </div>

                        {/* Footer / Socials */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                            <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 mb-6">Connect</p>
                            <div className="flex gap-6">
                                {[
                                    { icon: Instagram, color: '#E4405F' },
                                    { icon: Facebook, color: '#1877F2' },
                                    { icon: MessageCircle, color: '#25D366' },
                                ].map((Social, i) => (
                                    <button
                                        key={i}
                                        className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center active:scale-90 transition-transform"
                                    >
                                        <Social.icon className="w-5 h-5" style={{ color: Social.color }} />
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
