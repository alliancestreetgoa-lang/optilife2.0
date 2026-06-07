import { BadgeCheck, MapPin, Leaf, FlaskConical } from 'lucide-react'

const marks = [
  { icon: BadgeCheck, label: 'GMP Certified' },
  { icon: MapPin, label: 'Made in the UK' },
  { icon: Leaf, label: 'Vegan Friendly' },
  { icon: FlaskConical, label: 'Third-Party Tested' },
]

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container grid grid-cols-2 gap-x-6 gap-y-4 py-5 md:grid-cols-4">
        {marks.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft"
          >
            <Icon className="h-4 w-4 shrink-0 text-primary" />
            {label}
          </div>
        ))}
      </div>
    </section>
  )
}
