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
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleAddToCart}
                className="flex h-16 w-full items-center justify-center rounded-none bg-primary text-primary-foreground font-medium tracking-widest uppercase hover:bg-foreground transition-all duration-300"
            >
                Add to Cart
            </motion.button>

            <AnimatePresence>
                {isAdded && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-sm font-medium text-primary tracking-wide uppercase mt-4"
                    >
                        <Check className="h-4 w-4" />
                        Added to your bag
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
