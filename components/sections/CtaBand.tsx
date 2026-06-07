import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export function CtaBand() {
  return (
    <Section tone="alt" className="border-t border-line">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mb-4">Ready When You Are</p>
        <h2 className="mb-6 text-3xl font-semibold text-ink md:text-4xl">
          Start your wellbeing journey today
        </h2>
        <p className="mb-10 text-base leading-relaxed text-ink-soft md:text-lg">
          Four clean formulas, made in the UK and tested by independent labs.
        </p>
        <Button size="lg" href="/shop">
          Shop Supplements
        </Button>
      </Reveal>
    </Section>
  )
}
