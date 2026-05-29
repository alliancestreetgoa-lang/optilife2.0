import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { VantaBackground } from '@/components/effects/VantaBackground'

// Matches the original site: Playfair Display headings + DM Sans body.
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'OptiLife Wellbeing — Nutrition for a Better You',
    template: '%s | OptiLife Wellbeing',
  },
  description:
    'Premium scientifically researched vitamins and natural supplements designed to support your journey to optimal wellbeing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <VantaBackground />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
