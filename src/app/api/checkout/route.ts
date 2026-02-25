import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as z from 'zod'

// Server-side version of the exact Zod schema used on the frontend
const checkoutSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    address: z.string().min(5),
    city: z.string().min(2),
    paymentMethod: z.enum(['CASH_ON_DELIVERY', 'CMI', 'STRIPE']),
    // We explicitly require the cart items payload separately
    cartItems: z.array(z.object({
        id: z.string(),
        quantity: z.number().int().positive(),
    })).min(1, "Cart cannot be empty")
})

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // 1. Zod Re-validation (Never trust the client)
        const validatedData = checkoutSchema.parse(body)

        // 2. Fetch True Prices (Secure Calculation)
        // Extract product IDs sent by client
        const productIds = validatedData.cartItems.map(item => item.id)

        // Fetch REAL product details directly from the DB
        const realProducts = await prisma.product.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        })

        // Validate that ALL products in the cart actually exist in the DB still
        if (realProducts.length !== productIds.length) {
            return NextResponse.json(
                { error: 'One or more products in your cart are no longer available.' },
                { status: 400 }
            )
        }

        // Securely calculate the total amount using backend prices only
        let calculatedTotal = 0
        const orderItemsData = validatedData.cartItems.map(cartItem => {
            const realProduct = realProducts.find(p => p.id === cartItem.id)!

            // Calculate true line total
            calculatedTotal += (realProduct.price * cartItem.quantity)

            return {
                productId: realProduct.id,
                quantity: cartItem.quantity,
                priceAtOrder: realProduct.price // Lock in historical price
            }
        })

        // 3. Prisma Transaction (All or nothing persistence)
        const order = await prisma.$transaction(async (tx) => {
            // First create the parent Order
            const newOrder = await tx.order.create({
                data: {
                    totalAmount: calculatedTotal,
                    paymentMethod: validatedData.paymentMethod,
                    status: 'PENDING',
                    // Note: Add userId connection logic here if you add full NextAuth later
                }
            })

            // Add the OrderItems tied to the newOrder ID
            await tx.orderItem.createMany({
                data: orderItemsData.map(item => ({
                    ...item,
                    orderId: newOrder.id
                }))
            })

            return newOrder
        })

        console.log('--- SECURE BACKEND ORDER PERSISTED ---')
        console.log('Order ID:', order.id)
        console.log('Calculated Engine Total: MAD', calculatedTotal)

        // If Stripe/CMI is requested, you would generate the Payment Session URL here
        // and return it to the frontend to redirect the user.

        return NextResponse.json({
            success: true,
            orderId: order.id,
            message: 'Order created successfully'
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Invalid checkout data provided', details: error.issues }, { status: 400 })
        }
        console.error('Checkout API Error:', error)
        return NextResponse.json({ error: 'Internal server error processing checkout' }, { status: 500 })
    }
}
