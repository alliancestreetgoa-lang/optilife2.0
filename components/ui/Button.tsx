'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

const baseClass =
  'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 cursor-pointer'

const variants = {
  primary: 'bg-green text-white hover:bg-green-dark active:scale-[0.97]',
  outline:
    'border-2 border-green text-green hover:bg-green hover:text-white active:scale-[0.97]',
  ghost: 'text-green hover:underline underline-offset-4',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-md',
  md: 'px-6 py-3 text-base rounded-lg',
  lg: 'px-8 py-4 text-lg rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: ButtonProps & { href?: string }) {
  const classes = cn(baseClass, variants[variant], sizes[size], className)
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
