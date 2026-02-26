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

    // 2. Wipe Existing Data (Fresh Expansion)
    await prisma.orderItem.deleteMany({})
    await prisma.product.deleteMany({})
    await prisma.category.deleteMany({})

    console.log('Database cleared for expansion.')

    // 3. Create Categories
    const categories = {
        adaptogens: await prisma.category.create({ data: { name: 'Adaptogens', slug: 'adaptogens' } }),
        performance: await prisma.category.create({ data: { name: 'Performance', slug: 'performance' } }),
        nootropics: await prisma.category.create({ data: { name: 'Nootropics', slug: 'nootropics' } }),
        wellness: await prisma.category.create({ data: { name: 'Wellness', slug: 'wellness' } }),
        recovery: await prisma.category.create({ data: { name: 'Recovery', slug: 'recovery' } }),
        essential: await prisma.category.create({ data: { name: 'Essential', slug: 'essential' } }),
        ritual: await prisma.category.create({ data: { name: 'Ritual', slug: 'ritual' } }),
    }

    // 4. Create 20 Flagship Products
    const products = [
        {
            name: 'Himalayan Shilajit Resin',
            slug: 'himalayan-shilajit-resin',
            description: 'Pure, gold-grade Himalayan Shilajit resin. A powerful mineral-rich substance harvested from the peaks of the Himalayas.',
            price: 750.00,
            stock: 50,
            imageUrls: [
                'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.adaptogens.id,
            benefits: 'Optimizes ATP production at a cellular level, enhancing raw physical energy and stamina. Contains 80+ trace minerals.',
            usage: 'Dissolve a pea-sized amount in warm water or tea. Consume on an empty stomach first thing in the morning.',
            sourcing: 'Wild-harvested at 16,000+ feet altitude in the Himalayan Mountains. Purified through ancient traditional methods.',
            highlights: ['85+ Trace Minerals', 'Gold-Grade Purity', '3rd-Party Lab Tested', 'Vegan & Gluten-Free']
        },
        {
            name: 'KSM-66 Ashwagandha Root',
            slug: 'ashwagandha-ksm-66',
            description: 'The world\'s highest concentration, full-spectrum Ashwagandha root extract.',
            price: 420.00,
            stock: 150,
            imageUrls: [
                'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.adaptogens.id,
            benefits: 'Regulates the endocrine system to manage cortisol levels, effectively reducing perceived stress and anxiety.',
            usage: 'Take one 600mg capsule daily, preferably with a meal for optimal absorption.',
            sourcing: 'Produced using a first-of-its-kind "Green Chemistry" process without using alcohol or chemical solvents.',
            highlights: ['14 Clinically Proven Benefits', 'Cortisol Balance', 'High-Bioavailability', 'Organic Root Only']
        },
        {
            name: 'Tongkat Ali Extract 200:1',
            slug: 'tongkat-ali-200-1',
            description: 'Pure Eurycoma Longifolia extract for peak vitality and hormonal balance.',
            price: 680.00,
            stock: 85,
            imageUrls: [
                'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.performance.id,
            benefits: 'naturally boosts free testosterone levels by releasing it from Sex Hormone Binding Globulin (SHBG).',
            usage: 'Take 400-600mg daily. Cycle: 5 days on, 2 days off for peak efficacy.',
            sourcing: 'Ethically wild-harvested from the deep rainforests of Malaysia. Standardized via long-duration decoction.',
            highlights: ['Vanish Fatigue', 'Hormonal Support', 'Peak Performance', 'No Fillers or Additives']
        },
        {
            name: 'Lion\'s Mane Mushroom',
            slug: 'lions-mane-extract',
            description: 'Dual-extracted Hericium erinaceus for cognitive longevity and focus.',
            price: 490.00,
            stock: 120,
            imageUrls: [
                'https://images.unsplash.com/photo-1610476023249-183660a92d47?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1601704289839-84724a30e84b?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.nootropics.id,
            benefits: 'Stimulates Nerve Growth Factor (NGF) production, supporting the growth and repair of neurons.',
            usage: 'Add half a teaspoon to coffee or smoothies. Use daily to experience cumulative cognitive clearing.',
            sourcing: 'Cultivated on organic hardwood logs in controlled environments. 100% Fruiting body only.',
            highlights: ['NGF Stimulation', 'Memory Protocol', 'Focus Enhancer', 'Dual-Extracted']
        },
        {
            name: 'Cordyceps Sinensis',
            slug: 'cordyceps-sinensis-cs4',
            description: 'Highly potent CS-4 strain extract for cellular energy and oxygenation.',
            price: 520.00,
            stock: 90,
            imageUrls: [
                'https://images.unsplash.com/photo-1599307133748-03fd7a922645?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1628551670600-47963d803673?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.performance.id,
            benefits: 'Improves oxygen utilization (VO2 Max) and enhances ATP synthesis for natural athletic endurance.',
            usage: 'Take 1000mg approx. 45 minutes prior to physical activity or intense output.',
            sourcing: 'Fermented CS-4 strain that perfectly mimics the chemical profile of wild Himalayan Cordyceps.',
            highlights: ['Endurance Boost', 'Oxygen Efficiency', 'Cellular Energy', 'Non-Stimulant']
        },
        {
            name: 'Reishi Immortality Extract',
            slug: 'reishi-immortality-extract',
            description: 'Known as the "Mushroom of Immortality", this Ganoderma lucidum extract supports immune resilience.',
            price: 450.00,
            stock: 110,
            imageUrls: [
                'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.recovery.id,
            benefits: 'Acts as a master immunomodulator, balancing the immune system and promoting deep, restorative sleep.',
            usage: 'Best consumed in the evening. Dissolve in hot water for a calming nightly ritual.',
            sourcing: 'Sourced from the "Duan Wood" Reishi farms in the high-altitude forests of China.',
            highlights: ['Immune Modulator', 'Sleep Support', 'Stress Resilience', 'Spirit Tonic']
        },
        {
            name: 'Marine Collagen Peptides',
            slug: 'marine-collagen-peptides',
            description: 'Type I Collagen sourced from wild-caught deep sea fish for skin, hair, and nail renewal.',
            price: 580.00,
            stock: 180,
            imageUrls: [
                'https://images.unsplash.com/photo-1620916297397-a4a54201c80c?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1550577624-42c71fad637c?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.wellness.id,
            benefits: 'High bioavailability collagen peptides that restore skin elasticity and strengthen the moisture barrier.',
            usage: 'Mix 1-2 scoops into any beverage. Neutral taste and odorless for seamless integration.',
            sourcing: 'Sustainability certified, wild-caught white fish from the North Atlantic.',
            highlights: ['Skin Elasticity', '95% Bioavailable', 'Hair & Nail Health', 'Zero Trace Heavy Metals']
        },
        {
            name: 'Magnesium Glycinate Gold',
            slug: 'magnesium-glycinate-gold',
            description: 'The most bioavailable form of Magnesium, bound to glycine for deep neurological relaxation.',
            price: 290.00,
            stock: 250,
            imageUrls: [
                'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.recovery.id,
            benefits: 'Supports over 300 enzymatic reactions, promoting muscle recovery and calming the nervous system.',
            usage: 'Take 2 capsules before bed to enhance sleep architecture and prevent muscle cramping.',
            sourcing: 'Synthesized in small batches to ensure 100% chelation and zero gastrointestinal distress.',
            highlights: ['Deep Sleep Aid', 'Muscle Recovery', 'Calm Focus', 'No Fillers']
        },
        {
            name: 'Vitamin D3 + K2 (MK7)',
            slug: 'vitamin-d3-k2-mk7',
            description: 'The ultimate synergy for bone health and immune performance in MCT oil base.',
            price: 350.00,
            stock: 300,
            imageUrls: [
                'https://images.unsplash.com/photo-1616671285410-6453f65eabbd?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1615485500704-8e990f3900f1?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.essential.id,
            benefits: 'Ensures calcium is deposited in the bones and teeth rather than soft tissues or arteries.',
            usage: '1 drop daily under the tongue or with a fat-rich meal for maximum absorption.',
            sourcing: 'D3 sourced from organic Lanolin; K2 extracted from non-GMO fermented Natto.',
            highlights: ['Immune Support', 'Bone Density', 'Arterial Health', 'MCT Oil Base']
        },
        {
            name: 'Omega-3 Algal Oil',
            slug: 'omega-3-algal-oil',
            description: 'Pure DHA and EPA sourced directly from marine algae. A vegan alternative to fish oil.',
            price: 480.00,
            stock: 140,
            imageUrls: [
                'https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1512290923902-8a9f81da236c?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.essential.id,
            benefits: 'Critical for neurological development, cardiovascular health, and reducing systemic inflammation.',
            usage: 'Take 2 softgels daily with your largest meal. Keep refrigerated to preserve potency.',
            sourcing: 'Micro-algae cultivated in a closed-loop, sustainable system free from ocean pollutants.',
            highlights: ['Vegan DHA/EPA', 'Brain Performance', 'Heart Health', 'Sustainable Sourcing']
        },
        {
            name: 'Ceremonial Grade Matcha',
            slug: 'ceremonial-grade-matcha',
            description: 'First-harvest Tencha leaves stone-ground into a vibrant, emerald-green powder.',
            price: 550.00,
            stock: 75,
            imageUrls: [
                'https://images.unsplash.com/photo-1582733315330-de1964954bd8?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.ritual.id,
            benefits: 'Contains high concentrations of L-Theanine and EGCG for "Jitter-free" energy and focus.',
            usage: 'Whisk 1.5g into 70°C water until frothy. Perfect for morning cognitive activation.',
            sourcing: 'Grown under shade for 3 weeks prior to harvest in the Uji region of Japan.',
            highlights: ['Antioxidant Rich', 'L-Theanine Energy', 'First Harvest', 'Artisan Ground']
        },
        {
            name: 'Blue Spirulina Extract',
            slug: 'blue-spirulina-extract',
            description: 'Pure Phycocyanin extracted from organic spirulina. A massive anti-oxidant powerhouse.',
            price: 420.00,
            stock: 160,
            imageUrls: [
                'https://images.unsplash.com/photo-1617419131977-628d3bd409e5?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1544161515-4af6b1d4640b?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.wellness.id,
            benefits: 'High-density protein and antioxidant profile that supports cellular detoxification.',
            usage: 'Add a small scoop to water, juice, or bowls. Turns any beverage into a vibrant blue tonic.',
            sourcing: 'Harvested from pristine, high-alkaline inland lakes using low-temperature extraction.',
            highlights: ['Phycocyanin Rich', 'Detox Support', 'Vibrant Nutrient', 'Odorless Powder']
        },
        {
            name: 'Pine Pollen Cell-Wall Broken',
            slug: 'pine-pollen-gold',
            description: 'Wild-harvested pine pollen with cracked cell walls for 99% nutrient bioavailability.',
            price: 590.00,
            stock: 60,
            imageUrls: [
                'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1611080626919-7cf5a9cdab5b?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.performance.id,
            benefits: 'A natural "superfood" containing Phyto-Androgens to support strength and hormonal health.',
            usage: 'Consume 1-2 teaspoons daily. For hormonal support, hold under the tongue for sublingual absorption.',
            sourcing: 'Harvested by hand from Pinus massoniana trees in high-altitude mountain ranges.',
            highlights: ['Phyto-Androgens', 'Nutrient Dense', 'Cell-Wall Broken', 'Wild Harvested']
        },
        {
            name: 'Bacopa Monnieri 50%',
            slug: 'bacopa-monnieri',
            description: 'The premier Ayurvedic herb for cognitive clarity and memory retention.',
            price: 380.00,
            stock: 130,
            imageUrls: [
                'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1615485245452-1193355d4218?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.nootropics.id,
            benefits: 'Increases the rate at which the nervous system can communicate by optimizing synapse repair.',
            usage: 'Take 300mg daily. Use consistently for 6-12 weeks to experience full memory-enhancing effects.',
            sourcing: 'Traditional organic farming in the wetland regions of India, standardized to 50% Bacosides.',
            highlights: ['Synaptic Speed', 'Memory Recall', 'Focus Tonic', 'Ayurvedic Root']
        },
        {
            name: 'Boswellia Serrata Gold',
            slug: 'boswellia-serrata',
            description: 'Frankincense extract with high concentrations of Boswellic acids for joint comfort.',
            price: 460.00,
            stock: 100,
            imageUrls: [
                'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.recovery.id,
            benefits: 'Powerful anti-inflammatory that inhibits the 5-LOX enzyme, supporting joint and gut health.',
            usage: 'Take one 500mg capsule with a fat-rich meal to increase absorption of bioactive acids.',
            sourcing: 'Ethically tapped resin from wild Boswellia trees in the arid regions of India and Africa.',
            highlights: ['Anti-Inflammatory', 'Joint Mobility', 'Gut Health', 'Pure Resin']
        },
        {
            name: 'Rhodiola Rosea (Siberian)',
            slug: 'rhodiola-rosea-siberian',
            description: 'Potent Siberian adaptogen for mental resilience and physical stamina.',
            price: 390.00,
            stock: 140,
            imageUrls: [
                'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.adaptogens.id,
            benefits: 'Fights fatigue and burnout by balancing the central nervous system under extreme stress.',
            usage: 'Consume 200-400mg in the morning. Best used during periods of high mental or physical demand.',
            sourcing: 'Wild-harvested in the Altai mountains of Siberia, standardized to 3% Rosavins.',
            highlights: ['Mental Resilience', 'Burnout Recovery', 'Siberian Gold', 'Pure Extract']
        },
        {
            name: 'Schisandra Berry Extract',
            slug: 'schisandra-berry-extract',
            description: 'The "Five-Flavor Fruit" known for full-body adaptogenic support.',
            price: 410.00,
            stock: 120,
            imageUrls: [
                'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.adaptogens.id,
            benefits: 'Supports liver detoxification and enhances mental clarity while calming the mind.',
            usage: 'Mix into water or smoothies. It provides a unique sour-sweet-salty-spicy flavor profile.',
            sourcing: 'Organic Schisandra chinensis berries sourced from the remote forests of North China.',
            highlights: ['Liver Support', 'Detoxifying', 'Full-Body Tonic', 'Organic Berry']
        },
        {
            name: 'Holy Basil (Tulsi)',
            slug: 'holy-basil-tulsi',
            description: 'The most sacred herb in India, promoting spiritual clarity and adrenal health.',
            price: 320.00,
            stock: 200,
            imageUrls: [
                'https://images.unsplash.com/photo-1615485523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.ritual.id,
            benefits: 'Reduces metabolic stress and supports balanced blood sugar and cortisol levels.',
            usage: 'Enjoy as a tea or take in capsule form. Ideal for evening wind-down rituals.',
            sourcing: 'Grown in dedicated organic Tulsi farms in the Himalayan foothills.',
            highlights: ['Adrenal Health', 'Cortisol Balance', 'Sacred Ritual', 'Organic Leaf']
        },
        {
            name: 'Organic Guggul Extract',
            slug: 'organic-guggul-extract',
            description: 'Commiphora mukul resin for lipid metabolism and weight management.',
            price: 440.00,
            stock: 110,
            imageUrls: [
                'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1611080626919-7cf5a9cdab5b?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.wellness.id,
            benefits: 'Supports healthy cholesterol levels and boosts the body\'s natural metabolism.',
            usage: 'Take 500mg twice daily with meals. Best used as part of a balanced metabolic protocol.',
            sourcing: 'Purified gum guggul resin sourced from the semi-arid regions of central India.',
            highlights: ['Metabolic Support', 'Lipid Balance', 'Purified Resin', 'Ayurvedic Power']
        },
        {
            name: 'Triphala Compound',
            slug: 'triphala-compound',
            description: 'The legendary "Three Fruits" formula for colon health and internal cleansing.',
            price: 280.00,
            stock: 220,
            imageUrls: [
                'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800&auto=format&fit=crop'
            ],
            categoryId: categories.wellness.id,
            benefits: 'A gentle, non-habit-forming internal cleanser that restores digestive rhythm and absorption.',
            usage: 'Take 2-3 capsules before bed with warm water to support overnight detoxification.',
            sourcing: 'A synergistic blend of Amalaki, Bibhitaki, and Haritaki fruits from organic sources.',
            highlights: ['Digestive Harmony', 'Gentle Cleanse', 'Antioxidant Rich', 'Traditional Formula']
        }
    ]

    for (const product of products) {
        await prisma.product.create({
            data: product
        })
    }

    console.log('Massive expansion: 20 flagship products seeded.')
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
