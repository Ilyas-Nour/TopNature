import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: string
    name: string
    price: number
    imageUrl: string
    quantity: number
}

interface CartState {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getTotal: () => number
    getItemCount: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (newItem: CartItem) => {
                const items = get().items
                const existingItem = items.find((item: CartItem) => item.id === newItem.id)

                if (existingItem) {
                    set({
                        items: items.map((item: CartItem) =>
                            item.id === newItem.id
                                ? { ...item, quantity: item.quantity + newItem.quantity }
                                : item
                        ),
                    })
                } else {
                    set({ items: [...items, newItem] })
                }
            },

            removeItem: (id: string) => {
                set({ items: get().items.filter((item: CartItem) => item.id !== id) })
            },

            updateQuantity: (id: string, quantity: number) => {
                if (quantity < 1) {
                    get().removeItem(id)
                    return
                }

                set({
                    items: get().items.map((item: CartItem) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                })
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                return get().items.reduce(
                    (total: number, item: CartItem) => total + item.price * item.quantity,
                    0
                )
            },

            getItemCount: () => {
                return get().items.reduce((count: number, item: CartItem) => count + item.quantity, 0)
            },
        }),
        {
            name: 'ecom-cart-storage',
        }
    )
)
