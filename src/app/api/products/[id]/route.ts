import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params

    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true,
            },
        })

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 })
        }

        console.log('API returning product:', product.name, 'with highlights:', product.highlights)

        return NextResponse.json(product)
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
