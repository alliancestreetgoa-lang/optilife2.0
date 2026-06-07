import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

/**
 * The one heading pattern used by every section:
 * mono eyebrow → display title → optional lede.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = 'center',
  light = false,
  className,
}: {
  eyebrow: string
  title: string
  lede?: string
  align?: 'center' | 'left'
  /** For dark (emerald) sections. */
  light?: boolean
  className?: string
}) {
  return (
    <Reveal
      className={cn(
        'mb-12 max-w-2xl md:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      <p className={cn('eyebrow mb-4', light && 'text-white/70')}>{eyebrow}</p>
      <h2
        className={cn(
          'text-3xl font-semibold md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]',
          light ? 'text-white' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed md:text-lg',
            light ? 'text-white/75' : 'text-ink-soft'
          )}
        >
          {lede}
        </p>
      )}
    </Reveal>
  )
}
