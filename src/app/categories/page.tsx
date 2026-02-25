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
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="mb-16">
                    <h1 className="editorial-heading text-5xl md:text-7xl mb-6">Shop by Category</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl font-medium tracking-tight">Find exactly what you are looking for by browsing our specialized collections.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/category/${category.slug}`} className="group relative aspect-square bg-secondary/10 flex flex-col items-center justify-center text-center p-8 overflow-hidden transition-all duration-700">
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-700" />
                            <div className="relative z-10 transition-transform duration-700 group-hover:scale-105">
                                <h2 className="editorial-heading text-3xl mb-2 text-foreground">{category.name}</h2>
                                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{category._count.products} products available</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
