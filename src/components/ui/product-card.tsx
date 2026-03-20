'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'

interface ProductCardProps {
    id: string
    name: string
    price: number
    imageUrl: string
    categoryName?: string
}

export function ProductCard({ id, name, price, imageUrl, categoryName }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem({ id, name, price, imageUrl, quantity: 1 })
    }

    return (
        <div className="group flex flex-col w-full relative">
            <Link href={`/product/${id}`} className="relative aspect-[3/4] bg-background-offset rounded-[2.5rem] overflow-hidden mb-8 block transition-all duration-700 border border-transparent group-hover:border-primary/20 group-hover:shadow-premium">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-premium"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Add to Cart Overlay Badge */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-6 right-6 w-14 h-14 glass text-primary opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-premium active:scale-90 flex items-center justify-center rounded-full"
                >
                    <Plus className="w-6 h-6" strokeWidth={1.5} />
                </button>

                {/* Tag Overlay */}
                <div className="absolute top-6 left-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <span className="px-4 py-2 glass rounded-full text-[8px] uppercase tracking-[0.2em] font-bold text-primary">
                        Premium Grade
                    </span>
                </div>
            </Link>

            <div className="space-y-3 px-2 text-center md:text-left">
                {categoryName && (
                    <span className="text-[10px] uppercase tracking-[0.4em] text-primary/60 font-bold block">
                        {categoryName}
                    </span>
                )}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-2 md:gap-4">
                    <h3 className="text-2xl font-serif font-light tracking-tight text-foreground transition-colors leading-tight">
                        {name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xl font-sans font-bold tracking-tight text-primary">
                            {price.toFixed(0)}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">MAD</span>
                    </div>
                </div>
                <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                     <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-foreground/20 flex items-center gap-2">
                        View Product <ArrowRight className="w-3 h-3" />
                     </span>
                </div>
            </div>
        </div>
    )
}
