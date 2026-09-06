import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { track } from "@/lib/analytics";
import { getProducts } from "@/lib/commerce";
import type { Product } from "@/data/types";

const KEY = "mc.cart";

export type CartItem = {
  key: string;
  productId: string;
  colorId: string;
  size: string;
  quantity: number;
};

export type CartLine = CartItem & { product: Product };

type Ctx = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  addToCart: (input: Omit<CartItem, "key" | "quantity"> & { quantity?: number }) => void;
  updateCartItem: (key: string, quantity: number) => void;
  removeCartItem: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<Ctx | null>(null);

const makeKey = (p: string, c: string, s: string) => `${p}|${c}|${s}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const addToCart = useCallback<Ctx["addToCart"]>((input) => {
    const key = makeKey(input.productId, input.colorId, input.size);
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + (input.quantity ?? 1) } : i,
        );
      }
      return [...prev, { ...input, key, quantity: input.quantity ?? 1 }];
    });
    track("add_to_cart", { productId: input.productId, size: input.size });
  }, []);

  const updateCartItem = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, quantity } : i)),
    );
  }, []);

  const removeCartItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
    track("remove_from_cart", { key });
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<Ctx>(() => {
    const all = getProducts();
    const lines: CartLine[] = items
      .map((i) => {
        const product = all.find((p) => p.id === i.productId);
        return product ? { ...i, product } : null;
      })
      .filter((l): l is CartLine => Boolean(l));

    return {
      items,
      lines,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.product.price * l.quantity, 0),
      drawerOpen,
      setDrawerOpen,
      addToCart,
      updateCartItem,
      removeCartItem,
      clearCart,
    };
  }, [items, drawerOpen, addToCart, updateCartItem, removeCartItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
