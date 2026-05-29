'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Animated Vanta.js FOG backdrop in brand colors, fixed behind all content.
 * Replaces the static gradient when active; the body's CSS gradient remains
 * as the fallback for mobile / reduced-motion / load failure.
 */
export function VantaBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(max-width: 768px)').matches) return // skip on mobile for perf

    let effect: { destroy?: () => void } | undefined
    let cancelled = false

    import('vanta/dist/vanta.fog.min').then((mod) => {
      if (cancelled || !ref.current) return
      const FOG = mod.default as (opts: Record<string, unknown>) => { destroy?: () => void }
      effect = FOG({
        el: ref.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        highlightColor: 0xe0ac40, // gold-light
        midtoneColor: 0x3a7d3c, // green-light
        lowlightColor: 0x2c5f2e, // green
        baseColor: 0xfafaf7, // cream
        blurFactor: 0.62,
        speed: 1.1,
        zoom: 0.85,
      })
    })

    return () => {
      cancelled = true
      effect?.destroy?.()
    }
  }, [])

  return <div ref={ref} className="fixed inset-0 -z-10" aria-hidden="true" />
}
