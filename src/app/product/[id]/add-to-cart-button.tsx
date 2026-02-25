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
        <div className="flex flex-col gap-3">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#10B981] px-8 text-base font-bold text-white shadow-sm hover:bg-[#059669] transition-colors"
            >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
            </motion.button>

            <AnimatePresence>
                {isAdded && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-sm font-medium text-[#10B981]"
                    >
                        <Check className="h-4 w-4" />
                        Added to your cart successfully!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
