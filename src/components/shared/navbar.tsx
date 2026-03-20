'use client'

import React from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const CartDrawerDynamic = dynamic(() => import('../cart/cart-drawer').then(mod => mod.CartDrawer), { ssr: false })

export function Navbar() {
    const itemCount = useCartStore((state) => state.getItemCount())
    const [isCartOpen, setIsCartOpen] = React.useState(false)
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
                    isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-8'
                }`}
            >
                <div className="container-wide flex items-center justify-between px-6 lg:px-12">
                    {/* Brand */}
                    <Link href="/" className="group flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 hidden md:flex">
                        </div>
                        <span className="text-xl font-bold tracking-tight text-foreground uppercase">
                            Top Nature
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-12">
                        {[
                            { name: 'Shop', href: '/shop' },
                            { name: 'About', href: '/about' },
                            { name: 'Contact', href: '/contact' }
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/60 hover:text-primary transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4 md:gap-8">
                        <button className="p-2 text-foreground/60 hover:text-primary transition-colors hidden md:block">
                            <Search className="w-5 h-5" strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="flex items-center gap-3 group px-4 py-2 hover:bg-background-offset rounded-full transition-all"
                        >
                            <div className="relative">
                                <ShoppingCart className="w-5 h-5 text-foreground/60 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                                {itemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                                        {itemCount}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 hidden md:block group-hover:text-primary transition-colors">Cart</span>
                        </button>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-foreground"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Simple Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center p-12 text-center"
                    >
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-8 right-8 p-4"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="flex flex-col gap-12">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Shop', href: '/shop' },
                                { name: 'About', href: '/about' },
                                { name: 'Contact', href: '/contact' }
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-4xl font-bold tracking-tighter text-foreground"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CartDrawerDynamic isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}
