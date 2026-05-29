'use client'

import { motion } from 'framer-motion'

interface PageHeroProps {
  label?: string
  title: string
  subtitle: string
  dark?: boolean
}

export function PageHero({ label, title, subtitle, dark = false }: PageHeroProps) {
  return (
    <section
      className={`pt-32 pb-20 ${dark ? 'bg-green text-white' : 'bg-cream text-ink'}`}
    >
      <div className="container text-center">
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`inline-block font-sans text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6 ${
              dark ? 'bg-white/10 text-gold' : 'bg-gold/15 text-gold'
            }`}
          >
            {label}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`font-sans text-lg max-w-2xl mx-auto leading-relaxed ${
            dark ? 'text-white/70' : 'text-ink/60'
          }`}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}
