import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("guestCart");
    return stored ? JSON.parse(stored) : [];
  });

  // Save guest cart
  useEffect(() => {
    if (!user) localStorage.setItem("guestCart", JSON.stringify(cart));
  }, [cart, user]);

  // Merge guest cart on login
  useEffect(() => {
    const merge = async () => {
      if (user) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];

        if (guestCart.length > 0) {
          await api.post("/cart/merge", {
            items: guestCart.map(i => ({
              productId: i.productId,
              size: i.size,
              qty: i.qty,
            })),
          });
        }

        localStorage.removeItem("guestCart");
        fetchCart();
      }
    };
    merge();
  }, [user]);

  // Fetch logged user cart
  const fetchCart = async () => {
    if (user) {
      const res = await api.get("/cart");
      setCart(res.data.items);
    }
  };

  // Add item to cart
  const addToCart = async (product, size) => {
    if (!size) return alert("Choose a size");

    if (user) {
      await api.post("/cart/add", { productId: product._id, size, qty: 1 });
      fetchCart();
    } else {
      const exists = cart.find(i => i.productId === product._id && i.size === size);

      if (exists) exists.qty += 1;
      else cart.push({ ...product, productId: product._id, size, qty: 1 });

      setCart([...cart]);
    }
  };

  // Update Qty
  const updateCartQty = async (productId, size, qty) => {
    if (user) {
      await api.put("/cart/update", { productId, size, qty });
      fetchCart();
    } else {
      const updated = cart.map(i =>
        i.productId === productId && i.size === size ? { ...i, qty } : i
      );
      setCart(updated);
      localStorage.setItem("guestCart", JSON.stringify(updated));
    }
  };

  // Remove Item
  const removeFromCart = async (productId, size) => {
    if (user) {
      await api.delete(`/cart/remove?productId=${productId}&size=${size}`);
      fetchCart();
    } else {
      const updated = cart.filter(i => !(i.productId === productId && i.size === size));
      setCart(updated);
      localStorage.setItem("guestCart", JSON.stringify(updated));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartQty, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
