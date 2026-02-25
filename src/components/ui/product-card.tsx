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
        <div className="group relative flex flex-col w-full h-full overflow-hidden block">
            <Link href={`/product/${id}`} className="block relative w-full aspect-[3/4] overflow-hidden bg-secondary/10">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Subtle gradient overlay to ensure text legibility */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />

                {/* Floating Title & Price over the image corners */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col space-y-1">
                    {categoryName && (
                        <span className="text-xs text-[#F9F6F0]/80 font-medium uppercase tracking-[0.2em] mb-1">
                            {categoryName}
                        </span>
                    )}
                    <h3 className="editorial-heading text-2xl md:text-3xl text-[#F9F6F0] leading-none mb-2">
                        {name}
                    </h3>
                    <p className="text-lg text-[#F9F6F0] font-light tracking-wide">
                        MAD {price.toFixed(2)}
                    </p>
                </div>
            </Link>

            {/* Float Action Button */}
            <div className="absolute top-4 right-4 z-10 transition-transform duration-500 translate-y-0 opacity-100 md:opacity-0 md:-translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={handleAddToCart}
                    className="flex h-12 w-12 items-center justify-center bg-primary text-primary-foreground hover:bg-black transition-colors"
                    aria-label={`Add ${name} to cart`}
                >
                    <Plus className="h-6 w-6" strokeWidth={1} />
                </motion.button>
            </div>
        </div>
    )
}
