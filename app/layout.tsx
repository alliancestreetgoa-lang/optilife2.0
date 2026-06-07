import type { Metadata } from 'next'
import { Fraunces, Schibsted_Grotesk, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

// Apothecary Lab type system: Fraunces display serif (old-apothecary warmth)
// + Schibsted Grotesk body + Geist Mono lab labels.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  axes: ['opsz'],
  display: 'swap',
})

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
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
    <html
      lang="en"
      className={`${fraunces.variable} ${schibsted.variable} ${geistMono.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
