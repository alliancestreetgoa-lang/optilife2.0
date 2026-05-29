'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * A `template.tsx` re-mounts on every navigation (unlike `layout.tsx`), so
 * this enter animation fires on each route change — giving smooth page
 * transitions. Honors `prefers-reduced-motion` (fades only).
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
