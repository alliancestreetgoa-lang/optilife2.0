import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Browse our full range of scientifically formulated vitamins and natural supplements.',
}

const trustBadges = [
  { title: '100% Natural', sub: 'Sourced from organic farms' },
  { title: 'Lab Tested', sub: 'Verified for purity & potency' },
  { title: 'Satisfaction Guarantee', sub: '30-day money back promise' },
]

export default function ShopPage() {
  return (
    <>
      <PageHero
        label="Premium Collection"
        title="Natural Wellness Solutions"
        subtitle="Scientifically formulated nutraceuticals designed to support your body's natural potential."
        dark
      />

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, i) => (
              <Reveal key={product.id} variant="zoom" delay={(i % 4) * 0.08}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-cream-dark pt-16">
            {trustBadges.map((badge, i) => (
              <Reveal key={badge.title} delay={i * 0.1} className="text-center">
                <h4 className="font-serif text-2xl text-ink mb-2">
                  {badge.title}
                </h4>
                <p className="font-sans text-sm text-ink/60">{badge.sub}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
