'use client'

import React from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Menu } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { CartDrawer } from '../cart/cart-drawer'
import { AnimatedNavLink } from '../ui/animated-nav-link'
const MobileMenu = dynamic(() => import('./mobile-menu').then(mod => mod.MobileMenu), { ssr: false })
const CartDrawerDynamic = dynamic(() => import('../cart/cart-drawer').then(mod => mod.CartDrawer), { ssr: false })

export function Navbar() {
    const itemCount = useCartStore((state) => state.getItemCount())
    const [isCartOpen, setIsCartOpen] = React.useState(false)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const handleScroll = () => setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 w-full max-w-[1400px] px-6 ${isScrolled ? 'md:top-6' : 'md:top-10'
                    }`}
            >
                <div
                    className={`w-full h-20 md:h-24 px-8 md:px-12 flex items-center justify-between rounded-full transition-all duration-700 ${isScrolled
                        ? 'bg-white/90 backdrop-blur-3xl shadow-premium border border-black/10'
                        : 'bg-transparent border border-transparent'
                        }`}
                >
                    {/* Brand Identifier */}
                    <div className="flex items-center gap-10">
                        <Link href="/" className="flex items-center gap-3 group relative z-10">
                            <span className="text-xl md:text-2xl font-serif font-black tracking-[0.1em] text-foreground uppercase text-nowrap">
                                Top<span className="text-primary italic font-light">Nature.</span>
                            </span>
                        </Link>

                        <div className="hidden lg:flex h-8 w-[1px] bg-black/5 mx-2" />

                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center gap-12">
                            {[
                                { name: 'Atelier', href: '/shop' },
                                { name: 'Philosophy', href: '/about' },
                                { name: 'The Protocol', href: '/protocol' }
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-[11px] uppercase tracking-[0.4em] font-bold text-foreground/40 hover:text-primary transition-all relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Utilities */}
                    <div className="flex items-center gap-6 md:gap-8">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-3 md:p-4 rounded-full hover:bg-black/5 transition-all text-foreground/40 hover:text-primary relative group"
                        >
                            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                            {mounted && itemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-1.5 right-1.5 h-4 w-4 bg-primary text-[8px] font-black text-white flex items-center justify-center rounded-full shadow-premium"
                                >
                                    {itemCount}
                                </motion.span>
                            )}
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="p-3 md:p-4 rounded-full hover:bg-black/5 transition-all text-foreground/40 hover:text-primary"
                        >
                            <Menu className="w-6 h-6" strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Drawer Components (Deferred via Dynamic Import) */}
            <CartDrawerDynamic isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    )
}
