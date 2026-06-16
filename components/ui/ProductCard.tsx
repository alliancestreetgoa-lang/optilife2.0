'use client'

import Image from 'next/image'
import { Star, Plus } from 'lucide-react'
import { Product } from '@/lib/products'
import { Badge } from './Badge'
import { Card } from './Card'
import { Button } from './Button'
import { useCart } from '@/lib/cart'

export function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart()
  return (
    <Card className="group relative flex flex-col overflow-hidden">
      {product.badge && (
        <Badge tone="solid" className="absolute left-4 top-4 z-10">
          {product.badge}
        </Badge>
      )}

      {/* Product photo on the faint-sage panel */}
      <div className="relative h-64 bg-surface-alt">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${product.image}?v=5`}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 ease-snappy [@media(hover:hover)]:group-hover:scale-[1.04]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-1.5 font-mono text-xs text-ink-soft">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          {product.rating.toFixed(1)}
        </div>

        <h3 className="mb-1.5 text-lg font-semibold text-ink">{product.name}</h3>
        <p className="mb-5 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="font-mono text-lg text-ink">
            £{product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => {
              addItem(product)
              openCart()
            }}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  )
}
