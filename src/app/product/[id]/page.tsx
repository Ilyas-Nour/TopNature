'use client'

import React, { useState, use, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { AddToCartButton } from './add-to-cart-button'
import useEmblaCarousel from 'embla-carousel-react'
import {
    Activity,
    Brain,
    ShieldCheck,
    Leaf,
    RotateCcw,
    ChevronRight,
    Search,
    ChevronLeft,
    X,
    Sparkles,
    Sprout
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = use(paramsPromise)
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('science')
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [isLightboxOpen, setIsLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true, duration: 25 })

    const onThumbClick = useCallback((index: number) => {
        if (!emblaMainApi) return
        emblaMainApi.scrollTo(index)
    }, [emblaMainApi])

    const onSelect = useCallback(() => {
        if (!emblaMainApi) return
        const index = emblaMainApi.selectedScrollSnap()
        setSelectedIndex(index)
        setLightboxIndex(index)
    }, [emblaMainApi])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

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

    const nextLightbox = () => setLightboxIndex((prev) => (prev + 1) % imageUrls.length)
    const prevLightbox = () => setLightboxIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-background-deep pt-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[100px]" />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-b-2 border-primary rounded-full relative z-10"
            />
        </div>
    )

    if (!product) notFound()

    const imageUrls = product.imageUrls && product.imageUrls.length > 0
        ? product.imageUrls
        : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000']

    const TABS = [
        { id: 'science', label: 'Botanical Intelligence', icon: Brain, content: product.benefits },
        { id: 'usage', label: 'Sanctuary Protocol', icon: Activity, content: product.usage },
        { id: 'sourcing', label: 'Heritage & Origin', icon: Leaf, content: product.sourcing },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white pt-24 md:pt-40 lg:pt-48 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/pinstripe-dark.png')] pointer-events-none" />

            {/* BOTANICAL DEPTH */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

            {/* 1. PRODUCT HERO & BUY BOX */}
            <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 pb-16 md:pb-32 lg:pb-48 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

                    {/* Left: Immersive Gallery */}
                    <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-10">
                        {/* Sidebar Thumbnails */}
                        <div className="hidden lg:flex flex-col gap-6 w-24 shrink-0 mt-20">
                            {imageUrls.map((url: string, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => onThumbClick(i)}
                                    className={`relative aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-all duration-700 ${selectedIndex === i ? 'border-primary shadow-premium scale-105' : 'border-black/10 opacity-60 hover:opacity-100 bg-white/5'}`}
                                >
                                    <Image
                                        src={url}
                                        alt={`View ${i + 1}`}
                                        fill
                                        sizes="100px"
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Main Slider */}
                        <div className="flex-1">
                            <div className="relative overflow-hidden group rounded-[4rem] border border-black/5 bg-white shadow-premium" ref={emblaMainRef}>
                                <div className="flex">
                                    {imageUrls.map((url: string, i: number) => (
                                        <div key={i} className="flex-[0_0_100%] min-w-0 relative aspect-[4/5] overflow-hidden group">
                                            <Image
                                                src={url}
                                                alt={`${product.name} - ${i + 1}`}
                                                fill
                                                priority={i === 0}
                                                quality={95}
                                                className="object-cover transition-transform duration-[6s] group-hover:scale-105"
                                                sizes="(max-width: 1024px) 100vw, 60vw"
                                            />
                                            <button
                                                onClick={() => {
                                                    setLightboxIndex(i)
                                                    setIsLightboxOpen(true)
                                                }}
                                                className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-white/40 backdrop-blur-2xl border border-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white shadow-2xl"
                                            >
                                                <Search className="w-6 h-6" strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Zen Buy Box */}
                    <div className="lg:col-span-5 flex flex-col space-y-16 lg:sticky lg:top-48">
                        {/* Title & Meta */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-primary italic">
                                    Sanctuary Ref: {product.id.slice(-4).toUpperCase()}
                                </span>
                                <div className="h-[1px] flex-1 bg-black/5" />
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-black tracking-tighter leading-[0.9] uppercase text-foreground">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-10 pt-4">
                                <span className="text-5xl font-bold tracking-tight text-foreground">
                                    {product.price.toFixed(0)} <span className="text-sm font-medium text-foreground/30 ml-1 uppercase tracking-widest">MAD</span>
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/40 hidden md:block">
                                    Botanical Purity Verified
                                </span>
                            </div>
                        </div>

                        {/* Buy Actions */}
                        <div className="space-y-10">
                            <AddToCartButton
                                product={{
                                    id: product.id,
                                    name: product.name,
                                    price: product.price,
                                    imageUrl: imageUrls[0],
                                }}
                            />

                            <div className="grid grid-cols-2 gap-6 pb-10 border-b border-black/10">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-white border border-black/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-premium">
                                        <RotateCcw className="w-5 h-5" strokeWidth={1} />
                                    </div>
                                    <span className="text-[9px] uppercase tracking-[0.4em] font-black text-foreground/50 group-hover:text-foreground transition-colors italic">Clean Reset</span>
                                </div>
                                <div className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-white border border-black/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-premium">
                                        <Leaf className="w-5 h-5" strokeWidth={1} />
                                    </div>
                                    <span className="text-[9px] uppercase tracking-[0.4em] font-black text-foreground/50 group-hover:text-foreground transition-colors italic">Pure Origin</span>
                                </div>
                            </div>
                        </div>

                        {/* Composition */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-foreground/20 italic">Biological Identity</span>
                                <div className="flex flex-wrap gap-3">
                                    {(product.highlights || []).map((h: string, i: number) => (
                                        <div key={i} className="px-6 py-3 rounded-full border border-primary/10 bg-white text-[10px] uppercase tracking-widest font-black text-primary hover:bg-primary hover:text-white transition-all cursor-default shadow-sm italic">
                                            {h}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <p className="text-lg md:text-2xl text-foreground/50 leading-relaxed font-medium italic tracking-tight">
                                {product.benefits.split('.')[0]}. Synthesized through a meticulous heritage protocol to ensure maximum biological resonance.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. THE SANCTUARY PROTOCOL */}
            <section className="bg-background-deep section-padding-large border-y border-white/5 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px] pointer-events-none" />

                <div className="max-w-[1550px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-40 items-start">
                        <div className="lg:col-span-5 space-y-16">
                            <div className="space-y-10">
                                <div className="flex items-center gap-6">
                                    <span className="badge-limited">Batch #04 Limited</span>
                                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/40 italic">Solar Extracted</span>
                                </div>
                                <h1 className="text-7xl md:text-[9rem] font-serif font-black tracking-tighter uppercase leading-[0.75] text-foreground">
                                    {product.name.split(' ').map((word: string, i: number) => (
                                        <React.Fragment key={i}>
                                            {i === 1 ? <span className="italic text-primary font-light block">{word}.</span> : word + ' '}
                                        </React.Fragment>
                                    ))}
                                </h1>
                                <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground/60 leading-relaxed max-w-xl italic">
                                    {product.description}
                                </p>
                            </div>

                            <div className="flex flex-col gap-10 pt-8">
                                {TABS.map((tab, i) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`group flex items-start gap-10 text-left transition-all ${activeTab === tab.id ? 'opacity-100' : 'opacity-30 hover:opacity-100'}`}
                                    >
                                        <div className="text-5xl font-serif font-black italic text-white/5 group-hover:text-primary transition-all duration-700">0{i + 1}</div>
                                        <div className="space-y-2 pt-1">
                                            <h3 className="text-2xl font-black uppercase tracking-tight text-white/60 group-hover:text-white transition-colors">{tab.label}</h3>
                                            <div className={`h-[2px] bg-primary transition-all duration-700 origin-left ${activeTab === tab.id ? 'w-full' : 'w-0'}`} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7 relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="bg-white/5 backdrop-blur-xl p-12 md:p-20 rounded-[4rem] border border-white/10 shadow-premium relative z-10"
                                >
                                    <div className="space-y-12">
                                        <p className="text-2xl md:text-3xl font-serif italic leading-tight text-primary">
                                            "{TABS.find(t => t.id === activeTab)?.label}"
                                        </p>
                                        <div className="h-[1px] w-20 bg-primary/20" />
                                        <p className="text-xl md:text-2xl leading-relaxed text-white/60 font-medium tracking-tight italic">
                                            {TABS.find(t => t.id === activeTab)?.content}
                                        </p>
                                    </div>

                                    <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.05] pointer-events-none">
                                        {React.createElement(TABS.find(t => t.id === activeTab)?.icon || Brain, {
                                            className: "w-full h-full p-12 text-white"
                                        })}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. LIGHTBOX */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 md:p-20"
                    >
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center text-white z-50"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
                            <button onClick={prevLightbox} className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all pointer-events-auto">
                                <ChevronLeft className="w-8 h-8" />
                            </button>
                            <button onClick={nextLightbox} className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 active:scale-90 transition-all pointer-events-auto">
                                <ChevronRight className="w-8 h-8" />
                            </button>
                        </div>

                        <motion.div
                            key={lightboxIndex}
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full h-full max-w-6xl"
                        >
                            <Image
                                src={imageUrls[lightboxIndex]}
                                alt="Detail"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Bottom Bar */}
            <div className="lg:hidden fixed bottom-28 left-6 right-6 z-[60] bg-white/95 backdrop-blur-3xl rounded-full p-4 flex items-center gap-6 shadow-premium border border-black/5">
                <div className="flex flex-col pl-4">
                    <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Protocol</span>
                    <span className="text-xl font-bold text-foreground tracking-tight">{product.price.toFixed(0)} <span className="text-xs">MAD</span></span>
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
