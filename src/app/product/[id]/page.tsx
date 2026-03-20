'use client'

import React, { useState, use, useEffect } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './add-to-cart-button'
import {
    ShieldCheck,
    CheckCircle2,
    Truck,
    ArrowLeft
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ProductPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise)
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`/api/products/${params.id}`)
            if (res.ok) {
                const data = await res.json()
                setProduct(data)
            } else {
                setProduct(null)
            }
            setLoading(false)
        }
        fetchProduct()
    }, [params.id])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
            />
        </div>
    )

    if (!product) notFound()

    return (
        <div className="min-h-screen bg-background pt-32 pb-32">
            <div className="container-wide px-6 lg:px-12">
                
                {/* Back Link */}
                <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-foreground/40 hover:text-primary transition-colors mb-12">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    
                    {/* Left: Product Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative aspect-[4/5] bg-background-offset rounded-[2.5rem] overflow-hidden shadow-premium"
                    >
                        <Image
                            src={product.imageUrls[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Right: Info & Purchase */}
                    <div className="flex flex-col space-y-12 lg:pt-8">
                        {/* Title & Price */}
                        <div className="space-y-6">
                            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">
                                {product.category.name}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none">
                                {product.name}
                            </h1>
                            <div className="text-3xl font-bold tracking-tight text-foreground">
                                {product.price.toFixed(0)} <span className="text-sm font-medium text-foreground/40 ml-1">MAD</span>
                            </div>
                        </div>

                        {/* Direct Benefits */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(product.highlights || []).map((h: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-background-offset rounded-2xl border border-border/50">
                                    <CheckCircle2 className="w-5 h-5 text-primary" strokeWidth={2.5} />
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/70">{h}</span>
                                </div>
                            ))}
                        </div>

                        {/* Purchase Box */}
                        <div className="space-y-8 bg-white p-8 md:p-10 rounded-[2.5rem] border border-border shadow-premium">
                             <AddToCartButton
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    imageUrl: product.imageUrls[0],
                                }}
                            />
                            <div className="flex flex-col gap-4 text-[10px] uppercase tracking-widest font-medium text-foreground/40 text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Lab Tested for Purity</span>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <Truck className="w-4 h-4" />
                                    <span>Fast National Shipping</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-8 border-t border-border pt-12">
                            <div className="space-y-4">
                                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40">Description</h3>
                                <p className="text-xl text-foreground-muted leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/40">Key Benefits</h3>
                                <p className="text-lg text-foreground-muted/80 font-medium">
                                    {product.benefits}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
