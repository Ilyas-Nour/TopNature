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
        <div className="group relative rounded-xl bg-card p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-border/50 flex flex-col h-full">
            <Link href={`/product/${id}`} className="block flex-1">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-secondary relative mb-4">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                <div className="space-y-1 pr-12">
                    {categoryName && (
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{categoryName}</p>
                    )}
                    <h3 className="font-semibold text-foreground line-clamp-2 hover:text-blue-600 transition-colors">{name}</h3>
                    <p className="text-lg font-bold text-foreground pt-1">MAD {price.toFixed(2)}</p>
                </div>
            </Link>

            <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                onClick={handleAddToCart}
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] text-white shadow-sm hover:bg-[#059669] transition-colors z-10"
                aria-label={`Add ${name} to cart`}
            >
                <Plus className="h-5 w-5" />
            </motion.button>
        </div>
    )
}
