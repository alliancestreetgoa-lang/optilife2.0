'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { featuredProducts } from '@/lib/products'
import { ProductCard } from '@/components/ui/ProductCard'

export function FeaturedProducts() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-serif text-5xl md:text-6xl text-green mb-2">
              Featured Collection
            </h2>
            <p className="font-sans text-ink/60">
              Our most popular solutions for your health.
            </p>
          </motion.div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 font-sans text-sm text-green hover:text-green-dark transition-colors"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/shop" className="inline-flex items-center gap-2 font-sans text-sm text-green">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
