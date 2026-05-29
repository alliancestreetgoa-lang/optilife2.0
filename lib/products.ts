export interface Product {
  id: string
  name: string
  description: string
  price: number
  rating: number
  badge?: 'BESTSELLER' | 'TRENDING'
  slug: string
  /** Front-facing product photo (sourced from optilifewellbeing.co.uk). */
  image: string
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'multivitamin-minerals',
    name: 'Multivitamin & Minerals',
    description: 'Complete daily vitamin and mineral complex for whole-body health and vitality.',
    price: 28.99,
    rating: 4.9,
    badge: 'BESTSELLER',
    image: '/products/multivitamin.jpg',
  },
  {
    id: '2',
    slug: 'rosehip-2000mg',
    name: 'Rosehip 2000mg',
    description: 'High-strength Rosehip extract for joint health and natural Vitamin C support.',
    price: 26.99,
    rating: 4.9,
    image: '/products/rosehip.jpg',
  },
  {
    id: '3',
    slug: 'turmeric-400mg',
    name: 'Turmeric 400mg',
    description: 'Powerful antioxidant and anti-inflammatory support with Curcumin.',
    price: 28.99,
    rating: 4.9,
    image: '/products/turmeric.jpg',
  },
  {
    id: '4',
    slug: 'ashwagandha-1300mg',
    name: 'Ashwagandha 1300mg',
    description: 'Premium adaptogen to reduce stress, boost energy, and support mental clarity.',
    price: 29.99,
    rating: 4.9,
    badge: 'TRENDING',
    image: '/products/ashwagandha.jpg',
  },
]

export const featuredProducts = products.filter((p) =>
  ['1', '4'].includes(p.id)
)
