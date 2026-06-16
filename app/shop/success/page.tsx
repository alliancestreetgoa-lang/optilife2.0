'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { Section } from '@/components/ui/Section'

export default function SuccessPage() {
  const { clear } = useCart()

  // Order is placed — empty the cart once on arrival.
  useEffect(() => {
    clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Section>
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h1 className="text-2xl font-semibold text-ink">Thank you for your order</h1>
        <p className="text-ink-soft">
          Your payment was successful and a receipt is on its way to your inbox.
          We&apos;ll pack and ship your supplements shortly.
        </p>
        <Link
          href="/shop/"
          className="mt-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-dark"
        >
          Back to shop
        </Link>
      </div>
    </Section>
  )
}
