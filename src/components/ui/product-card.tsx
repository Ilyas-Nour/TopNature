'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
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
            <Link href={`/product/${id}`} className="relative aspect-[4/5] bg-background-offset rounded-3xl overflow-hidden mb-8 block transition-all duration-500 border border-transparent group-hover:border-border group-hover:shadow-card">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Add to Cart Overlay Badge */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-premium active:scale-90"
                >
                    <Plus className="w-5 h-5" strokeWidth={2.5} />
                </button>
            </Link>

            <div className="space-y-2 px-2">
                {categoryName && (
                    <span className="text-[9px] uppercase tracking-[0.3em] text-primary/60 font-bold block">
                        {categoryName}
                    </span>
                )}
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors leading-tight">
                        {name}
                    </h3>
                    <span className="text-lg font-bold tracking-tight text-primary">
                        {price.toFixed(0)} <span className="text-[10px] ml-0.5">MAD</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
