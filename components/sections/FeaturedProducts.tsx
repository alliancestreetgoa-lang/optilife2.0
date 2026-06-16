import { featuredProducts } from '@/lib/products'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ProductCard } from '@/components/ui/ProductCard'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export function FeaturedProducts() {
  return (
    <Section tone="alt">
      <SectionHeading
        eyebrow="The Formulas"
        title="Our most trusted formulas"
        lede="Customer favourites, formulated in the UK and tested by independent labs."
      />

      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
        {featuredProducts.map((product, i) => (
          <Reveal key={product.id} variant="zoom" delay={i * 0.12} className="h-full">
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.16} className="mt-12 text-center">
        <Button variant="outline" href="/shop">
          View All Products
        </Button>
      </Reveal>
    </Section>
  )
}
