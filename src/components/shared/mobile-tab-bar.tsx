'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Grid, ShoppingBag, User } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'
import { motion, AnimatePresence } from 'framer-motion'
import { CartDrawer } from '../cart/cart-drawer'

export function MobileTabBar() {
    const pathname = usePathname()
    const itemCount = useCartStore((state) => state.getItemCount())
    const [isCartOpen, setIsCartOpen] = React.useState(false)

    // Hide on admin routes
    if (pathname?.startsWith('/admin')) return null

    return (
        <>
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F9F6F0]/80 backdrop-blur-xl border-t border-[#1A2421]/10 pb-safe">
                <nav className="flex items-center justify-around h-16 px-2">
                    <Link href="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${pathname === '/' ? 'text-[#1A2421]' : 'text-[#1A2421]/50 hover:text-[#1A2421]'}`}>
                        <Home className="w-5 h-5" strokeWidth={pathname === '/' ? 2.5 : 2} />
                        <span className="text-[10px] font-medium tracking-wide">Home</span>
                    </Link>

                    <Link href="/shop" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${pathname === '/shop' ? 'text-[#1A2421]' : 'text-[#1A2421]/50 hover:text-[#1A2421]'}`}>
                        <Grid className="w-5 h-5" strokeWidth={pathname === '/shop' ? 2.5 : 2} />
                        <span className="text-[10px] font-medium tracking-wide">Shop</span>
                    </Link>

                    <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center justify-center w-full h-full space-y-1 text-[#1A2421]/50 hover:text-[#1A2421] transition-colors relative">
                        <div className="relative">
                            <ShoppingBag className="w-5 h-5" strokeWidth={2} />
                            <AnimatePresence>
                                {itemCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        key={itemCount}
                                        className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C65D47] text-[8px] font-bold text-white shadow-sm ring-2 ring-[#F9F6F0]"
                                    >
                                        {itemCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                        <span className="text-[10px] font-medium tracking-wide">Cart</span>
                    </button>

                    <Link href="/account" className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${pathname === '/account' ? 'text-[#1A2421]' : 'text-[#1A2421]/50 hover:text-[#1A2421]'}`}>
                        <User className="w-5 h-5" strokeWidth={pathname === '/account' ? 2.5 : 2} />
                        <span className="text-[10px] font-medium tracking-wide">Profile</span>
                    </Link>
                </nav>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}
