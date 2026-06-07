'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

const contactDetails = [
  {
    icon: MapPin,
    label: 'ADDRESS',
    value: 'PineTree House, Gardiners Close, Basildon SS14 3AN',
  },
  {
    icon: Phone,
    label: 'PHONE',
    value: '020 8264 9244',
  },
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'customercare@optilifewellbeing.co.uk',
  },
  {
    icon: Clock,
    label: 'HOURS',
    value: 'Mon–Fri, 9:00–17:00 GMT',
  },
]

const inputClass =
  'w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 transition-colors focus:border-primary focus:outline-none'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <PageHero
        label="CONTACT US"
        title="Contact Us"
        subtitle="Have questions? We're here to help you on your wellness journey."
      />

      <Section>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-10">
          <Reveal variant="left">
            <Card className="h-full p-8">
              <h2 className="mb-8 text-2xl font-semibold">Get in Touch</h2>
              <div className="space-y-7">
                {contactDetails.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft">
                        <Icon className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <div>
                        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-primary">
                          {item.label}
                        </p>
                        <p className="text-sm leading-relaxed text-ink">{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </Reveal>

          <Reveal variant="right" delay={0.08}>
            <Card className="h-full p-8">
              <h2 className="mb-8 text-2xl font-semibold">Send us a Message</h2>
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink">
                    Subject{' '}
                    <span className="font-normal text-ink-soft">(optional)</span>
                  </label>
                  <input type="text" id="subject" name="subject" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
                {submitted && (
                  <p className="flex items-center gap-2 text-sm font-medium text-primary">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Thank you — your message has been sent. We&apos;ll be in touch shortly.
                  </p>
                )}
              </form>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={0.16} className="mt-12 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
            We reply within 1 business day
          </p>
        </Reveal>
      </Section>
    </>
  )
}
