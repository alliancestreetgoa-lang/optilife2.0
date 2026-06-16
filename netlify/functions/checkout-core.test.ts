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
