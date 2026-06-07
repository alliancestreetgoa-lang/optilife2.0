'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CornerMarks } from '@/components/ui/CornerMarks'
import { products } from '@/lib/products'

const EASE = [0.22, 1, 0.36, 1] as const
const ROTATE_MS = 3200

export function Hero() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  // Auto-cycle through all products on the halo.
  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % products.length),
      ROTATE_MS
    )
    return () => clearInterval(id)
  }, [])

  const product = products[active]

  const fadeUp = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: EASE },
  })

  return (
    <section className="relative bg-surface">
      {/* Lab-notebook grid, dissolving toward the fold */}
      <div
        aria-hidden
        className="graph-paper absolute inset-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_92%)]"
      />
      <CornerMarks />
      <div className="container relative grid items-center gap-12 pb-20 pt-28 md:pb-28 md:pt-36 lg:grid-cols-2 lg:gap-16">
        {/* Left — copy */}
        <div>
          <motion.p {...fadeUp(0)} className="eyebrow mb-6">
            Science-Led Nutrition · Made in UK
          </motion.p>

          <motion.h1
            {...fadeUp(0.08)}
            className="mb-6 text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[4.25rem]"
          >
            Nutrition for a{' '}
            <em className="italic text-primary">better you.</em>
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mb-10 max-w-lg text-lg leading-relaxed text-ink-soft"
          >
            Clean, clinically informed supplements formulated in the UK —
            no fillers, no shortcuts, just nutrients your body can use.
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mb-10 flex flex-wrap gap-4">
            <Button size="lg" href="/shop">
              Shop Supplements
            </Button>
            <Button size="lg" variant="outline" href="/about">
              Our Story
            </Button>
          </motion.div>

          <motion.div {...fadeUp(0.32)} className="flex items-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
              4.9 average across all products
            </span>
          </motion.div>
        </div>

        {/* Right — featured product on sage radial */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center lg:max-w-lg"
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_#DFF0E8_0%,_#F6F9F7_60%,_transparent_75%)]"
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={product.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: -48 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative z-10 flex w-3/4 justify-center"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${product.image}?v=5`}
                alt={`OptiLife ${product.name}`}
                width={520}
                height={520}
                priority={active === 0}
                className="w-full object-contain drop-shadow-[0_24px_48px_rgba(12,31,23,0.16)]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Lab index caption tracks the rotation */}
          <div className="absolute bottom-2 z-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">
            <span className="text-primary">
              {String(active + 1).padStart(2, '0')}/
              {String(products.length).padStart(2, '0')}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {product.name}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Preload the other bottles so cycling never flashes empty */}
          <div aria-hidden className="hidden">
            {products.map((p) => (
              <Image
                key={p.id}
                src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p.image}?v=5`}
                alt=""
                width={520}
                height={520}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
