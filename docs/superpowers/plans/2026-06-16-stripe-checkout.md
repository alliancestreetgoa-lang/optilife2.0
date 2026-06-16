# Stripe Checkout Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a persistent multi-item cart and Stripe Checkout (via a Netlify serverless function) to the OptiLife 2.0 static supplement shop.

**Architecture:** Client holds cart state in a React context backed by `localStorage`. At checkout the client POSTs `{id, qty}` pairs to a Netlify function that re-derives real prices from `lib/products`, builds a Stripe Checkout Session (UK-only, £3.95 flat shipping / free over £30), and returns the hosted-page URL for redirect. Pure logic (cart reducer, checkout pricing) is extracted into framework-free modules and unit-tested with Vitest; UI is verified manually with `netlify dev`.

**Tech Stack:** Next.js 16 (static export), React 19, TypeScript, Tailwind v4, framer-motion, lucide-react, `stripe` SDK, Netlify Functions, Vitest.

**Money-safety rule (applies to every task):** the server NEVER trusts client-supplied prices. All amounts are derived from `lib/products` inside the function.

---

### Task 1: Add Vitest test infrastructure

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install Vitest**

Run: `cd ~/optilife2.0 && npm install -D vitest`
Expected: adds `vitest` to devDependencies, exits 0.

- [ ] **Step 2: Add a test script**

In `package.json`, add to the `"scripts"` block (after `"lint"`):

```json
    "lint": "eslint",
    "test": "vitest run"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
  },
})
```

- [ ] **Step 4: Verify the runner works (no tests yet)**

Run: `npm test`
Expected: Vitest runs and reports "No test files found" (exit code may be non-zero; that's fine — next task adds a test).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vitest.config.ts
git commit -m "test: add Vitest infrastructure"
```

---

### Task 2: Cart reducer (pure logic, TDD)

The reducer is framework-free so it can be unit-tested without React. `Product` comes from `lib/products.ts`.

**Files:**
- Create: `lib/cart-reducer.ts`
- Test: `lib/cart-reducer.test.ts`

- [ ] **Step 1: Write the failing test**

`lib/cart-reducer.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { cartReducer, subtotalOf, countOf, type CartState } from './cart-reducer'
import type { Product } from './products'

const p = (id: string, price: number): Product => ({
  id, price, slug: `s-${id}`, name: `P${id}`,
  description: '', rating: 5, image: '/x.png',
})

const empty: CartState = { items: [] }

describe('cartReducer', () => {
  it('adds a new item with qty 1', () => {
    const s = cartReducer(empty, { type: 'add', product: p('1', 10) })
    expect(s.items).toEqual([{ product: p('1', 10), qty: 1 }])
  })

  it('increments qty when adding an existing item', () => {
    let s = cartReducer(empty, { type: 'add', product: p('1', 10) })
    s = cartReducer(s, { type: 'add', product: p('1', 10) })
    expect(s.items[0].qty).toBe(2)
  })

  it('setQty replaces quantity and removes at 0', () => {
    let s = cartReducer(empty, { type: 'add', product: p('1', 10) })
    s = cartReducer(s, { type: 'setQty', id: '1', qty: 5 })
    expect(s.items[0].qty).toBe(5)
    s = cartReducer(s, { type: 'setQty', id: '1', qty: 0 })
    expect(s.items).toHaveLength(0)
  })

  it('removes an item by id', () => {
    let s = cartReducer(empty, { type: 'add', product: p('1', 10) })
    s = cartReducer(s, { type: 'remove', id: '1' })
    expect(s.items).toHaveLength(0)
  })

  it('clear empties the cart', () => {
    let s = cartReducer(empty, { type: 'add', product: p('1', 10) })
    s = cartReducer(s, { type: 'clear' })
    expect(s.items).toHaveLength(0)
  })

  it('hydrate filters out unknown product ids', () => {
    const known = [p('1', 10)]
    const s = cartReducer(empty, {
      type: 'hydrate',
      items: [{ product: p('1', 10), qty: 2 }, { product: p('99', 5), qty: 1 }],
      catalog: known,
    })
    expect(s.items).toEqual([{ product: p('1', 10), qty: 2 }])
  })
})

describe('selectors', () => {
  it('subtotalOf sums price * qty', () => {
    const state: CartState = { items: [
      { product: p('1', 10), qty: 2 },
      { product: p('2', 5.5), qty: 1 },
    ] }
    expect(subtotalOf(state)).toBeCloseTo(25.5)
  })

  it('countOf sums quantities', () => {
    const state: CartState = { items: [
      { product: p('1', 10), qty: 2 },
      { product: p('2', 5.5), qty: 3 },
    ] }
    expect(countOf(state)).toBe(5)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- lib/cart-reducer.test.ts`
Expected: FAIL — `cart-reducer.ts` does not exist.

- [ ] **Step 3: Write the implementation**

`lib/cart-reducer.ts`:

```ts
import type { Product } from './products'

export interface CartLine {
  product: Product
  qty: number
}

export interface CartState {
  items: CartLine[]
}

export type CartAction =
  | { type: 'add'; product: Product }
  | { type: 'remove'; id: string }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'clear' }
  | { type: 'hydrate'; items: CartLine[]; catalog: Product[] }

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { product: action.product, qty: 1 }] }
    }
    case 'remove':
      return { items: state.items.filter((i) => i.product.id !== action.id) }
    case 'setQty': {
      if (action.qty <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.id) }
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.id ? { ...i, qty: action.qty } : i
        ),
      }
    }
    case 'clear':
      return { items: [] }
    case 'hydrate': {
      const ids = new Set(action.catalog.map((p) => p.id))
      return { items: action.items.filter((i) => ids.has(i.product.id)) }
    }
    default:
      return state
  }
}

