import { prisma } from '@/lib/prisma'
import { Package, User as UserIcon, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
    // Placeholder logged-in user email until NextAuth is fully connected to the customer side
    const customerEmail = "jane@example.com"

    const orders = await prisma.order.findMany({
        where: {
            customerEmail: customerEmail
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">My Account</h1>
                    <p className="text-slate-500 mt-2">Manage your profile and view your past orders.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Sidebar / Profile Card */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 line-clamp-1 overflow-hidden">
                            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
                                <UserIcon className="w-10 h-10" />
                            </div>
                            <h2 className="text-xl font-bold text-center text-slate-900">Jane Doe</h2>
                            <p className="text-center text-slate-500 text-sm mb-6">{customerEmail}</p>

                            <div className="space-y-2 border-t border-slate-100 pt-6">
                                <Link href="/account" className="flex items-center gap-3 px-4 py-3 bg-slate-50 text-blue-600 rounded-xl font-medium transition-colors">
                                    <Package className="w-5 h-5" /> Order History
                                </Link>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-colors">
                                    <Settings className="w-5 h-5" /> Profile Settings
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors mt-4">
                                    <LogOut className="w-5 h-5" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Area: Orders */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50/50">
                                <h2 className="text-lg font-bold text-slate-900">Order History ({orders.length})</h2>
                            </div>

                            <div className="p-0">
                                {orders.length > 0 ? (
                                    <div className="divide-y divide-slate-100">
                                        {orders.map((order) => (
                                            <div key={order.id} className="p-6 hover:bg-slate-50/80 transition-colors">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">Order #{order.id.slice(-8).toUpperCase()}</p>
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            Placed on {new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(order.createdAt)}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm font-medium">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                                order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800' :
                                                                    'bg-blue-100 text-blue-800'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                        <span className="text-slate-900">MAD {order.totalAmount.toFixed(2)}</span>
                                                    </div>
                                                </div>

                                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Items</p>
                                                    <div className="space-y-3">
                                                        {order.orderItems.map((item) => (
                                                            <div key={item.id} className="flex justify-between items-center text-left">
                                                                <span className="text-sm text-slate-700 flex items-center gap-2">
                                                                    <span className="font-medium px-2 py-0.5 bg-white border border-slate-200 rounded text-xs">{item.quantity}x</span>
                                                                    {item.product.name}
                                                                </span>
                                                                <span className="text-sm font-medium text-slate-900">
                                                                    MAD {(item.priceAtOrder * item.quantity).toFixed(2)}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-12 text-center flex flex-col items-center">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                            <Package className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">No orders found</h3>
                                        <p className="text-slate-500 mb-6">You haven't placed any orders yet.</p>
                                        <Link href="/shop" className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm">
                                            Start Shopping
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
