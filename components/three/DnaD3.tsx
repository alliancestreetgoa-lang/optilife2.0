'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

/**
 * D3.js animated DNA double helix (SVG).
 *
 * Two phosphate strands trace offset sine waves; base-pair rungs join them.
 * A `d3.timer` advances the phase so the helix appears to twist, and a fake
 * depth (cos of the phase) drives each node's radius/opacity so the front of
 * the helix reads larger and brighter than the back. Brand colors throughout.
 */

const W = 320
const H = 620
const N = 26
const AMP = 95
const CX = W / 2

export default function DnaD3({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = d3.select(ref.current)
    svg.selectAll('*').remove()

    // Soft glow filter for the nodes.
    const defs = svg.append('defs')
    const glow = defs.append('filter').attr('id', 'dna-glow').attr('x', '-50%').attr('y', '-50%').attr('width', '200%').attr('height', '200%')
    glow.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'blur')
    const merge = glow.append('feMerge')
    merge.append('feMergeNode').attr('in', 'blur')
    merge.append('feMergeNode').attr('in', 'SourceGraphic')

    const data = d3.range(N)
    const step = 0.52
    const top = 30
    const usableH = H - top * 2
    const y = (i: number) => top + (i / (N - 1)) * usableH

    const rungs = svg.append('g').attr('filter', 'url(#dna-glow)')
    const strandA = svg.append('g').attr('filter', 'url(#dna-glow)')
    const strandB = svg.append('g').attr('filter', 'url(#dna-glow)')

    const lineSel = rungs
      .selectAll('line')
      .data(data)
      .join('line')
      .attr('stroke', (d) => (d % 2 ? '#C9952A' : '#3A7D3C'))
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round')

    const aSel = strandA.selectAll('circle').data(data).join('circle').attr('fill', '#2C5F2E')
    const bSel = strandB.selectAll('circle').data(data).join('circle').attr('fill', '#3A7D3C')

    let phase = 0
    const render = () => {
      const ax = (i: number) => CX + AMP * Math.sin(phase + i * step)
      const bx = (i: number) => CX + AMP * Math.sin(phase + i * step + Math.PI)
      const za = (i: number) => (Math.cos(phase + i * step) + 1) / 2 // 0..1 (front=1)
      const zb = (i: number) => (Math.cos(phase + i * step + Math.PI) + 1) / 2

      aSel
        .attr('cx', (d, i) => ax(i))
        .attr('cy', (d, i) => y(i))
        .attr('r', (d, i) => 4.5 + 4 * za(i))
        .attr('opacity', (d, i) => 0.4 + 0.6 * za(i))
      bSel
        .attr('cx', (d, i) => bx(i))
        .attr('cy', (d, i) => y(i))
        .attr('r', (d, i) => 4.5 + 4 * zb(i))
        .attr('opacity', (d, i) => 0.4 + 0.6 * zb(i))
      lineSel
        .attr('x1', (d, i) => ax(i))
        .attr('y1', (d, i) => y(i))
        .attr('x2', (d, i) => bx(i))
        .attr('y2', (d, i) => y(i))
        .attr('opacity', (d, i) => 0.25 + 0.4 * Math.min(za(i), zb(i)))
    }

    render()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let timer: d3.Timer | null = null
    if (!reduced) {
      timer = d3.timer((elapsed) => {
        phase = (elapsed / 1000) * 1.1
        render()
      })
    }

    return () => {
      timer?.stop()
      svg.selectAll('*').remove()
    }
  }, [])

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
    />
  )
}
