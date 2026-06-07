import { cn } from '@/lib/utils'

export interface LegalSection {
  title: string
  content: React.ReactNode
}

interface LegalPageProps {
  title: string
  sections: LegalSection[]
  lastUpdated?: string
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function LegalPage({ title, sections, lastUpdated = 'May 2026' }: LegalPageProps) {
  const entries = sections.map((section, index) => ({
    ...section,
    id: slugify(section.title),
    number: String(index + 1).padStart(2, '0'),
  }))

  return (
    <>
      {/* Compact header */}
      <header className="border-b border-line bg-surface-alt">
        <div className="container py-12 lg:py-16">
          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 text-3xl text-ink sm:text-4xl">{title}</h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
            Last updated · {lastUpdated}
          </p>
        </div>
      </header>

      <section className="bg-surface py-14 lg:py-20">
        <div className="container grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          {/* Sticky table of contents */}
          <nav
            aria-label="On this page"
            className="hidden self-start lg:sticky lg:top-28 lg:block"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
              On this page
            </p>
            <ol className="mt-4 space-y-1 border-l border-line">
              {entries.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className={cn(
                      '-ml-px flex items-baseline gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-ink-soft',
                      'transition-colors hover:border-primary hover:text-primary'
                    )}
                  >
                    <span className="font-mono text-xs text-primary">{entry.number}</span>
                    {entry.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Prose body */}
          <div
            className={cn(
              'prose prose-neutral max-w-[65ch] text-ink-soft',
              'prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink',
              'prose-a:text-primary prose-strong:text-ink'
            )}
          >
            {entries.map((entry) => (
              <section key={entry.id} id={entry.id} className="scroll-mt-28">
                <h2 className="flex items-baseline gap-3">
                  <span className="font-mono text-sm font-normal text-primary">
                    {entry.number}
                  </span>
                  {entry.title}
                </h2>
                {entry.content}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
