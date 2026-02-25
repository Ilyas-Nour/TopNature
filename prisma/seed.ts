import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Start seeding...')

    // 1. Create or Update Categories
    const categorySerums = await prisma.category.upsert({
        where: { slug: 'botanical-serums' },
        update: {},
        create: {
            name: 'Botanical Serums',
            slug: 'botanical-serums',
        },
    })

    const categoryOils = await prisma.category.upsert({
        where: { slug: 'essential-oils' },
        update: {},
        create: {
            name: 'Essential Oils',
            slug: 'essential-oils',
        },
    })

    const categorySkincare = await prisma.category.upsert({
        where: { slug: 'organic-skincare' },
        update: {},
        create: {
            name: 'Organic Skincare',
            slug: 'organic-skincare',
        },
    })

    console.log('Categories created or updated.')

    // 2. Create or Update Products
    const products = [
        {
            name: 'Radiance Botanical Serum',
            slug: 'radiance-botanical-serum',
            description: 'A potent blend of organic botanicals designed to restore your skin\'s natural luminosity and youth. Formulated with rare plant extracts, this serum sinks instantly into the deeper layers of the epidermis.',
            price: 650.00,
            comparePrice: 850.00,
            stock: 45,
            imageUrls: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categorySerums.id,
        },
        {
            name: 'Wildcrafted Rosehip Oil',
            slug: 'wildcrafted-rosehip-oil',
            description: 'Cold-pressed from wild rose bushes, this rich amber oil delivers intense hydration and cellular repair. Naturally packed with Vitamin A and Omega fatty acids.',
            price: 480.00,
            comparePrice: null,
            stock: 120,
            imageUrls: ['https://images.unsplash.com/photo-1608248593802-8401a6136e4f?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categoryOils.id,
        },
        {
            name: 'Purifying Clay Mask',
            slug: 'purifying-clay-mask',
            description: 'Mineral-rich bentonite clay combined with soothing herbs to deeply cleanse without drying. Acts as a magnetic pull for impurities and environmental toxins.',
            price: 320.00,
            comparePrice: 400.00,
            stock: 80,
            imageUrls: ['https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categorySkincare.id,
        },
        {
            name: 'Hydrating Aloe Mist',
            slug: 'hydrating-aloe-mist',
            description: 'A refreshing, ultra-fine mist of pure aloe water and chamomile to calm and set the skin. Perfect as a midday refresh or a post-cleansing toner.',
            price: 250.00,
            comparePrice: null,
            stock: 200,
            imageUrls: ['https://images.unsplash.com/photo-1615397323281-9b16ea9fb1ff?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categorySkincare.id,
        },
        {
            name: 'Vitamin C Brightening Drops',
            slug: 'vitamin-c-brightening-drops',
            description: 'Stabilized Vitamin C infused with Kakadu plum extract to actively target hyperpigmentation and dullness, revealing an unbelievably vibrant complexion.',
            price: 720.00,
            comparePrice: 890.00,
            stock: 35,
            imageUrls: ['https://images.unsplash.com/photo-1601049541289-9b1b7bf22d4b?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categorySerums.id,
        },
        {
            name: 'Night Repair Elixir',
            slug: 'night-repair-elixir',
            description: 'A dense, nutrient-rich oil that works alongside your circadian rhythm to heal the moisture barrier overnight. Wake up to plump, completely restored skin.',
            price: 890.00,
            comparePrice: 1100.00,
            stock: 25,
            imageUrls: ['https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1000&auto=format&fit=crop'],
            categoryId: categoryOils.id,
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
