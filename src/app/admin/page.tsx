import { prisma } from '@/lib/prisma'
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
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Welcome back. Here is what's happening today.</p>
            </div>

            {/* Top Level Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Revenue Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                        <p className="text-3xl font-bold text-slate-900 mt-2">MAD {totalRevenue.toFixed(2)}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <DollarSign className="w-6 h-6" />
                    </div>
                </div>

                {/* Total Orders Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Orders</p>
                        <p className="text-3xl font-bold text-slate-900 mt-2">{totalOrders}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                </div>

                {/* Pending Orders Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-slate-500">Pending Orders</p>
                        <p className="text-3xl font-bold text-slate-900 mt-2">{pendingOrders}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                        <Clock className="w-6 h-6" />
                    </div>
                </div>

            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200">
                    <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-200">Order ID</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-200">Date</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-200">Customer Email</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-200">Payment</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-200">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold tracking-wider text-slate-500 uppercase border-b border-slate-200 text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                            #{order.id.slice(-8).toUpperCase()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(order.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {order.customerEmail || 'Guest'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {order.paymentMethod.replace('_', ' ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(order.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900 text-right">
                                            MAD {order.totalAmount.toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-500">
                                        No orders have been placed yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
