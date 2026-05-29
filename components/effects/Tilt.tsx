'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import VanillaTilt from 'vanilla-tilt'

interface TiltProps {
  children: ReactNode
  className?: string
  max?: number
  scale?: number
  glare?: boolean
}

/**
 * Parallax 3D tilt (Vanilla-Tilt). Kept on its own element so it never fights
 * Framer Motion's transform on reveal wrappers. Disabled for reduced motion.
 */
export function Tilt({ children, className, max = 9, scale = 1.02, glare = true }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    VanillaTilt.init(el, {
      max,
      scale,
      speed: 500,
      glare,
      'max-glare': 0.2,
      gyroscope: false,
      perspective: 1000,
    })
    return () => {
      // vanilla-tilt attaches a destroy() to the element instance
      ;(el as unknown as { vanillaTilt?: { destroy: () => void } }).vanillaTilt?.destroy()
    }
  }, [max, scale, glare])

  return (
    <div ref={ref} className={className} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}
