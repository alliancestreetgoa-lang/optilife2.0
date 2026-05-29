'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export function MissionBanner() {
  return (
    <section className="bg-green py-24">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <Heart className="w-10 h-10 text-gold mx-auto mb-8" />
          <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight max-w-4xl mx-auto mb-10">
            &ldquo;We believe that health is the key to life. Our mission is to
            serve you a better life through quality and integrity.&rdquo;
          </blockquote>
          <Link
            href="/about"
            className="inline-block font-sans text-sm font-medium tracking-wide text-white border border-white/40 hover:border-white px-8 py-3 rounded-xl transition-colors"
          >
            Read Our Story
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
