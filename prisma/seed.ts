import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seed: Building Minimalist Premium Database...')

  // Clean existing data
  try {
    await prisma.review.deleteMany({})
  } catch (e) {
    console.log('Review model might not exist yet, skipping...')
  }
  
  await prisma.orderItem.deleteMany({})
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})

  // 1. Categories (Simplified) - removed description as it is not in schema
  const energyCat = await prisma.category.create({
    data: { name: 'Energy', slug: 'energy' }
  })
  const sleepCat = await prisma.category.create({
    data: { name: 'Sleep', slug: 'sleep' }
  })
  const healthCat = await prisma.category.create({
    data: { name: 'Health', slug: 'health' }
  })

  // 2. Products (Verified Premium Essentials)
  const products = [
    {
      name: 'Pure Himalayan Shilajit',
      slug: 'pure-shilajit',
      price: 650,
      description: 'The highest quality authentic shilajit resin. Sustainably sourced from high altitudes to provide natural energy and mineral support.',
      imageUrls: ['https://images.unsplash.com/photo-1563203369-231a74e50d75?q=80&w=1200&auto=format&fit=crop'],
      categoryId: energyCat.id,
      highlights: ['Pure Resin Form', 'Natural Energy Boost', 'Mineral Rich'],
      benefits: 'Consistent Energy, Mental Clarity, Metabolic Support' // Benefits is String? in schema, not array
    },
    {
      name: 'Organic Ashwagandha',
      slug: 'organic-ashwagandha',
      price: 380,
      description: 'Premium organic ashwagandha extract. A simple and effective way to reduce daily stress and support hormonal balance.',
      imageUrls: ['https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=1200&auto=format&fit=crop'],
      categoryId: sleepCat.id,
      highlights: ['High Potency', 'Organic Certified', 'Calming Effect'],
      benefits: 'Stress Relief, Better Sleep, Hormonal Support'
    },
    {
      name: 'Magnesium Complex',
      slug: 'magnesium-complex',
      price: 420,
      description: 'A high-absorption magnesium blend for muscle recovery and deep, restful sleep.',
      imageUrls: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop'],
      categoryId: sleepCat.id,
      highlights: ['Tri-Magnesium Blend', 'Fast Absorption', 'Gentle on Stomach'],
      benefits: 'Muscle Recovery, Deep Sleep, Neural Calm'
    },
    {
      name: 'Vitamin D3 + K2',
      slug: 'vitamin-d3-k2',
      price: 290,
      description: 'The critical foundation for bone health and immune resilience. Pure and effective dosage.',
      imageUrls: ['https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=1200&auto=format&fit=crop'],
      categoryId: healthCat.id,
      highlights: ['Synergistic Formula', 'Olive Oil Base', 'Immune Support'],
      benefits: 'Bone Density, Immune Strength, Cardiovascular Support'
    },
    {
      name: 'Omega-3 Algal Oil',
      slug: 'omega-3-algal',
      price: 550,
      description: 'Vegan-friendly omega-3 sourced directly from algae. Pure brain and heart health without the fishy taste.',
      imageUrls: ['https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1200&auto=format&fit=crop'],
      categoryId: healthCat.id,
      highlights: ['Sustainable Algae Source', 'DHA & EPA Rich', 'No Fishy Taste'],
      benefits: 'Brain Health, Heart Function, Eye Support'
    },
    {
      name: 'L-Theanine Relax',
      slug: 'l-theanine-relax',
      price: 320,
      description: 'Natural amino acid found in green tea. Promotes relaxation without drowsiness.',
      imageUrls: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop'],
      categoryId: sleepCat.id,
      highlights: ['Pure Amino Acid', 'Focus Support', 'Non-Drowsy'],
      benefits: 'Anxiety Relief, Mental Focus, Stress Resilience'
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Seed: Minimalist Database Built Successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
