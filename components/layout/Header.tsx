'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About Us' },
  { href: '/objectives', label: 'Our Objectives' },
  { href: '/expertise', label: 'Our Expertise' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border-b border-white/30 shadow-sm">
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/optilife-logo.png`}
            alt="OptiLife Wellbeing"
            width={150}
            height={100}
            priority
            className="h-11 w-auto lg:h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative font-sans text-sm py-1 transition-colors duration-200',
                  active ? 'text-green font-semibold' : 'text-ink/70 hover:text-green'
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 -bottom-0.5 h-0.5 w-full rounded-full bg-gold"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="glass-btn bg-white/30 font-sans text-sm font-medium text-ink/80 hover:text-green px-5 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/shop"
            className="glass-btn inline-flex items-center gap-2 font-sans text-sm font-medium text-white bg-green/80 hover:bg-green px-5 py-2 rounded-lg transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Cart
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-ink"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-cream-dark overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'font-sans text-base py-2 border-b border-cream-dark last:border-0',
                    pathname === link.href ? 'text-green font-semibold' : 'text-ink/70'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 font-sans text-base font-medium text-white bg-green px-5 py-3 rounded-lg mt-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Cart
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
