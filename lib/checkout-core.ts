import { products, type Product } from './products'

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
