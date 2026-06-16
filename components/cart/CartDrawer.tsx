'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart'

export function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, setQty, removeItem } = useCart()
  const freeShipping = subtotal >= 30
  const shipping = items.length === 0 || freeShipping ? 0 : 3.95
  const total = subtotal + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 36 }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
                Your cart
              </h2>
              <button onClick={closeCart} aria-label="Close cart" className="p-1 text-ink-soft hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
                <p className="text-ink">Your cart is empty.</p>
                <button onClick={closeCart} className="font-mono text-xs uppercase tracking-wider text-primary hover:underline">
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex gap-4 border-b border-line py-4 last:border-0">
                      <div className="relative h-20 w-20 shrink-0 rounded-md bg-surface-alt">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${product.image}`}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <h3 className="text-sm font-semibold text-ink">{product.name}</h3>
                          <button onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name}`} className="text-ink-soft hover:text-primary">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-mono text-sm text-ink-soft">£{product.price.toFixed(2)}</span>
                        <div className="mt-auto flex items-center gap-3">
                          <button onClick={() => setQty(product.id, qty - 1)} aria-label="Decrease quantity" className="flex h-7 w-7 items-center justify-center rounded-md border border-line text-ink hover:border-primary">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="font-mono text-sm text-ink">{qty}</span>
                          <button onClick={() => setQty(product.id, qty + 1)} aria-label="Increase quantity" className="flex h-7 w-7 items-center justify-center rounded-md border border-line text-ink hover:border-primary">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-line px-6 py-4">
                  <div className="flex justify-between text-sm text-ink-soft">
                    <span>Subtotal</span>
                    <span className="font-mono">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-sm text-ink-soft">
                    <span>Shipping</span>
                    <span className="font-mono">{shipping === 0 ? 'FREE' : `£${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="mt-2 flex justify-between border-t border-line pt-2 text-base font-semibold text-ink">
                    <span>Total</span>
                    <span className="font-mono">£{total.toFixed(2)}</span>
                  </div>
                  {!freeShipping && (
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
                      Add £{(30 - subtotal).toFixed(2)} more for free UK shipping
                    </p>
                  )}
                  <CheckoutButton />
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function CheckoutButton() {
  const { items } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // GitHub Pages can't run the serverless function — degrade gracefully.
  const onGitHubPages = (process.env.NEXT_PUBLIC_BASE_PATH ?? '') !== ''

  if (onGitHubPages) {
    return (
      <a
        href="https://optilife2-0.netlify.app/shop/"
        className="mt-4 block w-full rounded-lg border border-line py-3 text-center text-sm font-medium text-ink hover:border-primary"
      >
        Checkout on our main store →
      </a>
    )
  }

  async function checkout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map((i) => ({ id: i.product.id, qty: i.qty })) }),
      })
      const data = await res.json()
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      setError((err as Error).message)
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={checkout}
        disabled={loading || items.length === 0}
        className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {loading ? 'Redirecting…' : 'Checkout'}
      </button>
      {error && <p className="mt-2 text-center text-xs text-red-600">{error}</p>}
    </>
  )
}
