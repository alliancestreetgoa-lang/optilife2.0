'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/lib/cart'

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
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { count, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Announcement bar — scrolls away, lab-label voice */}
      <div className="bg-ink text-center font-mono text-[11px] uppercase tracking-[0.18em] text-white/90 py-2 px-4">
        Free UK shipping over £30 · Third-party tested
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-[box-shadow,border-color] duration-300',
          scrolled ? 'border-line shadow-[0_1px_12px_rgba(12,31,23,0.06)]' : 'border-transparent'
        )}
      >
        <div className="container flex h-16 items-center justify-between lg:h-[4.5rem]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/optilife-logo.png`}
              alt="OptiLife Wellbeing"
              width={150}
              height={100}
              priority
              className="h-10 w-auto lg:h-11"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative py-1 text-sm transition-colors duration-200',
                    active ? 'font-medium text-ink' : 'text-ink-soft hover:text-ink'
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart (${count} items)`}
              className="relative p-2 text-ink transition-colors hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white transition-[background-color,transform] duration-200 ease-snappy hover:bg-primary-dark active:scale-[0.97]"
            >
              <ShoppingBag className="h-4 w-4" />
              Shop
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart (${count} items)`}
              className="relative p-2 text-ink"
            >
              <ShoppingBag className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
            <button
              className="p-2 text-ink"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-line bg-white lg:hidden"
            >
              <nav className="container flex flex-col gap-1 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'border-b border-line py-3 text-base last:border-0',
                      pathname === link.href
                        ? 'font-medium text-primary'
                        : 'text-ink-soft'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/shop"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-base font-medium text-white"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Shop
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
