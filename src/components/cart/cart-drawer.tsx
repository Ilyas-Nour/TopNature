'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore()

    // Prevent background scrolling when drawer is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

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
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-4 bg-background">
                            <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                                <ShoppingBag className="h-5 w-5" />
                                Shopping Cart
                            </h2>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 bg-background">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                    <div className="rounded-full bg-muted p-6 text-muted-foreground">
                                        <ShoppingBag className="h-12 w-12" />
                                    </div>
                                    <p className="text-lg font-medium text-foreground">Your cart is currently empty</p>
                                    <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
                                    <button
                                        onClick={onClose}
                                        className="mt-4 rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 border-b border-border/50 pb-6 last:border-0">
                                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-secondary border border-border/50 text-foreground">
                                                <Image
                                                    src={item.imageUrl}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                />
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between">
                                                <div className="flex justify-between gap-2">
                                                    <h3 className="font-medium text-sm line-clamp-2 leading-tight text-foreground">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-muted-foreground hover:text-[#EF4444] transition-colors p-1 -mt-1 -mr-1"
                                                        aria-label={`Remove ${item.name}`}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center rounded-md border border-border h-8">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="px-2 h-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center justify-center"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="px-2 h-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center justify-center"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                    <span className="font-semibold text-foreground">MAD {(item.price * item.quantity).toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-border/50 bg-muted/10 px-6 py-6 shadow-sm z-10">
                                <div className="mb-4 flex items-center justify-between text-lg font-semibold text-foreground">
                                    <span>Total</span>
                                    <span>MAD {getTotal().toFixed(2)}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <Link
                                    href="/checkout"
                                    onClick={onClose}
                                    className="flex w-full items-center justify-center rounded-full bg-[#2563EB] px-8 py-4 text-base font-bold text-white shadow-md hover:bg-[#1D4ED8] transition-colors focus:ring-4 focus:ring-blue-500/30"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
