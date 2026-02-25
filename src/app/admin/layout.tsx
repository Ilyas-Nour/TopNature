import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, ShoppingCart, PackageOpen, Settings, LogOut } from 'lucide-react'

export const metadata = {
    title: 'Admin Dashboard | EcomStore',
    description: 'Secure admin management panel',
}

interface AdminLayoutProps {
    children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 hidden md:flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <Link href="/admin" className="flex items-center gap-2 text-white">
                        <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center">
                            <span className="font-bold text-lg leading-none">A</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">AdminPanel</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white bg-slate-800 font-medium transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors">
                        <ShoppingCart className="h-5 w-5" />
                        Orders
                    </Link>
                    <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors">
                        <PackageOpen className="h-5 w-5" />
                        Products
                    </Link>
                    <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors">
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg hover:text-white hover:bg-slate-800 transition-colors text-slate-400">
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
                {/* Mobile Header (Visible only on small screens) */}
                <div className="md:hidden h-16 bg-slate-900 text-white flex items-center justify-between px-4 border-b border-slate-800">
                    <Link href="/admin" className="font-bold text-lg">AdminPanel</Link>
                    <button className="p-2"><LayoutDashboard className="h-6 w-6" /></button>
                </div>

                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
