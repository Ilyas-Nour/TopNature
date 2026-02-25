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
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="mb-16">
                    <Link href="/categories" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary font-medium mb-8 transition-colors uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" /> All Categories
                    </Link>
                    <h1 className="editorial-heading text-5xl md:text-7xl mb-6">{category.name}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl font-medium tracking-tight">Browse our curated collection of {category.name} products.</p>
                </div>

                {category.products.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-8 space-y-8">
                        {category.products.map((product) => (
                            <div key={product.id} className="break-inside-avoid shadow-none">
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    imageUrl={product.imageUrls[0]}
                                    categoryName={product.category.name}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-secondary/10 p-24 text-center border-none">
                        <h3 className="editorial-heading text-3xl text-foreground mb-4">No products yet</h3>
                        <p className="text-muted-foreground font-medium mb-12 max-w-md mx-auto">We are currently curating new arrivals for this collection. Check back soon.</p>
                        <Link href="/shop" className="inline-flex h-14 items-center justify-center bg-primary text-primary-foreground px-10 text-sm tracking-widest uppercase hover:bg-black transition-colors duration-500">
                            Browse All Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
