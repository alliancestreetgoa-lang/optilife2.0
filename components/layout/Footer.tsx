import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Phone, Mail } from 'lucide-react'

const shopLinks = [
  { href: '/shop', label: 'All Products' },
  { href: '/shop', label: 'Multivitamin & Minerals' },
  { href: '/shop', label: 'Rosehip 2000mg' },
  { href: '/shop', label: 'Turmeric 400mg' },
  { href: '/shop', label: 'Ashwagandha 1300mg' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/objectives', label: 'Our Objectives' },
  { href: '/expertise', label: 'Our Expertise' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/returns-policy', label: 'Returns Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
]

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h4 className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-ink-soft transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface-alt">
      <div className="container grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand + mission + contact */}
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/optilife-logo.png`}
            alt="OptiLife Wellbeing — Nutrition for a better you"
            width={220}
            height={147}
            className="mb-4 -ml-3 w-44"
          />
          <p className="mb-6 max-w-xs text-sm leading-relaxed text-ink-soft">
            Health is the key to life. Empowering you to live a healthier life
            through nature and science.
          </p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm text-ink-soft">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              PineTree House, Gardiners Close, Basildon SS14 3AN
            </li>
            <li className="flex gap-2.5 text-sm text-ink-soft">
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              020 8264 9244
            </li>
            <li className="flex gap-2.5 text-sm text-ink-soft">
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              customercare@optilifewellbeing.co.uk
            </li>
          </ul>
        </div>

        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Company" links={companyLinks} />

        {/* Legal + newsletter */}
        <div>
          <FooterColumn title="Legal" links={legalLinks} />
          <h4 className="mb-3 mt-8 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
            Stay Connected
          </h4>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Go
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft/70 md:flex-row md:text-left">
          <span>© 2026 OptiLife Wellbeing. All rights reserved.</span>
          <span>GMP certified · Made in the UK · Not medical advice</span>
        </div>
      </div>
    </footer>
  )
}
