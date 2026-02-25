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
    fullName: z.string().min(2, { message: 'Full name must be at least 2 characters long' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phone: z.string().min(8, { message: 'Please enter a valid phone number' }),
    address: z.string().min(5, { message: 'Please enter your full delivery address' }),
    city: z.string().min(2, { message: 'City is required' }),
    paymentMethod: z.enum(['CASH_ON_DELIVERY', 'CMI', 'STRIPE'], {
        message: 'Please select a payment method',
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
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white pt-32">
                <ShoppingBag className="w-12 h-12 text-muted-foreground mb-6" strokeWidth={1} />
                <h2 className="text-3xl font-bold mb-4 tracking-tight">Your bag is empty</h2>
                <p className="text-muted-foreground mb-12 max-w-sm">Items you add to your bag will appear here. Start exploring our botanical collections.</p>
                <Link href="/shop" className="px-12 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-gray-800 transition-colors">
                    Back to Shop
                </Link>
            </div>
        )
    }

    if (orderSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white pt-32"
            >
                <div className="w-20 h-20 rounded-full bg-[#FAFAFA] flex items-center justify-center mb-8 border border-gray-100">
                    <CheckIcon className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-4xl font-bold mb-4 tracking-tight">Confirmed.</h2>
                <p className="text-muted-foreground max-w-md mb-12">
                    Your order is being prepared with care in our Moroccan laboratory. We've sent details to your email.
                </p>
                <Link href="/" className="px-12 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-gray-800 transition-colors">
                    Return Home
                </Link>
            </motion.div>
        )
    }

    return (
        <div className="min-h-screen bg-white text-foreground pt-32 pb-24">
            <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* LEFT COLUMN: Shipping & Payment */}
                    <div className="lg:col-span-7">
                        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-16">

                            {/* Shipping Information Section */}
                            <section>
                                <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8">Shipping Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-12 bg-[#FAFAFA] rounded-[2rem]">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold">Full Name</label>
                                        <input
                                            {...register('fullName')}
                                            className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors"
                                            placeholder="Jane Doe"
                                        />
                                        {errors.fullName && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold mt-1">{errors.fullName.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold">Phone</label>
                                        <input
                                            {...register('phone')}
                                            className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors"
                                            placeholder="+212 600 000 000"
                                        />
                                        {errors.phone && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold mt-1">{errors.phone.message}</p>}
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold">Email</label>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors"
                                            placeholder="jane@example.com"
                                        />
                                        {errors.email && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold mt-1">{errors.email.message}</p>}
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold">Street Address</label>
                                        <input
                                            {...register('address')}
                                            className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors"
                                            placeholder="Street, Apartment, Postcode"
                                        />
                                        {errors.address && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold mt-1">{errors.address.message}</p>}
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold">City</label>
                                        <input
                                            {...register('city')}
                                            className="w-full bg-transparent border-b border-gray-200 py-3 focus:border-black outline-none transition-colors"
                                            placeholder="Casablanca"
                                        />
                                        {errors.city && <p className="text-[10px] text-red-500 uppercase tracking-widest font-bold mt-1">{errors.city.message}</p>}
                                    </div>
                                </div>
                            </section>

                            {/* Payment Method Section */}
                            <section>
                                <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8">Payment Method</h2>
                                <div className="space-y-4 p-8 bg-[#FAFAFA] rounded-[2rem]">
                                    {[
                                        { id: 'CASH_ON_DELIVERY', label: 'Cash on Delivery', desc: 'Secure local delivery' },
                                        { id: 'CMI', label: 'Credit Card (CMI)', desc: 'Moroccan Local Processing' },
                                        { id: 'STRIPE', label: 'International Card', desc: 'Secure via Stripe' }
                                    ].map((method) => (
                                        <div
                                            key={method.id}
                                            onClick={() => setValue('paymentMethod', method.id as any)}
                                            className={`group p-6 rounded-[1.5rem] cursor-pointer transition-all flex items-center gap-6 ${selectedPaymentMethod === method.id ? 'bg-black text-white' : 'bg-white hover:bg-gray-50 border border-transparent hover:border-gray-200'}`}
                                        >
                                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPaymentMethod === method.id ? 'border-white' : 'border-black'}`}>
                                                {selectedPaymentMethod === method.id && <div className="w-2 h-2 bg-white rounded-full" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold text-sm tracking-tight">{method.label}</p>
                                                <p className={`text-[11px] uppercase tracking-widest font-bold mt-0.5 ${selectedPaymentMethod === method.id ? 'text-white/60' : 'text-muted-foreground'}`}>{method.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-12">
                        <div>
                            <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold text-muted-foreground mb-8">Your bag</h2>
                            <div className="space-y-8">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-6">
                                        <div className="relative w-20 h-24 rounded-2xl overflow-hidden bg-[#FAFAFA] shrink-0 border border-gray-100">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold tracking-tight">{item.name}</h3>
                                            <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-sm tracking-tight">
                                            MAD {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-8 border-t border-gray-100">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-medium uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                                <span className="font-bold tracking-tight">MAD {getTotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground font-medium uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                                <span className="font-bold tracking-tight text-black">Complimentary</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-100 mt-4 tracking-tighter">
                                <span>Total</span>
                                <span>MAD {getTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={isSubmitting}
                            className="w-full bg-black text-white font-bold uppercase tracking-[.2em] text-[12px] py-6 rounded-full hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    )
}
