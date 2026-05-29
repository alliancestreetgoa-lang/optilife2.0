'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-cream pt-20">
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-gold/15 text-gold font-sans text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-8"
          >
            Welcome to OptiLife Wellbeing
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-6xl md:text-7xl lg:text-8xl text-ink leading-[1.05] mb-8"
          >
            Empowering{' '}
            <em className="text-green not-italic">Healthier</em>{' '}
            Lives
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-lg md:text-xl text-ink/60 leading-relaxed max-w-xl mb-12"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-xs tracking-widest uppercase text-ink/30">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-ink/30 to-transparent"
        />
      </motion.div>
    </section>
  )
}
