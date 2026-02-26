'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface SocialButtonProps {
    icon: LucideIcon
    href: string
    color: string
}

export function SocialButton({ icon: Icon, href, color }: SocialButtonProps) {
    return (
        <Link
            href={href}
            className="relative w-12 h-12 rounded-full border border-black/10 flex items-center justify-center overflow-hidden group transition-all duration-300"
        >
            {/* The "Fill" Effect (Span overlay) */}
            <span
                className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                style={{ backgroundColor: color }}
            />

            {/* Icon Animation Container */}
            <motion.div
                whileHover={{ rotateY: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative z-10 text-black group-hover:text-white transition-colors duration-300 transform-gpu"
            >
                <Icon className="w-5 h-5" />
            </motion.div>
        </Link>
    )
}
