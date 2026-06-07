import { cn } from '@/lib/utils'

/**
 * Clinical card: white surface, hairline border, shadow on hover only.
 * Keeps the resting page flat and calm; depth appears on interaction.
 */
export function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'rounded-xl border border-line bg-surface transition-shadow duration-300 ease-snappy hover:shadow-[0_12px_40px_-12px_rgba(12,31,23,0.12)]',
        className
      )}
    >
      {children}
    </div>
  )
}
