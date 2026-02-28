import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { LayoutGrid } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc'
        },
        include: {
            _count: {
                select: { products: true }
            }
        }
    })

    return (
        <div className="min-h-screen bg-background pt-40 pb-32">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Editorial Header */}
                <div className="mb-24 space-y-6">
                    <div className="flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-foreground/20" />
                        <span className="text-[10px] uppercase tracking-[0.6em] font-black text-secondary">Biological Taxonomy</span>
                    </div>
                    <h1 className="text-7xl md:text-9xl font-serif font-black tracking-tighter uppercase leading-[0.8]">
                        The <br /> <span className="italic">Specializations.</span>
                    </h1>
                    <p className="text-xl text-secondary max-w-2xl font-black uppercase tracking-tight leading-relaxed opacity-60">
                        Categorized by physiological intent. Explore our specialized botanical domains synthesized for targeted performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className="group relative flex flex-col pt-12"
                        >
                            <div className="absolute top-0 right-0 py-2 px-4 border border-foreground/10 rounded-full text-[9px] font-black uppercase tracking-widest text-secondary group-hover:bg-foreground group-hover:text-background transition-all">
                                {category._count.products} Batches
                            </div>
                            <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden bg-surface mb-8">
                                <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                                    <LayoutGrid className="w-24 h-24" strokeWidth={0.5} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl font-serif font-black tracking-tighter uppercase leading-none group-hover:italic transition-all duration-500">
                                    {category.name}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-black text-secondary">Domain Access</span>
                                    <div className="flex-1 h-[1px] bg-foreground/10 group-hover:bg-foreground/40 transition-colors" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
