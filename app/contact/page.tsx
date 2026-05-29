'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'

const contactDetails = [
  {
    icon: MapPin,
    label: 'Our Location',
    value: 'PineTree House, Gardiners Close, Basildon SS14 3AN',
    sub: undefined,
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'customercare@optilifewellbeing.co.uk',
    sub: undefined,
  },
  {
    icon: Phone,
    label: 'Call Us',
    value: '020 8264 9244',
    sub: 'Mon–Fri, 9am – 6pm GMT',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Monday – Friday: 9am – 6pm',
    sub: 'Saturday: 10am – 4pm · Sunday: Closed',
  },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Have questions? We're here to help you on your wellness journey."
      />

      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl text-ink mb-8">Get in Touch</h2>
              <div className="space-y-8">
                {contactDetails.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex gap-5">
                      <div className="w-11 h-11 bg-green/10 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-green" />
                      </div>
                      <div>
                        <p className="font-sans text-xs font-semibold tracking-widest uppercase text-gold mb-1">
                          {item.label}
                        </p>
                        <p className="font-sans text-ink/80">{item.value}</p>
                        {item.sub && (
                          <p className="font-sans text-sm text-ink/50 mt-0.5">{item.sub}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl text-ink mb-8">Send us a Message</h2>
              <form className="space-y-5">
                {[
                  { id: 'name', label: 'Name', type: 'text' },
                  { id: 'email', label: 'Email', type: 'email' },
                  { id: 'subject', label: 'Subject', type: 'text' },
                ].map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="block font-sans text-sm font-medium text-ink/70 mb-2"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      className="w-full border border-cream-dark rounded-xl px-4 py-3 font-sans text-sm text-ink bg-cream focus:outline-none focus:border-green transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="block font-sans text-sm font-medium text-ink/70 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full border border-cream-dark rounded-xl px-4 py-3 font-sans text-sm text-ink bg-cream focus:outline-none focus:border-green transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green text-white font-sans font-medium py-4 rounded-xl hover:bg-green-dark transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
