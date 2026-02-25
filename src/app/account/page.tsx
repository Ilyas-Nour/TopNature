import { prisma } from '@/lib/prisma'
import { Package, User as UserIcon, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
    // Placeholder logged-in user email until NextAuth is fully connected to the customer side
    const customerEmail = "jane@example.com"

    const orders = await (prisma.order as any).findMany({
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
        <div className="min-h-screen bg-background pt-32 pb-24 text-foreground">
            <div className="w-full px-6 md:px-12 lg:px-20">
                <div className="mb-16">
                    <h1 className="editorial-heading text-5xl md:text-7xl mb-4">Account</h1>
                    <p className="text-xl text-muted-foreground font-medium tracking-tight">Your botanical journey and order history.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Sidebar / Profile Card */}
                    <div className="lg:col-span-4">
                        <div className="bg-secondary/5 p-12 overflow-hidden flex flex-col items-center">
                            <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                                <UserIcon className="w-10 h-10" strokeWidth={1} />
                            </div>
                            <h2 className="editorial-heading text-2xl mb-1 text-foreground font-medium">Jane Doe</h2>
                            <p className="text-sm font-light tracking-wide text-muted-foreground mb-10">{customerEmail}</p>

                            <div className="w-full space-y-4 pt-10 border-t border-border">
                                <Link href="/account" className="flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-foreground font-semibold">
                                    <Package className="w-4 h-4" strokeWidth={1.5} /> Order History
                                </Link>
                                <button className="flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
                                    <Settings className="w-4 h-4" strokeWidth={1.5} /> Profile Settings
                                </button>
                                <button className="flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-primary hover:text-black transition-colors pt-6">
                                    <LogOut className="w-4 h-4" strokeWidth={1.5} /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Area: Orders */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="editorial-heading text-3xl mb-8">Order History ({orders.length})</h2>

                            {orders.length > 0 ? (
                                <div className="space-y-12">
                                    {orders.map((order: any) => (
                                        <div key={order.id} className="pb-12 border-b border-border last:border-0">
                                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                                                <div>
                                                    <p className="text-xs uppercase tracking-[0.2em] font-medium text-muted-foreground mb-2">Order #{order.id.slice(-8).toUpperCase()}</p>
                                                    <p className="editorial-heading text-2xl">
                                                        {new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(order.createdAt)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-8">
                                                    <div className="flex flex-col items-end">
                                                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Status</span>
                                                        <span className={`text-sm font-medium uppercase tracking-widest ${order.status === 'PENDING' ? 'text-primary' :
                                                            order.status === 'DELIVERED' ? 'text-secondary' :
                                                                'text-foreground'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col items-end font-light">
                                                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Total</span>
                                                        <span className="text-xl text-foreground">MAD {order.totalAmount.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                {(order as any).orderItems.map((item: any) => (
                                                    <div key={item.id} className="flex justify-between items-center text-left py-1 text-sm font-light tracking-wide border-b border-border/50 last:border-0 border-dashed">
                                                        <span className="text-foreground flex items-center gap-3">
                                                            <span className="font-medium text-[10px] w-6 h-6 flex items-center justify-center bg-secondary/10 rounded-full">{item.quantity}</span>
                                                            {item.product.name}
                                                        </span>
                                                        <span className="text-foreground">
                                                            MAD {(item.priceAtOrder * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-24 text-center bg-secondary/5">
                                    <Package className="w-12 h-12 mx-auto mb-6 text-secondary/30" strokeWidth={0.5} />
                                    <h3 className="editorial-heading text-2xl mb-2 text-foreground">No orders found</h3>
                                    <p className="text-muted-foreground font-light mb-12">You haven't placed any orders yet.</p>
                                    <Link href="/shop" className="inline-flex h-14 items-center justify-center bg-primary text-primary-foreground px-10 text-sm tracking-widest uppercase hover:bg-black transition-colors duration-500">
                                        Start Shopping
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
