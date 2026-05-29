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

// Spring-based hover/tap shared by both the link and button variants.
const motionProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.96 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
}

const baseClass =
  'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:opacity-50 cursor-pointer'

const variants = {
  primary: 'glass-btn bg-gold/80 text-white hover:bg-gold',
  outline: 'glass-btn bg-white/30 text-green hover:bg-white/50',
  outlineLight: 'glass-btn bg-white/10 text-white hover:bg-white/25',
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
