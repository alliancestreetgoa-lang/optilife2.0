'use client'

import { motion } from 'framer-motion'
import { CornerMarks } from '@/components/ui/CornerMarks'

interface PageHeroProps {
  /** Mono eyebrow, e.g. "OUR STORY" or "SHOP · 4 PRODUCTS". */
  label?: string
  title: string
  subtitle: string
}

/**
 * Compact clinical page header: mono eyebrow → display title → lede,
 * on the faint-sage surface with a hairline bottom border.
 */
export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative border-b border-line bg-surface-alt py-16 md:py-24">
      <div
        aria-hidden
        className="graph-paper absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_75%)]"
      />
      <CornerMarks />
      <div className="container relative max-w-3xl text-center">
        {label && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="eyebrow mb-4"
          >
            {label}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mb-5 text-4xl font-semibold md:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className="mx-auto max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}
