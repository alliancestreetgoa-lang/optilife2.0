import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Users, Stethoscope, Shield, Sprout } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Expertise — OptiLife Wellbeing',
  description:
    'Decades of experience in nutritional science and holistic wellness.',
}

const steps = [
  {
    index: '01',
    title: 'Source',
    description:
      'We select raw ingredients from trusted suppliers, prioritising purity, traceability, and naturally derived actives.',
  },
  {
    index: '02',
    title: 'Formulate',
    description:
      'Every formula is grounded in nutritional science, with dosages informed by research rather than marketing claims.',
  },
  {
    index: '03',
    title: 'Test',
    description:
      'Batches are checked for identity, potency, and contaminants before anything carries the OptiLife name.',
  },
  {
    index: '04',
    title: 'Deliver',
    description:
      'Finished products reach you fresh and stable, backed by reliable health information and ongoing support.',
  },
]

const standards = [
  {
    icon: Users,
    title: 'Customer Relationship Excellence',
    description:
      'We pride ourselves on building lasting bonds with our community. Our expertise lies not just in products, but in understanding the unique health narratives of each individual we serve.',
  },
  {
    icon: Stethoscope,
    title: 'Health Advice Availability',
    description:
      'Access to professional guidance to help you make informed decisions about your supplement regimen.',
  },
  {
    icon: Shield,
    title: 'Preventive Healthcare',
    description:
      "Focusing on prevention rather than cure, strengthening the body's natural defences.",
  },
  {
    icon: Sprout,
    title: 'Wellness Guidance',
    description:
      'Holistic support that goes beyond pills, encompassing lifestyle, diet, and mental wellbeing.',
  },
]

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        label="OUR EXPERTISE"
        title="Our Expertise"
        subtitle="Decades of experience in nutritional science and holistic wellness."
      />

      <Section containerClassName="max-w-4xl">
        <SectionHeading
          align="left"
          eyebrow="THE PROCESS"
          title="From raw ingredient to finished formula"
        />
        <ol>
          {steps.map((step, i) => (
            <li key={step.index} className="relative pb-12 pl-20 last:pb-0 md:pl-28">
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute left-6 top-16 bottom-2 w-px bg-line md:left-8"
                />
              )}
              <Reveal delay={i * 0.08}>
                <span className="absolute left-0 top-0 font-mono text-4xl font-medium text-primary md:text-5xl">
                  {step.index}
                </span>
                <h3 className="mb-2 text-xl font-semibold md:text-2xl">
                  {step.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="alt">
        <SectionHeading
          eyebrow="QUALITY STANDARDS"
          title="Where our experience shows"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {standards.map((standard, i) => {
            const Icon = standard.icon
            return (
              <Reveal key={standard.title} delay={i * 0.08} className="h-full">
                <Card className="flex h-full gap-5 p-8">
                  <span className="inline-flex h-fit shrink-0 rounded-lg bg-primary-soft p-2.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      {standard.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {standard.description}
                    </p>
                  </div>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Section>
    </>
  )
}
