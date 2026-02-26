'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface AnimatedNavLinkProps {
    title: string
    href: string
    className?: string
}

const DURATION = 0.4
const STAGGER = 0.02
const EASE = [0.76, 0, 0.24, 1] as const

export function AnimatedNavLink({ title, href, className = "" }: AnimatedNavLinkProps) {
    return (
        <Link href={href}>
            <motion.div
                initial="initial"
                whileHover="hover"
                className={`relative overflow-hidden inline-flex cursor-pointer ${className}`}
            >
                {/* Top Set of Characters */}
                <div className="inline-flex">
                    {title.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                initial: { y: 0 },
                                hover: { y: "-100%" },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: EASE,
                                delay: i * STAGGER,
                            }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </div>

                {/* Bottom Set of Characters (Shifted Down) */}
                <div className="absolute inset-0 inline-flex">
                    {title.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            variants={{
                                initial: { y: "100%" },
                                hover: { y: 0 },
                            }}
                            transition={{
                                duration: DURATION,
                                ease: EASE,
                                delay: i * STAGGER,
                            }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </div>
            </motion.div>
        </Link>
    )
}
