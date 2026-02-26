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
                <motion.div
                    key="cart-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                />
            )}

            {isOpen && (
                // Drawer
                <motion.div
                    key="cart-drawer-panel"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed inset-y-0 right-0 z-[100] flex h-screen w-full max-w-md flex-col bg-white shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 px-8 py-6 bg-white">
                        <h2 className="text-2xl font-serif font-bold tracking-tight text-black flex items-center gap-3">
                            Your Bag
                        </h2>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 hover:bg-gray-50 text-muted-foreground hover:text-black transition-all"
                            aria-label="Close cart"
                        >
                            <X className="h-5 w-5" strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                                <div className="w-20 h-20 rounded-full bg-[#FAFAFA] flex items-center justify-center text-muted-foreground border border-gray-50">
                                    <ShoppingBag className="h-8 w-8" strokeWidth={1} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xl font-serif font-bold text-black">Your bag is empty</p>
                                    <p className="text-muted-foreground text-[11px] uppercase tracking-widest font-bold">Discover our botanical collection</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="px-12 py-4 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95"
                                >
                                    Start Exploring
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-10">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-6 group">
                                        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#FAFAFA] border border-gray-50 text-foreground">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                sizes="96px"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between py-1">
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-start gap-4">
                                                    <h3 className="font-bold text-sm tracking-tight text-black leading-snug">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-muted-foreground hover:text-black transition-colors p-1"
                                                        aria-label={`Remove ${item.name}`}
                                                    >
                                                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Botanical Formula</p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center rounded-full border border-gray-100 h-9 px-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 rounded-full text-muted-foreground hover:bg-gray-50 hover:text-black transition-all flex items-center justify-center"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-bold text-black">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 rounded-full text-muted-foreground hover:bg-gray-50 hover:text-black transition-all flex items-center justify-center"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <span className="font-bold text-sm tracking-tight text-black flex flex-col items-end">
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5">Subtotal</span>
                                                    MAD {(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-gray-100 bg-[#FAFAFA] px-8 py-10 space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-black">
                                    <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Bag Total</span>
                                    <span className="text-2xl font-serif font-bold tracking-tight">MAD {getTotal().toFixed(2)}</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold text-center">
                                    Complimentary shipping on all ritual orders.
                                </p>
                            </div>

                            <Link
                                href="/checkout"
                                onClick={onClose}
                                className="flex w-full items-center justify-center rounded-full bg-black px-8 py-5 text-[12px] font-bold text-white uppercase tracking-[0.3em] hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/10"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    )}
                </motion.div>
            )
            }
        </AnimatePresence >
    )
}
