# Stripe Checkout Integration — Design Spec

**Date:** 2026-06-16
**Project:** OptiLife 2.0 (`optilife2.0`) — static-export Next.js 16 supplement shop
**Status:** Approved, ready for implementation plan

## Goal

Let customers add multiple supplements to a cart and pay securely via Stripe
Checkout. Orders are fulfilled manually from the Stripe Dashboard; Stripe emails
the customer a receipt. No order-automation webhook in v1.

## Constraints & context

- The site is a **static export** (`output: "export"` in `next.config.ts`),
  deployed to **Netlify** (`publish = "out"`) and **GitHub Pages**.
- A static site has no backend, so the secure server-side part of Stripe
  Checkout runs in a **Netlify serverless function**.
- **Checkout works on Netlify only.** GitHub Pages cannot run functions, so the
  Checkout button there must degrade gracefully (see Edge cases).
- Catalog: 4 physical supplements in `lib/products.ts`, prices in GBP
  (£26.99–£29.99). The `[Add]` buttons already exist in `ProductCard` but are
  not wired to anything.

## Decisions (from brainstorming)

| Question | Decision |
|---|---|
| Checkout model | Real multi-item cart + Stripe Checkout via serverless function |
| Shipping | Flat **£3.95** under £30 subtotal, **free** at/over £30, **UK (GB) only** |
| Order handling | Stripe Dashboard + email receipts only — **no webhook** |
| Pricing source of truth | `lib/products.ts`, re-derived server-side at checkout |

## Architecture

```
ProductCard [Add] ──▶ Cart (React context + localStorage)
Header 🛒 (count) ──▶ CartDrawer (slide-out): qty ± / remove / subtotal
                              │ [Checkout]
                              ▼
        POST /.netlify/functions/create-checkout  { items: [{id, qty}] }
                              │  (re-derives REAL prices from lib/products)
                              ▼
                 Stripe Checkout Session ──▶ session.url
                              │
              window.location = url ──▶ Stripe-hosted payment page
                              │
        success_url /shop/success/  ◀── pay ── cancel_url /shop/
```

## Components

### 1. `lib/cart.tsx` — cart state
- `CartProvider` (React context) wrapping the app in `app/layout.tsx`.
- `useCart()` hook exposing:
  - `items: { product: Product; qty: number }[]`
  - `addItem(product)`, `removeItem(id)`, `setQty(id, qty)`, `clear()`
  - `subtotal: number` (GBP), `count: number` (total units)
  - `isOpen: boolean`, `openCart()`, `closeCart()` for the drawer
- Persists `items` to `localStorage` (key `optilife-cart`); rehydrates on mount.
  Guard against SSR/static-render by reading `localStorage` only in `useEffect`.

### 2. `ProductCard` (`components/ui/ProductCard.tsx`)
- Wire the existing `[Add]` button → `addItem(product)` then `openCart()`.
- `'use client'` already present.

### 3. Header
- Add a cart icon (lucide `ShoppingBag`/`ShoppingCart`) with an item-count badge.
- Clicking opens the drawer (`openCart()`).
- Locate the existing header/nav component and add it there.

### 4. `components/cart/CartDrawer.tsx`
- Slide-out panel (right side), overlay, close on overlay click / Esc.
- Renders line items: image, name, unit price, qty stepper (±), remove.
- Shows **subtotal**, the "Free UK shipping over £30 — otherwise £3.95" note,
  and a **Checkout** button.
- Empty state when cart has no items.
- Checkout button: POSTs `{ items: items.map(i => ({ id: i.product.id, qty: i.qty })) }`
  to `/.netlify/functions/create-checkout`, then `window.location = session.url`.
  Shows a loading state while the request is in flight; surfaces errors inline.

### 5. `netlify/functions/create-checkout.ts` — the only server code
- Reads `STRIPE_SECRET_KEY` from `process.env`.
- Imports the **same catalog** the client uses (`lib/products`) as the single
  source of truth.
- Accepts only `{ items: [{ id, qty }] }`. **Never trusts client prices.**
- Validation: each `id` must exist in the catalog; `qty` must be a positive
  integer; cap `qty` (e.g. ≤ 20) and reject empty carts.
- Builds `line_items` with `price_data` (currency `gbp`, `unit_amount` in pence
  derived from `product.price`).
- Computes subtotal server-side → attaches a single `shipping_options` entry:
  - subtotal ≥ £30 → `{ amount: 0, display_name: "Free UK shipping" }`
  - else → `{ amount: 395, display_name: "Standard UK shipping" }`
- `shipping_address_collection: { allowed_countries: ['GB'] }`.
- `mode: 'payment'`, `currency: 'gbp'`.
- `success_url`: `${SITE_URL}/shop/success/?session_id={CHECKOUT_SESSION_ID}`
- `cancel_url`: `${SITE_URL}/shop/`
- `SITE_URL` from env (fallback to request origin), so it works in `netlify dev`
  and production.
- Returns `{ url: session.url }` (HTTP 200) or `{ error }` (HTTP 4xx/5xx).

### 6. `app/shop/success/page.tsx`
- Thank-you / order-confirmation page.
- Clears the cart on mount (client component using `useCart().clear()`).
- Links back to the shop.

## Configuration

- **`stripe`** added as a dependency (used by the function).
- **`netlify.toml`**: add `[functions]` with `directory = "netlify/functions"`,
  and ensure esbuild bundling for the TS function.
- Env vars:
  - `STRIPE_SECRET_KEY` (`sk_live_…`) — Netlify env var + local `.env`.
    **Never committed, never pasted in chat.** `.env*` is already git-ignored.
  - `SITE_URL` — production URL (Netlify provides `URL`/`DEPLOY_PRIME_URL`; use
    those as fallback).
- The `pk_live_…` publishable key is **not needed** — the redirect flow uses
  `session.url` directly, so no Stripe.js on the client.
- Local dev: `netlify dev` runs the function + site together. Add a note/script.

## Data flow & money safety

1. Client sends only `{ id, qty }` pairs.
2. Function rejects unknown ids / bad quantities.
3. Function builds every line item's amount from `lib/products` (server-trusted).
4. Function computes shipping from the server-side subtotal.
5. Stripe handles card data (PCI) on its hosted page — no card data touches us.

## Edge cases

- **Empty cart** → Checkout disabled; drawer shows empty state.
- **GitHub Pages deploy** → the function path 404s. Detect non-Netlify host
  (e.g. `NEXT_PUBLIC_BASE_PATH` is set to `/optilife2.0`, which only happens on
  the GitHub Pages build) and render the Checkout button as a disabled
  "Checkout available on our main store" message instead of a failing fetch.
- **Function error / network failure** → show an inline error in the drawer,
  keep the cart intact, let the user retry.
- **localStorage unavailable** (private mode) → cart falls back to in-memory only.
- **Stale product id in localStorage** (catalog changed) → filter out unknown
  ids on rehydrate.

## Out of scope (v1)

- Webhooks / order database / automated fulfilment emails.
- Discount codes, tax calculation, multiple currencies.
- International shipping.
- Inventory tracking.

## Testing / verification

- Unit-test the function's pricing & shipping logic (subtotal threshold, unknown
  id rejection, qty validation) without hitting Stripe.
- Unit-test cart reducer logic (add/remove/setQty/subtotal/persistence).
- Manual: `netlify dev` → add items → checkout with a Stripe **test** key →
  complete a test payment → land on success page → cart cleared → order visible
  in Stripe test Dashboard. Switch to live key only after the test flow passes.
