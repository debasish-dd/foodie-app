import { create } from "zustand";

type CartItem = {
  quantity: number;
  price: number;
  name: string;
};

type CartItems = Record<string, CartItem>;

type CartStore = {
  items: CartItems;

  addItem: (item: any) => void;
  removeItem: (id: string | number) => void;

  totalItems: () => number;
  subtotal: () => number;

  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: {},

  addItem: (item) =>
    set((state) => {
      const key = String(item.id);
      const existing = state.items[key];

      return {
        items: {
          ...state.items,
          [key]: {
            quantity: existing ? existing.quantity + 1 : 1,
            price: item.price,
            name: item.name,
          },
        },
      };
    }),

  removeItem: (id) =>
    set((state) => {
      const key = String(id);
      const existing = state.items[key];

      if (!existing) return state;

      if (existing.quantity <= 1) {
        const updated = { ...state.items };
        delete updated[key];

        return {
          items: updated,
        };
      }

      return {
        items: {
          ...state.items,
          [key]: {
            ...existing,
            quantity: existing.quantity - 1,
          },
        },
      };
    }),

  totalItems: () => {
    const items = get().items;

    return Object.values(items).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  },

  subtotal: () => {
  const items = get().items;

  return Object.values(items).reduce((acc, item) => {
    const price =
      typeof item.price === "number"
        ? item.price
        : Number(item.price) || 0;

    return acc + price * item.quantity;
  }, 0);
},

  clearCart: () => set({ items: {} }),
}));