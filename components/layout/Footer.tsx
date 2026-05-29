import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/objectives', label: 'Our Objectives' },
  { href: '/expertise', label: 'Our Expertise' },
  { href: '/contact', label: 'Contact' },
  { href: '/shop', label: 'Shop' },
]

const legalLinks = [
  { href: '/shipping-policy', label: 'Shipping Policy' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/returns-policy', label: 'Returns Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
]

export function Footer() {
  return (
    <footer className="bg-green text-white">
      <div className="container py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <span className="font-serif text-2xl block">OptiLife</span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold">
              Wellbeing
            </span>
          </div>
          <p className="font-sans text-sm text-white/70 leading-relaxed">
            Health is the key to life. Empowering you to live a healthier life
            through nature and science.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-sans font-semibold text-sm tracking-widest uppercase text-gold mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-sans font-semibold text-sm tracking-widest uppercase text-gold mb-6">
            Legal
          </h4>
          <ul className="space-y-3">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <h4 className="font-sans font-semibold text-sm tracking-widest uppercase text-gold mb-6">
            Contact Us
          </h4>
          <ul className="space-y-3 mb-8">
            <li className="flex gap-3 text-sm text-white/70">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              PineTree House, Gardiners Close, Basildon SS14 3AN
            </li>
            <li className="flex gap-3 text-sm text-white/70">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              020 8264 9244
            </li>
            <li className="flex gap-3 text-sm text-white/70">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              customercare@optilifewellbeing.co.uk
            </li>
          </ul>

          <h4 className="font-sans font-semibold text-sm tracking-widest uppercase text-gold mb-3">
            Stay Connected
          </h4>
          <p className="text-xs text-white/60 mb-3">
            Wellness tips and exclusive offers.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Go
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6 text-center text-sm text-white/40 font-sans">
          © 2026 Optilifewellbeing. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
