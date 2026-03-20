import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/ui/product-card'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ShopPage({ searchParams }: { searchParams: { category?: string, search?: string } }) {
    const categoryId = searchParams.category
    const search = searchParams.search

    const products = await prisma.product.findMany({
        where: {
            AND: [
                categoryId ? { categoryId } : {},
                search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } }
                    ]
                } : {}
            ]
        },
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const categories = await prisma.category.findMany()

    return (
        <div className="min-h-screen bg-background pt-48 pb-48">
            <div className="container-wide space-y-32">
                
                {/* Elite Header */}
                <div className="space-y-12 max-w-4xl">
                    <div className="space-y-4">
                        <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary block">Top Nature</span>
                        <h1 className="text-7xl md:text-9xl font-serif font-light leading-[0.85] tracking-tighter">
                            The <br /> <span className="italic pl-20 md:pl-40">Protocols.</span>
                        </h1>
                    </div>
                    <p className="text-xl md:text-2xl text-foreground-muted max-w-2xl leading-relaxed italic">
                        Select your baseline. Our collection of premium extracts is curated for peak biological optimization and neural performance.
                    </p>
                </div>

                {/* Category Navigation */}
                <div className="flex flex-wrap items-center gap-x-12 gap-y-8 border-b border-border pb-12">
                    <Link href="/shop" className="text-[11px] uppercase tracking-[0.3em] font-bold text-primary border-b border-primary pb-1">All Products</Link>
                    {categories.map((cat) => (
                        <Link 
                            key={cat.id} 
                            href={`/shop?category=${cat.id}`} 
                            className="text-[11px] uppercase tracking-[0.3em] font-bold text-foreground/30 hover:text-primary transition-colors duration-500"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>

                {/* Product Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16">
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
                    <div className="py-48 text-center border border-dashed border-border rounded-[3rem]">
                        <p className="text-foreground-muted uppercase tracking-[0.4em] text-[10px] font-bold italic">The vault is currently being replenished.</p>
                    </div>
                )}

                {/* Footer Trust Section */}
                <div className="pt-32 border-t border-border mt-32 grid grid-cols-1 md:grid-cols-3 gap-16 opacity-30">
                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold">Standardized Purity</h4>
                        <p className="text-[10px] uppercase tracking-widest leading-loose">Every extraction is verified by independent third-party laboratories.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold">Heritage Sourcing</h4>
                        <p className="text-[10px] uppercase tracking-widest leading-loose">We work exclusively with small-scale heritage farms in native biomes.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold">Zero Fillers</h4>
                        <p className="text-[10px] uppercase tracking-widest leading-loose">No magnesium stearate, no silica, no synthetic binding agents. Pure nature.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
