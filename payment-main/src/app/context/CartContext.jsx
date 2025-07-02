"use client";
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, hasMounted]);

  const addToCart = (item) => {
    const existing = cart.find((p) => p.priceId === item.priceId);
    if (existing) {
      setCart(
        cart.map((p) =>
          p.priceId === item.priceId
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (priceId) => {
    setCart(cart.filter((item) => item.priceId !== priceId));
  };

  const clearCart = () => setCart([]);

  const clearCartAfterSuccess = () => {
    setCart([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
      localStorage.removeItem("lastPurchase");
    }
  };

  if (!hasMounted) return null;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        clearCartAfterSuccess, // exportada
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
