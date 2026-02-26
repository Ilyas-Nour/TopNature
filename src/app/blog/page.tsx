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
            excerpt: "Explore the biological mechanism behind nature's most powerful mineral complex...",
            date: "Feb 26, 2026"
        },
        {
            title: "Mastering Cortisol with KSM-66",
            excerpt: "How clinical-grade Ashwagandha modulates your endocrine system for peak resilience...",
            date: "Feb 24, 2026"
        },
        {
            title: "Traditional Bio-Hacking: The Moroccan Way",
            excerpt: "Bridging ancient ethno-botanical wisdom with modern pharmacological standards...",
            date: "Feb 20, 2026"
        }
    ];

    return (
        <div className="min-h-screen bg-white text-black py-32">
            <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
                <div className="max-w-4xl space-y-20">
                    <div className="space-y-8">
                        <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-black/40 block">Beta Lab Access</span>
                        <h1 className="text-7xl font-serif font-bold tracking-tighter leading-tight">
                            The TopNature Journal.
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
                            Bespoke clinical insights, botanical research, and high-performance protocols from our pharmacological lab.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                        {placeholderPosts.map((post, i) => (
                            <div key={i} className="group space-y-8 cursor-pointer">
                                <div className="aspect-[16/10] bg-[#FAFAFA] rounded-2xl border border-gray-50 group-hover:bg-gray-100 transition-colors duration-500 overflow-hidden relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-black/10">Draft Image</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30">{post.date}</span>
                                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/30">Science</span>
                                    </div>
                                    <h3 className="text-3xl font-bold tracking-tight leading-tight group-hover:text-black/60 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed font-light">
                                        {post.excerpt}
                                    </p>
                                    <div className="pt-4">
                                        <Link href="#" className="text-[11px] uppercase tracking-[0.2em] font-bold border-b border-black/10 pb-1 hover:border-black transition-all">
                                            Read Experiment
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
