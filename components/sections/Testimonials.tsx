'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      "I've never felt better since I started using Optilifewellbeing products. The quality is noticeably different from anything else on the market.",
    name: 'Sarah Mitchell',
    label: 'Verified Customer',
  },
  {
    quote:
      'The Turmeric and Ashwagandha supplements have been a game changer for my energy levels. I recommend OptiLife to everyone in my family.',
    name: 'James Thornton',
    label: 'Verified Customer',
  },
  {
    quote:
      'Outstanding customer service and products that actually work. My joint pain has reduced significantly after just 6 weeks of using the Rosehip 2000mg.',
    name: 'Emma Clarke',
    label: 'Verified Customer',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-ink mb-4">
            What Our Customers Say
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-cream-dark"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-sans text-ink/70 leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center font-serif text-green font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-ink">
                    {t.name}
                  </p>
                  <p className="font-sans text-xs text-ink/50">{t.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
