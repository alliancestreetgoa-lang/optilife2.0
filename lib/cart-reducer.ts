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
