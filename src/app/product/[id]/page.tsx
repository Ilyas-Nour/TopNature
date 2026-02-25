import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { AddToCartButton } from './add-to-cart-button'
import { Leaf, Rabbit, Recycle } from 'lucide-react'

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

    if (!product) {
        notFound()
    }

    const primaryImage = product.imageUrls[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000'

    return (
        <div className="min-h-screen bg-white text-foreground">
            <div className="w-full px-6 md:px-12 lg:px-20 mx-auto py-12 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Gallery */}
                    <div className="lg:sticky lg:top-32 lg:h-[calc(100vh-160px)] flex flex-col justify-center">
                        <div className="w-full flex flex-col items-center">
                            {/* Main Image: Bounded by height to ensure visibility but allowed to be wide */}
                            <div className="luxury-image aspect-[4/5] relative bg-secondary/5 mb-8 w-full max-w-[700px] max-h-[65vh]">
                                <Image
                                    src={primaryImage}
                                    alt={product.name}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>

                            {/* Thumbnails (Symmetrical Grid) */}
                            <div className="grid grid-cols-4 gap-4 w-full max-w-[700px]">
                                {product.imageUrls.map((url, i) => (
                                    <div key={i} className="luxury-image aspect-square relative bg-secondary/5 cursor-pointer hover:opacity-80 transition-opacity">
                                        <Image
                                            src={url}
                                            alt={`${product.name} thumbnail ${i}`}
                                            fill
                                            className="object-cover"
                                            sizes="10vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Buy Box */}
                    <div className="lg:sticky lg:top-24 flex flex-col space-y-8">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-bold mb-4 block">
                                {product.category.name}
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-6">
                                <span className="text-2xl font-bold">
                                    MAD {product.price.toFixed(2)}
                                </span>
                                {product.comparePrice && (
                                    <span className="text-xl text-muted-foreground line-through">
                                        MAD {product.comparePrice.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="h-[1px] w-full bg-border" />

                        <div className="space-y-6">
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>

                            <div className="pt-6">
                                <AddToCartButton
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        imageUrl: primaryImage,
                                    }}
                                />
                            </div>

                            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold">
                                <div className={`h-2 w-2 rounded-full ${product.stock > 0 ? 'bg-[#2C422E]' : 'bg-red-500'}`}></div>
                                {product.stock > 0 ? `${product.stock} Units Available` : 'Out of stock'}
                            </div>
                        </div>

                        {/* Guarantees */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
                            <div className="flex flex-col items-center text-center space-y-3">
                                <Leaf className="w-5 h-5 text-secondary" strokeWidth={1} />
                                <span className="text-[9px] uppercase tracking-widest font-bold">Organic</span>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-3">
                                <Rabbit className="w-5 h-5 text-secondary" strokeWidth={1} />
                                <span className="text-[9px] uppercase tracking-widest font-bold">Cruelty Free</span>
                            </div>
                            <div className="flex flex-col items-center text-center space-y-3">
                                <Recycle className="w-5 h-5 text-secondary" strokeWidth={1} />
                                <span className="text-[9px] uppercase tracking-widest font-bold">Recyclable</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Bar (Sticky Bottom 0) */}
            <div className="lg:hidden fixed bottom-16 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-border px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Price</span>
                    <span className="text-lg font-bold">MAD {product.price.toFixed(2)}</span>
                </div>
                <div className="flex-1">
                    <AddToCartButton
                        product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            imageUrl: primaryImage,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
