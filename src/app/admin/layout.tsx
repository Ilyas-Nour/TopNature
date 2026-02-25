import React from 'react'
import Link from 'next/link'
import { LayoutDashboard, ShoppingCart, PackageOpen, Settings, LogOut } from 'lucide-react'
import { auth, signOut } from '@/auth'
import { AdminNav } from '@/components/admin/admin-nav'

export const metadata = {
    title: 'Admin Dashboard | EcomStore',
    description: 'Secure admin management panel',
}

interface AdminLayoutProps {
    children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
    const session = await auth()

    // If the user isn't logged in, output the bare layout explicitly for the Login page
    if (!session) {
        return <>{children}</>
    }

    return (
        <div className="flex min-h-screen bg-[#FAFAFA]">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="h-24 flex items-center px-8 border-b border-gray-50">
                    <Link href="/admin" className="flex items-center">
                        <span className="text-xl font-serif text-black font-bold tracking-tight">
                            TopNature
                        </span>
                    </Link>
                </div>

                <AdminNav />

                <div className="p-4 border-t border-gray-50">
                    <form action={async () => {
                        "use server"
                        await signOut({ redirectTo: '/admin/login' })
                    }}>
                        <button type="submit" className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl text-muted-foreground hover:text-black hover:bg-red-50 transition-all text-[11px] uppercase tracking-widest font-bold">
                            <LogOut className="h-4 w-4" strokeWidth={2} />
                            Log Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
                {/* Mobile Header */}
                <div className="md:hidden h-20 bg-white flex items-center justify-between px-6 border-b border-gray-100">
                    <Link href="/admin" className="font-serif font-bold text-lg">TopNature</Link>
                    <button className="p-2"><LayoutDashboard className="h-6 w-6" /></button>
                </div>

                <div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
