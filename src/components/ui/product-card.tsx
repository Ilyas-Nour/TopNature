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
        <div className="group flex flex-col w-full">
            <Link href={`/product/${id}`} className="block relative aspect-[4/5] rounded-2xl overflow-hidden mb-6 bg-secondary/5">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
            </Link>

            <div className="flex flex-col items-center text-center space-y-1">
                {categoryName && (
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                        {categoryName}
                    </span>
                )}
                <h3 className="text-lg font-bold tracking-tight text-foreground transition-opacity">
                    {name}
                </h3>
                <p className="text-sm font-medium text-foreground/60">
                    MAD {price.toFixed(2)}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="mt-6 px-6 py-2 border border-black rounded-full text-[11px] uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all duration-300 active:scale-95"
                >
                    Quick Add
                </button>
            </div>
        </div>
    )
}
