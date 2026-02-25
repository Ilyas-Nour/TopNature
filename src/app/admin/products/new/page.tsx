import { prisma } from '@/lib/prisma'
import { ProductForm } from '@/components/admin/product-form'

export default async function NewProductPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    })

    return (
        <div className="space-y-16 animate-in fade-in duration-700">
            <div>
                <h1 className="text-5xl font-serif font-bold tracking-tight text-black">New Product</h1>
                <p className="text-muted-foreground mt-4 font-medium uppercase tracking-[0.2em] text-[11px]">Addition to the botanical collection</p>
            </div>

            <ProductForm categories={categories} />
        </div>
    )
}
