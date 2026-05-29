'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/Button'

// WebGL 3D DNA — client-only (WebGL / window). Mouse-reactive on its own.
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed lifestyle background */}
      <Image
        src="/hero-meadow.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_22%]"
      />
      {/* Green gradient overlay — solid on the left for legibility, clears
          on the right to reveal the lifestyle photo (like the original). */}
      <div className="absolute inset-0 bg-gradient-to-r from-green via-green/45 to-transparent" />
      <div className="absolute inset-0 bg-green/10" />

      {/* D3 animated DNA helix — right side, over the photo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="hidden lg:block absolute right-[1%] top-1/2 -translate-y-1/2 w-[42%] h-[92%] z-[5]"
        aria-hidden="true"
      >
        <HeroScene />
      </motion.div>

      <div className="container relative z-10 pt-20">
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
            className="font-serif text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-8"
          >
            Empowering{' '}
            <em className="text-gold italic">Healthier</em>{' '}
            Lives
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-lg md:text-xl text-white/85 leading-relaxed max-w-xl mb-12"
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
            <Button size="lg" variant="outlineLight" href="/about">Learn More</Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-xs tracking-widest uppercase text-white/60">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
