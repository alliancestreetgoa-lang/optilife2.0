'use client'

import { useEffect, useRef } from 'react'
import Zdog from 'zdog'

export type ZdogIconType = 'leaf' | 'shield' | 'star' | 'people'

const GREEN = '#2C5F2E'
const GREEN_LIGHT = '#3A7D3C'
const GOLD = '#C9952A'

function build(type: ZdogIconType, illo: Zdog.Illustration) {
  if (type === 'leaf') {
    new Zdog.Shape({
      addTo: illo,
      path: [
        { x: 0, y: -13 },
        { bezier: [{ x: 13, y: -6 }, { x: 9, y: 11 }, { x: 0, y: 14 }] },
        { bezier: [{ x: -9, y: 11 }, { x: -13, y: -6 }, { x: 0, y: -13 }] },
      ],
      closed: true,
      stroke: 4,
      fill: true,
      color: GREEN,
    })
    new Zdog.Shape({
      addTo: illo,
      path: [{ x: 0, y: -10 }, { x: 0, y: 13 }],
      stroke: 2,
      color: GREEN_LIGHT,
      translate: { z: 1 },
    })
  } else if (type === 'shield') {
    new Zdog.Shape({
      addTo: illo,
      path: [
        { x: 0, y: -14 },
        { x: 12, y: -8 },
        { x: 12, y: 3 },
        { x: 0, y: 16 },
        { x: -12, y: 3 },
        { x: -12, y: -8 },
      ],
      closed: true,
      stroke: 4,
      fill: true,
      color: GREEN,
    })
    // check mark
    new Zdog.Shape({
      addTo: illo,
      path: [{ x: -5, y: 0 }, { x: -1, y: 5 }, { x: 6, y: -5 }],
      stroke: 2.5,
      color: GOLD,
      translate: { z: 2 },
    })
  } else if (type === 'star') {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const r = i % 2 === 0 ? 14 : 6
      const a = -Math.PI / 2 + (i * Math.PI) / 5
      return { x: Math.cos(a) * r, y: Math.sin(a) * r }
    })
    new Zdog.Shape({ addTo: illo, path: pts, closed: true, stroke: 3, fill: true, color: GOLD })
  } else {
    // people: two heads + shoulders
    const person = (x: number, color: string) => {
      new Zdog.Shape({ addTo: illo, stroke: 9, color, translate: { x, y: -6 } }) // head sphere
      new Zdog.RoundedRect({
        addTo: illo,
        width: 11,
        height: 7,
        cornerRadius: 4,
        stroke: 3,
        fill: true,
        color,
        translate: { x, y: 8 },
      })
    }
    person(-7, GREEN)
    person(7, GREEN_LIGHT)
  }
}

export function ZdogIcon({ type, className }: { type: ZdogIconType; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const illo = new Zdog.Illustration({ element: el, zoom: 2.4 })
    build(type, illo)
    illo.updateRenderGraph()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    if (reduced) {
      illo.rotate.y = -0.4
      illo.updateRenderGraph()
    } else {
      const animate = () => {
        illo.rotate.y += 0.02
        illo.updateRenderGraph()
        raf = requestAnimationFrame(animate)
      }
      animate()
    }
    return () => cancelAnimationFrame(raf)
  }, [type])

  return <canvas ref={ref} width={120} height={120} className={className} />
}
