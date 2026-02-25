'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MapPin, Phone, Mail, Clock, AlertCircle } from 'lucide-react'

// Contact form payload rules map
const contactSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    })

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true)
        // Simulate API call processing time
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Contact Form Submitted:', data)
        setIsSubmitting(false)
        setSuccess(true)
        reset()

        // Reset success message after 5 seconds to allow sending another message
        setTimeout(() => setSuccess(false), 5000)
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Contact Us</h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">Have a question or need assistance? Our team is here to help.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
                    {/* Left Column: Form */}
                    <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>

                        {success && (
                            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-start gap-3">
                                <svg className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="font-medium">Thank you! Your message has been received. We will get back to you shortly.</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                                    <input
                                        {...register('name')}
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600'} bg-slate-50 focus:bg-white outline-none transition-all`}
                                        placeholder="Jane Doe"
                                    />
                                    {errors.name && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600'} bg-slate-50 focus:bg-white outline-none transition-all`}
                                        placeholder="jane@example.com"
                                    />
                                    {errors.email && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Subject</label>
                                <input
                                    {...register('subject')}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600'} bg-slate-50 focus:bg-white outline-none transition-all`}
                                    placeholder="How can we help you?"
                                />
                                {errors.subject && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.subject.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Message</label>
                                <textarea
                                    {...register('message')}
                                    rows={5}
                                    className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-600 focus:ring-blue-600'} bg-slate-50 focus:bg-white outline-none transition-all resize-y`}
                                    placeholder="Write your message here..."
                                />
                                {errors.message && <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.message.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em]"></span>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Info & Map */}
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Our Location</h3>
                                    <p className="text-slate-500 text-sm">123 Boulevard Mohammed V,<br /> Casablanca 20000,<br /> Morocco</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
                                    <p className="text-slate-500 text-sm">+212 522 00 00 00<br />+212 600 00 00 00</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Email Us</h3>
                                    <p className="text-slate-500 text-sm">support@ecomstore.ma<br />contact@ecomstore.ma</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-start gap-4">
                                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center shrink-0">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Working Hours</h3>
                                    <p className="text-slate-500 text-sm">Mon - Fri: 9AM - 6PM<br />Weekend: Closed</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm h-80 relative">
                            {/* This is a placeholder for an actual Google Maps iframe */}
                            <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
                                <MapPin className="w-12 h-12 mb-4 text-slate-400" />
                                <p className="font-medium text-lg text-slate-600">Google Maps Integration</p>
                                <p className="text-sm mt-2 max-w-xs">An interactive map would be embedded here showing the Casablanca headquarters.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
