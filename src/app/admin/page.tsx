import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { DollarSign, ShoppingCart, Clock } from 'lucide-react'

// Opt out of static rendering so this dashboard reflects live DB state constantly
export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
    // Fetch all orders with their related items and the users who placed them
    const orders = await prisma.order.findMany({
        include: {
            orderItems: true,
            user: true, // If we have users linked later
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    // Calculate Metrics
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
    const totalOrders = orders.length
    const pendingOrders = orders.filter(o => o.status === 'PENDING').length

    // We only show the latest 10 orders in the recent table
    const recentOrders = orders.slice(0, 10)

    // Status Badge Color Mapper
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
            case 'PROCESSING':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Processing</span>
            case 'SHIPPED':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Shipped</span>
            case 'DELIVERED':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">Delivered</span>
            case 'CANCELLED':
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>
            default:
                return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-800">{status}</span>
        }
    }

    return (
        <div className="space-y-16 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-serif font-bold tracking-tight text-black">Dashboard</h1>
                    <p className="text-muted-foreground mt-4 font-medium uppercase tracking-[0.2em] text-[11px]">System Overview & Recent Activity</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span>Server Live</span>
                    </div>
                </div>
            </div>

            {/* Top Level Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: 'Total Revenue', value: `MAD ${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'bg-black text-white' },
                    { label: 'Total Orders', value: totalOrders, icon: ShoppingCart, color: 'bg-white border border-gray-100' },
                    { label: 'Pending Orders', value: pendingOrders, icon: Clock, color: 'bg-white border border-gray-100' }
                ].map((stat, i) => (
                    <div key={i} className={`p-10 rounded-[2.5rem] flex flex-col justify-between h-48 transition-transform hover:scale-[1.02] duration-500 ${stat.color}`}>
                        <div className="flex justify-between items-start">
                            <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${stat.color.includes('black') ? 'text-white/60' : 'text-muted-foreground'}`}>
                                {stat.label}
                            </span>
                            <stat.icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <p className="text-4xl font-bold tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders Table */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-black">Recent Orders</h2>
                    <Link href="/admin/orders" className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-black transition-colors">
                        View All Activity
                    </Link>
                </div>

                <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-50 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#FAFAFA]/50 border-b border-gray-50">
                                    <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Order ID</th>
                                    <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Customer</th>
                                    <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Method</th>
                                    <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((order) => (
                                        <tr key={order.id} className="group hover:bg-[#FAFAFA] transition-all duration-300">
                                            <td className="px-8 py-6 whitespace-nowrap text-sm font-bold tracking-tight text-black flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-black group-hover:scale-125 transition-transform" />
                                                #{order.id.slice(-6).toUpperCase()}
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-black">{order.customerEmail || 'Guest'}</span>
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                                                        {new Intl.DateTimeFormat('en-GB', { dateStyle: 'short' }).format(order.createdAt)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                                {order.paymentMethod.replace(/_/g, ' ')}
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap">
                                                <div className="transform scale-90 origin-left">
                                                    {getStatusBadge(order.status)}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 whitespace-nowrap text-sm font-bold text-black text-right tracking-tight">
                                                MAD {order.totalAmount.toFixed(2)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">No active orders found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
