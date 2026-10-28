'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useSiteData } from '@/lib/site-data'
import { apiProvider } from './api'
import { mockProvider } from './mock'
import { defaultCart, priceCart, type Catalog } from './pricing'
import type { BookingProvider, Cart, Order } from './types'

const CART_KEY = 'np-cart-v1'
const ORDER_KEY = 'np-order-v1'

/**
 * The running site books through its own API (operations database). The
 * static preview copy has no server, so it uses demo data.
 */
export const provider: BookingProvider = process.env.NEXT_PUBLIC_STATIC === '1' ? mockProvider : apiProvider

type CartCtx = {
  cart: Cart
  setCart: (patch: Partial<Cart> | ((c: Cart) => Partial<Cart>)) => void
  resetCart: () => void
  priced: ReturnType<typeof priceCart>
  catalog: Catalog
  order: Order | null
  setOrder: (o: Order | null) => void
  ready: boolean
}

const Ctx = createContext<CartCtx | null>(null)

function read<T>(key: string): T | null {
  try {
    const raw = window.sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}
function write(key: string, value: unknown) {
  try {
    if (value === null) window.sessionStorage.removeItem(key)
    else window.sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable: the cart still works for this page view */
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { catalog } = useSiteData()
  const [cart, setCartState] = useState<Cart>(defaultCart)
  const [order, setOrderState] = useState<Order | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = read<Cart>(CART_KEY)
    if (saved) setCartState({ ...defaultCart, ...saved, extras: { ...defaultCart.extras, ...saved.extras } })
    setOrderState(read<Order>(ORDER_KEY))
    setReady(true)
  }, [])

  const setCart = useCallback<CartCtx['setCart']>((patch) => {
    setCartState((c) => {
      const next = { ...c, ...(typeof patch === 'function' ? patch(c) : patch) }
      write(CART_KEY, next)
      return next
    })
  }, [])

  const resetCart = useCallback(() => {
    setCartState(defaultCart)
    write(CART_KEY, null)
  }, [])

  const setOrder = useCallback((o: Order | null) => {
    setOrderState(o)
    write(ORDER_KEY, o)
  }, [])

  const value = useMemo(
    () => ({ cart, setCart, resetCart, priced: priceCart(cart, catalog), catalog, order, setOrder, ready }),
    [cart, setCart, resetCart, order, setOrder, ready, catalog],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useCart() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useCart must be used inside <CartProvider>')
  return c
}
