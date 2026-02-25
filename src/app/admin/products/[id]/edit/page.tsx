import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { ProductForm } from '@/components/admin/product-form'

interface EditProductPageProps {
    params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
    const { id } = await params

    const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
    })

    if (!product) {
        notFound()
    }

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div className="space-y-16 animate-in fade-in duration-700">
            <div>
                <h1 className="text-5xl font-serif font-bold tracking-tight text-black">Edit Product</h1>
                <p className="text-muted-foreground mt-4 font-medium uppercase tracking-[0.2em] text-[11px]">Catalogue Refinement & Modification</p>
            </div>

            <ProductForm initialData={product} categories={categories} />
        </div>
    )
}
