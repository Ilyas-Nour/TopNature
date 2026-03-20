'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, ArrowRight, Search } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'
import { useRouter } from 'next/navigation'

const NAV_LINKS = [
    { name: 'Collection', href: '/shop' },
    { name: 'Protocol', href: '/protocol' },
    { name: 'Journal', href: '/blog' },
    { name: 'Heritage', href: '/about' },
    { name: 'Contact', href: '/contact' }
]

export function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const cartCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0))
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
            setSearchOpen(false)
            setSearchQuery('')
        }
    }

    return (
        <header 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
                scrolled ? 'py-4 glass border-b' : 'py-8'
            }`}
        >
            <nav className="container-wide flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative group">
                    <span className={`text-2xl md:text-3xl font-serif tracking-tighter transition-colors duration-500 ${
                        scrolled ? 'text-foreground' : 'text-foreground md:text-white'
                    }`}>
                        Top Nature
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-12">
                    {NAV_LINKS.map((link) => (
                        <Link 
                            key={link.name}
                            href={link.href}
                            className={`text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 hover:text-primary ${
                                scrolled ? 'text-foreground/60' : 'text-white/60 hover:text-white'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => setSearchOpen(true)}
                        className={`p-2 transition-colors duration-500 ${
                            scrolled ? 'text-foreground' : 'text-foreground md:text-white'
                        }`}
                    >
                        <Search strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    <Link 
                        href="/cart"
                        className={`relative p-2 transition-colors duration-500 ${
                            scrolled ? 'text-foreground' : 'text-foreground md:text-white'
                        }`}
                    >
                        <ShoppingBag strokeWidth={1.5} className="w-5 h-5 md:w-6 md:h-6" />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[8px] flex items-center justify-center rounded-full font-bold shadow-sm"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    <button 
                        onClick={() => setMobileMenuOpen(true)}
                        className={`md:hidden p-2 ${scrolled ? 'text-foreground' : 'text-foreground'}`}
                    >
                        <Menu strokeWidth={1.5} className="w-6 h-6 " />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 bg-background z-[60] flex flex-col p-10"
                    >
                        <div className="flex justify-between items-center mb-20">
                            <span className="text-2xl font-serif">Top Nature</span>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X strokeWidth={1.5} className="w-8 h-8" />
                            </button>
                        </div>
                        
                        <div className="space-y-10">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link 
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-5xl font-serif tracking-tighter"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto space-y-8">
                            <Link 
                                href="/shop" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="btn-primary w-full text-center py-6"
                            >
                                Shop Collection <ArrowRight className="inline ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-3xl z-[70] flex flex-col items-center justify-center p-10"
                    >
                        <button 
                            onClick={() => setSearchOpen(false)}
                            className="absolute top-12 right-12 p-4 text-foreground/40 hover:text-primary transition-colors"
                        >
                            <X strokeWidth={1} className="w-12 h-12" />
                        </button>
                        
                        <div className="w-full max-w-5xl space-y-12">
                            <span className="text-[10px] uppercase tracking-[0.8em] font-bold text-primary block text-center">Protocol Search</span>
                            <form onSubmit={handleSearch} className="relative group">
                                <input 
                                    autoFocus
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search the biological vault..." 
                                    className="w-full bg-transparent border-b border-border py-12 text-5xl md:text-7xl font-serif italic tracking-tighter focus:border-primary outline-none transition-all placeholder:text-foreground/5 text-center"
                                />
                                <button type="submit" className="absolute right-0 bottom-12 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-12 h-12" />
                                </button>
                            </form>
                            <p className="text-center text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/20">
                                Press Enter to initiate telemetry search
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
