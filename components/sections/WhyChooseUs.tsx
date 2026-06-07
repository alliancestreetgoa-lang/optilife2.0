import { Leaf, Microscope, CalendarCheck } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'

const standards = [
  {
    icon: Leaf,
    title: 'Clean by design',
    body: 'Every formula starts with what we leave out — no artificial fillers, binders or bulking agents. Just active ingredients at effective doses.',
    stat: '0 FILLERS',
  },
  {
    icon: Microscope,
    title: 'Evidence over hype',
    body: 'Ingredients are chosen on published research and verified by independent third-party testing, batch after batch.',
    stat: '100% TRACEABLE',
  },
  {
    icon: CalendarCheck,
    title: 'Built for daily life',
    body: 'Simple once-a-day dosing that fits real routines, so the habit holds and the benefits compound over time.',
    stat: '1 DAILY DOSE',
  },
]

export function WhyChooseUs() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Why OptiLife"
        title="The OptiLife Standard"
        lede="Three principles guide every product we make — from sourcing to the shelf."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {standards.map(({ icon: Icon, title, body, stat }, i) => (
          <Reveal key={title} delay={i * 0.08} className="h-full">
            <Card className="flex h-full flex-col p-8">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-ink">{title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-ink-soft">
                {body}
              </p>
              <p className="mt-auto font-mono text-xs uppercase tracking-[0.16em] text-primary">
                {stat}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
