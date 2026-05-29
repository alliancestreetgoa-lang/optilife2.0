import { PageHero } from '@/components/sections/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { Users, Stethoscope, Shield, Sprout } from 'lucide-react'

const areas = [
  {
    icon: Users,
    title: 'Customer Relationship Excellence',
    description: 'We pride ourselves on building lasting bonds with our community. Our expertise lies not just in products, but in understanding the unique health narratives of each individual we serve.',
  },
  {
    icon: Stethoscope,
    title: 'Health Advice Availability',
    description: 'Access to professional guidance to help you make informed decisions about your supplement regimen.',
  },
  {
    icon: Shield,
    title: 'Preventive Healthcare',
    description: "Focusing on prevention rather than cure, strengthening the body's natural defenses.",
  },
  {
    icon: Sprout,
    title: 'Wellness Guidance',
    description: 'Holistic support that goes beyond pills, encompassing lifestyle, diet, and mental wellbeing.',
  },
]

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        title="Our Expertise"
        subtitle="Decades of experience in nutritional science and holistic wellness."
      />

      <section className="py-20">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {areas.map((area, i) => {
              const Icon = area.icon
              return (
                <Reveal
                  key={area.title}
                  variant={i % 2 === 0 ? 'left' : 'right'}
                  delay={Math.floor(i / 2) * 0.12}
                  className="h-full"
                >
                  <div className="glass-card flex gap-6 p-8 rounded-2xl h-full">
                    <div className="w-12 h-12 bg-green/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-green" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-ink mb-3">{area.title}</h3>
                      <p className="font-sans text-sm text-ink/60 leading-relaxed">{area.description}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
