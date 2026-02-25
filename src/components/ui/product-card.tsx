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

    const handleAddToCart = () => {
        addItem({ id, name, price, imageUrl, quantity: 1 })
    }

    return (
        <div className="group relative flex flex-col h-full overflow-hidden">
            <Link href={`/product/${id}`} className="block flex-1">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary mb-3">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className="space-y-1 mt-4">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground line-clamp-2 uppercase">{name}</h3>
                    <div className="flex items-end justify-between mt-2">
                        {categoryName && (
                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">{categoryName}</p>
                        )}
                        <p className="text-lg md:text-xl font-medium text-foreground">MAD {price.toFixed(2)}</p>
                    </div>
                </div>
            </Link>

            {/* Glassmorphism Floating Action Button */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={handleAddToCart}
                    className="flex h-12 w-12 items-center justify-center rounded-none glass-panel text-foreground hover:bg-foreground hover:text-background transition-colors"
                    aria-label={`Add ${name} to cart`}
                >
                    <Plus className="h-6 w-6" strokeWidth={1.5} />
                </motion.button>
            </div>
        </div>
    )
}
