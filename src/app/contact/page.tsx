'use client'

import React from 'react'
import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background pt-48 pb-48">
            <div className="container-wide space-y-32">
                
                {/* Elite Header */}
                <div className="max-w-5xl space-y-12">
                    <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary block">Connect</span>
                    <h1 className="text-7xl md:text-[10vw] font-serif font-light leading-[0.85] tracking-tighter">
                        The <br /> <span className="italic pl-20 md:pl-40">Dialogue.</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-foreground-muted leading-relaxed max-w-3xl italic">
                        Whether you're inquiring about our biological protocols or seeking status on a shipment, our experts are here to assist your optimization.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-40 items-start">
                    
                    {/* Contact Form - Refined */}
                    <div className="lg:col-span-7 bg-white p-12 md:p-20 rounded-[4rem] border border-border shadow-premium relative overflow-hidden">
                        <form className="space-y-16 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="space-y-6">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 ml-1">Identity</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-background-offset rounded-2xl border-none px-8 py-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-foreground/20 font-medium"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 ml-1">Digital Address</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full bg-background-offset rounded-2xl border-none px-8 py-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-foreground/20 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40 ml-1">Inquiry</label>
                                <textarea
                                    rows={6}
                                    placeholder="Tell us how we can help..."
                                    className="w-full bg-background-offset rounded-2xl border-none px-8 py-6 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none placeholder:text-foreground/20 font-medium"
                                />
                            </div>

                            <button className="group btn-primary w-full md:w-auto px-16 py-8 flex items-center justify-center gap-4">
                                <span>Transmit Message</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </button>
                        </form>
                    </div>

                    {/* Contact Info - High End */}
                    <div className="lg:col-span-5 space-y-20 lg:pt-12">
                        <div className="space-y-16">
                            <div className="space-y-6 pb-12 border-b border-border">
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary">Direct Line</span>
                                <div className="space-y-2">
                                    <h3 className="text-3xl md:text-4xl font-serif italic text-foreground">hello@topnature.com</h3>
                                    <h3 className="text-3xl font-serif text-foreground/60">+212 500 000 000</h3>
                                </div>
                            </div>

                            <div className="space-y-10">
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary">Headquarters</span>
                                <div className="space-y-6">
                                    <h3 className="text-4xl font-serif italic">Casablanca</h3>
                                    <p className="text-xl text-foreground-muted leading-relaxed font-medium italic">
                                        Angle Boulevard Zerktouni & Rue Al Massira,<br />
                                        Gauthier, Casablanca 20260,<br />
                                        Kingdom of Morocco
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-10 pt-16 border-t border-border">
                                <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.5em] font-bold text-foreground/40">
                                    <Clock className="w-5 h-5 text-primary opacity-40" strokeWidth={1} />
                                    Operational Hours
                                </div>
                                <div className="space-y-6 text-[11px] font-bold uppercase tracking-[0.3em] text-foreground/60">
                                    <p className="flex justify-between items-center group">
                                        <span className="group-hover:text-primary transition-colors">Monday — Friday</span> 
                                        <span className="w-12 h-[1px] bg-border mx-4" />
                                        <span className="text-foreground">09:00 — 18:00</span>
                                    </p>
                                    <p className="flex justify-between items-center text-foreground/20">
                                        <span>Saturday — Sunday</span> 
                                        <span className="w-12 h-[1px] bg-border/20 mx-4" />
                                        <span>Closed</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
