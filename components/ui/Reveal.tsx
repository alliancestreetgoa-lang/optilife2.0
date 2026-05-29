'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'flip'

interface RevealProps {
  children: ReactNode
  /** Delay in seconds — handy for staggering a list with `i * 0.1`. */
  delay?: number
  /** Which entrance effect to use. */
  variant?: RevealVariant
  className?: string
}

const VARIANTS: Record<RevealVariant, { hidden: Record<string, number>; show: Record<string, number> }> = {
  up: { hidden: { opacity: 0, y: 44, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } },
  down: { hidden: { opacity: 0, y: -44 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -70 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 70 }, show: { opacity: 1, x: 0 } },
  zoom: { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } },
  flip: {
    hidden: { opacity: 0, rotateY: -55, transformPerspective: 900 },
    show: { opacity: 1, rotateY: 0, transformPerspective: 900 },
  },
}

/**
 * Reveals content as it scrolls into view, with a selectable entrance effect.
 * Drop-in for Server and Client pages. Honors `prefers-reduced-motion` (fades only).
 */
export function Reveal({ children, delay = 0, variant = 'up', className }: RevealProps) {
  const reduce = useReducedMotion()
  const v = VARIANTS[variant]

  const variants: Variants = {
    hidden: reduce ? { opacity: 0 } : v.hidden,
    show: {
      ...v.show,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
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
