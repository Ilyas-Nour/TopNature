import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { HeroSlider } from "@/components/home/hero-slider";
import { ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic'

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 8,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Professional Hero Slider */}
      <HeroSlider />

      {/* Symmetrical Product Grid Section */}
      <section className="w-full py-32 bg-white">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-muted-foreground mb-4 block">New Arrivals</span>
              <h2 className="text-5xl font-serif font-bold tracking-tight">The Botanical Collection</h2>
            </div>
            <Link href="/shop" className="group flex items-center gap-3 text-[11px] uppercase tracking-widest font-bold">
              View All Items
              <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrls[0] || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000"}
                  categoryName={product.category.name}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-10">
                No featured products found. Please run the database seed.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Brand Story (50/50 Split) */}
      <section className="w-full bg-white pb-32 overflow-hidden">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16 lg:gap-32">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2000&auto=format&fit=crop"
                alt="Brand Philosophy"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
            </div>
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[11px] uppercase tracking-[0.5em] font-bold text-muted-foreground">The Philosophy</span>
                <h2 className="text-6xl md:text-7xl font-serif font-bold leading-tight tracking-tighter">
                  Crafted from the earth, elevated by science.
                </h2>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed font-inter max-w-xl">
                At TopNature, we believe that true luxury lies in purity. Our formulas are a tribute to North African botanical heritage, meticulously refined through modern bio-active science. Each drop is a conscious choice for your skin and the planet.
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="px-12 py-5 bg-black text-white rounded-full text-[12px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-all inline-block shadow-lg"
                >
                  Discover our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Banner */}
      <section className="w-full py-32 bg-[#FAFAFA]">
        <div className="w-full px-6 md:px-12 lg:px-20 mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-serif font-bold tracking-tight">Join the Ritual.</h2>
              <p className="text-muted-foreground uppercase tracking-[0.15em] text-[11px] font-bold">
                Subscribe to receive 15% off your first botanical order.
              </p>
            </div>

            <form className="relative max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white border border-gray-100 rounded-full px-8 py-5 outline-none focus:border-black transition-all text-sm font-medium"
              />
              <button className="absolute right-2 top-2 bottom-2 px-8 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
