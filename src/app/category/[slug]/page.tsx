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
        <div className="min-h-screen bg-background pt-40 pb-32">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Back Link: Premium Animated */}
                <Link
                    href="/categories"
                    className="group inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-secondary mb-20 hover:text-foreground transition-all"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-500" />
                    Archive Selection
                </Link>

                {/* Editorial Header */}
                <div className="mb-24 space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-foreground/20" />
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-secondary">Collective: {category.name}</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-serif font-black tracking-tighter uppercase leading-[0.8]">
                        The <br /> <span className="italic">{category.name}.</span>
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl font-black uppercase tracking-tight leading-relaxed opacity-60">
                        A specialized batch of formulas focused on {category.name} performance. Rigorously synthesized for biological optimization.
                    </p>
                </div>

                {category.products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-32">
                        {category.products.map((product, index) => (
                            <div
                                key={product.id}
                                className={index % 2 === 1 ? 'md:translate-y-24' : ''}
                            >
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
                    <div className="py-40 text-center border border-border/10 rounded-[4rem] bg-surface">
                        <h3 className="text-4xl font-serif font-black uppercase tracking-tighter mb-4">Domain Restock</h3>
                        <p className="text-secondary text-[11px] uppercase tracking-[0.4em] font-black">Synthesizing new arrivals for the {category.name} protocol.</p>
                        <Link href="/shop" className="inline-flex px-14 py-5 bg-foreground text-background rounded-full font-black uppercase tracking-[0.4em] text-[11px] mt-12 hover:bg-secondary transition-all">
                            Browse Inventory
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
