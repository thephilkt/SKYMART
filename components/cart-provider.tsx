"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "@/types";
import { products } from "@/lib/mock-data";

type DetailedCartItem = CartItem & { product: Product };

type CartContextValue = {
  items: CartItem[];
  detailedItems: DetailedCartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (productId: string, color?: string, quantity?: number) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  removeItem: (productId: string, color: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (value: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "skymart-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setHydrated] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) setItems(JSON.parse(saved) as CartItem[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  const addItem = useCallback((productId: string, color = "Default", quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId && item.color === color);
      if (existing) {
        return current.map((item) =>
          item === existing ? { ...item, quantity: Math.min(item.quantity + quantity, 9) } : item,
        );
      }
      return [...current, { productId, color, quantity }];
    });
    setCartOpen(true);
  }, []);

  const updateQuantity = useCallback((productId: string, color: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((current) =>
      current.map((item) =>
        item.productId === productId && item.color === color
          ? { ...item, quantity: Math.min(quantity, 9) }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string, color: string) => {
    setItems((current) =>
      current.filter((item) => !(item.productId === productId && item.color === color)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const detailedItems = useMemo(
    () =>
      items.flatMap((item) => {
        const product = products.find((candidate) => candidate.id === item.productId);
        return product ? [{ ...item, product }] : [];
      }),
    [items],
  );

  const value = useMemo<CartContextValue>(() => ({
    items,
    detailedItems,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: detailedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isCartOpen,
    setCartOpen,
  }), [items, detailedItems, addItem, updateQuantity, removeItem, clearCart, isCartOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
