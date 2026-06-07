/**
 * Blueprint registration marks — four mono `+` glyphs pinned to the corners
 * of a `relative` parent. Pure decoration for the Apothecary Lab aesthetic.
 */
export function CornerMarks({ inset = '1.25rem' }: { inset?: string }) {
  const positions = [
    { top: inset, left: inset },
    { top: inset, right: inset },
    { bottom: inset, left: inset },
    { bottom: inset, right: inset },
  ] as const

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
      {positions.map((pos, i) => (
        <span
          key={i}
          style={pos}
          className="absolute select-none font-mono text-sm leading-none text-primary/35"
        >
          +
        </span>
      ))}
    </div>
  )
}
