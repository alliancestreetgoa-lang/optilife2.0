import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Our Objectives — OptiLife Wellbeing',
  description:
    'Guiding principles that drive our commitment to your health.',
}

const objectives = [
  {
    goal: 'Customer Satisfaction',
    detail:
      'Our primary goal is to exceed customer expectations through quality products and exceptional service.',
  },
  {
    goal: 'Well-Researched Products',
    detail:
      'We invest heavily in R&D to ensure every product is backed by science and proven to work.',
  },
  {
    goal: 'Long-Term Support',
    detail:
      "We don't just sell products; we build relationships to support your health journey for a lifetime.",
  },
  {
    goal: 'Empowerment',
    detail:
      'To empower healthier lives through education, awareness, and premium nutrition.',
  },
  {
    goal: 'Expert Guidance',
    detail:
      'Providing access to dedicated health advisors and friendly, skilled customer support.',
  },
]

export default function ObjectivesPage() {
  return (
    <>
      <PageHero
        label="OUR OBJECTIVES"
        title="Our Objectives"
        subtitle="Guiding principles that drive our commitment to your health."
      />

      <Section containerClassName="max-w-4xl">
        <SectionHeading
          align="left"
          eyebrow="THE MANIFESTO"
          title="What we hold ourselves to"
        />
        <ol className="border-t border-line">
          {objectives.map((objective, i) => (
            <li key={objective.goal} className="border-b border-line">
              <Reveal
                delay={i * 0.12}
                className="flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:gap-10"
              >
                <span className="font-mono text-sm text-primary md:w-12 md:shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-semibold md:w-72 md:shrink-0 md:text-2xl">
                  {objective.goal}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft md:text-base">
                  {objective.detail}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}
