'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Check } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'

interface AddToCartButtonProps {
    product: {
        id: string
        name: string
        price: number
        imageUrl: string
    }
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const [isAdded, setIsAdded] = useState(false)
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
        })

        setIsAdded(true)
        setTimeout(() => setIsAdded(false), 2000)
    }

    return (
        <div className="flex flex-col gap-4">
            <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="group relative w-full h-16 bg-primary text-white rounded-full overflow-hidden transition-all duration-500 shadow-premium"
            >
                <div className="relative z-10 flex items-center justify-center gap-3">
                    <AnimatePresence mode="wait">
                        {isAdded ? (
                            <motion.div
                                key="added"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2"
                            >
                                <Check className="w-5 h-5" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Added to Cart</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="add"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2"
                            >
                                <ShoppingCart className="w-4 h-4" strokeWidth={2} />
                                <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Add to Cart</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.button>
        </div>
    )
}
