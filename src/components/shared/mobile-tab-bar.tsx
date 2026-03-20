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
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (pathname?.startsWith('/admin')) return null

    const navItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Grid, label: 'Shop', href: '/shop' },
        { icon: User, label: 'Profile', href: '/account' }
    ]

    return (
        <>
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-border pb-safe">
                <nav className="flex items-center justify-around h-20">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link 
                                key={item.label}
                                href={item.href} 
                                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-foreground/40'}`}
                            >
                                <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                            </Link>
                        )
                    })}

                    <button 
                        onClick={() => setIsCartOpen(true)} 
                        className="flex flex-col items-center justify-center w-full h-full space-y-1 text-foreground/40 relative"
                    >
                        <div className="relative">
                            <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                            <AnimatePresence>
                                {mounted && itemCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white shadow-sm"
                                    >
                                        {itemCount}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Cart</span>
                    </button>
                </nav>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}