export function subtotalOf(state: CartState): number {
  return state.items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
}

export function countOf(state: CartState): number {
  return state.items.reduce((sum, i) => sum + i.qty, 0)
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- lib/cart-reducer.test.ts`
Expected: PASS (8 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/cart-reducer.ts lib/cart-reducer.test.ts
git commit -m "feat: add pure cart reducer with tests"
```

---

### Task 3: Cart context provider with localStorage persistence

Wraps the reducer in React context, adds drawer open/close state, and persists to `localStorage` (key `optilife-cart`). Reading `localStorage` happens only in `useEffect` to stay safe under static rendering.

**Files:**
- Create: `lib/cart.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create the provider**

`lib/cart.tsx`:

```tsx
'use client'

import {
  createContext, useContext, useEffect, useReducer, useState, type ReactNode,
} from 'react'
import {
  cartReducer, subtotalOf, countOf, type CartLine, type CartState,
} from './cart-reducer'
import { products, type Product } from './products'

const STORAGE_KEY = 'optilife-cart'

interface CartContextValue {
  items: CartLine[]
  subtotal: number
  count: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  setQty: (id: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] } as CartState)
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Load persisted cart once, on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const items = JSON.parse(raw) as CartLine[]
        dispatch({ type: 'hydrate', items, catalog: products })
      }
    } catch {
      // localStorage unavailable / bad JSON — start empty.
    }
    setHydrated(true)
  }, [])

  // Persist on change (only after initial hydrate so we don't clobber storage).
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // ignore write failures (private mode, quota)
    }
  }, [state.items, hydrated])

  const value: CartContextValue = {
    items: state.items,
    subtotal: subtotalOf(state),
    count: countOf(state),
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addItem: (product) => dispatch({ type: 'add', product }),
    removeItem: (id) => dispatch({ type: 'remove', id }),
    setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
    clear: () => dispatch({ type: 'clear' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
```

- [ ] **Step 2: Wrap the app in `app/layout.tsx`**

Add the import near the other component imports:

```tsx
import { CartProvider } from '@/lib/cart'
```

Wrap `Header`/`main`/`Footer` inside the provider (the `CartDrawer` is added in Task 6). Replace the existing `<body>` block:

```tsx
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds (static export). The provider is a client component; the layout stays a server component wrapping it — this is allowed.

- [ ] **Step 4: Commit**

```bash
git add lib/cart.tsx app/layout.tsx
git commit -m "feat: add cart context provider with localStorage persistence"
```

---

### Task 4: Wire the ProductCard "Add" button

**Files:**
- Modify: `components/ui/ProductCard.tsx`

- [ ] **Step 1: Use the cart hook on the Add button**

At the top of `components/ui/ProductCard.tsx`, add the import:

```tsx
import { useCart } from '@/lib/cart'
```

Inside `ProductCard`, before the `return`, get the actions:

```tsx
  const { addItem, openCart } = useCart()
```

Replace the existing Add `<Button>` (the one with `<Plus />` and "Add") with:

```tsx
          <Button
            size="sm"
            className="gap-1.5"
            onClick={() => {
              addItem(product)
              openCart()
            }}
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
```

- [ ] **Step 2: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/ui/ProductCard.tsx
git commit -m "feat: wire ProductCard Add button to cart"
```

---

### Task 5: Header cart button with item-count badge

`Header.tsx` already imports `ShoppingBag`. Add a cart trigger that opens the drawer and shows a live count, on both desktop and mobile.

**Files:**
- Modify: `components/layout/Header.tsx`

- [ ] **Step 1: Use the cart hook**

Add the import after the `cn` import:

```tsx
import { useCart } from '@/lib/cart'
```

Inside `Header`, after the `pathname` line:

```tsx
  const { count, openCart } = useCart()
```

- [ ] **Step 2: Add a reusable cart button before the closing markup**

Inside the "Desktop actions" `div` (which currently holds the Shop link), add the cart button as the first child:

```tsx
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
```

- [ ] **Step 3: Add a cart button to the mobile bar**

Change the mobile controls: wrap the existing menu toggle button so a cart button sits beside it. Replace the existing mobile menu `<button>` with:

```tsx
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
```

- [ ] **Step 4: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
git add components/layout/Header.tsx
git commit -m "feat: add header cart button with count badge"
```

---

### Task 6: Cart drawer component

A right-side slide-out using framer-motion, matching the site's tokens (`ink`, `line`, `surface-alt`, `primary`). The Checkout button is wired in Task 9 — for now it is a placeholder calling a `onCheckout` no-op so the component renders.

**Files:**
- Create: `components/cart/CartDrawer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create the drawer**

`components/cart/CartDrawer.tsx`:

```tsx
'use client'

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

// Replaced with the real checkout handler in Task 9.
function CheckoutButton() {
  return (
    <button
      type="button"
      className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
      disabled
    >
      Checkout
    </button>
  )
}
```

- [ ] **Step 2: Mount the drawer in `app/layout.tsx`**

Add the import:

```tsx
import { CartDrawer } from '@/components/cart/CartDrawer'
```

Add `<CartDrawer />` inside `CartProvider`, after `<Footer />`:

```tsx
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/cart/CartDrawer.tsx app/layout.tsx
git commit -m "feat: add cart drawer UI"
```

---

### Task 7: Checkout core logic (pure, TDD)

Framework-free functions the Netlify handler will call: validate the incoming items against the catalog, build Stripe line items (amounts in pence from the catalog), and compute the shipping option. Imports the catalog by relative path so it bundles cleanly in the function.

**Files:**
- Create: `netlify/functions/checkout-core.ts`
- Test: `netlify/functions/checkout-core.test.ts`

- [ ] **Step 1: Write the failing test**

`netlify/functions/checkout-core.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { buildLineItems, shippingOption, validateItems } from './checkout-core'
import type { Product } from '../../lib/products'

const catalog: Product[] = [
  { id: '1', price: 28.99, slug: 'a', name: 'A', description: '', rating: 5, image: '/a.png' },
  { id: '2', price: 26.99, slug: 'b', name: 'B', description: '', rating: 5, image: '/b.png' },
]

describe('validateItems', () => {
  it('accepts valid items', () => {
    expect(validateItems([{ id: '1', qty: 2 }], catalog)).toEqual([{ id: '1', qty: 2 }])
  })
  it('throws on empty cart', () => {
    expect(() => validateItems([], catalog)).toThrow(/empty/i)
  })
  it('throws on unknown id', () => {
    expect(() => validateItems([{ id: '99', qty: 1 }], catalog)).toThrow(/unknown/i)
  })
  it('throws on non-positive qty', () => {
    expect(() => validateItems([{ id: '1', qty: 0 }], catalog)).toThrow(/quantity/i)
  })
  it('throws on non-integer qty', () => {
    expect(() => validateItems([{ id: '1', qty: 1.5 }], catalog)).toThrow(/quantity/i)
  })
  it('throws when qty exceeds cap of 20', () => {
    expect(() => validateItems([{ id: '1', qty: 21 }], catalog)).toThrow(/quantity/i)
  })
})

describe('buildLineItems', () => {
  it('builds GBP line items with pence amounts from the catalog', () => {
    const items = buildLineItems([{ id: '1', qty: 2 }], catalog)
    expect(items).toEqual([
      {
        quantity: 2,
        price_data: {
          currency: 'gbp',
          unit_amount: 2899,
          product_data: { name: 'A' },
        },
      },
    ])
  })
})

describe('shippingOption', () => {
  it('charges £3.95 below £30 subtotal', () => {
    // subtotal = 26.99
    const opt = shippingOption([{ id: '2', qty: 1 }], catalog)
    expect(opt.shipping_rate_data.fixed_amount).toEqual({ amount: 395, currency: 'gbp' })
    expect(opt.shipping_rate_data.display_name).toMatch(/standard/i)
  })
  it('is free at or above £30 subtotal', () => {
    // subtotal = 28.99 * 2 = 57.98
    const opt = shippingOption([{ id: '1', qty: 2 }], catalog)
    expect(opt.shipping_rate_data.fixed_amount).toEqual({ amount: 0, currency: 'gbp' })
    expect(opt.shipping_rate_data.display_name).toMatch(/free/i)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- netlify/functions/checkout-core.test.ts`
Expected: FAIL — `checkout-core.ts` does not exist.

- [ ] **Step 3: Write the implementation**

`netlify/functions/checkout-core.ts`:

```ts
import { products, type Product } from '../../lib/products'

export interface IncomingItem {
  id: string
  qty: number
}

const MAX_QTY = 20
const FREE_SHIPPING_THRESHOLD = 30 // GBP
const FLAT_SHIPPING_PENCE = 395

export function validateItems(items: unknown, catalog: Product[] = products): IncomingItem[] {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Cart is empty')
  }
  const ids = new Set(catalog.map((p) => p.id))
  return items.map((raw) => {
    const item = raw as Partial<IncomingItem>
    if (typeof item.id !== 'string' || !ids.has(item.id)) {
      throw new Error(`Unknown product: ${String(item?.id)}`)
    }
    if (
      typeof item.qty !== 'number' ||
      !Number.isInteger(item.qty) ||
      item.qty < 1 ||
      item.qty > MAX_QTY
    ) {
      throw new Error(`Invalid quantity for product ${item.id}`)
    }
    return { id: item.id, qty: item.qty }
  })
}

export function buildLineItems(items: IncomingItem[], catalog: Product[] = products) {
  return items.map((item) => {
    const product = catalog.find((p) => p.id === item.id)!
    return {
      quantity: item.qty,
      price_data: {
        currency: 'gbp',
        unit_amount: Math.round(product.price * 100),
        product_data: { name: product.name },
      },
    }
  })
}

export function subtotalPounds(items: IncomingItem[], catalog: Product[] = products): number {
  return items.reduce((sum, item) => {
    const product = catalog.find((p) => p.id === item.id)!
    return sum + product.price * item.qty
  }, 0)
}

export function shippingOption(items: IncomingItem[], catalog: Product[] = products) {
  const free = subtotalPounds(items, catalog) >= FREE_SHIPPING_THRESHOLD
  return {
    shipping_rate_data: {
      type: 'fixed_amount' as const,
      display_name: free ? 'Free UK shipping' : 'Standard UK shipping',
      fixed_amount: {
        amount: free ? 0 : FLAT_SHIPPING_PENCE,
        currency: 'gbp',
      },
    },
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- netlify/functions/checkout-core.test.ts`
Expected: PASS (9 tests).

- [ ] **Step 5: Commit**

```bash
git add netlify/functions/checkout-core.ts netlify/functions/checkout-core.test.ts
git commit -m "feat: add checkout pricing/validation core with tests"
```

---

### Task 8: Netlify function handler + config

The thin handler reads the secret key, calls the core functions, creates the Stripe session, and returns the URL. Adds the `stripe` dependency, `netlify.toml` functions config, and a committed `.env.example` (never the real key).

**Files:**
- Create: `netlify/functions/create-checkout.ts`
- Create: `.env.example`
- Modify: `netlify.toml`
- Modify: `package.json` (via npm install)

- [ ] **Step 1: Install the Stripe SDK and Netlify CLI**

Run: `cd ~/optilife2.0 && npm install stripe && npm install -D netlify-cli`
Expected: `stripe` in dependencies, `netlify-cli` in devDependencies.

- [ ] **Step 2: Write the handler**

`netlify/functions/create-checkout.ts`:

```ts
import type { Handler } from '@netlify/functions'
import Stripe from 'stripe'
import { buildLineItems, shippingOption, validateItems } from './checkout-core'

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Stripe is not configured' }) }
  }

  let items
  try {
    const body = JSON.parse(event.body ?? '{}')
    items = validateItems(body.items)
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: (err as Error).message }) }
  }

  const siteUrl =
    process.env.SITE_URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.URL ||
    (event.headers.origin ?? 'http://localhost:8888')

  const stripe = new Stripe(secret)

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: buildLineItems(items),
      shipping_options: [shippingOption(items)],
      shipping_address_collection: { allowed_countries: ['GB'] },
      success_url: `${siteUrl}/shop/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/shop/`,
    })
    return { statusCode: 200, body: JSON.stringify({ url: session.url }) }
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: (err as Error).message }) }
  }
}

