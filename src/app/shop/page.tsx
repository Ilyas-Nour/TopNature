import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/ui/product-card'

export const dynamic = 'force-dynamic'

export default async function ShopPage() {
    const products = await prisma.product.findMany({
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="min-h-screen bg-background pt-24 pb-safe">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="mb-16">
                    <h1 className="editorial-heading tracking-tighter">Everything We Got</h1>
                    <p className="text-xl text-muted-foreground mt-6 max-w-2xl font-medium tracking-tight">Explore our full collection of premium products carefully curated for you.</p>
                </div>

                {products.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                        {products.map((product) => (
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
                    <div className="bg-secondary/50 p-12 text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-2">No products found</h3>
                        <p className="text-muted-foreground font-medium">We are currently restocking our inventory. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
