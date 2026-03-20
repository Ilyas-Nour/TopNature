'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { Truck, ShoppingBag, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react'
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
            <div className="min-h-screen flex flex-col items-center justify-center bg-background pt-32 pb-32">
                <div className="container-wide text-center space-y-12">
                     <div className="w-24 h-24 bg-background-offset rounded-full flex items-center justify-center mx-auto opacity-20">
                        <ShoppingBag className="w-10 h-10 text-primary" strokeWidth={1} />
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-6xl md:text-8xl font-serif font-light tracking-tighter">Vessel <br /><span className="italic">is empty.</span></h1>
                        <p className="text-xl text-foreground-muted max-w-md mx-auto italic">True optimization begins with your first selection.</p>
                    </div>
                    <div className="pt-8">
                        <Link href="/shop" className="btn-primary">Explore The Vault</Link>
                    </div>
                </div>
            </div>
        )
    }

    if (orderSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background pt-32 pb-32">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="container-wide text-center space-y-16"
                >
                    <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto shadow-premium">
                        <CheckCircle2 className="w-16 h-16 text-primary" strokeWidth={1} />
                    </div>
                    <div className="space-y-6">
                         <h1 className="text-7xl md:text-[8vw] font-serif font-light leading-none tracking-tighter">
                            Protocol <br /><span className="italic">Initiated.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-foreground-muted max-w-2xl mx-auto italic leading-relaxed">
                            Your selection is being prepared with clinical precision. A transmission containing your logistics has been dispatched.
                        </p>
                    </div>
                    <div className="pt-12">
                        <Link href="/" className="btn-secondary px-20">Return to Sanctuary</Link>
                    </div>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-48 pb-48 selection:bg-primary/10">
            <div className="container-wide">
                {/* Header */}
                <div className="flex flex-col lg:row items-center justify-between mb-24 gap-8 border-b border-border pb-12">
                    <div className="space-y-4">
                        <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary block">Final Verification</span>
                        <h1 className="text-7xl md:text-8xl font-serif font-light tracking-tighter leading-[0.8]">
                            The <span className="italic">Checkout.</span>
                        </h1>
                    </div>
                    <Link href="/cart" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/30 hover:text-primary transition-all">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Curator
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    {/* Form Column */}
                    <div className="lg:col-span-7 space-y-16">
                        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-16">
                            
                            {/* Identity & Logistics */}
                            <section className="bg-white p-12 md:p-16 rounded-[4rem] border border-border shadow-card space-y-16">
                                <div className="space-y-4">
                                    <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/20">Logistics & Identity</h2>
                                    <div className="w-12 h-[1px] bg-primary/20" />
                                </div>

                                <div className="space-y-12">
                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 ml-1">Full Identity</label>
                                        <input
                                            {...register('fullName')}
                                            className="w-full bg-background-offset border-none rounded-2xl px-10 py-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-xl placeholder:text-foreground/10"
                                            placeholder="Jane Doe"
                                        />
                                        {errors.fullName && <p className="text-[10px] text-red-500 uppercase tracking-widest font-black mt-2 italic">{errors.fullName.message}</p>}
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 ml-1">Telemetry (Phone)</label>
                                        <input
                                            {...register('phone')}
                                            className="w-full bg-background-offset border-none rounded-2xl px-10 py-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-xl placeholder:text-foreground/10"
                                            placeholder="+212 6..."
                                        />
                                        {errors.phone && <p className="text-[10px] text-red-500 uppercase tracking-widest font-black mt-2 italic">{errors.phone.message}</p>}
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 ml-1">Destination Address</label>
                                        <textarea
                                            {...register('address')}
                                            rows={3}
                                            className="w-full bg-background-offset border-none rounded-2xl px-10 py-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-xl placeholder:text-foreground/10 resize-none"
                                            placeholder="Street, City, Kingdom of Morocco"
                                        />
                                        {errors.address && <p className="text-[10px] text-red-500 uppercase tracking-widest font-black mt-2 italic">{errors.address.message}</p>}
                                    </div>
                                </div>
                            </section>

                            {/* Payment Protocol */}
                            <section className="bg-white p-12 md:p-16 rounded-[4rem] border border-border shadow-card space-y-12">
                                <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/20">Transaction Protocol</h2>
                                <div className="space-y-4">
                                    {[
                                        { id: 'CASH_ON_DELIVERY', label: 'Cash on Arrival', desc: 'Secure Hand-over' },
                                        { id: 'CMI', label: 'Local Card (CMI)', desc: 'Moroccan Gateway' },
                                        { id: 'STRIPE', label: 'Global (Credit Card)', desc: 'International Security' }
                                    ].map((method) => (
                                        <div
                                            key={method.id}
                                            onClick={() => setValue('paymentMethod', method.id as any)}
                                            className={`p-10 rounded-[2.5rem] cursor-pointer transition-all duration-500 border flex items-center justify-between group ${selectedPaymentMethod === method.id ? 'bg-foreground text-background border-foreground shadow-premium' : 'bg-background hover:bg-background-offset border-border'}`}
                                        >
                                            <div className="space-y-2">
                                                <p className="font-serif italic text-2xl tracking-tighter transition-colors">{method.label}</p>
                                                <p className={`text-[9px] uppercase tracking-widest font-bold ${selectedPaymentMethod === method.id ? 'text-primary' : 'text-foreground/20'}`}>{method.desc}</p>
                                            </div>
                                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${selectedPaymentMethod === method.id ? 'bg-primary border-primary' : 'border-border'}`}>
                                                {selectedPaymentMethod === method.id && <div className="w-3 h-3 bg-white rounded-full" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </form>
                    </div>

                    {/* Summary Column */}
                    <div className="lg:col-span-5 sticky top-48">
                        <section className="bg-white p-12 md:p-16 rounded-[4rem] border border-border shadow-premium space-y-16 overflow-hidden relative">
                             <div className="absolute top-0 right-0 p-12 opacity-5">
                                <ShieldCheck className="w-32 h-32 text-primary" strokeWidth={0.5} />
                            </div>
                            
                            <h2 className="text-3xl font-serif tracking-tight relative z-10">Order Manifest</h2>

                            <div className="space-y-10 max-h-[35vh] overflow-y-auto pr-6 relative z-10">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-8 group">
                                        <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-background-offset shrink-0">
                                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xl font-serif tracking-tight truncate">{item.name}</h4>
                                            <p className="text-[10px] uppercase tracking-widest text-foreground/30 font-bold mt-1">Qty: {item.quantity}</p>
                                            <p className="text-lg font-bold tracking-tight text-primary mt-2">{(item.price * item.quantity).toFixed(0)} MAD</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-10 border-t border-border space-y-6 relative z-10 text-[10px] uppercase tracking-widest font-bold">
                                <div className="flex justify-between items-center opacity-40">
                                    <span>Logistics</span>
                                    <span className="text-primary italic animate-pulse">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-end pt-4">
                                     <span className="text-sm">Total Value</span>
                                     <span className="text-5xl font-serif font-light text-primary italic leading-none">/{getTotal().toFixed(0)} <span className="text-[10px] not-italic font-sans font-bold text-foreground">MAD</span></span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isSubmitting}
                                className="group btn-primary w-full py-10 shadow-premium relative z-10"
                            >
                                {isSubmitting ? 'Synthesizing...' : 'Finalize Protocol Deployment'}
                            </button>

                            <p className="text-center text-[8px] uppercase tracking-[0.4em] font-bold text-foreground/20 pb-4">
                                Protected by Universal Sourcing Standards
                            </p>
                        </section>
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
