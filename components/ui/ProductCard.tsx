'use client'

import { motion } from 'framer-motion'
import { Star, ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/products'
import { Button } from './Button'

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-cream-dark group"
    >
      {product.badge && (
        <span className="absolute top-4 left-4 z-10 bg-gold text-white text-xs font-sans font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
          {product.badge}
        </span>
      )}

      {/* Product image placeholder */}
      <div className="h-64 bg-cream-dark flex items-center justify-center">
        <div className="w-32 h-32 rounded-full bg-green/10 flex items-center justify-center">
          <span className="font-serif text-green text-4xl italic">O</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-gold text-gold" />
          <span className="text-sm font-sans font-medium text-ink/70">
            {product.rating}
          </span>
        </div>

        <h3 className="font-serif text-xl text-ink mb-2">{product.name}</h3>
        <p className="text-sm text-ink/60 font-sans mb-4 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-serif text-2xl text-ink">
            £{product.price.toFixed(2)}
          </span>
          <Button size="sm" className="gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
