import { prisma } from '@/lib/prisma'
import { ProductCard } from '@/components/ui/product-card'
import { Leaf, Sprout, Sparkles } from 'lucide-react'

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
        <div className="min-h-screen bg-[#FBF9F6] pt-32 md:pt-48 pb-20 md:pb-32 selection:bg-primary selection:text-white relative overflow-hidden">
            {/* BOTANICAL MIST */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px] pointer-events-none" />

            <div className="w-full px-6 md:px-12 lg:px-24 relative z-10">
                {/* Editorial Header */}
                <div className="w-full mb-32 space-y-12 text-center lg:text-left">
                    <div className="flex items-center gap-8 justify-center lg:justify-start">
                        <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-[11px] uppercase tracking-[0.6em] font-bold text-primary italic">The Civation Index</span>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-5xl md:text-[8rem] lg:text-[10rem] font-serif font-black tracking-tighter uppercase leading-[0.85] text-foreground">
                            Botanical <br /> <span className="italic text-primary font-light">Curation.</span>
                        </h1>
                    </div>

                    <p className="text-xl md:text-2xl text-foreground/40 max-w-4xl font-medium tracking-tight leading-relaxed mx-auto lg:mx-0 italic">
                        A sophisticated index of rare botanical extracts, meticulously curated for their biological intelligence and transformative purity.
                    </p>
                </div>

                {products.length > 0 ? (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-12 gap-y-24 md:gap-y-40">
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className={`transition-all duration-1000 ease-[0.16, 1, 0.3, 1] ${index % 3 === 1 ? 'lg:translate-y-16' :
                                        index % 3 === 2 ? 'lg:translate-y-32' : ''
                                    }`}
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
                    <div className="w-full py-48 text-center border border-black/5 rounded-[4rem] bg-white/40 backdrop-blur-md relative overflow-hidden shadow-premium">
                        <div className="absolute inset-0 bg-primary/5 blur-[120px] pointer-events-none" />
                        <Sprout className="w-16 h-16 text-primary mx-auto mb-8 opacity-20" />
                        <h3 className="text-5xl font-serif font-bold tracking-tight mb-8 text-foreground relative z-10">Archive Closed</h3>
                        <p className="text-foreground/30 text-[12px] uppercase tracking-[0.4em] font-bold relative z-10">Cultivating the next sanctuary cycle.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
