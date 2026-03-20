const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

async function main() {
    console.log('Cleaning up database...')
    await prisma.orderItem.deleteMany({})
    await prisma.order.deleteMany({})
    await prisma.product.deleteMany({})
    await prisma.category.deleteMany({})

    console.log('Seeding categories...')
    // Categories
    const categories = [
        { name: 'Energy', description: 'Natural performance and clarity.' },
        { name: 'Sleep', description: 'Deep recovery and restorative rest.' },
        { name: 'Mind', description: 'Cognitive enhancement and focus.' },
        { name: 'Immunity', description: 'Core strength and resilience.' },
        { name: 'Longevity', description: 'Vitality for the long term.' }
    ]

    const createdCategories = await Promise.all(
        categories.map(cat => prisma.category.create({ 
            data: { 
                name: cat.name, 
                slug: slugify(cat.name) 
            } 
        }))
    )

    const catMap = Object.fromEntries(createdCategories.map(c => [c.name, c.id]))

    console.log('Seeding products...')
    // Products (20+ Real Items)
    const products = [
        // ENERGY
        {
            name: 'Pure Himalayan Shilajit',
            slug: 'pure-himalayan-shilajit',
            description: 'The "Destroyer of Weakness". A potent mineral resin known for boosting cellular energy and testosterone naturally.',
            price: 650,
            imageUrls: ['https://images.unsplash.com/photo-1563203369-231a74e50d75?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Energy'],
            benefits: 'Increases ATP production, improves absorption of other nutrients, and contains 85+ minerals.',
            usage: 'Dissolve a pea-sized amount in warm water or milk in the morning.',
            sourcing: 'Hand-collected from the high Himalayas at over 16,000 feet.',
            highlights: ['Mineral Rich', 'Testosterone Support', 'Energy Boost'],
            stock: 50
        },
        {
            name: 'Organic Red Maca',
            slug: 'organic-red-maca',
            description: 'Gelatinized for peak absorption. Specifically chosen for hormonal balance and sustained physical stamina.',
            price: 280,
            imageUrls: ['https://images.unsplash.com/photo-1588615419958-4bc2792e85a1?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Energy'],
            benefits: 'Supports hormonal balance, libido, and endurance.',
            usage: 'Mix 1-2 teaspoons into smoothies or breakfast bowls.',
            sourcing: 'Junin region of the Peruvian Andes.',
            highlights: ['Hormone Balance', 'Endurance', 'Organic'],
            stock: 100
        },
        {
            name: 'Cordyceps Militaris',
            slug: 'cordyceps-militaris',
            description: 'Professional grade mushroom extract for oxygen uptake and cardiovascular performance.',
            price: 450,
            imageUrls: ['https://images.unsplash.com/photo-1627933603052-a55858df2042?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Energy'],
            benefits: 'Improves oxygen utilization and reduces fatigue.',
            usage: '2 capsules daily before physical activity.',
            highlights: ['VO2 Max', 'Lung Support', 'Adaptogen'],
            stock: 75
        },

        // SLEEP
        {
            name: 'Organic Ashwagandha KSM-66',
            slug: 'organic-ashwagandha-ksm-66',
            description: 'The highest concentration full-spectrum root extract. Clinically proven to reduce cortisol and improve sleep quality.',
            price: 350,
            imageUrls: ['https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Sleep'],
            benefits: 'Reduces stress, lowers cortisol, and promotes deep REM sleep.',
            usage: 'Take 2 capsules 1 hour before bedtime.',
            sourcing: 'Certified organic farms in Rajasthan, India.',
            highlights: ['Cortisol Control', 'Stress Relief', 'Full Spectrum'],
            stock: 120
        },
        {
            name: 'Magnesium Bisglycinate',
            slug: 'magnesium-bisglycinate',
            description: 'The most bioavailable form of magnesium for muscle relaxation and neural calm.',
            price: 320,
            imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Sleep'],
            benefits: 'Calms the nervous system and prevents muscle cramps.',
            usage: 'Take 2-3 capsules in the evening.',
            highlights: ['Muscle Recovery', 'Neural Calm', 'Chelated'],
            stock: 150
        },
        {
            name: 'L-Theanine Relax',
            slug: 'l-theanine-relax',
            description: 'Pure amino acid found in green tea, promoting relaxation without drowsiness.',
            price: 260,
            imageUrls: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Sleep'],
            benefits: 'Reduces anxiety and improves focus when paired with caffeine.',
            usage: 'Take 1 capsule as needed for relaxation.',
            highlights: ['Anxiety Relief', 'Relaxation', 'No Drowsiness'],
            stock: 180
        },

        // MIND
        {
            name: 'Lions Mane Extract',
            slug: 'lions-mane-extract',
            description: 'Double-extracted fruiting body. The brain-boosting mushroom for Nerve Growth Factor (NGF) support.',
            price: 480,
            imageUrls: ['https://images.unsplash.com/photo-1628243344914-6c5513d07243?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Mind'],
            benefits: 'Enhances cognitive function, memory, and nerve health.',
            usage: 'Mix 1/2 teaspoon into coffee or tea daily.',
            highlights: ['Focus', 'Neurogenesis', 'Dual Extract'],
            stock: 80
        },
        {
            name: 'Bacopa Monnieri',
            slug: 'bacopa-monnieri',
            description: 'Ancient Ayurvedic herb for memory enhancement and cognitive longevity.',
            price: 310,
            imageUrls: ['https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Mind'],
            benefits: 'Improves memory retention and reduces cognitive decline.',
            usage: '1 capsule daily with food.',
            highlights: ['Memory', 'Cognitive Health', 'Ayurvedic'],
            stock: 110
        },
        {
            name: 'Ginkgo Biloba Gold',
            slug: 'ginkgo-biloba-gold',
            description: 'Standardized extract of the oldest living tree species for cerebral circulation.',
            price: 290,
            imageUrls: ['https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Mind'],
            benefits: 'Increases blood flow to the brain and protects against oxidative stress.',
            usage: '1 capsule daily.',
            highlights: ['Circulation', 'Mental Clarity', 'Pure Extract'],
            stock: 140
        },

        // IMMUNITY
        {
            name: 'Seamoss Gel (Gold)',
            slug: 'seamoss-gel-gold',
            description: 'Wildcrafted St. Lucian Sea Moss. Contains 92 of the 102 minerals the body needs.',
            price: 350,
            imageUrls: ['https://images.unsplash.com/photo-1620916297397-a4a54c1dc030?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Immunity'],
            benefits: 'Boosts thyroid function, clarifies skin, and strengthens immunity.',
            usage: 'Take 1-2 tablespoons daily.',
            highlights: ['92 Minerals', 'Wildcrafted', 'Immune Defense'],
            stock: 60
        },
        {
            name: 'Elderberry Complex',
            slug: 'elderberry-complex',
            description: 'Rich in Vitamin C and antioxidants for proactive immune support.',
            price: 330,
            imageUrls: ['https://images.unsplash.com/photo-1531171753705-045330f87893?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Immunity'],
            benefits: 'Protects against seasonal illnesses and shortens recovery time.',
            usage: '1 tablespoon daily during winter months.',
            highlights: ['Vitamin C', 'Antioxidant', 'Antiviral'],
            stock: 90
        },
        {
            name: 'Zinc Picolinate',
            slug: 'zinc-picolinate',
            description: 'Highly absorbable zinc for cellular health and immune signaling.',
            price: 180,
            imageUrls: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Immunity'],
            benefits: 'Essential for immune cell function and wound healing.',
            usage: '1 capsule daily.',
            highlights: ['High Absorption', 'Cellular Health', 'Immune Support'],
            stock: 200
        },

        // LONGEVITY
        {
            name: 'Resveratrol 98%',
            slug: 'resveratrol-98',
            description: 'The molecule of longevity. Activates sirtuin genes for anti-aging and heart health.',
            price: 750,
            imageUrls: ['https://images.unsplash.com/photo-1474978528675-4a50a4508dc3?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Longevity'],
            benefits: 'Mimics the effects of calorie restriction and protects DNA.',
            usage: 'Take 1 capsule daily with a source of fat.',
            highlights: ['Anti-Aging', 'Cardiovascular', 'High Purity'],
            stock: 40
        },
        {
            name: 'NMN Platinum',
            slug: 'nmn-platinum',
            description: 'Direct NAD+ precursor for cellular repair and metabolic health.',
            price: 1200,
            imageUrls: ['https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Longevity'],
            benefits: 'Reverses biological markers of aging and restores energy.',
            usage: 'Take 500mg sublingually every morning.',
            highlights: ['NAD+ Booster', 'DNA Repair', 'Metabolism'],
            stock: 30
        },
        {
            name: 'Curcumin C3 Complex',
            slug: 'curcumin-c3-complex',
            description: 'The world\'s most clinically studied turmeric extract with BioPerine for 2000% better absorption.',
            price: 390,
            imageUrls: ['https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Longevity'],
            benefits: 'Powerful anti-inflammatory and joint health support.',
            usage: '2 capsules daily.',
            highlights: ['Anti-Inflammatory', 'Joint Health', 'High Bioavailability'],
            stock: 130
        },

        // MORE ITEMS TO REACH 20+
        {
            name: 'Holy Basil (Tulsi)',
            slug: 'holy-basil-tulsi',
            description: 'The "Incomparable One". A premier adaptogen for mental stress and respiratory health.',
            price: 240,
            imageUrls: ['https://images.unsplash.com/photo-1627933603052-a55858df2042?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Mind'],
            benefits: 'Eases anxiety and supports clear breathing.',
            usage: 'Steep as tea or take 1 capsule.',
            highlights: ['Stress Recovery', 'Spiritual Clarity', 'Organic'],
            stock: 100
        },
        {
            name: 'Reishi Mushroom',
            slug: 'reishi-mushroom',
            description: 'The "Mushroom of Immortality". A powerful modulator of the immune system and spirit.',
            price: 420,
            imageUrls: ['https://images.unsplash.com/photo-1621574538883-9e403d166298?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Sleep'],
            benefits: 'Induces calm and fortifies immune pathways.',
            usage: 'Take in the evening for relaxation.',
            highlights: ['Meditation Support', 'Immune Balance', 'Premium'],
            stock: 70
        },
        {
            name: 'Vitamin D3 + K2',
            slug: 'vitamin-d3-k2',
            description: 'The indispensable duo for bone density and cardiovascular integrity.',
            price: 220,
            imageUrls: ['https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Immunity'],
            benefits: 'Essential for calcium absorption and heart health.',
            usage: '1 drop or capsule daily with food.',
            highlights: ['Liquid Gold', 'Bone Health', 'Essential'],
            stock: 300
        },
        {
            name: 'Triphala Cleanse',
            slug: 'triphala-cleanse',
            description: 'The classic Ayurvedic formula for digestive rejuvenation and detoxification.',
            price: 270,
            imageUrls: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Longevity'],
            benefits: 'Gentle colon cleanse and efficient digestion.',
            usage: '2 capsules before bed.',
            highlights: ['Detox', 'Digestive Aid', 'Ancient Wisdom'],
            stock: 160
        },
        {
            name: 'Omega-3 Algal Oil',
            slug: 'omega-3-algal-oil',
            description: 'Plant-based DHA & EPA. Sustainable, mercury-free, and vital for heart and brain.',
            price: 520,
            imageUrls: ['https://images.unsplash.com/photo-1563203369-231a74e50d75?q=80&w=1200&auto=format&fit=crop'],
            categoryId: catMap['Mind'],
            benefits: 'Brain health without the fishy aftertaste.',
            usage: '2 softgels daily.',
            highlights: ['Vegan', 'Heart Health', 'Mercury Free'],
            stock: 95
        }
    ]

    for (const prod of products) {
        await prisma.product.create({ data: prod })
    }

    console.log('Seed completed successfully!')
    process.exit(0)
}

main().catch(err => {
    console.error(err)
    process.exit(1)
})
