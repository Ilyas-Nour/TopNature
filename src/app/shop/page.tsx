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
        <div className="min-h-screen bg-background pt-32 pb-32">
            <div className="container-wide px-6 lg:px-12 space-y-20">
                {/* Minimal Header */}
                <div className="space-y-6 text-center md:text-left">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">Top Nature</span>
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter">Pure. <br className="hidden md:block" /> Effective.</h1>
                    <p className="text-xl text-foreground-muted max-w-2xl leading-relaxed">
                        A curated selection of lab-tested supplements designed for your daily optimization. No fillers, just results.
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20">
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
                    <div className="py-32 text-center border border-dashed border-border rounded-3xl">
                        <p className="text-foreground-muted uppercase tracking-widest text-[10px] font-bold">Catalog is currently updating.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
