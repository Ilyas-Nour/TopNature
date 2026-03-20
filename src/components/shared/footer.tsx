'use client'

import React from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail, MapPin } from 'lucide-react'

export function Footer() {
    const sections = [
        {
            title: "Shop",
            links: [
                { label: 'All Products', href: '/shop' },
                { label: 'Energy', href: '/shop?category=energy' },
                { label: 'Sleep', href: '/shop?category=sleep' },
                { label: 'Health', href: '/shop?category=health' }
            ]
        },
        {
            title: "About",
            links: [
                { label: 'Our Story', href: '/about' },
                { label: 'Quality Standards', href: '/about' },
                { label: 'Sustainability', href: '/about' },
                { label: 'Contact', href: '/contact' }
            ]
        },
        {
            title: "Support",
            links: [
                { label: 'Shipping', href: '/shipping' },
                { label: 'Returns', href: '/returns' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Privacy', href: '/privacy' }
            ]
        }
    ]

    return (
        <footer className="bg-background-offset border-t border-border pt-20 pb-12">
            <div className="container-wide px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
                    
                    {/* Brand Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="text-2xl font-bold tracking-tight text-foreground uppercase">
                            Top Nature
                        </Link>
                        <p className="text-foreground-muted max-w-sm">
                            Premium wellness solutions designed for your daily life. Simple, natural, and effective products for energy, sleep, and longevity.
                        </p>
                        <div className="flex gap-6">
                            <Link href="#" className="p-3 bg-white rounded-full border border-border hover:bg-background transition-colors">
                                <Instagram className="w-5 h-5 text-foreground/60" />
                            </Link>
                            <Link href="#" className="p-3 bg-white rounded-full border border-border hover:bg-background transition-colors">
                                <Facebook className="w-5 h-5 text-foreground/60" />
                            </Link>
                            <Link href="#" className="p-3 bg-white rounded-full border border-border hover:bg-background transition-colors">
                                <Twitter className="w-5 h-5 text-foreground/60" />
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    {sections.map((section) => (
                        <div key={section.title} className="lg:col-span-2 space-y-8">
                            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground">
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link 
                                            href={link.href}
                                            className="text-sm text-foreground-muted hover:text-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground">
                            Contact
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-sm text-foreground-muted">
                                <Mail className="w-4 h-4" strokeWidth={1.5} />
                                <span>hello@essentials.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-foreground-muted">
                                <MapPin className="w-4 h-4" strokeWidth={1.5} />
                                <span>Casablanca, MA</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] uppercase tracking-widest text-foreground-muted font-medium">
                        © {new Date().getFullYear()} Top Nature Premium Wellness. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <Link href="/terms" className="text-[10px] uppercase tracking-widest text-foreground-muted hover:text-primary transition-colors font-medium">Terms</Link>
                        <Link href="/privacy" className="text-[10px] uppercase tracking-widest text-foreground-muted hover:text-primary transition-colors font-medium">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
