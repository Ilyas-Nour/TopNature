import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // 1. Create or Update Categories
    const categoryAccessories = await prisma.category.upsert({
        where: { slug: 'accessories' },
        update: {},
        create: {
            name: 'Accessories',
            slug: 'accessories',
        },
    })

    const categoryApparel = await prisma.category.upsert({
        where: { slug: 'apparel' },
        update: {},
        create: {
            name: 'Apparel',
            slug: 'apparel',
        },
    })

    const categoryElectronics = await prisma.category.upsert({
        where: { slug: 'electronics' },
        update: {},
        create: {
            name: 'Electronics',
            slug: 'electronics',
        },
    })

    console.log('Categories created or updated.')

    // 2. Create or Update Products
    const products = [
        {
            name: 'Minimalist Leather Backpack',
            slug: 'minimalist-leather-backpack',
            description: 'A sleek, durable leather backpack perfect for daily commutes or weekend getaways.',
            price: 899.00,
            comparePrice: 1099.00,
            stock: 50,
            imageUrls: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categoryAccessories.id,
        },
        {
            name: 'Wireless Noise-Canceling Earbuds',
            slug: 'wireless-noise-canceling-earbuds',
            description: 'Premium sound quality with active noise cancellation for immersive audio.',
            price: 1299.00,
            comparePrice: 1599.00,
            stock: 120,
            imageUrls: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categoryElectronics.id,
        },
        {
            name: 'Premium Cotton T-Shirt',
            slug: 'premium-cotton-t-shirt',
            description: 'Ultra-soft, heavyweight cotton t-shirt designed for maximum comfort and durability.',
            price: 249.00,
            comparePrice: null,
            stock: 200,
            imageUrls: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categoryApparel.id,
        },
        {
            name: 'Classic Stainless Steel Watch',
            slug: 'classic-stainless-steel-watch',
            description: 'An elegant timepiece featuring mechanical precision and a scratch-resistant sapphire face.',
            price: 1599.00,
            comparePrice: 1999.00,
            stock: 35,
            imageUrls: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categoryAccessories.id,
        },
        {
            name: 'Smart Home Hub Speaker',
            slug: 'smart-home-hub-speaker',
            description: 'Voice-controlled smart speaker with rich sound and robust home automation controls.',
            price: 849.00,
            comparePrice: 999.00,
            stock: 75,
            imageUrls: ['https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categoryElectronics.id,
        },
        {
            name: 'Ergonomic Desk Chair',
            slug: 'ergonomic-desk-chair',
            description: 'Fully adjustable ergonomic chair designed to support posture over long working hours.',
            price: 2199.00,
            comparePrice: 2499.00,
            stock: 15,
            imageUrls: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categoryAccessories.id, // For demo purposes grouping to accessories
        }
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: {},
            create: product,
        })
    }

    console.log('Products created or updated.')
    console.log('Seeding finished.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
