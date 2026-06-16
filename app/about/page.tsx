import type { Metadata } from 'next'
import { PageHero } from '@/components/sections/PageHero'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Compass, Eye, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Story — OptiLife Wellbeing',
  description:
    'Dedicated to improving lives through nature, science, and a commitment to excellence.',
}

const story = [
  'OptiLife Wellbeing holds rich experience in the health nutritional business and understands the assorted needs of consumers. We are more than just a supplement company; we are partners in your health journey.',
  'The brand is committed to helping people live healthier lives by providing the highest quality vitamins, natural health products, and reliable health information.',
  'We believe that health is the key to life and are uncompromising in our pursuit of innovation, integrity, and excellence in dietary supplements.',
]

const values = [
  {
    icon: Compass,
    title: 'Our Mission',
    description:
      'To provide accessible, high-quality nutritional solutions that empower individuals to take control of their health and longevity.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'A world where preventive healthcare is the norm, and everyone has the knowledge and resources to lead a vibrant, healthy life.',
  },
  {
    icon: ShieldCheck,
    title: 'Our Promise',
    description:
      'An uncompromising pursuit of innovation, integrity, and excellence in every dietary supplement we make.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="OUR STORY"
        title="Our Story"
        subtitle="Dedicated to improving lives through nature, science, and a commitment to excellence."
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="WHO WE ARE"
            title="Serving you a better life"
            className="mb-0 md:mb-0"
          />
          <Reveal variant="right" delay={0.1}>
            <div className="space-y-5 text-base leading-relaxed text-ink-soft md:text-lg">
              {story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="alt">
        <SectionHeading
          eyebrow="WHAT GUIDES US"
          title="The principles behind every formula"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <Reveal key={value.title} delay={i * 0.12} className="h-full">
                <Card className="h-full p-8">
                  <span className="mb-5 inline-flex rounded-lg bg-primary-soft p-2.5">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {value.description}
                  </p>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <Section>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">JOIN THE JOURNEY</p>
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl">
            Be a partner in your own health
          </h2>
          <Button href="/shop">Browse the range</Button>
        </Reveal>
      </Section>
    </>
  )
}
