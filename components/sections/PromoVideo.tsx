import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Brand film section — the vertical promo plays in a phone-proportioned
 * card beside an editorial intro. Muted autoplay with controls so
 * visitors can opt into the voiceover.
 */
export function PromoVideo() {
  return (
    <Section tone="alt">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          align="left"
          eyebrow="The Brand Film"
          title="What we stand for, in motion"
          lede="Four clean formulas, made in the UK — no fillers, no shortcuts. See the OptiLife Standard in motion."
          className="mb-0"
        />

        <Reveal variant="right" delay={0.1} className="mx-auto w-full max-w-sm">
          <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_24px_60px_-20px_rgba(12,31,23,0.18)]">
            <video
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/promo/optilife-promo.mp4`}
              className="aspect-[9/16] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
            />
          </div>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
            Music: Kevin MacLeod · incompetech.com · CC BY 4.0
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
