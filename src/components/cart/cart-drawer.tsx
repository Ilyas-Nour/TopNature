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
                    className="fixed inset-0 z-[100] bg-white/40 backdrop-blur-3xl"
                />
            )}

            {isOpen && (
                <motion.div
                    key="cart-drawer-panel"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 35, stiffness: 250 }}
                    className="fixed inset-y-0 right-0 z-[110] flex h-screen w-full max-w-2xl flex-col bg-[#FAF9F6]/95 backdrop-blur-[60px] shadow-2xl overflow-hidden border-l border-black/5"
                >
                    {/* Header: Editorial Style */}
                    <div className="flex items-center justify-between border-b border-black/5 px-12 py-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="space-y-3 relative z-10">
                            <span className="text-[11px] uppercase tracking-[0.6em] font-bold text-primary">Solar Protocol</span>
                            <h2 className="text-5xl font-serif font-black tracking-tight uppercase whitespace-nowrap text-foreground">
                                The <span className="italic font-light">Curation.</span>
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all group relative z-10"
                        >
                            <X className="h-6 w-6" strokeWidth={1.5} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-12 py-16 scrollbar-none relative">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-12">
                                <div className="w-32 h-32 rounded-full border border-black/5 flex items-center justify-center text-primary relative group bg-white shadow-xl">
                                    <div className="absolute inset-0 bg-primary/20 blur-[30px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                                    <ShoppingBag className="h-10 w-10 relative z-10" strokeWidth={1} />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-4xl font-serif font-bold italic text-foreground">Sanctuary Empty.</p>
                                    <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-foreground/20 italic">Awaiting solar intent</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="px-16 py-6 bg-foreground text-background rounded-full text-[12px] font-black uppercase tracking-[0.6em] hover:bg-primary transition-all active:scale-95 shadow-2xl"
                                >
                                    Access Inventory
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-16">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-12 group/item relative">
                                        <div className="relative h-48 w-36 shrink-0 overflow-hidden rounded-[3rem] border border-black/5 bg-white shadow-lg">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover group-hover/item:scale-110 transition-transform duration-[4s]"
                                                sizes="150px"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between py-4">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-serif font-bold text-3xl tracking-tight leading-none text-foreground group-hover/item:text-primary transition-colors">{item.name}</h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-foreground/20 hover:text-red-500 transition-colors p-2"
                                                    >
                                                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/20 block">Protocol Unit REF-{item.id.slice(-4).toUpperCase()}</span>
                                            </div>

                                            <div className="flex items-end justify-between mt-auto">
                                                <div className="flex items-center rounded-full border border-black/5 h-14 px-3 bg-white shadow-sm group/qty overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-10 h-10 rounded-full hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="w-12 text-center text-sm font-bold text-foreground">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-10 h-10 rounded-full hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/40 mb-2">Molecular Value</span>
                                                    <span className="font-bold text-3xl tracking-tight text-foreground">
                                                        {item.price * item.quantity} <span className="text-xs font-medium text-foreground/40 uppercase tracking-widest ml-1">MAD</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer: Elevated Protocol Summary */}
                    {items.length > 0 && (
                        <div className="border-t border-black/5 bg-white px-12 py-16 space-y-12 relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.03)]">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-primary/20 blur-[50px] pointer-events-none" />

                            <div className="space-y-8 relative z-10">
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] uppercase tracking-[0.6em] font-bold text-primary">Protocol Total</span>
                                    <span className="text-5xl font-serif font-bold tracking-tight text-foreground">{getTotal().toFixed(0)} <span className="text-sm font-medium text-foreground/40 ml-1">MAD</span></span>
                                </div>
                                <div className="p-6 bg-background rounded-3xl border border-black/5 text-center">
                                    <p className="text-[11px] text-foreground/40 uppercase tracking-[0.2em] font-bold italic">
                                        Pharmaceutical Protocol Handling Compliant
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                onClick={onClose}
                                className="btn-incredible w-full h-24 bg-foreground text-background rounded-full group/btn shadow-2xl"
                            >
                                <div className="btn-inner">
                                    <span className="text-[14px] font-black text-background group-hover/btn:text-white uppercase tracking-[0.6em] group-hover/btn:scale-110 transition-transform duration-700">Initiate Protocol</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
