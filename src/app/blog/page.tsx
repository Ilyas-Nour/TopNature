import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, BookOpen } from 'lucide-react'

export const metadata = {
    title: 'Archive | The Top Nature Journal',
    description: 'Insights into human biology, heritage botany, and the intersection of nature and performance.',
}

export default function BlogIndex() {
    const posts = [
        {
            slug: 'mitochondrial-resilience',
            title: "Mitochondrial Resilience: Beyond ATP Production",
            excerpt: "Exploring the role of Fulvic Acid in the electronic transport chain and its impact on cellular longevity.",
            category: "Science",
            date: "Mar 12, 2026",
            image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=2600&auto=format&fit=crop"
        },
        {
            slug: 'ancient-biomes',
            title: "Heritage Biomes: Why Sourcing Elevation Matters",
            excerpt: "The biological pressure of high-altitude harvesting and its effect on metabolite concentration.",
            category: "Heritage",
            date: "Feb 28, 2026",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2600&auto=format&fit=crop"
        },
        {
            slug: 'neural-flow-states',
            title: "Architecting Neural Flow: The Dopamine-GABA Balance",
            excerpt: "How adaptogenic protocols stabilize the neurochemical landscape for prolonged cognitive performance.",
            category: "Performance",
            date: "Feb 15, 2026",
            image: "https://images.unsplash.com/photo-1484480974627-6ac1f51540ae?q=80&w=2600&auto=format&fit=crop"
        }
    ]

    return (
        <div className="min-h-screen bg-background pt-48 pb-48">
            <div className="container-wide space-y-32">
                
                {/* Journal Header */}
                <div className="max-w-5xl space-y-12">
                    <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary block">Journal</span>
                    <h1 className="text-7xl md:text-[10vw] font-serif font-light leading-[0.85] tracking-tighter">
                        The <br /> <span className="italic pl-20 md:pl-40">Insights.</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-foreground-muted leading-relaxed max-w-2xl italic">
                        Observations on the architecture of performance and the biology of resilience.
                    </p>
                </div>

                {/* Featured Post */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                    <div className="lg:col-span-7 relative aspect-video rounded-[4rem] overflow-hidden group shadow-premium">
                        <Image 
                            src={posts[0].image} 
                            alt={posts[0].title}
                            fill
                            className="object-cover transition-transform duration-2000 group-hover:scale-110"
                        />
                         <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-50" />
                    </div>
                    <div className="lg:col-span-5 space-y-10">
                        <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-primary">
                            <span>{posts[0].category}</span>
                            <span className="w-12 h-[1px] bg-border" />
                            <span className="text-foreground/30">{posts[0].date}</span>
                        </div>
                        <h2 className="text-5xl font-serif leading-tight italic tracking-tighter">
                            {posts[0].title}
                        </h2>
                        <p className="text-xl text-foreground-muted font-medium italic leading-relaxed">
                            {posts[0].excerpt}
                        </p>
                        <div className="pt-6">
                            <Link href={`/blog/${posts[0].slug}`} className="group btn-primary">
                                Read Insight <ArrowUpRight className="inline ml-3 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Post Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 pt-24 border-t border-border">
                    {posts.slice(1).map((post, i) => (
                        <Link key={i} href={`/blog/${post.slug}`} className="group space-y-10 block">
                            <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-card group-hover:shadow-premium transition-all duration-700">
                                <Image 
                                    src={post.image} 
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-2000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply opacity-50" />
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-[9px] uppercase tracking-widest font-bold text-foreground/30">
                                    <span>{post.category}</span>
                                    <span>—</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-3xl font-serif italic tracking-tighter leading-tight group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-lg text-foreground-muted font-medium italic leading-relaxed line-clamp-2">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Newsletter Plug */}
                <div className="bg-background-offset p-20 rounded-[5rem] text-center space-y-12">
                     <h2 className="text-4xl md:text-6xl font-serif font-light italic tracking-tighter">The Weekly Protocol.</h2>
                     <p className="text-xl text-foreground-muted max-w-xl mx-auto italic">Join 50,000+ others for deep dives into human optimization.</p>
                     <div className="max-w-md mx-auto relative group">
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="w-full bg-white rounded-full px-12 py-8 border border-border focus:border-primary outline-none transition-all placeholder:text-foreground/20 text-xs font-bold uppercase tracking-widest shadow-sm"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 btn-primary px-8 h-12 flex items-center justify-center">
                            Join
                        </button>
                     </div>
                </div>

            </div>
        </div>
    )
}
