import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "./AuthContext.jsx";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("guestCart");
    return stored ? JSON.parse(stored) : [];
  });

  // Save GUEST cart
  useEffect(() => {
    if (!user) localStorage.setItem("guestCart", JSON.stringify(cart));
  }, [cart, user]);

  // Merge guest cart AFTER login
  useEffect(() => {
    const merge = async () => {
      if (user) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        await api.post("/cart/merge", {
          items: guestCart.map(i => ({
            productId: i.productId,
            size: i.size,
            qty: i.qty,
          })),
        });

        localStorage.removeItem("guestCart");
        fetchCart();
      }
    };
    merge();
  }, [user]);

  const fetchCart = async () => {
    if (user) {
      const res = await api.get("/cart");
      setCart(res.data.items);
    }
  };

  const addToCart = async (product, size) => {
    if (!size) {
      alert("Select a size");
      return;
    }

    if (user) {
      await api.post("/cart/add", {
        productId: product._id,
        size,
        qty: 1,
      });
      fetchCart();
    } else {
      const exists = cart.find(i => i._id === product._id && i.size === size);
      if (exists) exists.qty += 1;
      else cart.push({ ...product, productId: product._id, qty: 1, size });

      setCart([...cart]);
    }
  };

  const updateCartQty = async (productId, size, newQty) => {
    if (user) {
      await api.post("/cart/add", {
        productId,
        size,
        qty: newQty - (cart.find(i => (i.productId ?? i._id) === productId && i.size === size)?.qty || 0)
      });
      fetchCart();
    } else {
      const updated = cart.map((i) =>
        i.productId === productId && i.size === size
          ? { ...i, qty: newQty }
          : i
      );
      setCart(updated);
      localStorage.setItem("guestCart", JSON.stringify(updated));
    }
  };

  const removeFromCart = async (productId, size) => {
    if (user) {
      const updated = cart.filter(
        (i) => !(i.product.equals(productId) && i.size === size)
      );
      await api.post("/cart/merge", {
        items: updated.map((i) => ({
          productId: i.productId ?? i._id,
          size: i.size,
          qty: i.qty
        }))
      });
      fetchCart();
    } else {
      const updated = cart.filter(
        (i) => !(i.productId === productId && i.size === size)
      );
      setCart(updated);
      localStorage.setItem("guestCart", JSON.stringify(updated));
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        fetchCart,
        updateCartQty,      // ✅ ADDED HERE
        removeFromCart      // ✅ ADDED HERE
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

