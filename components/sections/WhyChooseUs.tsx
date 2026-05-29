'use client'

import { motion } from 'framer-motion'
import { Tilt } from '@/components/effects/Tilt'
import { ZdogIcon, type ZdogIconType } from '@/components/effects/ZdogIcon'

const features: { icon: ZdogIconType; title: string; description: string }[] = [
  {
    icon: 'leaf',
    title: 'Natural Ingredients',
    description: 'Sourced from the finest organic farms.',
  },
  {
    icon: 'shield',
    title: 'Scientifically Researched',
    description: 'Formulated by experts for effectiveness.',
  },
  {
    icon: 'star',
    title: 'Trusted Quality',
    description: 'Rigorous testing at every stage.',
  },
  {
    icon: 'people',
    title: 'Customer First',
    description: 'Dedicated to your long-term wellness.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-6xl text-green mb-4">
            Why Choose Us?
          </h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
          <p className="font-sans text-lg text-ink/60 max-w-xl mx-auto">
            We are uncompromising in our pursuit of innovation, integrity, and
            excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, rotateY: -42, transformPerspective: 900 }}
              whileInView={{ opacity: 1, rotateY: 0, transformPerspective: 900 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt max={12} scale={1.04} className="glass-card rounded-2xl p-8 text-center h-full">
                <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
                  <ZdogIcon type={feature.icon} className="w-full h-full" />
                </div>
                <h3 className="font-serif text-xl text-ink mb-2">{feature.title}</h3>
                <p className="font-sans text-sm text-ink/60 leading-relaxed">
                  {feature.description}
                </p>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
