'use client'

import React from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Menu } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'
import { motion } from 'framer-motion'
import { CartDrawer } from '../cart/cart-drawer'

export function Navbar() {
    const itemCount = useCartStore((state) => state.getItemCount())
    const [isCartOpen, setIsCartOpen] = React.useState(false)

    return (
        <>
            <header className="hidden md:flex sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">

                        {/* Logo Section */}
                        <div className="flex items-center gap-4">
                            <button className="lg:hidden p-2 -ml-2 text-foreground" aria-label="Open Menu">
                                <Menu className="h-6 w-6" />
                            </button>
                            <Link href="/" className="flex items-center gap-2">
                                {/* Placeholder Logo */}
                                <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-lg leading-none">E</span>
                                </div>
                                <span className="text-xl font-bold tracking-tight text-foreground hidden sm:inline-block">
                                    EcomStore
                                </span>
                            </Link>
                        </div>

                        {/* Predictive Search Placeholder */}
                        <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full h-10 pl-10 pr-4 rounded-full bg-muted/50 border border-transparent focus:bg-background focus:border-ring focus:ring-1 focus:ring-ring outline-none transition-all duration-200 text-sm"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>

                        {/* Right Section: Navigation & Cart */}
                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground mr-4">
                                <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
                                <Link href="/categories" className="hover:text-foreground transition-colors">Categories</Link>
                            </div>

                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-foreground hover:opacity-80 transition-opacity"
                            >
                                <ShoppingCart className="h-6 w-6" />
                                {itemCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        key={itemCount}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981] text-[10px] font-bold text-white shadow-sm ring-2 ring-background"
                                    >
                                        {itemCount > 99 ? '99+' : itemCount}
                                    </motion.span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Slide-out Cart Drawer safely placed outside stacking bounds */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}
