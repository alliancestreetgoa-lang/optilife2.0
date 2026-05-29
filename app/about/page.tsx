'use client'

import { motion } from 'framer-motion'
import { PageHero } from '@/components/sections/PageHero'

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        subtitle="Dedicated to improving lives through nature, science, and a commitment to excellence."
      />

      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-ink mb-6">
              Serving You a Better Life
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-8" />
            <div className="space-y-5 font-sans text-lg text-ink/70 leading-relaxed">
              <p>
                Optilifewellbeing holds rich experience in the health nutritional
                business and understands the assorted needs of consumers. We are
                more than just a supplement company; we are partners in your
                health journey.
              </p>
              <p>
                The brand is committed to helping people live healthier lives by
                providing the highest quality vitamins, natural health products,
                and reliable health information.
              </p>
              <p>
                We believe that health is the key to life and are uncompromising
                in our pursuit of innovation, integrity, and excellence in
                dietary supplements.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                label: 'Our Mission',
                text: 'To provide accessible, high-quality nutritional solutions that empower individuals to take control of their health and longevity.',
              },
              {
                label: 'Our Vision',
                text: 'A world where preventive healthcare is the norm, and everyone has the knowledge and resources to lead a vibrant, healthy life.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-cream rounded-2xl p-8 border border-cream-dark"
              >
                <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-4">
                  {item.label}
                </span>
                <p className="font-sans text-ink/70 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
