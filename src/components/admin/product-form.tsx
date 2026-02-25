'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Save, ArrowLeft, Image as ImageIcon, X } from 'lucide-react'
import Link from 'next/link'
import { createProduct, updateProduct } from '@/app/admin/products/actions'

const productSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    slug: z.string().min(2, 'Slug is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.string().min(1, 'Price is required'),
    comparePrice: z.string().optional(),
    stock: z.string().min(1, 'Stock is required'),
    categoryId: z.string().min(1, 'Category is required'),
    imageUrls: z.array(z.string().url('Invalid URL')).min(1, 'At least one image is required'),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
    initialData?: any
    categories: any[]
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [imageUrlInput, setImageUrlInput] = React.useState('')

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData ? {
            ...initialData,
            price: initialData.price.toString(),
            comparePrice: initialData.comparePrice?.toString() || '',
            stock: initialData.stock.toString(),
            imageUrls: initialData.imageUrls || [],
        } : {
            imageUrls: [],
        },
    })

    const imageUrls = watch('imageUrls')
    const name = watch('name')

    // Auto-generate slug from name
    React.useEffect(() => {
        if (!initialData && name) {
            const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            setValue('slug', slug)
        }
    }, [name, setValue, initialData])

    const addImageUrl = () => {
        if (imageUrlInput && !imageUrls.includes(imageUrlInput)) {
            setValue('imageUrls', [...imageUrls, imageUrlInput])
            setImageUrlInput('')
        }
    }

    const removeImageUrl = (url: string) => {
        setValue('imageUrls', imageUrls.filter(u => u !== url))
    }

    const onSubmit = async (data: ProductFormValues) => {
        setIsSubmitting(true)
        try {
            let result
            if (initialData) {
                result = await updateProduct(initialData.id, data)
            } else {
                result = await createProduct(data)
            }

            if (result.success) {
                router.push('/admin/products')
                router.refresh()
            } else {
                alert(result.error || 'Something went wrong')
            }
        } catch (error) {
            console.error(error)
            alert('Failed to save product')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 pb-24">
            <div className="flex items-center justify-between">
                <Link href="/admin/products" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-black transition-colors">
                    <ArrowLeft className="w-3 h-3" />
                    Back to Catalog
                </Link>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {isSubmitting ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Information */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-8">
                        <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold text-muted-foreground border-b border-gray-50 pb-4">Core Identification</h2>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-gray-400">Product Name</label>
                                <input
                                    {...register('name')}
                                    className="w-full bg-[#FAFAFA] rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all text-sm font-medium"
                                    placeholder="Radiant Botanical Serum"
                                />
                                {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-gray-400">Slug (URL Identifier)</label>
                                <input
                                    {...register('slug')}
                                    className="w-full bg-[#FAFAFA] rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all text-sm font-medium"
                                    placeholder="radiant-botanical-serum"
                                />
                                {errors.slug && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.slug.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-gray-400">Exquisite Description</label>
                                <textarea
                                    {...register('description')}
                                    rows={6}
                                    className="w-full bg-[#FAFAFA] rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all text-sm font-medium resize-none"
                                    placeholder="Describe the nature and benefits of this botanical creation..."
                                />
                                {errors.description && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.description.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-8">
                        <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold text-muted-foreground border-b border-gray-50 pb-4">Inventory & Economics</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-gray-400">Regular Price (MAD)</label>
                                <input
                                    {...register('price')}
                                    className="w-full bg-[#FAFAFA] rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all text-sm font-medium"
                                    placeholder="299.00"
                                />
                                {errors.price && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.price.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-gray-400">Compare Price (Optional)</label>
                                <input
                                    {...register('comparePrice')}
                                    className="w-full bg-[#FAFAFA] rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all text-sm font-medium"
                                    placeholder="399.00"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-gray-400">Stock Availability</label>
                                <input
                                    {...register('stock')}
                                    type="number"
                                    className="w-full bg-[#FAFAFA] rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all text-sm font-medium"
                                    placeholder="100"
                                />
                                {errors.stock && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.stock.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold ml-1 text-gray-400">Botanical Category</label>
                                <select
                                    {...register('categoryId')}
                                    className="w-full bg-[#FAFAFA] rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all text-sm font-medium appearance-none"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                                {errors.categoryId && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.categoryId.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media Management */}
                <div className="space-y-8">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-sm space-y-8">
                        <h2 className="text-[12px] uppercase tracking-[0.3em] font-bold text-muted-foreground border-b border-gray-50 pb-4">Visual Gallery</h2>

                        <div className="space-y-6">
                            <div className="flex gap-2">
                                <input
                                    value={imageUrlInput}
                                    onChange={(e) => setImageUrlInput(e.target.value)}
                                    className="flex-1 bg-[#FAFAFA] rounded-2xl px-6 py-4 outline-none focus:bg-white focus:ring-1 focus:ring-black transition-all text-sm font-medium"
                                    placeholder="Unsplash Image URL"
                                />
                                <button
                                    type="button"
                                    onClick={addImageUrl}
                                    className="p-4 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all shadow-lg shadow-black/5"
                                >
                                    <ImageIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
                                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImageUrl(url)}
                                            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full text-red-600 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {errors.imageUrls && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1 ml-1">{errors.imageUrls.message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
