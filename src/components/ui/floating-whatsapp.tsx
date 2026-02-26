'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function FloatingWhatsAppButton() {
    const [currentUrl, setCurrentUrl] = useState('')
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Only access window and set URL on client-side
        setCurrentUrl(window.location.href)

        // Optional: Add a slight delay before showing the button to feel non-intrusive
        const timer = setTimeout(() => setIsVisible(true), 1500)
        return () => clearTimeout(timer)
    }, [])

    const handleWhatsAppClick = () => {
        const phoneNumber = "212XXXXXXXXX" // Placeholder for actual Moroccan number
        const message = encodeURIComponent(`Hello, I am interested in this product: ${currentUrl}`)

        // Deep link directly to WhatsApp with prefilled message
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer')
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={handleWhatsAppClick}
                    className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                    aria-label="Contact us on WhatsApp"
                >
                    <MessageCircle className="h-7 w-7" />

                    {/* subtle ping animation for attention */}
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-20"></span>
                </motion.button>
            )}
        </AnimatePresence>
    )
}
