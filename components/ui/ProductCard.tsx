'use client'

import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { Product } from '@/lib/products'
import { Button } from './Button'
import { Tilt } from '@/components/effects/Tilt'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Tilt
      max={8}
      scale={1.03}
      className="glass-card relative rounded-2xl overflow-hidden group"
    >
      {product.badge && (
        <span className="absolute top-4 left-4 z-10 bg-gold text-white text-xs font-sans font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
          {product.badge}
        </span>
      )}

      {/* Product photo — transparent cutout on a soft white "stage" so the
          white bottle reads as solid against the glass (no hard rectangle). */}
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.92),rgba(255,255,255,0)_68%)]" />
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${product.image}`}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="relative object-contain p-4 drop-shadow-[0_14px_28px_rgba(28,28,26,0.22)] transition-transform duration-500 ease-out group-hover:scale-105"
        />
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
    </Tilt>
  )
}
