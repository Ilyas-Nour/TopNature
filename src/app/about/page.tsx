import React from 'react'
import { User } from 'lucide-react'

export const metadata = {
    title: 'About Us | EcomStore',
    description: 'Learn more about our company and mission.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <h1 className="editorial-heading text-5xl md:text-8xl mb-16 text-center">Our Story</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
                    <div>
                        <h2 className="editorial-heading text-3xl md:text-4xl mb-6 text-foreground">A Commitment to the Botanical Arts</h2>
                        <div className="space-y-6 text-xl text-muted-foreground leading-relaxed font-light tracking-wide">
                            <p>
                                At TopNature, we believe in the raw potency of the earth. Founded in 2026, our mission is to redefine clean beauty by fusing ancient apothecary wisdom with modern dermatological science.
                            </p>
                            <p>
                                Every botanical extract we use is wildcrafted or organically grown, ensuring that what touches your skin is as pure as nature intended. No fillers, no synthetic fragrances—just results.
                            </p>
                        </div>
                    </div>
                    <div className="aspect-[4/5] bg-secondary/10 relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000"
                            alt="Botanical Laboratory"
                            className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>
                </div>

                <h2 className="editorial-heading text-4xl mb-12 text-center uppercase tracking-widest text-secondary">The Collective</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className="aspect-[3/4] w-full bg-secondary/5 mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-secondary/20">
                                    <User className="w-16 h-16" strokeWidth={0.5} />
                                </div>
                            </div>
                            <h3 className="editorial-heading text-2xl text-foreground mb-1">Founder {i}</h3>
                            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium mb-3">Creative Direction</p>
                            <p className="text-sm text-muted-foreground font-light leading-relaxed px-4">Guiding the TopNature vision with a focus on artisanal quality and botanical integrity.</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
