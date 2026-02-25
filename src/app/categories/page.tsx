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
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 text-center">Shop by Category</h1>
                    <p className="text-lg text-slate-500 text-center max-w-2xl mx-auto">Find exactly what you are looking for by browsing our specialized collections.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link key={category.id} href={`/category/${category.slug}`} className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center hover:border-blue-200">
                            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <LayoutGrid className="h-8 w-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{category.name}</h2>
                            <p className="text-slate-500 mt-2">{category._count.products} products available</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
