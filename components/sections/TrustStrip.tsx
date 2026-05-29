'use client'

import { motion } from 'framer-motion'

const signals = [
  '100% Natural Ingredients',
  'Lab Tested & Verified',
  'UK-Based Company',
  '30-Day Money Back Guarantee',
  'Scientifically Formulated',
  'Trusted by Thousands',
  'Sourced from Organic Farms',
  'No Artificial Fillers',
]

export function TrustStrip() {
  const doubled = [...signals, ...signals]

  return (
    <div className="bg-green py-4 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {doubled.map((signal, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-6">
            <span className="font-sans text-sm font-medium text-white tracking-wide">
              {signal}
            </span>
            <span className="text-gold text-xl">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
