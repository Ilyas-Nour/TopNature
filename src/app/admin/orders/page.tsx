import { prisma } from '@/lib/prisma'
import { ShoppingBag, Search, ExternalLink, Calendar } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
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

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING':
                return <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-yellow-50 text-yellow-800 border border-yellow-100">Pending</span>
            case 'PROCESSING':
                return <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-blue-50 text-blue-800 border border-blue-100">Processing</span>
            case 'SHIPPED':
                return <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-purple-50 text-purple-800 border border-purple-100">Shipped</span>
            case 'DELIVERED':
                return <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">Delivered</span>
            case 'CANCELLED':
                return <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-red-50 text-red-800 border border-red-100">Cancelled</span>
            default:
                return <span className="px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full bg-gray-50 text-gray-800 border border-gray-100">{status}</span>
        }
    }

    return (
        <div className="space-y-16 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-serif font-bold tracking-tight text-black">Orders</h1>
                    <p className="text-muted-foreground mt-4 font-medium uppercase tracking-[0.2em] text-[11px]">Transaction Records & Logistics</p>
                </div>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-muted-foreground bg-white border border-gray-100 px-6 py-4 rounded-full">
                    <Calendar className="w-3 h-3" />
                    Lifetime Activity
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-50 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FAFAFA]/50 border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Order</th>
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Customer Details</th>
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Items</th>
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Status</th>
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase text-right">Revenue</th>
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-[#FAFAFA] transition-all duration-300">
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-black tracking-tight">#{order.id.slice(-6).toUpperCase()}</span>
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                                                    {new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' }).format(order.createdAt)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-black">{order.customerEmail || 'Guest Account'}</span>
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                                                    {order.shippingCity}, {order.paymentMethod.replace('_', ' ')}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-bold text-black">{order.orderItems.length} Products</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            {getStatusBadge(order.status)}
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-black text-right tracking-tight">
                                            MAD {order.totalAmount.toFixed(2)}
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <button className="p-2 text-muted-foreground hover:text-black transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">No orders recorded in the system</p>
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
