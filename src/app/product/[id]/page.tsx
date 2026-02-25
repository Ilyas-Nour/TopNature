import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AddToCartButton } from './add-to-cart-button'

export const dynamic = 'force-dynamic'

interface ProductPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
        },
    })

    // If product is not found, Next.js handles it gracefully
    if (!product) {
        notFound()
    }

    const primaryImage = product.imageUrls[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000'

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Image Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="aspect-square w-full relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
                            <Image
                                src={primaryImage}
                                alt={product.name}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="flex flex-col mt-4 lg:mt-10">
                        <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-3">
                            {product.category.name}
                        </p>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-6 font-sans">
                            {product.name}
                        </h1>

                        <div className="flex items-end gap-3 mb-8">
                            <span className="text-3xl font-bold text-slate-900">
                                MAD {product.price.toFixed(2)}
                            </span>
                            {product.comparePrice && (
                                <span className="text-lg text-slate-500 line-through mb-1">
                                    MAD {product.comparePrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="prose prose-slate max-w-none mb-10 text-slate-600 leading-relaxed text-lg">
                            <p>{product.description}</p>
                        </div>

                        {/* Actions */}
                        <div className="pt-8 border-t border-slate-200 space-y-6">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <div className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                <span className={product.stock > 0 ? 'text-emerald-700' : 'text-red-700'}>
                                    {product.stock > 0 ? `${product.stock} in stock - Ready to ship` : 'Out of stock'}
                                </span>
                            </div>

                            <AddToCartButton
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    imageUrl: primaryImage,
                                }}
                            />
                        </div>

                        {/* Guarantees Box */}
                        <div className="mt-10 rounded-xl bg-white p-6 border border-slate-200 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 text-slate-700 font-medium">
                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                                Free Delivery inside Morocco
                            </div>
                            <div className="flex items-center gap-3 text-slate-700 font-medium">
                                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Secure Cash on Delivery
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
