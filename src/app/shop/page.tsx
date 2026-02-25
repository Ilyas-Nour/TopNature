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
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="mb-16">
                    <h1 className="editorial-heading tracking-tighter">Everything We Got</h1>
                    <p className="text-xl text-muted-foreground mt-6 max-w-2xl font-medium tracking-tight">Explore our full collection of premium products carefully curated for you.</p>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-20">
                        {products.map((product) => (
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
                    <div className="bg-secondary/50 p-12 text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-2">No products found</h3>
                        <p className="text-muted-foreground font-medium">We are currently restocking our inventory. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
