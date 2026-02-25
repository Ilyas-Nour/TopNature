import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic'

export default async function Home() {
  // Fetch up to 8 featured products from PostgreSQL
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
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-end h-full">
          <h1 className="editorial-heading text-foreground mb-4 max-w-5xl">
            Curated Essentials <br className="hidden md:block" />
            <span className="italic font-light text-muted-foreground">Modern Living</span>
          </h1>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-8">
            <p className="max-w-xl text-xl text-foreground font-medium tracking-tight">
              Discover a handpicked collection of premium products designed to elevate your everyday experience. Fast shipping across Morocco and worldwide.
            </p>
            <Link
              href="/shop"
              className="inline-flex h-14 items-center justify-center rounded-none bg-primary px-10 text-base font-bold text-primary-foreground hover:bg-black/80 transition-all duration-300 gap-2 group w-full md:w-auto"
            >
              Shop Collection
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-secondary/50 to-transparent -z-10 pointer-events-none"></div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter uppercase">Featured</h2>
            <Link href="/shop" className="text-foreground font-medium hover:underline underline-offset-4 hidden sm:block transition-colors">
              View all
            </Link>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pb-8 -mx-4 px-4 md:mx-0 md:px-0">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div key={product.id} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center shrink-0">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageUrls[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000"}
                    categoryName={product.category.name}
                  />
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-10">
                No featured products found. Please run the database seed.
              </p>
            )}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/shop" className="inline-flex h-14 w-full items-center justify-center rounded-none bg-secondary px-8 text-base font-bold text-foreground hover:bg-secondary/80 transition-colors uppercase tracking-wider">
              View Full Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
