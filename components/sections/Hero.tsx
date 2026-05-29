'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'

const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

// Floating product showcase — our actual supplements (on-brand hero visual).
const heroProducts = [
  { src: `${BP}/products/turmeric.png?v=2`, alt: 'Turmeric 400mg', cls: 'w-[24%] -rotate-[8deg] z-10', dur: 4.2, delay: 0.3 },
  { src: `${BP}/products/multivitamin.png?v=2`, alt: 'Multivitamin & Minerals', cls: 'w-[32%] z-20 -mb-2', dur: 5, delay: 0 },
  { src: `${BP}/products/ashwagandha.png?v=2`, alt: 'Ashwagandha 1300mg', cls: 'w-[24%] rotate-[8deg] z-10', dur: 4.6, delay: 0.5 },
]

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-start lg:items-center overflow-hidden">
      {/* Floating product showcase — right on desktop, lower band on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute z-[5] pointer-events-none flex items-end justify-center
          inset-x-0 bottom-0 h-[34%] opacity-90 [mask-image:linear-gradient(to_bottom,transparent,#000_38%)]
          lg:inset-x-auto lg:bottom-auto lg:right-[3%] lg:top-1/2 lg:h-auto lg:w-[44%] lg:-translate-y-1/2 lg:opacity-100 lg:[mask-image:none]"
        aria-hidden="true"
      >
        {/* soft glow behind the bottles */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(58,125,60,0.18),transparent_65%)]" />
        {heroProducts.map((p) => (
          <motion.div
            key={p.alt}
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
            className={`relative ${p.cls}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={400}
              height={533}
              className="w-full h-auto drop-shadow-[0_20px_30px_rgba(28,28,26,0.25)]"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="container relative z-10 pt-28 lg:pt-20">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-gold text-white font-sans text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-md mb-8"
          >
            Welcome to OptiLifeWellbeing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-6xl md:text-7xl lg:text-8xl text-ink leading-[1.05] mb-8"
          >
            Empowering{' '}
            <em className="text-gold italic">Healthier</em>{' '}
            Lives
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-lg md:text-xl text-ink/70 leading-relaxed max-w-xl mb-12"
          >
            Health is the key to life. Discover our premium range of
            scientifically researched vitamins and natural supplements designed
            to support your journey to optimal wellbeing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" href="/shop">Shop Products</Button>
            <Button size="lg" variant="outline" href="/about">Learn More</Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="font-sans text-xs tracking-widest uppercase text-ink/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-ink/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
