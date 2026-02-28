'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Truck, Wallet, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'

const checkoutSchema = z.object({
    fullName: z.string().min(2, { message: 'Full name required' }),
    phone: z.string().min(8, { message: 'Phone number required' }),
    address: z.string().min(5, { message: 'Full delivery address required' }),
    paymentMethod: z.enum(['CASH_ON_DELIVERY', 'CMI', 'STRIPE'], {
        message: 'Select protocol',
    }),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
    const { items, getTotal, clearCart } = useCartStore()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            paymentMethod: 'CASH_ON_DELIVERY',
        },
    })

    const selectedPaymentMethod = watch('paymentMethod')

    const onSubmit = async (data: CheckoutFormValues) => {
        setIsSubmitting(true)
        try {
            const formattedCartItems = items.map(item => ({
                id: item.id,
                quantity: item.quantity
            }))

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, cartItems: formattedCartItems }),
            })

            const responseData = await response.json()
            if (!response.ok) throw new Error(responseData.error || 'Failed to place order')

            setOrderSuccess(true)
            clearCart()
        } catch (error) {
            console.error('Checkout Submission Error:', error)
            alert(error instanceof Error ? error.message : "Something went wrong.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (items.length === 0 && !orderSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background pt-32 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
                <div className="w-40 h-40 rounded-full border border-black/5 bg-white flex items-center justify-center text-primary relative group mb-12 shadow-2xl">
                    <div className="absolute inset-0 bg-primary/20 blur-[40px] rounded-full opacity-20" />
                    <ShoppingBag className="w-16 h-16 relative z-10" strokeWidth={1} />
                </div>
                <h2 className="text-7xl font-serif font-black tracking-tight uppercase mb-8 text-foreground leading-[0.8]">Vessel <br /> <span className="italic font-light text-primary">Empty.</span></h2>
                <p className="text-foreground/40 text-[12px] uppercase tracking-[0.6em] font-bold mb-16 max-w-sm italic">
                    No solar components identified for protocol deployment in the current cycle.
                </p>
                <Link href="/shop" className="px-20 py-8 bg-foreground text-background rounded-full font-black uppercase tracking-[0.6em] text-[12px] hover:bg-primary hover:text-white transition-all active:scale-95 shadow-2xl">
                    Access Inventory
                </Link>
            </div>
        )
    }

    if (orderSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background pt-32 relative overflow-hidden"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-primary/10 rounded-full blur-[250px] pointer-events-none" />
                <div className="w-40 h-40 rounded-full border border-primary bg-white flex items-center justify-center mb-16 relative group shadow-[0_0_80px_rgba(212,175,55,0.3)]">
                    <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full" />
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center relative z-10 shadow-solar-glow">
                        <CheckIcon className="w-10 h-10 text-white" />
                    </div>
                </div>
                <h2 className="text-8xl font-serif font-black tracking-tight uppercase mb-10 text-foreground leading-[0.8]">Protocol <br /> <span className="italic font-light text-primary">Initiated.</span></h2>
                <p className="text-foreground/40 text-[12px] uppercase tracking-[0.5em] font-bold max-w-md mb-20 leading-relaxed italic">
                    Your batch is being synthesized and prepared in our sun-drenched sanctuary. A telemetry transmission containing your solar logistics has been dispatched.
                </p>
                <Link href="/" className="px-24 py-8 border border-black/10 text-foreground rounded-full font-black uppercase tracking-[0.6em] text-[12px] hover:bg-foreground hover:text-background transition-all active:scale-95 shadow-2xl bg-white">
                    Return to Sanctuary
                </Link>
            </motion.div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground pt-32 md:pt-48 pb-20 selection:bg-primary selection:text-white relative overflow-hidden flex flex-col items-center">
            {/* SOLAR DEPTH */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                {/* Header (Compact for Laptops) */}
                <div className="mb-16 md:mb-24 flex items-end justify-between border-b border-black/5 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-[1px] bg-primary" />
                            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary italic">Solar Deployment</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tighter uppercase leading-[0.85] text-foreground">
                            The <span className="italic text-primary font-light">Checkout.</span>
                        </h1>
                    </div>
                    <Link href="/shop" className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/40 hover:text-primary transition-colors flex items-center gap-4 mb-4">
                        <span>Modify Selection</span>
                        <Truck className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-start">
                    {/* LEFT COLUMN: Simplified Data Entry */}
                    <div className="lg:col-span-6 space-y-12">
                        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                            {/* 3 INPUT PROTOCOL */}
                            <section className="bg-white rounded-[3rem] border border-black/5 p-10 md:p-14 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />
                                <div className="space-y-10 relative z-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary italic opacity-60">Full Name</label>
                                        <input
                                            {...register('fullName')}
                                            className="w-full bg-transparent border-b border-black/10 py-4 focus:border-primary outline-none transition-all font-bold tracking-tight text-3xl md:text-4xl text-foreground placeholder:text-foreground/5"
                                            placeholder="Jane Doe"
                                        />
                                        {errors.fullName && <p className="text-[10px] text-red-500 uppercase tracking-widest font-black mt-2 italic">{errors.fullName.message}</p>}
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary italic opacity-60">Phone Number</label>
                                        <input
                                            {...register('phone')}
                                            className="w-full bg-transparent border-b border-black/10 py-4 focus:border-primary outline-none transition-all font-bold tracking-tight text-3xl md:text-4xl text-foreground placeholder:text-foreground/5"
                                            placeholder="+212 6..."
                                        />
                                        {errors.phone && <p className="text-[10px] text-red-500 uppercase tracking-widest font-black mt-2 italic">{errors.phone.message}</p>}
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary italic opacity-60">Full Delivery Address</label>
                                        <textarea
                                            {...register('address')}
                                            rows={2}
                                            className="w-full bg-transparent border-b border-black/10 py-4 focus:border-primary outline-none transition-all font-bold tracking-tight text-2xl md:text-3xl text-foreground placeholder:text-foreground/5 resize-none"
                                            placeholder="Street, City, Postcode..."
                                        />
                                        {errors.address && <p className="text-[10px] text-red-500 uppercase tracking-widest font-black mt-2 italic">{errors.address.message}</p>}
                                    </div>
                                </div>
                            </section>

                            {/* Transaction Protocol */}
                            <section className="bg-white rounded-[3rem] border border-black/5 p-8 md:p-10 shadow-2xl relative overflow-hidden">
                                <h2 className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground/20 mb-8 px-4">Transaction Protocol</h2>
                                <div className="space-y-4">
                                    {[
                                        { id: 'CASH_ON_DELIVERY', label: 'Cash on Arrival', desc: 'Secure Hand-to-Hand' },
                                        { id: 'CMI', label: 'Moroccan Cards', desc: 'Secure CMI Gateway' },
                                        { id: 'STRIPE', label: 'Global (Credit Card)', desc: 'Stripe Secure' }
                                    ].map((method) => (
                                        <div
                                            key={method.id}
                                            onClick={() => setValue('paymentMethod', method.id as any)}
                                            className={`group p-6 rounded-[2rem] cursor-pointer transition-all flex items-center gap-8 border ${selectedPaymentMethod === method.id ? 'bg-foreground text-background border-foreground shadow-2xl scale-[1.01]' : 'bg-background hover:bg-black/5 border-black/5'}`}
                                        >
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedPaymentMethod === method.id ? 'border-primary bg-primary' : 'border-primary/20'}`}>
                                                {selectedPaymentMethod === method.id && <div className="w-3 h-3 bg-white rounded-full" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-black text-xl tracking-tight uppercase leading-none">{method.label}</p>
                                                <p className={`text-[9px] uppercase tracking-[0.2em] font-bold mt-2 italic ${selectedPaymentMethod === method.id ? 'text-primary' : 'text-primary/40'}`}>{method.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Manifest (Optimized for Laptop) */}
                    <div className="lg:col-span-6 space-y-10">
                        <section className="bg-white rounded-[4rem] border border-black/5 p-10 md:p-14 shadow-2xl relative overflow-hidden group flex flex-col">
                            <h2 className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary mb-12 italic border-b border-black/5 pb-4">Order Manifest</h2>

                            <div className="space-y-8 max-h-[30vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-primary/10">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-8 group/item">
                                        <div className="relative w-24 h-28 rounded-[2rem] overflow-hidden bg-background shrink-0 border border-black/5">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover/item:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-2xl font-serif font-black tracking-tight uppercase leading-none truncate mb-2">{item.name}</h3>
                                            <p className="text-[9px] text-foreground/30 uppercase tracking-[0.3em] font-bold">Qty: {item.quantity}</p>
                                            <p className="font-bold text-2xl tracking-tight text-foreground mt-2">
                                                {item.price * item.quantity} <span className="text-[9px] font-medium opacity-40">MAD</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 space-y-4 pt-8 border-t border-black/5">
                                <div className="flex justify-between items-center px-4">
                                    <span className="text-foreground/30 font-bold uppercase tracking-[0.4em] text-[9px]">Logistics</span>
                                    <span className="text-[10px] uppercase font-black text-primary animate-pulse italic">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-center px-4 pt-4 border-t border-primary/10">
                                    <span className="text-[14px] font-black uppercase tracking-[0.5em]">Total Value</span>
                                    <span className="text-6xl font-serif font-black italic text-primary">
                                        {getTotal().toFixed(0)}<span className="text-[12px] font-normal not-italic text-foreground/40 uppercase tracking-[0.2em] ml-2">MAD</span>
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isSubmitting}
                                className="btn-incredible w-full h-24 bg-foreground text-background rounded-full mt-12 shadow-2xl group/btn"
                            >
                                <div className="btn-inner">
                                    <span className="text-[14px] font-black uppercase tracking-[0.6em] group-hover/btn:scale-110 transition-transform duration-700">
                                        {isSubmitting ? 'Synthesizing...' : 'Place Secure Order'}
                                    </span>
                                </div>
                            </button>
                        </section>

                        <div className="p-8 text-center opacity-40">
                            <p className="text-[9px] uppercase tracking-[0.4em] leading-relaxed italic">
                                Your data is protected by TopNature's Botanical Security Protocol. <br />
                                Order synthesis begins instantly post-authorization.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
    )
}
