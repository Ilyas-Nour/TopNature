'use client'

import React from 'react'
import { Trash2 } from 'lucide-react'
import { deleteProduct } from '@/app/admin/products/actions'

interface DeleteProductButtonProps {
    productId: string
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
            return
        }

        setIsDeleting(true)
        const result = await deleteProduct(productId)

        if (!result.success) {
            alert(result.error || 'Failed to delete product')
            setIsDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`p-2 transition-colors ${isDeleting ? 'text-gray-300' : 'text-muted-foreground hover:text-red-600'}`}
        >
            <Trash2 className="w-4 h-4" strokeWidth={2} />
        </button>
    )
}
