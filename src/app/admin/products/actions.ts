'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

/**
 * CREATES a new product
 */
export async function createProduct(data: any) {
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                slug: data.slug || data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                description: data.description,
                price: parseFloat(data.price),
                comparePrice: data.comparePrice ? parseFloat(data.comparePrice) : null,
                stock: parseInt(data.stock),
                imageUrls: data.imageUrls,
                categoryId: data.categoryId,
            }
        })
        revalidatePath('/admin/products')
        revalidatePath('/shop')
        revalidatePath('/')
        return { success: true, product }
    } catch (error) {
        console.error('Failed to create product:', error)
        return { success: false, error: 'Failed to create product' }
    }
}

/**
 * UPDATES an existing product
 */
export async function updateProduct(productId: string, data: any) {
    try {
        const product = await prisma.product.update({
            where: { id: productId },
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                price: parseFloat(data.price),
                comparePrice: data.comparePrice ? parseFloat(data.comparePrice) : null,
                stock: parseInt(data.stock),
                imageUrls: data.imageUrls,
                categoryId: data.categoryId,
            }
        })
        revalidatePath('/admin/products')
        revalidatePath(`/product/${product.id}`)
        revalidatePath('/shop')
        revalidatePath('/')
        return { success: true, product }
    } catch (error) {
        console.error('Failed to update product:', error)
        return { success: false, error: 'Failed to update product' }
    }
}

/**
 * DELETES a product from the database
 */
export async function deleteProduct(productId: string) {
    try {
        await prisma.product.delete({
            where: { id: productId }
        })
        revalidatePath('/admin/products')
        revalidatePath('/shop')
        revalidatePath('/')
        return { success: true }
    } catch (error) {
        console.error('Failed to delete product:', error)
        return { success: false, error: 'Failed to delete product' }
    }
}
