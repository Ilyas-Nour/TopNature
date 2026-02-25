'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, CreditCard, Wallet, AlertCircle } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'

// 1. Zod Schema Validation
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

    // 2. React Hook Form Setup
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

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log('--- NEW ORDER SUBMITTED ---')
        console.log('Customer Details:', data)
        console.log('Order Items:', items)
        console.log('Total Amount: MAD', getTotal())
        console.log('---------------------------')

        setIsSubmitting(false)
        setOrderSuccess(true)
        clearCart()
    }

    // Handle empty cart state immediately with AnimatePresence
    if (items.length === 0 && !orderSuccess) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50">
                <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-6 text-slate-500">
                    <Truck className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
                <p className="text-slate-600 mb-8">Add components to your cart to proceed to checkout.</p>
                <Link href="/shop" className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition">
                    Return to Shop
                </Link>
            </div>
        )
    }

    if (orderSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50"
            >
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-emerald-600">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h2>
                <p className="text-slate-600 max-w-md mb-8">
                    Thank you for your purchase. We've received your order and will begin processing it right away.
                </p>
                <Link href="/" className="px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition">
                    Back to Home
                </Link>
            </motion.div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-16 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <h1 className="text-3xl font-bold text-slate-900 mb-10">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* LEFT COLUMN: Shipping & Payment Form */}
                    <div className="lg:col-span-7 space-y-8">
                        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                            {/* Shipping Details Section */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                                <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                                    <Truck className="w-5 h-5 text-blue-600" />
                                    Shipping Information
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Full Name</label>
                                        <input
                                            {...register('fullName')}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'} bg-slate-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-opacity-20`}
                                            placeholder="Jane Doe"
                                        />
                                        {errors.fullName && (
                                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                                <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone Number */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700">Phone Number</label>
                                        <input
                                            {...register('phone')}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'} bg-slate-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-opacity-20`}
                                            placeholder="+212 600 000 000"
                                        />
                                        {errors.phone && (
                                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                                <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email (Full Width) */}
                                    <div className="space-y-2 sm:col-span-2">
                                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'} bg-slate-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-opacity-20`}
                                            placeholder="jane@example.com"
                                        />
                                        {errors.email && (
                                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                                <AlertCircle className="w-3 h-3" /> {errors.email.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Address (Full Width) */}
                                    <div className="space-y-2 sm:col-span-2">
                                        <label className="text-sm font-medium text-slate-700">Street Address</label>
                                        <input
                                            {...register('address')}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'} bg-slate-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-opacity-20`}
                                            placeholder="123 Mohammed V Blvd, Apt 4"
                                        />
                                        {errors.address && (
                                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                                <AlertCircle className="w-3 h-3" /> {errors.address.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* City */}
                                    <div className="space-y-2 sm:col-span-2">
                                        <label className="text-sm font-medium text-slate-700">City</label>
                                        <input
                                            {...register('city')}
                                            className={`w-full px-4 py-3 rounded-xl border ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'} bg-slate-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-opacity-20`}
                                            placeholder="Casablanca"
                                        />
                                        {errors.city && (
                                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                                <AlertCircle className="w-3 h-3" /> {errors.city.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method Section */}
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                                <h2 className="text-xl font-semibold flex items-center gap-2 mb-6">
                                    <Wallet className="w-5 h-5 text-blue-600" />
                                    Payment Method
                                </h2>

                                <div className="space-y-4">
                                    {/* Option 1: Cash on Delivery */}
                                    <div
                                        onClick={() => setValue('paymentMethod', 'CASH_ON_DELIVERY')}
                                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedPaymentMethod === 'CASH_ON_DELIVERY' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === 'CASH_ON_DELIVERY' ? 'border-blue-600' : 'border-slate-300'}`}>
                                            {selectedPaymentMethod === 'CASH_ON_DELIVERY' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900">Cash on Delivery</p>
                                            <p className="text-sm text-slate-500">Pay securely when the package arrives</p>
                                        </div>
                                    </div>

                                    {/* Option 2: CMI */}
                                    <div
                                        onClick={() => setValue('paymentMethod', 'CMI')}
                                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedPaymentMethod === 'CMI' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === 'CMI' ? 'border-blue-600' : 'border-slate-300'}`}>
                                            {selectedPaymentMethod === 'CMI' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900">Credit Card (CMI - Morocco)</p>
                                            <p className="text-sm text-slate-500">Local Moroccan card processing</p>
                                        </div>
                                        <CreditCard className="w-6 h-6 text-slate-400" />
                                    </div>

                                    {/* Option 3: Stripe */}
                                    <div
                                        onClick={() => setValue('paymentMethod', 'STRIPE')}
                                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedPaymentMethod === 'STRIPE' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:border-slate-300'}`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === 'STRIPE' ? 'border-blue-600' : 'border-slate-300'}`}>
                                            {selectedPaymentMethod === 'STRIPE' && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-slate-900">Credit Card (Stripe - International)</p>
                                            <p className="text-sm text-slate-500">Fast and secure international payments</p>
                                        </div>
                                        <CreditCard className="w-6 h-6 text-slate-400" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: Order Summary (Sticky) */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm sticky top-24">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                                sizes="64px"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-semibold text-slate-900 line-clamp-1">{item.name}</h3>
                                            <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-slate-900 shrink-0">
                                            MAD {(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-200 pt-6 space-y-4">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>MAD {getTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Shipping</span>
                                    <span className="text-emerald-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-slate-900 pt-2 border-t border-slate-100">
                                    <span>Total</span>
                                    <span>MAD {getTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Submit Button targeting the external form ID */}
                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isSubmitting}
                                className="w-full mt-8 bg-[#10B981] hover:bg-[#059669] text-white py-4 rounded-xl font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em]"></span>
                                ) : (
                                    'Place Order'
                                )}
                            </button>

                            <p className="text-xs text-slate-500 text-center mt-4">
                                Your personal data will be used to process your order and support your experience throughout this website.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
