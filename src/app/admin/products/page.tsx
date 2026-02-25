import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Package, Edit, Search } from 'lucide-react'
import { DeleteProductButton } from "@/components/admin/delete-product-button"

export const dynamic = 'force-dynamic'

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            category: true,
            _count: {
                select: { orderItems: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="space-y-16 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-serif font-bold tracking-tight text-black">Products</h1>
                    <p className="text-muted-foreground mt-4 font-medium uppercase tracking-[0.2em] text-[11px]">Control & Catalog Management</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    New Product
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-8 bg-white border border-gray-100 rounded-[2rem] flex items-center justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Active Catalog</p>
                        <p className="text-2xl font-bold mt-1 text-black">{products.length} Items</p>
                    </div>
                    <Package className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
                </div>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-50 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#FAFAFA]/50 border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase text-center w-20">Preview</th>
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Product Name</th>
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Category</th>
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">Stock</th>
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase text-right">Price</th>
                                <th className="px-8 py-6 text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id} className="group hover:bg-[#FAFAFA] transition-all duration-300">
                                        <td className="px-8 py-6">
                                            <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-gray-50 mx-auto border border-gray-100">
                                                <Image
                                                    src={product.imageUrls[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-black">{product.name}</span>
                                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                                                    SKU: {product.id.slice(-6).toUpperCase()}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                                {product.category.name}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-sm font-bold text-black">
                                                <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                                {product.stock}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-black text-right tracking-tight">
                                            MAD {product.price.toFixed(2)}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-4">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="p-2 text-muted-foreground hover:text-black transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" strokeWidth={2} />
                                                </Link>
                                                <DeleteProductButton productId={product.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">The catalog is currently empty</p>
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
