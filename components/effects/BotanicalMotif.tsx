'use client'

import { motion } from 'framer-motion'

// A single pointed leaf, base at origin, pointing "up".
const LEAF = 'M0 0 C 13 -9 13 -33 0 -46 C -13 -33 -13 -9 0 0 Z'
const GREENS = ['#2C5F2E', '#3A7D3C', '#4E9A50']

const BASE = { x: 210, y: 480 }
const SPRIGS = [
  { a: -42, l: 205, n: 4, s: 1.05 },
  { a: -19, l: 268, n: 5, s: 1.18 },
  { a: 2, l: 320, n: 5, s: 1.25 },
  { a: 20, l: 268, n: 5, s: 1.18 },
  { a: 43, l: 205, n: 4, s: 1.05 },
]

function leavesFor(a: number, l: number, n: number, s: number) {
  const rad = (a * Math.PI) / 180
  return Array.from({ length: n }, (_, i) => {
    const t = (i + 1) / n
    const d = t * l
    const side = i % 2 ? 1 : -1
    return {
      x: Math.sin(rad) * d,
      y: -Math.cos(rad) * d,
      r: a + side * 46,
      s: s * (1 - t * 0.5),
      c: GREENS[i % GREENS.length],
    }
  })
}

/** Elegant botanical leaf spray in brand colors — soft sway + floating gold dust. */
export function BotanicalMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 540" className={className} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: '50% 92%' }}
        animate={{ rotate: [-2.2, 2.2, -2.2] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* stems */}
        {SPRIGS.map((sp, i) => {
          const rad = (sp.a * Math.PI) / 180
          const tx = BASE.x + Math.sin(rad) * sp.l
          const ty = BASE.y - Math.cos(rad) * sp.l
          const mx = BASE.x + Math.sin(rad) * sp.l * 0.5
          const my = BASE.y - Math.cos(rad) * sp.l * 0.5
          return (
            <path
              key={`s${i}`}
              d={`M${BASE.x} ${BASE.y} Q ${mx} ${my}, ${tx} ${ty}`}
              stroke="#3A7D3C"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              opacity={0.65}
            />
          )
        })}
        {/* leaves */}
        {SPRIGS.flatMap((sp, si) =>
          leavesFor(sp.a, sp.l, sp.n, sp.s).map((lf, li) => (
            <path
              key={`l${si}-${li}`}
              d={LEAF}
              fill={lf.c}
              opacity={0.95}
              transform={`translate(${BASE.x + lf.x} ${BASE.y + lf.y}) rotate(${lf.r}) scale(${lf.s})`}
            />
          ))
        )}
        {/* gold accent berries near the base */}
        {[[-26, -28], [24, -46], [-6, -68], [42, -18], [10, -104]].map((b, i) => (
          <circle key={`b${i}`} cx={BASE.x + b[0]} cy={BASE.y + b[1]} r={7} fill="#C9952A" />
        ))}
      </motion.g>

      {/* floating gold dust */}
      {[[110, 150], [300, 110], [350, 300], [80, 320], [250, 380]].map((p, i) => (
        <motion.circle
          key={`d${i}`}
          cx={p[0]}
          cy={p[1]}
          r={3}
          fill="#E0AC40"
          animate={{ y: [0, -14, 0], opacity: [0.25, 0.8, 0.25] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}
    </svg>
  )
}
