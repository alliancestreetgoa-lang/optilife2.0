'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Omit the handlers whose signatures collide with Framer Motion's gesture props.
interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onAnimationStart' | 'onDrag' | 'onDragStart' | 'onDragEnd'
  > {
  variant?: 'primary' | 'outline' | 'outlineLight' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

const MotionLink = motion.create(Link)

// Quiet, precise press feedback — no hover scale (clinical, not bouncy).
const motionProps = {
  whileTap: { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 500, damping: 30 },
}

const baseClass =
  'inline-flex items-center justify-center font-sans font-medium tracking-tight transition-[background-color,border-color,color] duration-200 ease-snappy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 cursor-pointer'

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  outline: 'border border-line bg-surface text-ink hover:border-primary hover:text-primary',
  outlineLight: 'border border-white/30 text-white hover:bg-white/10',
  ghost: 'text-primary hover:underline underline-offset-4',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-md',
  md: 'px-6 py-3 text-base rounded-lg',
  lg: 'px-8 py-4 text-lg rounded-lg',
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
      <MotionLink href={href} className={classes} {...motionProps}>
        {children}
      </MotionLink>
    )
  }
  return (
    <motion.button className={classes} {...motionProps} {...props}>
      {children}
    </motion.button>
  )
}
