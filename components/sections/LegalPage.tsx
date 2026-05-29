import { PageHero } from './PageHero'

interface LegalPageProps {
  title: string
  children: React.ReactNode
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <>
      <PageHero title={title} subtitle="" />
      <section className="py-16">
        <div className="container max-w-3xl prose prose-slate font-sans text-ink/70 leading-relaxed">
          {children}
        </div>
      </section>
    </>
  )
}
