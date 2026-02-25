import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/ui/product-card'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            products: {
                include: {
                    category: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })

    if (!category) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="mb-12">
                    <Link href="/categories" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> All Categories
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">{category.name}</h1>
                    <p className="text-lg text-slate-500 mt-3 max-w-2xl">Browse our curated collection of {category.name} products.</p>
                </div>

                {category.products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {category.products.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                imageUrl={product.imageUrls[0]}
                                categoryName={product.category.name}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-16 text-center border border-slate-200 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-900 mb-2">No products yet</h3>
                        <p className="text-slate-500 mb-8">We haven't added any products to this category yet. Check back later for new arrivals.</p>
                        <Link href="/shop" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition">
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
