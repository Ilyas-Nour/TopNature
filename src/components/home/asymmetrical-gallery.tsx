'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface ProductGalleryProps {
    products: any[]
}

export function AsymmetricalGallery({ products }: ProductGalleryProps) {
    return (
        <section className="w-full py-48 px-6 md:px-12 lg:px-24 bg-background relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-[1800px] mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-40 gap-12">
                    <div className="max-w-2xl space-y-6">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[10px] uppercase tracking-[0.6em] font-black text-primary"
                        >
                            The Obsidian Archives
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-7xl md:text-9xl font-serif font-black tracking-[-0.05em] leading-[0.8] text-white"
                        >
                            Pharmacology <br /> of the <span className="text-primary italic font-light">Void</span>.
                        </motion.h2>
                    </div>
                    <Link href="/shop" className="group flex items-center gap-6 text-[11px] uppercase tracking-[0.4em] font-black pb-4 border-b border-white/5 hover:border-primary transition-all text-white/40 hover:text-white">
                        Enter Atelier
                        <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all group-hover:scale-110">
                            <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </Link>
                </div>

                {/* The Asymmetrical Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-40 md:gap-x-12 lg:gap-x-24">
                    {products.map((product, i) => {
                        const isLarge = i === 0 || i === 4
                        const colSpan = isLarge ? 'md:col-span-8' : 'md:col-span-4'
                        const mt = i === 1 ? 'md:mt-48' : i === 2 ? 'md:mt-[-15vh]' : ''

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`${colSpan} ${mt} group`}
                            >
                                <Link href={`/product/${product.id}`} className="block space-y-10">
                                    <div className="relative aspect-[4/5] overflow-hidden rounded-[4rem] bg-surface-luminous border border-white/5 group-hover:border-primary/20 group-hover:shadow-[0_0_50px_rgba(0,245,155,0.1)] transition-all duration-700">
                                        <Image
                                            src={product.imageUrls[0]}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-[3s] brightness-[0.6] group-hover:brightness-100 grayscale-[0.5] group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                        {/* Floating Badge on Image */}
                                        <div className="absolute top-10 left-10">
                                            <span className="px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-[9px] uppercase tracking-[0.4em] font-black text-primary shadow-[0_0_15px_rgba(0,245,155,0.2)]">
                                                {product.category.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start px-4">
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-serif font-black tracking-[-0.04em] uppercase leading-[0.85] text-white group-hover:text-primary transition-colors">
                                                {product.name}
                                            </h3>
                                            <div className="flex gap-6">
                                                {(product.highlights || []).slice(0, 1).map((h: string, idx: number) => (
                                                    <span key={idx} className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20 group-hover:text-primary/40 transition-colors">
                                                        {h}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-right pt-2">
                                            <span className="text-2xl font-black text-white">
                                                {product.price} <span className="text-[10px] text-white/30 ml-1">MAD</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
