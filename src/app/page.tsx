import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section - h-screen full bleed */}
      <section className="relative w-full h-[100svh] overflow-hidden flex flex-col items-center justify-center">
        {/* Full Bleed Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=2600"
            alt="TopNature Apothecary"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Text Overlapping Imagery */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 mt-auto mb-24 md:mb-32 flex flex-col items-center text-center">
          <h1 className="editorial-heading text-[#F9F6F0] text-[15vw] md:text-[8vw] leading-none mb-4 mix-blend-overlay opacity-90">
            TopNature
          </h1>
          <p className="text-[#F9F6F0] text-lg md:text-2xl font-light tracking-wide max-w-2xl mt-2 drop-shadow-md">
            Modern Apothecary & Clean Beauty
          </p>
          <div className="mt-8">
            <Link
              href="/shop"
              className="inline-flex h-14 items-center justify-center bg-primary text-primary-foreground px-10 text-sm tracking-widest uppercase hover:bg-black transition-colors duration-500 gap-3 group"
            >
              Explore Collection
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section - Asymmetrical Layout */}
      <section className="w-full py-24 md:py-32">
        <div className="w-full px-6 md:px-12 lg:px-20">
          <div className="flex items-end justify-between mb-16 md:mb-24">
            <h2 className="editorial-heading text-5xl md:text-7xl">
              Curated <br className="hidden md:block" />
              <span className="italic text-secondary">Rituals</span>
            </h2>
            <Link href="/shop" className="text-foreground tracking-widest uppercase text-sm hover:underline underline-offset-8 hidden sm:block pb-2">
              View All
            </Link>
          </div>

          {/* Desktop Masonry / Mobile Snap Carousel */}
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:columns-2 lg:columns-3 gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:flex-none md:overflow-visible">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => {
                // Staggered margin for asymmetrical desktop look
                const marginTopClass = index % 3 === 1 ? 'md:mt-24' : index % 3 === 2 ? 'md:mt-12' : '';

                return (
                  <div key={product.id} className={`min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center shrink-0 mb-8 md:mb-16 break-inside-avoid ${marginTopClass}`}>
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      imageUrl={product.imageUrls[0] || "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000"}
                      categoryName={product.category.name}
                    />
                  </div>
                )
              })
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-10">
                No featured products found. Please run the database seed.
              </p>
            )}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link href="/shop" className="inline-flex h-14 w-full items-center justify-center bg-secondary/20 text-foreground px-8 text-sm tracking-widest uppercase hover:bg-secondary/40 transition-colors">
              View Full Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
