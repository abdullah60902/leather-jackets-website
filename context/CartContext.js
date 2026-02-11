"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Try to load cart from localStorage
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("orderCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item) => {
    // For now, simpler: One active order at a time
    setCart(item);
    localStorage.setItem("orderCart", JSON.stringify(item));
  };

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("orderCart");
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
