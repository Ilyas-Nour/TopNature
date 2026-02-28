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
            <Link href={`/product/${id}`} className="relative aspect-[4/5] bg-white rounded-3xl overflow-hidden mb-8 block transition-all duration-700 border border-black/5 group-hover:border-primary/30 group-hover:shadow-[0_30px_60px_-15px_rgba(212,175,55,0.1)]">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-[2s]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Solar Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Addition Protocol */}
                <motion.button
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.1, backgroundColor: "#D4AF37", color: "#FFFFFF" }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-6 right-6 w-14 h-14 bg-white/80 backdrop-blur-xl border border-black/5 rounded-full flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl"
                >
                    <Plus className="w-6 h-6" strokeWidth={1.5} />
                </motion.button>
            </Link>

            <div className="flex flex-col space-y-4 px-2">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-2 flex-1">
                        {categoryName && (
                            <span className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold block">
                                {categoryName}
                            </span>
                        )}
                        <h3 className="text-xl md:text-2xl font-serif font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight">
                            {name}
                        </h3>
                    </div>
                    <div className="pt-1.5 text-right">
                        <span className="text-2xl font-bold tracking-tight text-foreground block">
                            {price.toFixed(0)} <span className="text-[11px] font-medium text-foreground/40 ml-0.5">MAD</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
