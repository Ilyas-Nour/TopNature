'use client'

import React, { useState, use, useEffect } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './add-to-cart-button'
import {
    ShieldCheck,
    CheckCircle2,
    Truck,
    ArrowLeft,
    Sparkles,
    Zap,
    Scale,
    Heart
} from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ProductCard } from '@/components/ui/product-card'

export default function ProductPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise)
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [relatedProducts, setRelatedProducts] = useState<any[]>([])

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`/api/products/${params.id}`)
            if (res.ok) {
                const data = await res.json()
                setProduct(data)
                
                // Fetch related products (simple category-based)
                const relatedRes = await fetch(`/api/products?category=${data.categoryId}`)
                if (relatedRes.ok) {
                    const relatedData = await relatedRes.json()
                    setRelatedProducts(relatedData.filter((p: any) => p.id !== data.id).slice(0, 3))
                }
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
        <div className="min-h-screen bg-background">
            {/* Top Navigation */}
            <div className="pt-32 pb-12 border-b border-border bg-white">
                <div className="container-wide">
                    <Link href="/shop" className="group inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/30 hover:text-primary transition-all duration-500">
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Shop
                    </Link>
                </div>
            </div>

            <section className="py-24">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-40 items-start">
                        
                        {/* Left: Cinematic Image Gallery */}
                        <div className="space-y-12">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                className="relative aspect-[4/5] bg-background-offset rounded-[3rem] overflow-hidden shadow-premium group"
                            >
                                <Image
                                    src={product.imageUrls[0]}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-2xl group-hover:scale-110"
                                    priority
                                />
                                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
                            </motion.div>
                            
                            {/* Badges / Trust */}
                            <div className="flex flex-wrap justify-center gap-12 opacity-20 filter grayscale">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Non-GMO</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Gluten Free</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Third-Party Tested</span>
                            </div>
                        </div>

                        {/* Right: Marketing & Conversion Info */}
                        <div className="flex flex-col space-y-16">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-primary block">
                                        {product.category.name} Protocol
                                    </span>
                                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.85] tracking-tighter">
                                        {product.name}
                                    </h1>
                                </div>
                                <div className="flex items-end gap-3 font-serif">
                                    <span className="text-4xl font-light text-foreground">{product.price.toFixed(0)}</span>
                                    <span className="text-xs uppercase tracking-widest text-foreground/40 pb-2 font-bold">MAD</span>
                                </div>
                            </div>

                            {/* Benefit Chips */}
                            <div className="flex flex-wrap gap-4">
                                {(product.highlights || []).map((h: string, i: number) => (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                        className="px-6 py-3 bg-white border border-border rounded-full flex items-center gap-3 shadow-card"
                                    >
                                        <Sparkles className="w-3 h-3 text-primary" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">{h}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Professional Copy */}
                            <p className="text-2xl font-serif italic text-foreground-muted leading-relaxed max-w-xl">
                                "{product.description}"
                            </p>

                            {/* Purchase Action */}
                            <div className="space-y-8 bg-white p-10 md:p-14 rounded-[3rem] border border-border shadow-premium relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <ShieldCheck className="w-24 h-24 text-primary" />
                                </div>
                                <div className="relative z-10 space-y-10">
                                    <AddToCartButton
                                        product={{
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            imageUrl: product.imageUrls[0],
                                        }}
                                    />
                                    <div className="grid grid-cols-2 gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-foreground/30">
                                        <div className="flex items-center gap-3">
                                            <Truck className="w-4 h-4 text-primary" />
                                            <span>Free National Shipping</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Heart className="w-4 h-4 text-primary" />
                                            <span>Sustainably Sourced</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Dive Marketing Section */}
            <section className="py-48 bg-background-offset border-y border-border">
                <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-24">
                    <div className="space-y-6">
                        <Zap className="w-8 h-8 text-primary opacity-40" />
                        <h3 className="text-3xl font-serif">The Transformation</h3>
                        <p className="text-lg text-foreground-muted leading-relaxed">
                            {product.benefits || "Experience the cumulative power of high-altitude minerals and scientifically-backed extraction methods."}
                        </p>
                    </div>
                    <div className="space-y-6">
                        <Scale className="w-8 h-8 text-primary opacity-40" />
                        <h3 className="text-3xl font-serif">Sourcing & Purity</h3>
                        <p className="text-lg text-foreground-muted leading-relaxed">
                            {product.sourcing || "Derived from heritage ecosystems where the plant's biological stress produces the highest concentration of active compounds."}
                        </p>
                    </div>
                    <div className="space-y-6">
                        <CheckCircle2 className="w-8 h-8 text-primary opacity-40" />
                        <h3 className="text-3xl font-serif">The Protocol</h3>
                        <p className="text-lg text-foreground-muted leading-relaxed">
                            {product.usage || "Designed for seamless integration into your morning or evening baseline ritual."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Related Collection */}
            {relatedProducts.length > 0 && (
                <section className="section-padding">
                    <div className="container-wide">
                        <div className="flex justify-between items-end mb-24">
                            <h2 className="text-5xl font-serif font-light tracking-tighter">You may <br /><span className="italic">also need.</span></h2>
                            <Link href="/shop" className="text-[10px] uppercase tracking-widest font-bold pb-2 border-b border-border opacity-40 hover:opacity-100 transition-opacity">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Sticky Mobile Bar would go here for CRO */}
        </div>
    )
}
