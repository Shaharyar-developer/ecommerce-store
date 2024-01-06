"use client";
import { ReactNode, createContext, useContext, useState } from "react";
import { Product } from "@/lib/types";

interface CartContextValue {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const addToCart = (product: Product) => {
    const existingProduct = cart.find((p) => p.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map((product) =>
        product.id === existingProduct.id
          ? {
              ...product,
              quantity: product.quantity ? product.quantity + 1 : 1,
            }
          : product
      );
      setCart(() => updatedCart);
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(() => newCart);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const removeItem = (productId: number) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(() => updatedCart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const updateItemQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    const updatedCart = cart.map((product) =>
      product.id === productId ? { ...product, quantity } : product
    );
    setCart(() => updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, updateItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
