import React from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white pt-40 pb-32">
            <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

                    {/* LEFT COLUMN: The Form */}
                    <div className="lg:col-span-7 space-y-16">
                        <div className="space-y-6">
                            <h1 className="text-6xl md:text-7xl font-serif font-bold tracking-tight">Let's Connect.</h1>
                            <p className="text-xl text-muted-foreground font-inter max-w-xl leading-relaxed">
                                Share your thoughts with us. Whether it's a botanical inquiry or a partnership proposal, our team is listening.
                            </p>
                        </div>

                        <form className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Your Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Jane Doe"
                                        className="w-full bg-transparent border-b border-gray-100 py-4 focus:border-black outline-none transition-all text-lg font-medium placeholder:text-gray-200"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="jane@example.com"
                                        className="w-full bg-transparent border-b border-gray-100 py-4 focus:border-black outline-none transition-all text-lg font-medium placeholder:text-gray-200"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Subject</label>
                                <input
                                    type="text"
                                    placeholder="Skincare Inquiry"
                                    className="w-full bg-transparent border-b border-gray-100 py-4 focus:border-black outline-none transition-all text-lg font-medium placeholder:text-gray-200"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Your Message</label>
                                <textarea
                                    rows={5}
                                    placeholder="Write your message here..."
                                    className="w-full bg-transparent border-b border-gray-100 py-4 focus:border-black outline-none transition-all text-lg font-medium resize-none placeholder:text-gray-200"
                                />
                            </div>

                            <button className="px-16 py-6 bg-black text-white rounded-full text-[12px] font-bold uppercase tracking-[.3em] hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: The Details */}
                    <div className="lg:col-span-4 lg:col-start-9 space-y-20">
                        <div className="space-y-12">
                            <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground block mb-4">Email</span>
                                <h3 className="text-3xl font-serif font-bold text-black border-b border-gray-50 pb-4">hello@topnature.com</h3>
                            </div>

                            <div className="space-y-2">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground block mb-4">Phone</span>
                                <h3 className="text-3xl font-serif font-bold text-black border-b border-gray-50 pb-4">+212 500 000 000</h3>
                            </div>

                            <div className="space-y-6">
                                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground block mb-4">The Atelier</span>
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-serif font-bold text-black">TopNature HQ</h3>
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        Angle Boulevard Zerktouni & Rue Al Massira,<br />
                                        Gauthier, Casablanca 20250,<br />
                                        Kingdom of Morocco
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6 pt-12 border-t border-gray-50">
                                <div className="flex items-center gap-4 text-[11px] uppercase tracking-widest font-bold text-black">
                                    <Clock className="w-4 h-4" />
                                    Atelier Hours
                                </div>
                                <div className="space-y-2 text-muted-foreground font-medium">
                                    <p className="flex justify-between"><span>Mon — Fri</span> <span>09:00 — 18:00 WET</span></p>
                                    <p className="flex justify-between"><span>Sat — Sun</span> <span>By Appointment Only</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
