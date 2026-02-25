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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-50 pt-24 pb-32 lg:pt-36 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <h1 className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 font-sans">
            Curated Essentials for <br className="hidden sm:block" />
            <span className="text-blue-600">Modern Living</span>
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
            Discover a handpicked collection of premium products designed to elevate your everyday experience. Fast shipping across Morocco and worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shop"
              className="inline-flex h-14 items-center justify-center rounded-full bg-blue-600 px-8 text-base font-medium text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all duration-300 gap-2 group"
            >
              Shop the Collection
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-30 -z-10 pointer-events-none"></div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Featured Products</h2>
            <Link href="/shop" className="text-blue-600 font-medium hover:text-blue-700 hover:underline underline-offset-4 hidden sm:block transition-colors">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 gap-y-12">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrls[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000"}
                  categoryName={product.category.name}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-10">
                No featured products found. Please run the database seed.
              </p>
            )}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link href="/shop" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-slate-100 px-8 text-base font-medium text-slate-900 hover:bg-slate-200 transition-colors">
              View all products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
