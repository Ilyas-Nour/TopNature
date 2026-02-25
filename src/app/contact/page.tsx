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
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="mb-24">
                    <h1 className="editorial-heading text-5xl md:text-8xl mb-6">Connect</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl font-medium tracking-tight">Our team is available for botanical consultations and order inquiries.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-20 items-start">
                    {/* Left Column: Form */}
                    <div>
                        <h2 className="editorial-heading text-3xl mb-8 text-foreground font-medium">Inquiry</h2>

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
                                className="inline-flex h-14 items-center justify-center bg-primary text-primary-foreground px-10 text-sm tracking-widest uppercase hover:bg-black transition-colors duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent align-[-0.125em]"></span>
                                ) : (
                                    'Submit Inquiry'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Info & Map */}
                    <div className="space-y-16">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                            <div className="flex flex-col gap-4">
                                <h3 className="editorial-heading text-xl text-foreground font-medium uppercase tracking-widest">Office</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed font-light">123 Boulevard Mohammed V,<br /> Casablanca 20000,<br /> Morocco</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="editorial-heading text-xl text-foreground font-medium uppercase tracking-widest">Phone</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed font-light">+212 522 00 00 00<br />+212 600 00 00 00</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="editorial-heading text-xl text-foreground font-medium uppercase tracking-widest">Digital</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed font-light">support@topnature.ma<br />concierge@topnature.ma</p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="editorial-heading text-xl text-foreground font-medium uppercase tracking-widest">Hours</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed font-light">Mon - Fri: 9AM - 6PM<br />Weekend: Closed</p>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="aspect-video bg-secondary/5 relative overflow-hidden grayscale opacity-50">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary p-8 text-center">
                                <MapPin className="w-12 h-12 mb-4" strokeWidth={0.5} />
                                <p className="editorial-heading text-xl tracking-widest uppercase">Casablanca Laboratory</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
