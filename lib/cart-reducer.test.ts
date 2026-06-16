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
