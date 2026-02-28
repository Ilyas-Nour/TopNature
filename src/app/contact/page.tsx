import React from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background pt-40 pb-32 relative overflow-hidden">
            {/* SOLAR DEPTH */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">

                    {/* LEFT COLUMN: The Sanctuary Submission */}
                    <div className="lg:col-span-7 space-y-24">
                        <div className="space-y-10">
                            <div className="flex items-center gap-6">
                                <span className="w-16 h-[2px] bg-primary shadow-solar-glow" />
                                <span className="text-[11px] uppercase tracking-[0.6em] font-bold text-primary">Solar Telemetry</span>
                            </div>
                            <h1 className="text-7xl md:text-[10rem] font-serif font-black tracking-tight uppercase leading-[0.75] text-foreground">
                                Alabaster <br /> <span className="italic font-light">Dialogue.</span>
                            </h1>
                            <p className="text-2xl text-foreground/40 max-w-xl font-medium tracking-tight leading-relaxed">
                                Submit your inquiry to our botanical council. We prioritize solar integrity and artisanal partnership in every response.
                            </p>
                        </div>

                        <form className="space-y-24 pt-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="space-y-6">
                                    <label className="text-[11px] uppercase tracking-[0.4em] font-bold text-foreground/40 italic ml-1">Subject Identity</label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full bg-transparent border-b border-black/10 py-6 focus:border-primary outline-none transition-all text-2xl font-bold tracking-tight placeholder:text-foreground/10"
                                    />
                                </div>
                                <div className="space-y-6">
                                    <label className="text-[11px] uppercase tracking-[0.4em] font-bold text-foreground/40 italic ml-1">Digital Coordinate</label>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-transparent border-b border-black/10 py-6 focus:border-primary outline-none transition-all text-2xl font-bold tracking-tight placeholder:text-foreground/10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="text-[11px] uppercase tracking-[0.4em] font-bold text-foreground/40 italic ml-1">Protocol Type</label>
                                <input
                                    type="text"
                                    placeholder="Inquiry Subject"
                                    className="w-full bg-transparent border-b border-black/10 py-6 focus:border-primary outline-none transition-all text-2xl font-bold tracking-tight placeholder:text-foreground/10"
                                />
                            </div>

                            <div className="space-y-6">
                                <label className="text-[11px] uppercase tracking-[0.4em] font-bold text-foreground/40 italic ml-1">Transmission Data</label>
                                <textarea
                                    rows={4}
                                    placeholder="Write your transmission here..."
                                    className="w-full bg-transparent border-b border-black/10 py-6 focus:border-primary outline-none transition-all text-2xl font-bold tracking-tight resize-none placeholder:text-foreground/10"
                                />
                            </div>

                            <button className="relative group overflow-hidden px-20 py-8 bg-foreground text-background rounded-full font-black uppercase tracking-[0.5em] text-[13px] hover:text-white transition-colors duration-700">
                                <span className="relative z-10">Initiate Dialogue</span>
                                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                            </button>
                        </form>
                    </div>

                    {/* RIGHT COLUMN: The Logistics */}
                    <div className="lg:col-span-4 lg:col-start-9 space-y-32">
                        <div className="space-y-20">
                            <div className="space-y-6">
                                <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary block mb-6 italic">Sanctuary Access</span>
                                <h3 className="text-4xl font-serif font-black tracking-tight text-foreground border-b border-black/5 pb-8 group cursor-pointer hover:text-primary hover:italic transition-all">atelier@topnature.com</h3>
                            </div>

                            <div className="space-y-6">
                                <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary block mb-6 italic">Voice Link</span>
                                <h3 className="text-4xl font-serif font-black tracking-tight text-foreground border-b border-black/5 pb-8 group cursor-pointer hover:text-primary hover:italic transition-all">+212 500 000 000</h3>
                            </div>

                            <div className="space-y-10">
                                <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary block mb-6 italic">Geographical Node</span>
                                <div className="space-y-6">
                                    <h3 className="text-5xl font-serif font-black tracking-tight text-foreground">Sanctuary HQ</h3>
                                    <p className="text-2xl text-foreground/50 font-medium tracking-tight leading-relaxed italic">
                                        Angle Boulevard Zerktouni & Rue Al Massira,<br />
                                        Gauthier, Casablanca 20260,<br />
                                        Kingdom of Morocco
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-12 pt-20 border-t border-black/5">
                                <div className="flex items-center gap-6 text-[12px] uppercase tracking-[0.4em] font-bold text-foreground">
                                    <div className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-sm">
                                        <Clock className="w-5 h-5 text-primary" strokeWidth={1.5} />
                                    </div>
                                    Solar Availability
                                </div>
                                <div className="space-y-6 text-foreground/40 font-bold uppercase tracking-[0.2em] text-[11px]">
                                    <p className="flex justify-between border-b border-black/5 pb-4"><span>Mon — Fri</span> <span className="text-foreground">09:00 — 18:00 WET</span></p>
                                    <p className="flex justify-between border-b border-black/5 pb-4"><span>Sat — Sun</span> <span className="text-foreground">By Protocol Only</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
