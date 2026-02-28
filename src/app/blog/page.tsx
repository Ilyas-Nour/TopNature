import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function BlogPage() {
    // Admin Guard: Protect the beta route
    const isAdmin = process.env.ADMIN_BETA_ACCESS === 'true';

    if (!isAdmin) {
        redirect('/');
    }

    const placeholderPosts = [
        {
            title: "The Science of Fulvic Acid in Shilajit",
            excerpt: "Explore the biological mechanism behind nature's most powerful mineral complex synthesized for modern solar performance.",
            date: "Feb 26, 2026",
            tag: "Biology",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000"
        },
        {
            title: "Mastering Cortisol with KSM-66",
            excerpt: "How clinical-grade Ashwagandha modulates your endocrine system for peak sanctuary resilience and solar stability.",
            date: "Feb 24, 2026",
            tag: "Endocrine",
            image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1000"
        },
        {
            title: "Traditional Bio-Hacking: The Moroccan Way",
            excerpt: "Bridging ancient North African ethno-botanical wisdom with modern Alabaster standards for specialized results.",
            date: "Feb 20, 2026",
            tag: "Culture",
            image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000"
        }
    ];

    return (
        <div className="min-h-screen bg-background pt-48 pb-40 relative overflow-hidden">
            {/* SOLAR DEPTH */}
            <div className="absolute top-0 left-0 w-[1200px] h-[1200px] bg-primary/5 rounded-full blur-[250px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header Section */}
                <div className="mb-48 space-y-12 max-w-4xl">
                    <div className="flex items-center gap-8">
                        <span className="w-20 h-[3px] bg-primary shadow-solar-glow" />
                        <span className="text-[12px] uppercase tracking-[0.8em] font-black text-primary italic">Experimental Journal</span>
                    </div>
                    <h1 className="text-8xl md:text-[12rem] font-serif font-black tracking-tight uppercase leading-[0.7] text-foreground">
                        The <br /> <span className="italic font-light text-primary">Telemetry.</span>
                    </h1>
                    <p className="text-2xl md:text-3xl text-foreground/40 max-w-2xl font-medium tracking-tight leading-relaxed italic">
                        A repository of botanical clinical research, solar pharmacological insights, and optimized alabaster protocols.
                    </p>
                </div>

                {/* Journal Feed */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-48">
                    {placeholderPosts.map((post, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative aspect-[16/10] bg-white rounded-[5rem] overflow-hidden mb-16 shadow-2xl border border-black/5">
                                <img
                                    src={post.image || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000"}
                                    alt={post.title}
                                    className="object-cover w-full h-full scale-105 group-hover:scale-110 transition-transform duration-[5s]"
                                />
                                <div className="absolute inset-x-12 bottom-12 flex items-center justify-between z-10">
                                    <span className="text-[12px] uppercase tracking-[0.4em] font-black text-white bg-black/20 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10">{post.tag}</span>
                                    <span className="text-[12px] uppercase tracking-[0.4em] font-black text-white bg-black/20 backdrop-blur-xl px-8 py-3 rounded-full border border-white/10">{post.date}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-1000 ease-[0.16, 1, 0.3, 1]" />
                            </div>
                            <div className="space-y-10 max-w-3xl px-6">
                                <h3 className="text-6xl md:text-7xl font-serif font-black tracking-tight uppercase leading-[0.85] group-hover:italic group-hover:text-primary transition-all duration-1000">
                                    {post.title}
                                </h3>
                                <p className="text-foreground/40 text-xl md:text-2xl font-medium tracking-tight leading-relaxed italic">
                                    {post.excerpt}
                                </p>
                                <div className="pt-10 flex items-center gap-10">
                                    <Link href="#" className="text-[13px] uppercase tracking-[0.6em] font-black border-b-2 border-primary/20 pb-3 hover:border-primary transition-all italic text-primary">
                                        Access Research
                                    </Link>
                                    <div className="flex-1 h-[2px] bg-black/5 group-hover:bg-primary/20 transition-colors" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
