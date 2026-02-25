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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-20">
                    {categories.map((category) => (
                        <div key={category.id} className="group flex flex-col items-center">
                            <Link href={`/category/${category.slug}`} className="block relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-[#FAFAFA] transition-transform duration-500 hover:scale-105">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <LayoutGrid className="w-12 h-12 text-muted-foreground/20" strokeWidth={1} />
                                </div>
                            </Link>
                            <div className="text-center">
                                <h2 className="text-xl font-bold tracking-tight mb-2">{category.name}</h2>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                                    {category._count.products} Collections
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
