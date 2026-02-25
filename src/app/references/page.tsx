import React from 'react'

export const metadata = {
    title: 'Our References | EcomStore',
    description: 'A look at our past projects and trusted partners.',
}

export default function ReferencesPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Our References</h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">We are proud to have partnered with some of the most innovative brands across the globe.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="bg-white aspect-video rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center p-8 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md hover:border-blue-200 cursor-pointer">
                            <span className="text-xl font-black tracking-widest text-slate-300">BRAND {i}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-24 bg-blue-600 rounded-3xl p-10 md:p-16 text-center shadow-lg">
                    <h2 className="text-3xl font-bold text-white mb-4">Ready to work with us?</h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Join thousands of satisfied customers and premium partners who trust our platform.</p>
                    <a href="/contact" className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>
    )
}
