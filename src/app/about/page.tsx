import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShieldCheck, Heart, Sparkles, Zap } from 'lucide-react'

export const metadata = {
    title: 'Our Story | Top Nature Premium Wellness',
    description: 'Learn about our commitment to purity, quality, and simple wellness.',
}

export default function AboutPage() {
    const values = [
        {
            icon: ShieldCheck,
            title: "Pure Sourcing",
            desc: "We travel the world to find the highest-grade natural ingredients. No fillers, no synthetic additives."
        },
        {
            icon: Sparkles,
            title: "Lab Verified",
            desc: "Every batch is tested for purity and potency. We believe in transparency and professional standards."
        },
        {
            icon: Heart,
            title: "Simple Wellness",
            desc: "Health doesn't have to be complicated. We provide the natural solutions you need for a better life."
        }
    ]

    return (
        <div className="min-h-screen bg-background pt-32 pb-32">
            <div className="container-wide px-6 lg:px-12 space-y-32">
                
                {/* Hero section */}
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Our Story</span>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
                        Wellness, <br /> Made Honest.
                    </h1>
                    <p className="text-xl md:text-2xl text-foreground-muted leading-relaxed max-w-2xl mx-auto italic">
                        We started with a simple question: Why is quality wellness so complicated? We're here to change that.
                    </p>
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Only the essentials.</h2>
                            <div className="w-20 h-1 bg-primary rounded-full" />
                        </div>
                        <div className="space-y-8 text-xl text-foreground-muted leading-relaxed">
                            <p>
                                At Top Nature, we believe your body deserves the best nature has to offer. We don't hide behind complex names or secret formulas.
                            </p>
                            <p>
                                Our mission is to provide high-performance natural extracts that actually work. From the high altitudes of the Himalayas to your daily routine, we ensure every step of the journey is pure and transparent.
                            </p>
                        </div>
                        <div className="pt-8">
                            <Link href="/shop" className="btn-primary">View the Collection</Link>
                        </div>
                    </div>
                    <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-premium bg-background-offset border border-border">
                        <Image
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2600&auto=format&fit=crop"
                            alt="Nature and Wellness"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Values Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-20">
                    {values.map((v, i) => (
                        <div key={i} className="space-y-6 p-10 bg-background-offset rounded-3xl border border-border">
                            <v.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                            <h3 className="text-2xl font-bold">{v.title}</h3>
                            <p className="text-foreground-muted">{v.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Direct Call to Action */}
                <div className="bg-primary text-white rounded-[4rem] p-12 md:p-24 text-center space-y-10 shadow-premium">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl mx-auto leading-none">
                        Join our mission for a healthier life.
                    </h2>
                    <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto">
                        Ready to experience the difference of pure, high-grade essentials?
                    </p>
                    <div className="pt-8">
                        <Link href="/shop" className="px-12 py-6 bg-white text-primary rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/90 transition-all">
                            Start Your Journey
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
