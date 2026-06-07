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
  up: { opacity: 0, y: 24 },
  down: { opacity: 0, y: -24 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  zoom: { opacity: 0, scale: 0.94 },
}

/**
 * Scroll-into-view reveal. Kept deliberately subtle — small offsets, one
 * shared easing — so direction adds variety without breaking the calm
 * clinical feel. Honors `prefers-reduced-motion` (fades only).
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
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
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
