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
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Everything We Got</h1>
                        <p className="text-lg text-slate-500 mt-3 max-w-2xl">Explore our full collection of premium products carefully curated for you.</p>
                    </div>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
                        <p className="text-slate-500">We are currently restocking our inventory. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
