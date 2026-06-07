import { Star } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'

const testimonials = [
  {
    quote:
      "I've never felt better since I started using Optilifewellbeing products. The quality is noticeably different from anything else on the market.",
    name: 'Sarah Mitchell',
  },
  {
    quote:
      'The Turmeric and Ashwagandha supplements have been a game changer for my energy levels. I recommend OptiLife to everyone in my family.',
    name: 'James Thornton',
  },
  {
    quote:
      'Outstanding customer service and products that actually work. My joint pain has reduced significantly after just 6 weeks of using the Rosehip 2000mg.',
    name: 'Emma Clarke',
  },
]

export function Testimonials() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Customer Stories"
        title="Stories from our community"
        lede="Real results from people who made OptiLife part of their daily routine."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal
            key={t.name}
            variant={i === 0 ? 'left' : i === 2 ? 'right' : 'up'}
            delay={i * 0.08}
            className="h-full"
          >
            <Card className="flex h-full flex-col p-8">
              <div className="mb-5 flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mb-6 text-sm leading-relaxed text-ink-soft">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-ink">{t.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
                  Verified Buyer
                </p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
