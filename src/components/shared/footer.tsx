import Link from 'next/link'
import { Instagram, Facebook, Twitter, Link as LinkedInIcon, Mail, MapPin, Phone } from 'lucide-react'
import { AnimatedNavLink } from '../ui/animated-nav-link'
import { SocialButton } from '../ui/social-button'

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-32 pb-16">
            <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">

                    {/* Brand Identity */}
                    <div className="lg:col-span-4 space-y-10">
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
                                icon={Twitter}
                                href="#"
                                color="#1DA1F2"
                            />
                            <SocialButton
                                icon={LinkedInIcon}
                                href="#"
                                color="#0077B5"
                            />
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black">Shop</h4>
                        <ul className="space-y-4">
                            {['All Products', 'New Arrivals', 'Best Sellers', 'Skin Rituals'].map((link) => (
                                <li key={link}>
                                    <AnimatedNavLink
                                        href="/shop"
                                        title={link}
                                        className="text-muted-foreground hover:text-black transition-colors text-sm font-medium"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black">Ritual</h4>
                        <ul className="space-y-4">
                            {['The Philosophy', 'Botanical Glossary', 'Laboratory', 'Journal'].map((link) => (
                                <li key={link}>
                                    <AnimatedNavLink
                                        href="/about"
                                        title={link}
                                        className="text-muted-foreground hover:text-black transition-colors text-sm font-medium"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black">Company</h4>
                        <ul className="space-y-4">
                            {['Our Story', 'Contact Us', 'Shipping & Returns', 'Privacy Policy'].map((link) => (
                                <li key={link}>
                                    <AnimatedNavLink
                                        href={link === 'Contact Us' ? '/contact' : '/about'}
                                        title={link}
                                        className="text-muted-foreground hover:text-black transition-colors text-sm font-medium"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info (Desktop) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-black">Support</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-sm font-medium">hello@topnature.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-sm font-medium">+212 500 000 000</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-sm font-medium leading-relaxed">Gauthier, Casablanca 20250</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 font-inter">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-bold">
                        © {new Date().getFullYear()} TopNature Inc. All beauty reserved.
                    </p>
                    <div className="flex gap-8">
                        <span className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Sustainability First</span>
                        <span className="text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Moroccan Heritage</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
