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
        <div className="min-h-screen bg-background text-foreground">
            {/* 50/50 Split Layout container */}
            <div className="lg:grid lg:grid-cols-2 lg:min-h-screen relative">

                {/* Left Column: Sticky Full-Bleed Image Gallery */}
                <div className="relative h-[65vh] lg:h-screen lg:sticky lg:top-0 w-full overflow-hidden bg-secondary/20">
                    <Image
                        src={primaryImage}
                        alt={product.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>

                {/* Right Column: Scrolling Product Details */}
                <div className="flex flex-col justify-center px-6 py-16 lg:px-24 lg:py-32">
                    <div className="max-w-xl mx-auto lg:mx-0 w-full">
                        <p className="text-sm font-medium text-foreground/60 uppercase tracking-[0.2em] mb-4">
                            {product.category.name}
                        </p>
                        <h1 className="editorial-heading text-5xl sm:text-6xl lg:text-7xl mb-8">
                            {product.name}
                        </h1>

                        <div className="flex items-end gap-4 mb-12">
                            <span className="text-3xl font-light tracking-wide text-foreground">
                                MAD {product.price.toFixed(2)}
                            </span>
                            {product.comparePrice && (
                                <span className="text-xl text-foreground/50 line-through mb-1">
                                    MAD {product.comparePrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        <div className="prose prose-slate max-w-none mb-16 text-foreground/70 leading-relaxed text-lg font-light">
                            <p>{product.description}</p>
                        </div>

                        {/* Actions */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 text-sm font-medium tracking-wide">
                                <div className={`h-2 w-2 ${product.stock > 0 ? 'bg-primary' : 'bg-red-500'}`}></div>
                                <span className="uppercase text-xs tracking-widest text-foreground/80">
                                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
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
                        <div className="mt-16 pt-8 border-t border-border space-y-5">
                            <div className="flex items-center gap-4 text-foreground/80 text-sm tracking-wide uppercase">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Free Delivery inside Morocco
                            </div>
                            <div className="flex items-center gap-4 text-foreground/80 text-sm tracking-wide uppercase">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                Secure Cash on Delivery
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