export { handler }
```

- [ ] **Step 3: Install the Netlify functions types**

Run: `npm install -D @netlify/functions`
Expected: `@netlify/functions` in devDependencies (provides the `Handler` type).

- [ ] **Step 4: Configure `netlify.toml`**

Add a functions block to `netlify.toml` (append after the existing `[build.environment]` section):

```toml
[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
```

- [ ] **Step 5: Create `.env.example` (placeholder values only)**

`.env.example`:

```bash
# Copy to .env for local `netlify dev`. NEVER commit the real .env.
# Use a TEST key (sk_test_...) for local testing; the live key lives only
# in Netlify's environment variables UI.
STRIPE_SECRET_KEY=sk_test_xxx
SITE_URL=http://localhost:8888
```

- [ ] **Step 6: Verify the function and site build compile**

Run: `npm run build`
Expected: site build succeeds (the function is bundled by Netlify at deploy/`netlify dev` time, not by `next build`, so this only confirms the app still compiles).

Run: `npm test`
Expected: all tests PASS (cart-reducer + checkout-core).

- [ ] **Step 7: Commit**

```bash
git add netlify/functions/create-checkout.ts netlify.toml .env.example package.json package-lock.json
git commit -m "feat: add Stripe Checkout Netlify function and config"
```

---

### Task 9: Wire the drawer Checkout button (fetch → redirect, GH-Pages-safe)

Replace the placeholder `CheckoutButton` from Task 6 with one that POSTs to the function and redirects. On the GitHub Pages build (`NEXT_PUBLIC_BASE_PATH` is `/optilife2.0`), the function does not exist, so render a disabled "main store" state instead of a failing fetch.

**Files:**
- Modify: `components/cart/CartDrawer.tsx`

- [ ] **Step 1: Replace the placeholder `CheckoutButton`**

Remove the placeholder `CheckoutButton` function at the bottom of `components/cart/CartDrawer.tsx` and replace it with:

```tsx
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
```

- [ ] **Step 2: Add the `useState` import**

Ensure the top of `components/cart/CartDrawer.tsx` imports `useState`:

```tsx
import { useState } from 'react'
```

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/cart/CartDrawer.tsx
git commit -m "feat: wire cart checkout button to Stripe function"
```

---

### Task 10: Order success page

**Files:**
- Create: `app/shop/success/page.tsx`

- [ ] **Step 1: Create the success page**

`app/shop/success/page.tsx`:

```tsx
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
```

Note: if `@/components/ui/Section` does not accept children as plain wrapper, inspect `components/ui/Section.tsx` first and match its prop API (it is used as `<Section>...</Section>` in `app/shop/page.tsx`, so children are supported).

- [ ] **Step 2: Verify the build compiles and the route is exported**

Run: `npm run build`
Expected: build succeeds and `out/shop/success/index.html` is generated.

- [ ] **Step 3: Commit**

```bash
git add app/shop/success/page.tsx
git commit -m "feat: add order success page that clears the cart"
```

---

### Task 11: End-to-end manual verification (test mode)

No code — verify the whole flow locally with **Stripe test keys** before going live.

- [ ] **Step 1: Create a local `.env` with a TEST key**

Copy `.env.example` to `.env` and set `STRIPE_SECRET_KEY=sk_test_…` from the Stripe Dashboard (Test mode). `.env` is git-ignored — confirm with `git status` that it does NOT appear.

- [ ] **Step 2: Run the site + function together**

Run: `npx netlify dev`
Expected: serves the app (typically on `http://localhost:8888`) with the function mounted at `/.netlify/functions/create-checkout`.

- [ ] **Step 3: Exercise the flow**

In the browser:
1. Go to `/shop/`, click **Add** on two products → drawer opens, badge shows count.
2. Adjust quantities; confirm subtotal, the £3.95 → FREE shipping switch at £30, and total.
3. Click **Checkout** → redirected to Stripe's hosted page.
4. Confirm shipping address asks for **United Kingdom only**.
5. Pay with test card `4242 4242 4242 4242`, any future expiry, any CVC/postcode.
6. Land on `/shop/success/` → cart is now empty (badge gone).
7. In the Stripe **Test** Dashboard → Payments, confirm the order with the correct line items, shipping line, and address.

Expected: all of the above succeed.

- [ ] **Step 4: Go-live checklist (manual, outside this plan)**

Document for the user (do not commit secrets):
1. In Netlify → Site settings → Environment variables, add `STRIPE_SECRET_KEY` = the **live** `sk_live_…` key, and `SITE_URL` = the production URL.
2. Deploy the branch / merge to `main`.
3. Smoke-test one real (or £0-via-coupon) order, then refund it.

- [ ] **Step 5: Final full test run**

Run: `npm test`
Expected: all tests PASS.

---

## Notes for the implementer

- **Never** put a real `sk_live_`/`sk_test_` key in any committed file. Only `.env` (git-ignored) locally and Netlify's env UI in production.
- The publishable key (`pk_live_…`) is intentionally unused: the redirect flow uses `session.url` directly, so there is no Stripe.js on the client.
- GitHub Pages deploys cannot run the function — the drawer detects this via `NEXT_PUBLIC_BASE_PATH` and links to the Netlify store instead. Update that URL in Task 9 if the production domain differs.
- If `npm run build` fails on the function files, confirm `next.config.ts`/tsconfig is not trying to type-check `netlify/functions` as app code; Next ignores files outside `app/`, `components/`, `lib/` by default, but the function imports only `../../lib/products` (pure data), so there is no Next coupling.
