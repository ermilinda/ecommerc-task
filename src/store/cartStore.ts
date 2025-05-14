import { create } from 'zustand';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartStore = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i._id === item._id);

      if (existingItem) {
        const updatedItems = state.items.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );

        return {
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + item.price,
        };
      } else {
        const newItem = { ...item, quantity: 1 };
        return {
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + item.price,
        };
      }
    }),

  removeItem: (itemId) =>
    set((state) => {
      const itemToRemove = state.items.find((i) => i._id === itemId);
      if (!itemToRemove) return state;

      return {
        items: state.items.filter((i) => i._id !== itemId),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice:
          state.totalPrice - itemToRemove.price * itemToRemove.quantity,
      };
    }),

  updateQuantity: (itemId, quantity) =>
    set((state) => {
      const item = state.items.find((i) => i._id === itemId);
      if (!item) return state;

      const quantityDiff = quantity - item.quantity;
      const priceDiff = item.price * quantityDiff;

      return {
        items: state.items.map((i) =>
          i._id === itemId ? { ...i, quantity } : i
        ),
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + priceDiff,
      };
    }),

  clearCart: () =>
    set({
      items: [],
      totalItems: 0,
      totalPrice: 0,
    }),
}));
