'use client'

import React, { useState, use, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './add-to-cart-button'
import useEmblaCarousel from 'embla-carousel-react'
import {
    CheckCircle2,
    Zap,
    Brain,
    Activity,
    ShieldCheck,
    Droplets,
    Leaf,
    RotateCcw,
    ChevronRight,
    Search,
    ChevronLeft
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise)
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('science')
    const [selectedIndex, setSelectedIndex] = useState(0)

    // Gallery States
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true, duration: 25 })

    const onThumbClick = useCallback((index: number) => {
        if (!emblaMainApi) return
        emblaMainApi.scrollTo(index)
    }, [emblaMainApi])

    const onSelect = useCallback(() => {
        if (!emblaMainApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    React.useEffect(() => {
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
        <div className="min-h-screen flex items-center justify-center bg-white pt-24">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-2 border-black border-t-transparent rounded-full"
            />
        </div>
    )

    if (!product) notFound()

    const imageUrls = product.imageUrls && product.imageUrls.length > 0
        ? product.imageUrls
        : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000']

    const TABS = [
        { id: 'science', label: 'Science & Benefits', icon: Brain, content: product.benefits },
        { id: 'usage', label: 'Protocol & Use', icon: Activity, content: product.usage },
        { id: 'sourcing', label: 'Purity & Origin', icon: ShieldCheck, content: product.sourcing },
    ]

    return (
        <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24">
            {/* 1. PRODUCT HERO & BUY BOX */}
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">

                    {/* Left: Interative Immersive Gallery */}
                    <div className="lg:sticky lg:top-32 flex flex-col-reverse lg:flex-row gap-6">

                        {/* Sidebar Thumbnails (Visible on Large Screens) */}
                        <div className="hidden lg:flex flex-col gap-4 w-20 shrink-0">
                            {imageUrls.map((url: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => onThumbClick(i)}
                                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedIndex === i ? 'border-black ring-2 ring-black/5' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                >
                                    <Image src={url} alt={`Thumbnail ${i + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>

                        {/* Main Slider */}
                        <div className="flex-1 space-y-8">
                            <div className="relative overflow-hidden group" ref={emblaMainRef}>
                                <div className="flex">
                                    {imageUrls.map((url: string, i: number) => (
                                        <div key={i} className="flex-[0_0_100%] min-w-0 relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#FAFAFA] border border-gray-100 shadow-2xl shadow-black/5">
                                            <Image
                                                src={url}
                                                alt={`${product.name} - View ${i + 1}`}
                                                fill
                                                priority={i === 0}
                                                className="object-cover"
                                                sizes="(max-width: 1024px) 100vw, 50vw"
                                            />
                                            {/* Zoom/Search Indicator Overlay */}
                                            <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Search className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Navigation Arrows (Floating) */}
                                <button
                                    onClick={() => emblaMainApi?.scrollPrev()}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 border border-gray-100 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white active:scale-90"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => emblaMainApi?.scrollNext()}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 border border-gray-100 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-white active:scale-90"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                {/* Dot Indicators (Mobile/Tablets) */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                                    {imageUrls.map((_: any, i: number) => (
                                        <div
                                            key={i}
                                            className={`h-1 rounded-full transition-all ${selectedIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Thumbnails Scrollbar */}
                            <div className="flex lg:hidden gap-4 overflow-x-auto no-scrollbar pb-2">
                                {imageUrls.map((url: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => onThumbClick(i)}
                                        className={`relative aspect-square w-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${selectedIndex === i ? 'border-black' : 'border-transparent opacity-50'}`}
                                    >
                                        <Image src={url} alt={`Thumb Mobile ${i}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: The High-Conversion Buy Box */}
                    <div className="flex flex-col space-y-10 lg:pt-8">
                        {/* Trust Badges Bar */}
                        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                            <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-[#FAFAFA] rounded-full border border-gray-100">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#2C422E]" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-[#2C422E]">Lab Certified</span>
                            </div>
                            <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full">
                                <Leaf className="w-3.5 h-3.5 text-black" />
                                <span className="text-[9px] font-bold uppercase tracking-widest text-black">100% Organic</span>
                            </div>
                        </div>

                        {/* Title & Price */}
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight leading-[1.1]">
                                {product.name}
                            </h1>
                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl font-bold tracking-tighter">MAD {product.price.toFixed(2)}</span>
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground bg-gray-50 px-3 py-1 rounded-md">Free Express Shipping</span>
                            </div>
                        </div>

                        {/* HIGH-TRUST: Benefit Highlights */}
                        <div className="space-y-4 py-2">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Primary Performance Metrics</p>
                            <div className="grid grid-cols-1 gap-3">
                                {(product.highlights || []).map((highlight: string, i: number) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-[#FAFAFA] flex items-center justify-center border border-gray-100">
                                            <CheckCircle2 className="w-3 h-3 text-[#2C422E]" />
                                        </div>
                                        <span className="text-xs font-medium text-black/80">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buy Actions */}
                        <div className="space-y-6 pt-4">
                            <AddToCartButton
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    imageUrl: imageUrls[0],
                                }}
                            />

                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#2C422E] animate-pulse" />
                                    <span>High Demand: {product.stock} Units Left</span>
                                </div>
                                <button className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-black transition-colors flex items-center gap-1 group">
                                    View COA Report <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gray-100">
                            {[
                                { icon: Droplets, label: 'Purity', val: '98.8%' },
                                { icon: Zap, label: 'Energy', val: 'Peak' },
                                { icon: RotateCcw, label: 'Results', val: '14 Days' },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center text-center space-y-2">
                                    <stat.icon className="w-5 h-5 text-black/40" strokeWidth={1.5} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                                    <span className="text-sm font-bold">{stat.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. THE EDUCATIONAL DEEP DIVE (Below the Fold) */}
            <section className="bg-[#FAFAFA] border-y border-gray-100 py-32">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#2C422E]">Analytical Deep Dive</h2>
                        <p className="text-4xl md:text-5xl font-serif font-bold">Uncompromising Quality.</p>
                    </div>

                    {/* Interactive Tabs */}
                    <div className="space-y-12">
                        <div className="flex flex-wrap justify-center gap-4 border-b border-gray-200 pb-2">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative px-8 py-4 transition-all flex items-center gap-3 ${activeTab === tab.id ? 'text-black' : 'text-black/40 hover:text-black/60'}`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span className="text-[11px] font-bold uppercase tracking-widest">{tab.label}</span>
                                    {activeTab === tab.id && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white p-12 md:p-16 rounded-[3rem] border border-gray-100 shadow-xl shadow-black/5"
                            >
                                <div className="prose prose-lg max-w-none">
                                    <p className="text-xl md:text-2xl font-serif leading-relaxed text-black/80 italic mb-8">
                                        "{TABS.find(t => t.id === activeTab)?.label}"
                                    </p>
                                    <p className="text-lg leading-[1.8] text-muted-foreground">
                                        {TABS.find(t => t.id === activeTab)?.content}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* 3. PERFORMANCE ICON GRID */}
            <section className="py-32 bg-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {[
                            { icon: Zap, title: "Unbound Vitality", desc: "Sustained, clean energy without the jitter or crash of stimulants." },
                            { icon: Brain, title: "Cognitive Fortitude", desc: "Enhance neuro-plasticity and memory retention through adaptogenic support." },
                            { icon: Activity, title: "Recovery Mastery", desc: "Accelerate muscle repair and mitigate the long-term effects of oxidative stress." }
                        ].map((benefit, i) => (
                            <div key={i} className="space-y-6 text-center md:text-left px-4">
                                <div className="w-16 h-16 rounded-[1.5rem] bg-[#FAFAFA] flex items-center justify-center border border-gray-100 mx-auto md:mx-0">
                                    <benefit.icon className="w-8 h-8 text-black" strokeWidth={1} />
                                </div>
                                <h3 className="text-2xl font-serif font-bold">{benefit.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mobile Sticky CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-6 flex items-center gap-6">
                <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Investment</span>
                    <span className="text-lg font-bold">MAD {product.price.toFixed(2)}</span>
                </div>
                <div className="flex-1">
                    <AddToCartButton
                        product={{
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            imageUrl: imageUrls[0],
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
