'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, PackageOpen, Settings } from 'lucide-react'

const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', href: '/admin/products', icon: PackageOpen },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminNav() {
    const pathname = usePathname()

    return (
        <nav className="flex-1 px-4 py-8 space-y-2">
            {navItems.map((item) => {
                const isActive = item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href)
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-[13px] uppercase tracking-widest font-bold ${isActive
                            ? 'bg-black text-white'
                            : 'text-muted-foreground hover:text-black hover:bg-[#FAFAFA]'
                            }`}
                    >
                        <item.icon className="h-4 w-4" strokeWidth={2} />
                        {item.name}
                    </Link>
                )
            })}
        </nav>
    )
}
