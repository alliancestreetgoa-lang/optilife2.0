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
