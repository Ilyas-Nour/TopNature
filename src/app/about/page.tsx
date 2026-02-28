import React from 'react'
import { User } from 'lucide-react'

export const metadata = {
    title: 'About Us | EcomStore',
    description: 'Learn more about our company and mission.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background pt-40 pb-32 relative overflow-hidden">
            {/* SOLAR DEPTH */}
            <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Hero Story */}
                <div className="mb-40 space-y-12 text-center max-w-4xl mx-auto">
                    <div className="flex justify-center items-center gap-6">
                        <span className="w-16 h-[1px] bg-foreground/10" />
                        <span className="text-[11px] uppercase tracking-[0.6em] font-bold text-primary">Solar Origin</span>
                        <span className="w-16 h-[1px] bg-foreground/10" />
                    </div>
                    <h1 className="text-7xl md:text-[10rem] font-serif font-black tracking-tight uppercase leading-[0.75] text-foreground">
                        The <br /> <span className="italic font-light">Sanctuary.</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-foreground/40 font-medium tracking-tight leading-relaxed max-w-3xl mx-auto">
                        TopNature is a botanical sanctuary where ancient North African medicine meets advanced solar molecular optimization.
                    </p>
                </div>

                {/* The Philosophy */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-60">
                    <div className="space-y-16">
                        <div className="space-y-8">
                            <h2 className="text-6xl md:text-8xl font-serif font-black tracking-tight uppercase leading-none text-foreground">
                                Pure <br /> Resonance.
                            </h2>
                            <div className="w-24 h-[2px] bg-primary shadow-solar-glow" />
                        </div>
                        <div className="space-y-10 text-xl md:text-2xl text-foreground/50 font-medium tracking-tight leading-relaxed">
                            <p>
                                Every botanical essence we curate is a solar protocol. We believe that human vitalization requires a return to pure resonance—using the earth's natural intelligence to harmonize the modern spirit.
                            </p>
                            <p>
                                Wild-harvested in the sun-drenched Atlas mountains and refined with high-fidelity lab precision, our formulas are never compromised by synthetic speed. We prioritize the protocol over the rush.
                            </p>
                        </div>
                    </div>
                    <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden bg-white shadow-2xl group border border-black/5">
                        <img
                            src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000"
                            alt="Botanical Laboratory"
                            className="object-cover w-full h-full scale-105 group-hover:scale-110 transition-transform duration-[4s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
                    </div>
                </div>

                {/* The Collective */}
                <div className="space-y-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-b border-black/5 pb-16">
                        <h2 className="text-6xl md:text-8xl font-serif font-black tracking-tight uppercase text-foreground">The <span className="italic font-light">Council.</span></h2>
                        <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary max-w-sm italic">
                            A specialized assembly of botanical architects and solar molecular researchers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group space-y-10">
                                <div className="aspect-[3/4] rounded-[3rem] bg-white border border-black/5 overflow-hidden relative shadow-xl group-hover:shadow-2xl transition-all duration-700">
                                    <div className="absolute inset-0 flex items-center justify-center opacity-5">
                                        <User className="w-32 h-32" strokeWidth={0.5} />
                                    </div>
                                    <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-4xl font-serif font-bold uppercase tracking-tight text-foreground group-hover:italic transition-all">Director {i}</h3>
                                    <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary/60">Molecular Protocol</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
