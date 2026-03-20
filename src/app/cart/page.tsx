'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'

export default function CartPage() {
    const { items, removeItem, updateQuantity } = useCartStore()
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-32 pb-32">
                <div className="container-wide text-center space-y-12">
                    <div className="w-24 h-24 bg-background-offset rounded-full flex items-center justify-center mx-auto opacity-20">
                        <ShoppingBag className="w-10 h-10 text-primary" strokeWidth={1} />
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tighter">Your Vault <br /><span className="italic">is empty.</span></h1>
                        <p className="text-xl text-foreground-muted max-w-md mx-auto italic">True optimization begins with your first selection.</p>
                    </div>
                    <div className="pt-8">
                        <Link href="/shop" className="btn-primary group">
                            Explore The Vault <ArrowRight className="inline ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-48 pb-48">
            <div className="container-wide">
                <div className="flex flex-col lg:row items-center justify-between mb-24 gap-8">
                    <div className="space-y-4 text-center lg:text-left">
                        <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary block">Your Selection</span>
                        <h1 className="text-7xl md:text-9xl font-serif font-light tracking-tighter leading-[0.8]">
                            The <span className="italic">Curator.</span>
                        </h1>
                    </div>
                    <Link href="/shop" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/30 hover:text-primary transition-all">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Vault
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    {/* Cart Items */}
                    <div className="lg:col-span-8 space-y-12">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="flex flex-col md:flex-row items-center gap-10 p-10 bg-white rounded-[3rem] border border-border shadow-card group"
                                >
                                    <div className="relative w-40 h-40 rounded-2xl overflow-hidden bg-background-offset shrink-0">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                    
                                    <div className="flex-1 space-y-4 text-center md:text-left">
                                        <h3 className="text-3xl font-serif tracking-tight">{item.name}</h3>
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-8">
                                            <div className="flex items-center gap-6 glass rounded-full px-6 py-2 border border-border/10">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="p-1 hover:text-primary transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:text-primary transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="text-xl font-bold tracking-tight text-primary">
                                                {(item.price * item.quantity).toFixed(0)} <span className="text-[10px] uppercase text-foreground/20 ml-1">MAD</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        className="p-4 rounded-full border border-border/10 text-foreground/20 hover:text-red-500 hover:border-red-500/20 transition-all duration-500"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4 sticky top-48">
                        <div className="bg-white p-12 rounded-[4rem] border border-border shadow-premium space-y-12">
                            <h3 className="text-3xl font-serif tracking-tight">Summary</h3>
                            
                            <div className="space-y-6 text-[10px] uppercase tracking-widest font-bold">
                                <div className="flex justify-between items-center pb-4 border-b border-border opacity-40">
                                    <span>Subtotal</span>
                                    <span>{total.toFixed(0)} MAD</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-border opacity-40">
                                    <span>Shipping</span>
                                    <span className="text-primary italic">Free</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 text-xl tracking-tight text-foreground font-serif lowercase italic">
                                    <span>Total Value</span>
                                    <span className="not-italic font-bold text-3xl font-sans text-primary">/{total.toFixed(0)} MAD</span>
                                </div>
                            </div>

                            <div className="pt-8 space-y-6">
                                <Link href="/checkout" className="btn-primary w-full text-center py-8">
                                    Proceed to Checkout
                                </Link>
                                <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-center text-foreground/20">
                                    Secured by Universal Protocols
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
