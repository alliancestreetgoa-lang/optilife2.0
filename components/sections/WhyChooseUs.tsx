'use client'

import { motion } from 'framer-motion'
import { Leaf, Shield, Star, Users } from 'lucide-react'

const features = [
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'Sourced from the finest organic farms.',
  },
  {
    icon: Shield,
    title: 'Scientifically Researched',
    description: 'Formulated by experts for effectiveness.',
  },
  {
    icon: Star,
    title: 'Trusted Quality',
    description: 'Rigorous testing at every stage.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Dedicated to your long-term wellness.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-cream">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-ink mb-4">
            Why Choose Us?
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
          <p className="font-sans text-lg text-ink/60 max-w-xl mx-auto">
            We are uncompromising in our pursuit of innovation, integrity, and
            excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm border border-cream-dark hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-green" />
                </div>
                <h3 className="font-serif text-xl text-ink mb-2">
                  {feature.title}
                </h3>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
