'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail, MapPin, ArrowRight } from 'lucide-react'

export function Footer() {
    const sections = [
        {
            title: "Collections",
            links: [
                { label: 'The Full Vault', href: '/shop' },
                { label: 'Energy Protocols', href: '/shop?category=energy' },
                { label: 'Sleep Recovery', href: '/shop?category=sleep' },
                { label: 'Cognitive Mind', href: '/shop?category=mind' }
            ]
        },
        {
            title: "Heritage",
            links: [
                { label: 'Our Story', href: '/about' },
                { label: 'The Protocol', href: '/protocol' },
                { label: 'Insights', href: '/blog' },
                { label: 'Collaborations', href: '/contact' }
            ]
        },
        {
            title: "Concierge",
            links: [
                { label: 'Shipping Policy', href: '/shipping' },
                { label: 'Returns & Claims', href: '/returns' },
                { label: 'Scientific FAQ', href: '/faq' },
                { label: 'Privacy Protocol', href: '/privacy' }
            ]
        }
    ]

    return (
        <footer className="bg-white border-t border-border pt-32 pb-16">
            <div className="container-wide">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-24 mb-32">
                    
                    {/* Brand / Newsletter */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-6">
                            <Link href="/" className="text-4xl font-serif font-light tracking-tighter text-foreground italic">
                                Top Nature
                            </Link>
                            <p className="text-xl text-foreground-muted max-w-sm leading-relaxed font-serif italic">
                                "The architecture of human performance, sourced from the earth's most resilient biomes."
                            </p>
                        </div>
                        
                        <div className="space-y-6 max-w-md bg-background-offset p-10 rounded-[2.5rem] border border-border">
                            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">The Insider Protocol</h4>
                            <p className="text-[11px] uppercase tracking-widest text-foreground/40 leading-relaxed font-bold">Join 50,000+ high-performers for weekly research on natural optimization.</p>
                            <div className="relative pt-4">
                                <input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="w-full bg-transparent border-b border-border py-4 focus:border-primary outline-none transition-all placeholder:text-foreground/20 text-xs font-bold uppercase tracking-widest"
                                />
                                <button className="absolute right-0 bottom-4 text-primary">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-16">
                        {sections.map((section) => (
                            <div key={section.title} className="space-y-10">
                                <h4 className="text-[10px] uppercase tracking-[0.5em] font-bold text-foreground">
                                    {section.title}
                                </h4>
                                <ul className="space-y-6">
                                    {section.links.map((link) => (
                                        <li key={link.label}>
                                            <Link 
                                                href={link.href}
                                                className="text-[11px] uppercase tracking-[0.2em] font-bold text-foreground/40 hover:text-primary transition-all duration-500"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex gap-10">
                        <Link href="#" className="p-3 glass rounded-full hover:bg-primary hover:text-white transition-all duration-500 shadow-sm">
                            <Instagram className="w-4 h-4" strokeWidth={1.5} />
                        </Link>
                        <Link href="#" className="p-3 glass rounded-full hover:bg-primary hover:text-white transition-all duration-500 shadow-sm">
                            <Twitter className="w-4 h-4" strokeWidth={1.5} />
                        </Link>
                    </div>

                    <div className="text-center md:text-right space-y-2">
                        <p className="text-[9px] uppercase tracking-[0.5em] text-foreground/20 font-bold">
                            © {new Date().getFullYear()} Top Nature (Intl) Protocol. All standards reserved.
                        </p>
                        <div className="flex justify-center md:justify-end gap-10 text-[9px] uppercase tracking-[0.3em] font-bold text-foreground/10 hover:text-foreground/40 transition-colors cursor-pointer">
                            <span>Sourcing Ethics</span>
                            <span>Privacy Vault</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
