'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone, ChevronDown } from 'lucide-react'
import { AnimatedNavLink } from '../ui/animated-nav-link'
import { SocialButton } from '../ui/social-button'
import { motion, AnimatePresence } from 'framer-motion'

interface FooterColumnProps {
    title: string
    links: { label: string; href: string }[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="lg:col-span-2 space-y-4 md:space-y-8 border-b border-gray-100 md:border-none pb-6 md:pb-0">
            {/* Title / Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between md:cursor-default group"
            >
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black">{title}</h4>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="md:hidden"
                >
                    <ChevronDown className="w-4 h-4 text-black/20 group-hover:text-black transition-colors" />
                </motion.div>
            </button>

            {/* Links List */}
            <div className="hidden md:block">
                <ul className="space-y-4">
                    {links.map((link) => (
                        <li key={link.label}>
                            <AnimatedNavLink
                                href={link.href}
                                title={link.label}
                                className="text-muted-foreground hover:text-black transition-colors text-sm font-medium"
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Accordion Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
                        className="overflow-hidden md:hidden pt-4"
                    >
                        <ul className="space-y-4">
                            {links.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-black transition-colors text-sm font-medium block py-1">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export function Footer() {
    const NAVIGATION_DATA = [
        {
            title: "Shop",
            links: [
                { label: 'All Products', href: '/shop' },
                { label: 'New Arrivals', href: '/shop' },
                { label: 'Best Sellers', href: '/shop' },
                { label: 'Skin Rituals', href: '/shop' },
            ]
        },
        {
            title: "Ritual",
            links: [
                { label: 'The Philosophy', href: '/about' },
                { label: 'Botanical Glossary', href: '/about' },
                { label: 'Laboratory', href: '/about' },
                { label: 'Journal', href: '/about' },
            ]
        },
        {
            title: "Company",
            links: [
                { label: 'Our Story', href: '/about' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Shipping & Returns', href: '/about' },
                { label: 'Privacy Policy', href: '/about' },
            ]
        }
    ]

    return (
        <footer className="bg-white border-t border-gray-100 pt-20 md:pt-32 pb-16">
            <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-16 lg:gap-8 mb-24">

                    {/* Brand Identity */}
                    <div className="lg:col-span-4 space-y-8 md:space-y-10">
                        <Link href="/" className="text-3xl font-serif font-bold tracking-tighter hover:opacity-80 transition-opacity">
                            TopNature.
                        </Link>
                        <p className="text-muted-foreground font-inter text-lg leading-relaxed max-w-sm">
                            Elevating daily rituals through North African botanical excellence and bio-active science.
                        </p>
                        <div className="flex gap-4">
                            <SocialButton
                                icon={Instagram}
                                href="#"
                                color="#E4405F"
                            />
                            <SocialButton
                                icon={Facebook}
                                href="#"
                                color="#1877F2"
                            />
                            <SocialButton
                                icon={MessageCircle}
                                href="#"
                                color="#25D366"
                            />
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    {NAVIGATION_DATA.map((col) => (
                        <FooterColumn key={col.title} title={col.title} links={col.links} />
                    ))}

                    {/* Contact Info (Desktop) */}
                    <div className="lg:col-span-2 space-y-8 pt-8 md:pt-0">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black">Support</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4 md:gap-3">
                                <Mail className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-sm font-medium">hello@topnature.com</span>
                            </li>
                            <li className="flex items-start gap-4 md:gap-3">
                                <Phone className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-sm font-medium">+212 500 000 000</span>
                            </li>
                            <li className="flex items-start gap-4 md:gap-3">
                                <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-sm font-medium leading-relaxed">Gauthier, Casablanca 20250</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 font-inter">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold text-center md:text-left">
                        © {new Date().getFullYear()} TopNature Inc. All beauty reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        <span className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Sustainability First</span>
                        <span className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Moroccan Heritage</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
