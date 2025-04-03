import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
    image_url: string;
  };
}

interface CartStore {
  items: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(
          name,
          price,
          image_url
        )
      `);
    
    if (!error) {
      set({ items: data });
    }
    set({ loading: false });
  },

  addToCart: async (productId: string) => {
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ product_id: productId, quantity: 1 }])
      .select();
    
    if (!error) {
      get().fetchCart();
    }
  },

  removeFromCart: async (itemId: string) => {
    await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);
    
    get().fetchCart();
  },

  updateQuantity: async (itemId: string, quantity: number) => {
    await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId);
    
    get().fetchCart();
  },
}));