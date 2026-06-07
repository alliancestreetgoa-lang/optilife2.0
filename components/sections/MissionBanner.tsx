'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useMotionValue, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'

const stats = [
  { value: 4.9, decimals: 1, suffix: '', label: 'Avg Rating' },
  { value: 98, decimals: 0, suffix: '%', label: 'Reorder Rate' },
  { value: 4, decimals: 0, suffix: '', label: 'Clean Formulas' },
  { value: 0, decimals: 0, suffix: '', label: 'Artificial Fillers' },
]

function Counter({
  value,
  decimals,
  suffix,
}: {
  value: number
  decimals: number
  suffix: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState((0).toFixed(decimals))

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    })
    return () => controls.stop()
  }, [inView, reduce, value, decimals, motionValue])

  return (
    <span ref={ref}>
      {reduce ? value.toFixed(decimals) : display}
      {suffix}
    </span>
  )
}

export function MissionBanner() {
  return (
    <Section tone="dark">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <p className="eyebrow mb-4 text-white/70">Our Mission</p>
        <h2 className="text-3xl font-semibold text-white md:text-4xl">
          Health is the key to life. We exist to serve you a better one —
          through quality and integrity.
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="text-center">
            <p className="mb-2 font-mono text-4xl text-white md:text-5xl">
              <Counter
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
              />
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
