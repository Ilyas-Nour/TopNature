import React from 'react'
import Link from 'next/link'

export const metadata = {
    title: 'Our References | EcomStore',
    description: 'A look at our past projects and trusted partners.',
}

export default function ReferencesPage() {
    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="mb-24">
                    <h1 className="editorial-heading text-5xl md:text-8xl mb-6">Partners</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl font-medium tracking-tight">We are proud to collaborate with some of the most innovative ecological brands globally.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 border-t border-border pt-12">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                        <div key={i} className="aspect-square flex items-center justify-center p-4 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700 cursor-default">
                            <span className="editorial-heading text-sm tracking-[0.3em] text-foreground">LOGO {i}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-32 py-24 border-t border-border">
                    <h2 className="editorial-heading text-4xl md:text-6xl mb-8">Begin the Collaboration</h2>
                    <p className="text-muted-foreground text-xl mb-12 max-w-xl font-light">Join our collective of premium botanical partners and sustainable advocates.</p>
                    <Link href="/contact" className="inline-flex h-14 items-center justify-center bg-primary text-primary-foreground px-10 text-sm tracking-widest uppercase hover:bg-black transition-colors duration-500">
                        Get in Touch
                    </Link>
                </div>
            </div>
        </div>
    )
}
