'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, ShoppingBag, User } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'
import { motion } from 'framer-motion'
import { CartDrawer } from '../cart/cart-drawer'

export function BottomNav() {
    const pathname = usePathname()
    const itemCount = useCartStore((state) => state.getItemCount())
    const [isCartOpen, setIsCartOpen] = React.useState(false)

    // Hide on admin routes
    if (pathname?.startsWith('/admin')) return null

    return (
        <>
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-t border-border/40 pb-safe">
                <nav className="flex items-center justify-around h-16 px-2">
                    <Link href="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>
                        <Home className="w-5 h-5" strokeWidth={pathname === '/' ? 2.5 : 2} />
                        <span className="text-[10px] font-medium">Home</span>
                    </Link>

                    <Link href="/shop" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/shop' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>
                        <Search className="w-5 h-5" strokeWidth={pathname === '/shop' ? 2.5 : 2} />
                        <span className="text-[10px] font-medium">Shop</span>
                    </Link>

                    <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-foreground transition-colors relative">
                        <div className="relative">
                            <ShoppingBag className="w-5 h-5" strokeWidth={2} />
                            {itemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    key={itemCount}
                                    className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground shadow-sm ring-2 ring-background"
                                >
                                    {itemCount}
                                </motion.span>
                            )}
                        </div>
                        <span className="text-[10px] font-medium">Cart</span>
                    </button>

                    <Link href="/account" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${pathname === '/account' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>
                        <User className="w-5 h-5" strokeWidth={pathname === '/account' ? 2.5 : 2} />
                        <span className="text-[10px] font-medium">Profile</span>
                    </Link>
                </nav>
            </div>

            {/* Slide-out Cart Drawer safely placed outside stacking bounds */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    )
}
