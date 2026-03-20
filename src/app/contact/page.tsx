'use client'

import React from 'react'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-32">
            <div className="container-wide px-6 lg:px-12 space-y-24">
                
                {/* Header */}
                <div className="max-w-4xl space-y-8">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Contact Us</span>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
                        Get in Touch.
                    </h1>
                    <p className="text-2xl text-foreground-muted max-w-xl leading-relaxed">
                        Have a question about our products or your order? We're here to help you on your wellness journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    
                    {/* Contact Form */}
                    <div className="lg:col-span-7 bg-background-offset p-8 md:p-16 rounded-[3rem] border border-border shadow-premium">
                        <form className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full bg-white rounded-2xl border border-border px-6 py-5 focus:border-primary outline-none transition-all placeholder:text-foreground/20"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="name@email.com"
                                        className="w-full bg-white rounded-2xl border border-border px-6 py-5 focus:border-primary outline-none transition-all placeholder:text-foreground/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 ml-1">Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="How can we help you?"
                                    className="w-full bg-white rounded-2xl border border-border px-6 py-5 focus:border-primary outline-none transition-all resize-none placeholder:text-foreground/20"
                                />
                            </div>

                            <button className="btn-primary w-full md:w-auto flex items-center justify-center gap-3">
                                <span>Send Message</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-5 space-y-16 lg:pl-12">
                        <div className="space-y-12">
                            <div className="space-y-4 pb-8 border-b border-border">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Email</span>
                                <h3 className="text-2xl md:text-3xl font-bold">hello@topnature.com</h3>
                            </div>

                            <div className="space-y-4 pb-8 border-b border-border">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Phone</span>
                                <h3 className="text-2xl md:text-3xl font-bold">+212 500 000 000</h3>
                            </div>

                            <div className="space-y-8">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Location</span>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-bold">Casablanca HQ</h3>
                                    <p className="text-lg text-foreground-muted leading-relaxed">
                                        Angle Boulevard Zerktouni & Rue Al Massira,<br />
                                        Gauthier, Casablanca 20260,<br />
                                        Kingdom of Morocco
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-8 pt-12 border-t border-border">
                                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-foreground">
                                    <Clock className="w-5 h-5 text-primary" strokeWidth={2} />
                                    Support Hours
                                </div>
                                <div className="space-y-4 text-foreground-muted font-bold uppercase tracking-widest text-[11px]">
                                    <p className="flex justify-between border-b border-border pb-4"><span>Mon — Fri</span> <span className="text-foreground">09:00 — 18:00</span></p>
                                    <p className="flex justify-between border-b border-border pb-4"><span>Sat — Sun</span> <span className="text-foreground">Closed</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
