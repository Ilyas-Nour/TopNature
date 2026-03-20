import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Share2, Bookmark } from 'lucide-react'

export async function generateMetadata({ params }: { params: { slug: string } }) {
    return {
        title: `${params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Top Nature Journal`,
    }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    return (
        <div className="min-h-screen bg-background pt-48 pb-48">
            <div className="container-wide max-w-6xl">
                
                {/* Post Header */}
                <div className="space-y-16 text-center mb-24">
                    <Link href="/blog" className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/40 hover:text-primary transition-all">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Journal
                    </Link>
                    <div className="space-y-10">
                        <div className="flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest font-bold text-primary">
                            <span>Science</span>
                            <span className="w-8 h-[1px] bg-border" />
                            <span className="text-foreground/30">March 12, 2026</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-light leading-[0.85] tracking-tighter italic">
                            Mitochondrial <br /> <span className="pl-16 md:pl-32">Resilience.</span>
                        </h1>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative aspect-[21/9] rounded-[4rem] overflow-hidden mb-32 shadow-premium group">
                    <Image 
                        src="https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2600&auto=format&fit=crop" 
                        alt="Article Image"
                        fill
                        className="object-cover transition-transform duration-2000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-40" />
                </div>

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 relative">
                    
                    {/* Sidebar / Tools */}
                    <div className="lg:col-span-1 flex lg:flex-col items-center justify-center lg:justify-start gap-12 sticky top-48">
                         <button className="p-4 rounded-full border border-border text-foreground/20 hover:text-primary transition-all">
                            <Share2 className="w-5 h-5" />
                         </button>
                         <button className="p-4 rounded-full border border-border text-foreground/20 hover:text-primary transition-all">
                            <Bookmark className="w-5 h-5" />
                         </button>
                    </div>

                    {/* Article Content */}
                    <div className="lg:col-span-11 max-w-4xl space-y-12 text-2xl md:text-3xl text-foreground font-serif italic leading-relaxed">
                        <p className="first-letter:text-[10vw] first-letter:float-left first-letter:mr-8 first-letter:font-serif first-letter:italic first-letter:text-primary first-letter:leading-none">
                            The complexity of cellular energy production is often reduced to a simple exchange of glucose for ATP. However, the architecture of performance is governed by the resilience of the mitochondrial membrane and the efficiency of the electronic transport chain.
                        </p>
                        <p>
                            We observe that heritage extracts, such as pure Shilajit resin harvested at altitudes exceeding 14,000 feet, provide a unique molecular complex of Fulvic Acid and trace minerals that act as high-efficiency electrolytes.
                        </p>
                        <h2 className="text-5xl font-serif not-italic tracking-tighter pt-12 text-primary font-light">The Fulvic Catalyst.</h2>
                        <p>
                            Fulvic acid is not merely an antioxidant; it is a profound biostimulant that increases the permeability of the cell membrane, allowing for enhanced nutrient absorption and rapid waste evacuation. When combined with natural resins, it creates a synergistic effect that stabilizes the cell during periods of high cognitive or physical exertion.
                        </p>
                        <blockquote className="py-20 border-y border-border text-center">
                            <p className="text-5xl md:text-6xl text-primary font-serif font-light leading-tight">"We solve for the root, <br /> not the symptom."</p>
                        </blockquote>
                        <p>
                            The future of human optimization lies not in synthetic boosters, but in the restoration of original biological signaling. By sourced extracts from the world's most resilient biomes, we recover the baseline that modern environments have eroded.
                        </p>
                    </div>
                </div>

                {/* Next Read */}
                <div className="pt-48 border-t border-border mt-48 text-center space-y-12">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/30">Next Insight</span>
                    <Link href="/blog/ancient-biomes" className="block text-4xl md:text-7xl font-serif italic tracking-tighter hover:text-primary transition-colors">
                        Heritage Biomes: Why <br /> Sourcing Elevation Matters.
                    </Link>
                </div>

            </div>
        </div>
    )
}
