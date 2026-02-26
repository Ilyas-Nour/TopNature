import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ArrowRight, Brain, Activity, Zap, ShieldCheck, Leaf, FlaskConical, CheckCircle2 } from "lucide-react";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const featuredSlugs = ['himalayan-shilajit-resin', 'ashwagandha-ksm-66', 'tongkat-ali-200-1'];

  const featuredProducts = await prisma.product.findMany({
    where: {
      slug: { in: featuredSlugs }
    },
    include: {
      category: true,
    }
  });

  // Sort them to match the order in the array
  const sortedFeatured = featuredSlugs.map(slug => featuredProducts.find(p => p.slug === slug)).filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* HIGH-IMPACT HERO SECTION */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-black">
        <Image
          src="https://images.unsplash.com/photo-1615397323140-60b6b194fb21?q=80&w=2000&auto=format&fit=crop"
          alt="Ancient Wisdom"
          fill
          priority
          className="object-cover opacity-60 brightness-75 scale-105"
        />
        <div className="relative z-10 max-w-5xl px-6 text-center space-y-8">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-white/70 block">Bio-Active Botanical Mastery</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white font-bold leading-[0.9] tracking-tighter">
              Unlock Your <br /> Peak Potential.
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            Clinically dosed, wild-harvested adaptogens to master stress, energy, and focus.
          </p>
          <div className="pt-8">
            <Link
              href="/shop"
              className="inline-block px-16 py-6 bg-white text-black rounded-full text-[13px] font-bold uppercase tracking-[0.3em] hover:bg-gray-200 transition-all shadow-2xl active:scale-95"
            >
              Shop the Formulas
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="w-full bg-[#FAFAFA] border-y border-gray-100 py-10">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-black/40" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">3rd-Party Lab Tested</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform">
                <Leaf className="w-6 h-6 text-black/40" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">Sustainably Sourced</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform">
                <FlaskConical className="w-6 h-6 text-black/40" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/60">No Synthetic Fillers</span>
            </div>
          </div>
        </div>
      </div>

      {/* SCIENCE & BENEFITS DEEP DIVE */}
      <section className="w-full py-32 bg-white">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-muted-foreground block">The Mechanism</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-black">Precision Performance Science</h2>
            <div className="w-20 h-[1px] bg-black/10 mx-auto mt-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
            <div className="space-y-8 group">
              <div className="w-16 h-16 rounded-2xl bg-[#FAFAFA] flex items-center justify-center border border-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-500">
                <Brain className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">Cognitive Clarity</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Enhance neurogenesis and neurotransmitter efficiency. Our nootropic formulas clear brain fog and sharpen neural processing speed for elite mental performance.
                </p>
              </div>
            </div>

            <div className="space-y-8 group">
              <div className="w-16 h-16 rounded-2xl bg-[#FAFAFA] flex items-center justify-center border border-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-500">
                <Activity className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">Hormonal Balance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Optimizing the endocrine system to manage cortisol and elevate vital hormones. Regain biological homeostasis and mastery over your stress response.
                </p>
              </div>
            </div>

            <div className="space-y-8 group">
              <div className="w-16 h-16 rounded-2xl bg-[#FAFAFA] flex items-center justify-center border border-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-500">
                <Zap className="w-8 h-8" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold tracking-tight">Cellular Energy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Targeting ATP production at the mitochondrial level. Sustained, jitter-free energy that fuels both physical endurance and mental grit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FORMULAS GRID */}
      <section className="w-full py-32 bg-[#FAFAFA]">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-xl space-y-4">
              <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-muted-foreground block">Flagship Selection</span>
              <h2 className="text-5xl font-serif font-bold tracking-tight text-black">Master the Biological Ritual</h2>
            </div>
            <Link href="/shop" className="group flex items-center gap-3 text-[11px] uppercase tracking-widest font-bold">
              View All Formulas
              <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {sortedFeatured.map((product: any) => (
              <div key={product.id} className="group bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col h-full">
                <Link href={`/product/${product.id}`} className="relative aspect-square rounded-2xl overflow-hidden mb-8 block bg-[#FAFAFA]">
                  <Image
                    src={product.imageUrls[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  />
                </Link>

                <div className="flex-grow space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40">{product.category.name}</span>
                    <h3 className="text-2xl font-bold uppercase tracking-tighter">{product.name}</h3>
                  </div>

                  <div className="space-y-3 pb-8">
                    {(product.highlights || []).slice(0, 3).map((highlight: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-black/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-black/20" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold">MAD {product.price.toFixed(2)}</span>
                  <Link
                    href={`/product/${product.id}`}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold group/link"
                  >
                    View Formula <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND PHILOSOPHY SPLIT */}
      <section className="w-full bg-white py-32 overflow-hidden">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-32">
            <div className="relative w-full h-full min-h-[600px] bg-[#FAFAFA] rounded-[3rem] overflow-hidden group shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2000&auto=format&fit=crop"
                alt="Brand Philosophy"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[3s] brightness-90"
              />
            </div>
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-muted-foreground block">Our Origin</span>
                <h2 className="text-6xl md:text-7xl font-serif font-bold leading-[0.9] tracking-tighter">
                  Wild-Harvested. <br /> Lab-Validated.
                </h2>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed font-inter max-w-xl">
                We bridge the gap between ancient ethno-botany and high-performance bio-hacking. Every gram of our adaptogens is wild-harvested at peak potency and validated by 3rd-party Moroccan labs to ensure absolute pharmacological purity.
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="px-12 py-5 bg-black text-white rounded-full text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-all inline-block shadow-lg active:scale-95"
                >
                  The TopNature Standard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
