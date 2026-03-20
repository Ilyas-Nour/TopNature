'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, getTotal } = useCartStore()

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
                    className="fixed inset-0 z-[200] bg-black/20 backdrop-blur-sm"
                />
            )}

            {isOpen && (
                <motion.div
                    key="cart-drawer-panel"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                    className="fixed inset-y-0 right-0 z-[210] flex h-screen w-full md:max-w-md flex-col bg-white shadow-2xl overflow-hidden border-l border-border"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-8 py-10 border-b border-border bg-background-offset">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary">Your Selection</span>
                            <h2 className="text-3xl font-bold tracking-tighter text-foreground uppercase">
                                Shopping Cart
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-3 rounded-full hover:bg-white transition-colors border border-transparent hover:border-border"
                        >
                            <X className="h-6 w-6" strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-8 py-10 scrollbar-none">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                                <div className="w-20 h-20 rounded-full bg-background-offset flex items-center justify-center text-foreground/20">
                                    <ShoppingBag className="h-8 w-8" strokeWidth={1.5} />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xl font-bold tracking-tight">Your cart is empty.</p>
                                    <p className="text-sm text-foreground-muted">Looks like you haven't added anything yet.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="btn-secondary"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-10">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-6 group">
                                        <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-2xl bg-background-offset border border-border">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                                sizes="100px"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between py-1">
                                            <div className="space-y-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-bold text-lg tracking-tight text-foreground leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-foreground/20 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                <span className="text-lg font-bold text-primary">
                                                    {item.price * item.quantity} <span className="text-[10px] ml-0.5">MAD</span>
                                                </span>
                                            </div>

                                            <div className="flex items-center rounded-full border border-border h-10 px-2 bg-white w-fit mt-4">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full hover:bg-background-offset transition-all flex items-center justify-center"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-10 text-center text-xs font-bold text-foreground">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full hover:bg-background-offset transition-all flex items-center justify-center"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-border bg-background-offset p-8 space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/40">Subtotal</span>
                                    <span className="text-3xl font-bold tracking-tighter text-foreground">{getTotal().toFixed(0)} MAD</span>
                                </div>
                                <p className="text-[10px] text-foreground/40 uppercase tracking-widest font-bold text-center">
                                    Shipping & taxes calculated at checkout
                                </p>
                            </div>

                            <Link
                                href="/checkout"
                                onClick={onClose}
                                className="btn-primary w-full py-6 flex items-center justify-center gap-3"
                            >
                                <span className="text-[12px] font-bold">Checkout Now</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
