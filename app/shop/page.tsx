import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { ProductCard } from '@/components/ui/ProductCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Browse our full range of scientifically formulated vitamins and natural supplements.',
}

export default function ShopPage() {
  return (
    <>
      <PageHero
        label="SHOP · 4 CLEAN FORMULAS"
        title="Every formula. Nothing else."
        subtitle="Four scientifically formulated supplements — clean labels, clinical doses, made in the UK. That's the whole range, on purpose."
      />

      <Section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} variant="zoom" delay={i * 0.12}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

      </Section>
    </>
  )
}
