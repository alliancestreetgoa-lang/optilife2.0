import { cn } from '@/lib/utils'

/**
 * One spacing rhythm site-wide. `tone` flips between the white and
 * faint-sage surfaces; `dark` is the emerald statement band.
 */
export function Section({
  tone = 'default',
  className,
  containerClassName,
  children,
  id,
}: {
  tone?: 'default' | 'alt' | 'dark'
  className?: string
  containerClassName?: string
  children: React.ReactNode
  id?: string
}) {
  const tones = {
    default: 'bg-surface',
    alt: 'bg-surface-alt',
    dark: 'bg-primary-dark text-white',
  }
  return (
    <section id={id} className={cn('py-20 md:py-28', tones[tone], className)}>
      <div className={cn('container', containerClassName)}>{children}</div>
    </section>
  )
}
