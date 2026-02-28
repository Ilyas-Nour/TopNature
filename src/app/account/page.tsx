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
        <div className="min-h-screen bg-background pt-48 pb-32 selection:bg-primary selection:text-white relative overflow-hidden">
            {/* SOLAR DEPTH */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

            <div className="max-w-[1700px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
                {/* Header Section */}
                <div className="mb-32 space-y-10">
                    <div className="flex items-center gap-8">
                        <span className="w-20 h-[2px] bg-primary shadow-solar-glow" />
                        <span className="text-[11px] uppercase tracking-[0.8em] font-bold text-primary italic">Solar Profile</span>
                    </div>
                    <h1 className="text-8xl md:text-[12rem] font-serif font-black tracking-tight uppercase leading-[0.75] text-foreground">
                        The <br /> <span className="italic text-primary font-light">Telemetry.</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 lg:gap-32 items-start">

                    {/* Sidebar / Identity Card */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-16 rounded-[4rem] border border-black/5 sticky top-48 shadow-2xl overflow-hidden group">
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                            <div className="flex flex-col items-center text-center space-y-12 relative z-10">
                                <div className="w-32 h-32 rounded-full bg-background border border-black/5 flex items-center justify-center shadow-xl relative overflow-hidden group/avatar">
                                    <div className="absolute inset-0 bg-primary/20 blur-[20px] rounded-full opacity-20 group-hover/avatar:opacity-40 transition-opacity" />
                                    <UserIcon className="w-14 h-14 text-foreground/20 group-hover:text-primary transition-colors h-14" strokeWidth={1.2} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-serif font-black uppercase tracking-tight text-foreground leading-none">Jane Doe</h2>
                                    <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-primary/60 italic">ID: SL-2026-SANCTUARY</p>
                                </div>

                                <div className="w-full pt-16 space-y-8 border-t border-black/5">
                                    <Link href="/account" className="flex items-center justify-between group/link">
                                        <span className="text-[12px] uppercase tracking-[0.4em] font-bold text-foreground/60 group-hover/link:text-primary transition-all">Order Protocols</span>
                                        <Package className="w-6 h-6 text-foreground/10 group-hover/link:text-primary transition-all" strokeWidth={1} />
                                    </Link>
                                    <button className="flex items-center justify-between w-full group/link">
                                        <span className="text-[12px] uppercase tracking-[0.4em] font-bold text-foreground/60 group-hover/link:text-primary transition-all">Profile Matrix</span>
                                        <Settings className="w-6 h-6 text-foreground/10 group-hover/link:text-primary transition-all" strokeWidth={1} />
                                    </button>
                                    <div className="pt-12">
                                        <button className="w-full py-7 bg-foreground text-background rounded-full text-[12px] font-black uppercase tracking-[0.6em] hover:bg-primary hover:text-white transition-all active:scale-95 shadow-2xl">
                                            Sever Link
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Area: Order Archive */}
                    <div className="lg:col-span-8">
                        <div className="space-y-32">
                            <div className="flex items-end justify-between border-b border-black/5 pb-10 relative overflow-hidden group">
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-primary/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                <h2 className="text-7xl font-serif font-black uppercase tracking-tight text-foreground">History <span className="italic text-primary/30 font-light ml-6 text-5xl">({orders.length})</span></h2>
                            </div>

                            {orders.length > 0 ? (
                                <div className="space-y-48">
                                    {orders.map((order: any) => (
                                        <div key={order.id} className="group/order">
                                            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
                                                <div className="space-y-8">
                                                    <span className="text-[11px] uppercase tracking-[0.6em] font-bold text-primary/30 italic">Protocol #{order.id.slice(-8).toUpperCase()}</span>
                                                    <h3 className="text-6xl font-serif font-black uppercase tracking-tight text-foreground group-hover/order:text-primary transition-all duration-700 leading-none">
                                                        {new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' }).format(order.createdAt)}
                                                    </h3>
                                                </div>
                                                <div className="flex gap-20 items-end">
                                                    <div className="space-y-4">
                                                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/20 block italic">Status</span>
                                                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 border border-black/5 rounded-full text-foreground/50 group-hover/order:border-primary/30 group-hover/order:text-primary transition-all bg-white shadow-sm">
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="space-y-4 text-right">
                                                        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-foreground/20 block italic">Total Amount</span>
                                                        <span className="text-5xl font-serif font-black italic text-foreground group-hover/order:text-primary transition-colors">{order.totalAmount.toFixed(0)} <span className="text-sm font-medium">MAD</span></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white p-12 rounded-[4rem] border border-black/5 space-y-10 relative overflow-hidden shadow-xl">
                                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/order:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                                {(order as any).orderItems.map((item: any) => (
                                                    <div key={item.id} className="flex justify-between items-center text-left py-6 border-b border-black/5 last:border-0 relative z-10 mx-6">
                                                        <div className="flex items-center gap-10">
                                                            <div className="w-16 h-16 rounded-full bg-background border border-black/5 flex items-center justify-center text-[12px] font-black text-primary shadow-inner">
                                                                {item.quantity}
                                                            </div>
                                                            <div className="space-y-2">
                                                                <span className="text-[13px] uppercase tracking-[0.4em] font-bold text-foreground group-hover/order:text-primary transition-colors">
                                                                    {item.product.name}
                                                                </span>
                                                                <span className="block text-[10px] uppercase tracking-widest text-foreground/20 font-bold italic">Molecular Compound Unit</span>
                                                            </div>
                                                        </div>
                                                        <span className="text-[14px] font-bold tracking-tight text-foreground">
                                                            {(item.priceAtOrder * item.quantity).toFixed(0)} <span className="text-[10px] uppercase opacity-40">MAD</span>
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-48 text-center bg-white rounded-[5rem] border border-black/5 relative overflow-hidden group shadow-2xl">
                                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <Package className="w-28 h-28 mx-auto mb-16 text-foreground/5 group-hover:text-primary transition-all duration-700" strokeWidth={0.5} />
                                    <h3 className="text-6xl font-serif font-black uppercase tracking-tight mb-8 text-foreground leading-none">Archive Empty</h3>
                                    <p className="text-foreground/30 text-[12px] uppercase tracking-[0.4em] font-bold mb-20 italic">No solar protocols have been initiated in this biological cycle.</p>
                                    <Link href="/shop" className="inline-flex px-20 py-8 bg-foreground text-background rounded-full font-black uppercase tracking-[0.6em] text-[12px] hover:bg-primary hover:text-white transition-all active:scale-95 shadow-2xl">
                                        Access Inventory
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
