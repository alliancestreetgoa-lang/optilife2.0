import { cn } from '@/lib/utils'

/**
 * Mono-font pill — the "lab label" badge (BESTSELLER, TRENDING, cert marks).
 */
export function Badge({
  tone = 'soft',
  className,
  children,
}: {
  tone?: 'soft' | 'solid' | 'outline'
  className?: string
  children: React.ReactNode
}) {
  const tones = {
    soft: 'bg-primary-soft text-primary',
    solid: 'bg-primary text-white',
    outline: 'border border-line text-ink-soft',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
