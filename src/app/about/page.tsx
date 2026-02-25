import React from 'react'

export const metadata = {
    title: 'About Us | EcomStore',
    description: 'Learn more about our company and mission.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-8 text-center">Who We Are</h1>

                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm mb-12">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-inter mb-6">
                        At EcomStore, we believe in delivering the highest quality products with an unmatched customer experience. Founded in 2026, our mission is to seamlessly connect people with the tools they need to live better, more productive lives. We're driven by a passion for excellence and a commitment to sustainability.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed font-inter">
                        Every product in our catalog undergoes rigorous testing to ensure it meets our strict standards. We partner with the best manufacturers globally to bring you items that are not only beautifully designed but built to last.
                    </p>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8 text-center">Meet the Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm text-center">
                            <div className="h-48 bg-slate-200 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-slate-900">Team Member {i}</h3>
                                <p className="text-sm text-blue-600 font-medium mb-3">Position Title</p>
                                <p className="text-sm text-slate-500">Dedicated professional ensuring the best for our customers.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
