import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Placeholder data for the Featured Products grid
const FEATURED_PRODUCTS = [
  {
    id: "prod_1",
    name: "Minimalist Leather Backpack",
    price: 899.00,
    imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
    categoryName: "Accessories"
  },
  {
    id: "prod_2",
    name: "Wireless Noise-Canceling Earbuds",
    price: 1299.00,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
    categoryName: "Electronics"
  },
  {
    id: "prod_3",
    name: "Premium Cotton T-Shirt",
    price: 249.00,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    categoryName: "Apparel"
  },
  {
    id: "prod_4",
    name: "Classic Stainless Steel Watch",
    price: 1599.00,
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop",
    categoryName: "Accessories"
  }
];

export default function Home() {
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
            {FEATURED_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                categoryName={product.categoryName}
              />
            ))}
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
