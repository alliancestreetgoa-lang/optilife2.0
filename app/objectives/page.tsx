'use client'

import { motion } from 'framer-motion'
import { PageHero } from '@/components/sections/PageHero'
import { Target, FlaskConical, Heart, Zap, MessageCircle } from 'lucide-react'

const objectives = [
  {
    icon: Target,
    title: 'Customer Satisfaction',
    description: 'Our primary goal is to exceed customer expectations through quality products and exceptional service.',
  },
  {
    icon: FlaskConical,
    title: 'Well-Researched Products',
    description: 'We invest heavily in R&D to ensure every product is backed by science and proven to work.',
  },
  {
    icon: Heart,
    title: 'Long-Term Support',
    description: "We don't just sell products; we build relationships to support your health journey for a lifetime.",
  },
  {
    icon: Zap,
    title: 'Empowerment',
    description: 'To empower healthier lives through education, awareness, and premium nutrition.',
  },
  {
    icon: MessageCircle,
    title: 'Expert Guidance',
    description: 'Providing access to dedicated health advisors and friendly, skilled customer support.',
  },
]

export default function ObjectivesPage() {
  return (
    <>
      <PageHero
        title="Our Objectives"
        subtitle="Guiding principles that drive our commitment to your health."
      />

      <section className="py-20 bg-white">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((obj, i) => {
              const Icon = obj.icon
              return (
                <motion.div
                  key={obj.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-cream rounded-2xl p-8 border border-cream-dark"
                >
                  <div className="w-12 h-12 bg-green/10 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-green" />
                  </div>
                  <h3 className="font-serif text-2xl text-ink mb-3">{obj.title}</h3>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed">{obj.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
