'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone, ChevronDown, Leaf } from 'lucide-react'
import { AnimatedNavLink } from '../ui/animated-nav-link'
import { SocialButton } from '../ui/social-button'
import { motion, AnimatePresence } from 'framer-motion'

export function Footer() {
    const NAVIGATION_DATA = [
        {
            title: "Botanical Index",
            links: [
                { label: 'All Protocols', href: '/shop' },
                { label: 'New Synthesis', href: '/shop' },
                { label: 'Peak Performance', href: '/shop' },
                { label: 'Baseline Resets', href: '/shop' },
            ]
        },
        {
            title: "Heritage Protocol",
            links: [
                { label: 'The Philosophy', href: '/about' },
                { label: 'Biotech Glossary', href: '/about' },
                { label: 'Lab Verification', href: '/about' },
                { label: 'Sanctuary Journal', href: '/about' },
            ]
        },
        {
            title: "Sanctuary Network",
            links: [
                { label: 'System Origin', href: '/about' },
                { label: 'Direct Telemetry', href: '/contact' },
                { label: 'Logistics Policy', href: '/about' },
                { label: 'Integrity Shield', href: '/about' },
            ]
        }
    ]

    return (
        <footer className="bg-[#FBF9F6] border-t border-black/5 pt-12 md:pt-16 pb-12 relative overflow-hidden">
            {/* BOTANICAL MIST */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full px-6 md:px-12 lg:px-24 mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-12 mb-16">

                    {/* Brand Identity */}
                    <div className="lg:col-span-4 space-y-8 md:space-y-10">
                        <Link href="/" className="text-3xl font-serif font-black tracking-tight hover:text-primary transition-all group flex items-baseline gap-2">
                            <span className="text-foreground">Top</span>
                            <span className="text-primary italic font-light group-hover:tracking-widest transition-all">Nature.</span>
                        </Link>
                        <p className="text-foreground/40 font-medium text-lg leading-relaxed max-w-sm tracking-tight italic">
                            Synthesizing the <span className="text-foreground">botanical intelligence</span> of rare wild flora for sophisticated human vitalization.
                        </p>
                        <div className="flex gap-6">
                            <SocialButton icon={Instagram} href="#" color="#D4AF37" />
                            <SocialButton icon={Facebook} href="#" color="#D4AF37" />
                            <SocialButton icon={MessageCircle} href="#" color="#D4AF37" />
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {NAVIGATION_DATA.map((col) => (
                        <div key={col.title} className="lg:col-span-2 space-y-8 group">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-[1px] bg-primary/20 group-hover:w-10 transition-all" />
                                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground/20 italic">{col.title}</h4>
                            </div>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <AnimatedNavLink
                                            href={link.href}
                                            title={link.label}
                                            className="text-foreground/40 hover:text-foreground transition-colors text-[13px] font-bold tracking-tight"
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Info (Desktop) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground/20 italic">Contact</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-4 group cursor-default">
                                <Mail className="w-4 h-4 text-foreground/20 group-hover:text-primary transition-colors mt-0.5" strokeWidth={1.5} />
                                <span className="text-foreground/40 group-hover:text-foreground transition-colors text-[13px] font-bold tracking-tight">atelier@topnature.com</span>
                            </li>
                            <li className="flex items-start gap-4 group cursor-default">
                                <MapPin className="w-4 h-4 text-foreground/20 group-hover:text-primary transition-colors mt-0.5" strokeWidth={1.5} />
                                <span className="text-foreground/40 group-hover:text-foreground transition-colors text-[13px] font-bold tracking-tight leading-relaxed">Botanical HQ, MA</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                    <p className="text-[10px] text-foreground/20 uppercase tracking-[0.4em] font-black text-center md:text-left hover:text-foreground/40 transition-colors">
                        © {new Date().getFullYear()} TOPNATURE SANCTUARY. Botanical Integrity Reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-10">
                        <div className="flex items-center gap-2">
                            <Leaf className="w-3 h-3 text-primary/20" />
                            <span className="text-[9px] text-primary/30 uppercase tracking-[0.2em] font-bold">Botanical Synthesis Engine</span>
                        </div>
                        <span className="text-[9px] text-primary/30 uppercase tracking-[0.2em] font-bold">Zen Vellum Framework</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
