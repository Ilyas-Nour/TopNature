import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Heart, Sparkles, Zap, ArrowRight, Globe, Leaf } from 'lucide-react'

export const metadata = {
    title: 'Heritage | Top Nature Premium Wellness',
    description: 'The story of our commitment to purity, quality, and the architecture of human performance.',
}

export default function AboutPage() {
    const values = [
        {
            icon: Globe,
            title: "Heritage Sourcing",
            desc: "We travel to the original biomes where botanical strength is forged through natural biological stress."
        },
        {
            icon: ShieldCheck,
            title: "Verified Purity",
            desc: "Every batch undergoes rigorous third-party validation to ensure zero contaminants and peak potency."
        },
        {
            icon: Leaf,
            title: "Zero Compromise",
            desc: "Pure extracts. No synthetic binders, no magnesium stearate, no hidden fillers. Just the baseline."
        }
    ]

    return (
        <div className="min-h-screen bg-background pt-48 pb-48">
            <div className="container-wide space-y-48">
                
                {/* Elite Hero */}
                <div className="max-w-5xl space-y-12">
                    <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary block">The Story</span>
                    <h1 className="text-7xl md:text-[10vw] font-serif font-light leading-[0.85] tracking-tighter">
                        Nature, <br /> <span className="italic pl-20 md:pl-40">Architected.</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-foreground-muted leading-relaxed max-w-3xl italic">
                        We don't just find ingredients; we source biological history. Top Nature was founded to restore the missing standard in human optimization.
                    </p>
                </div>

                {/* Cinematic Narrative Split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-premium group">
                        <Image
                            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2600&auto=format&fit=crop"
                            alt="The High Himalayas"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                    </div>
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-5xl md:text-7xl font-serif font-light leading-none tracking-tighter italic">
                                Sourced from <br /> the <span className="pl-12">Extremes.</span>
                            </h2>
                            <div className="w-24 h-[1px] bg-primary" />
                        </div>
                        <div className="space-y-10 text-xl text-foreground-muted leading-relaxed font-sans font-medium">
                            <p>
                                Purity isn't a marketing term; it's a geological reality. Our flagship Shilajit is hand-collected from the high-altitude resins of the Himalayas, where the earth's pressure creates the world's most concentrated mineral profile.
                            </p>
                            <p>
                                We apply this same extreme standard to every extract in our vault. From the Junin Plateau to the Rajasthan roots, we exclusively work with heritage farms that respect the biological rhythm of the plant.
                            </p>
                        </div>
                        <div className="pt-8">
                            <Link href="/shop" className="group btn-primary">
                                Explore The Protocols <ArrowRight className="inline ml-3 w-4 h-4 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Values / Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                    {values.map((v, i) => (
                        <div key={i} className="space-y-8 p-12 bg-white rounded-[3rem] border border-border shadow-card hover:shadow-premium transition-all duration-700">
                            <div className="w-16 h-16 bg-background-offset rounded-2xl flex items-center justify-center text-primary">
                                <v.icon className="w-8 h-8" strokeWidth={1} />
                            </div>
                            <h3 className="text-3xl font-serif tracking-tighter italic">{v.title}</h3>
                            <p className="text-lg text-foreground-muted font-medium leading-relaxed">{v.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Final High-End CTA */}
                <div className="relative rounded-[5rem] overflow-hidden bg-black text-white p-20 md:p-32 text-center group">
                    <div className="absolute inset-0 opacity-30 pointer-events-none">
                        <Image 
                            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2600&auto=format&fit=crop" 
                            alt="Background"
                            fill
                            className="object-cover transition-transform duration-2000 group-hover:scale-110"
                        />
                    </div>
                    <div className="relative z-10 space-y-12">
                        <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light tracking-tighter leading-none max-w-5xl mx-auto italic">
                            Redefine your <br /> biological <span className="pl-20">Limit.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed">
                            Join those who demand a higher standard for their daily baseline.
                        </p>
                        <div className="pt-12">
                            <Link href="/shop" className="px-16 py-8 bg-white text-primary rounded-full font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white/90 transition-all duration-500 shadow-xl">
                                Start The Protocol
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
