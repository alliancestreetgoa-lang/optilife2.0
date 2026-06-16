'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'zoom'

interface RevealProps {
  children: ReactNode
  /** Delay in seconds — handy for staggering a list with `i * 0.08`. */
  delay?: number
  /**
   * Entrance direction (AOS-style, named by where the element comes FROM):
   * 'up' rises from below (default), 'down' drops in, 'left'/'right' slide
   * in from that side, 'zoom' scales up gently.
   */
  variant?: RevealVariant
  className?: string
}

const HIDDEN: Record<RevealVariant, Record<string, number>> = {
  up: { opacity: 0, y: 64, scale: 0.97 },
  down: { opacity: 0, y: -64, scale: 0.97 },
  left: { opacity: 0, x: -80 },
  right: { opacity: 0, x: 80 },
  zoom: { opacity: 0, scale: 0.86 },
}

/**
 * Scroll-into-view reveal. Bolder travel with a gentle overshoot easing so
 * elements arrive with momentum. One shared timing; `variant` sets the
 * entrance direction. Honors `prefers-reduced-motion` (fades only).
 */
export function Reveal({
  children,
  delay = 0,
  variant = 'up',
  className,
}: RevealProps) {
  const reduce = useReducedMotion()

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : HIDDEN[variant],
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      // Slightly springy ease-out — a hint of overshoot adds life.
      transition: { duration: 0.8, delay, ease: [0.34, 1.3, 0.42, 1] },
    },
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
