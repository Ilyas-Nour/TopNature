import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Microscope, Brain, Zap, Shield, ArrowRight, Activity, FlaskConical, Target } from 'lucide-react'

export const metadata = {
    title: 'The Protocol | Top Nature Scientific Standards',
    description: 'The architecture of human performance. Exploring the biological synergy of our heritage extracts.',
}

export default function ProtocolPage() {
    const pillars = [
        {
            icon: Brain,
            title: "Neural Synergy",
            desc: "Our nootropic protocols focus on the upregulation of BDNF and the modulation of GABA-glutamate pathways for sustained clarity."
        },
        {
            icon: Zap,
            title: "Mitochondrial Flux",
            desc: "Shilajit and NMN are utilized to optimize the ATP production cycle, ensuring energy is sourced from the cell, not the stimulant."
        },
        {
            icon: Shield,
            title: "Adaptive Load",
            desc: "Adaptogenic roots are selected to modulate the HPA axis, providing a physiological buffer against environmental and cognitive stress."
        }
    ]

    return (
        <div className="min-h-screen bg-background pt-48 pb-48">
            <div className="container-wide space-y-48">
                
                {/* Protocol Hero */}
                <div className="max-w-5xl space-y-12">
                    <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary block">Architecture</span>
                    <h1 className="text-7xl md:text-[10vw] font-serif font-light leading-[0.85] tracking-tighter">
                        The <br /> <span className="italic pl-20 md:pl-40">Protocol.</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-foreground-muted leading-relaxed max-w-3xl italic">
                        Human performance is not a pursuit of luck; it is a clinical discipline. We map the intersection of heritage botany and modern bioscience.
                    </p>
                </div>

                {/* Science Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                    <div className="space-y-16">
                        <div className="space-y-8">
                            <h2 className="text-5xl md:text-7xl font-serif font-light leading-none tracking-tighter italic">
                                Sourcing <br /><span className="pl-12">Purity.</span>
                            </h2>
                            <div className="w-24 h-[1px] bg-primary" />
                        </div>
                        <div className="space-y-10 text-xl text-foreground-muted leading-relaxed font-sans font-medium">
                            <p>
                                At Top Nature, we treat extraction as an art of preservation. Standard industry methods often degrade active metabolites through heat and solvent exposure. Our protocols utilize low-temperature vacuum extraction and traditional sun-drying to maintain the biological signature of the plant.
                            </p>
                            <div className="grid grid-cols-1 gap-8 pt-12">
                                <div className="flex gap-8 items-start">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Microscope className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold">Mass Spectrometry</h4>
                                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Every batch is verified for mineral density and zero heavy metal saturation.</p>
                                    </div>
                                </div>
                                <div className="flex gap-8 items-start">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <FlaskConical className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold">Cold-Pressed Essence</h4>
                                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Preserving the volatile oils and terpenes that govern biological availability.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-square rounded-[5rem] overflow-hidden group shadow-premium">
                        <Image
                            src="https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2600&auto=format&fit=crop"
                            alt="Laboratory Precision"
                            fill
                            className="object-cover transition-transform duration-2000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply transition-opacity group-hover:opacity-0" />
                    </div>
                </div>

                {/* Pillars Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                    {pillars.map((p, i) => (
                        <div key={i} className="space-y-8 p-12 bg-white rounded-[3rem] border border-border shadow-card group hover:shadow-premium transition-all duration-700">
                            <div className="w-16 h-16 bg-background-offset rounded-2xl flex items-center justify-center text-primary transition-transform group-hover:scale-110">
                                <p.icon className="w-8 h-8" strokeWidth={1} />
                            </div>
                            <h3 className="text-3xl font-serif tracking-tighter italic">{p.title}</h3>
                            <p className="text-lg text-foreground-muted font-medium leading-relaxed">{p.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Data Visual / Clinical Trust */}
                <div className="bg-black text-white p-20 md:p-32 rounded-[5rem] overflow-hidden relative group">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-12">
                            <h2 className="text-6xl md:text-8xl font-serif font-light tracking-tighter italic leading-[0.85]">
                                Verified <br /> <span className="pl-16">Benchmarks.</span>
                            </h2>
                            <p className="text-white/40 text-xl md:text-2xl leading-relaxed italic max-w-xl">
                                We hold ourselves to a standard that transcends regulation. Our goal is 100% molecular transparency.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 md:gap-16">
                            {[
                                { val: '100%', label: 'Purity Level' },
                                { val: 'Zero', label: 'Synthetic Buffers' },
                                { val: '72hr', label: 'Quality Loop' },
                                { val: '80+', label: 'Fulvic Minerals' }
                            ].map((stat, i) => (
                                <div key={i} className="space-y-2 border-l border-white/10 pl-8 py-4">
                                    <p className="text-5xl font-serif italic text-primary">{stat.val}</p>
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final Master CTA */}
                <div className="text-center space-y-16">
                    <h2 className="text-5xl md:text-7xl font-serif font-light italic tracking-tighter">Align your biology.</h2>
                    <Link href="/shop" className="btn-primary px-20">
                        Explore The Vault
                    </Link>
                </div>
            </div>
        </div>
    )
}
