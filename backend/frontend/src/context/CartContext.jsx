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

  // save guest cart
  useEffect(() => {
    if (!user) localStorage.setItem("guestCart", JSON.stringify(cart));
  }, [cart, user]);

  // merge guest cart after login
  useEffect(() => {
    const merge = async () => {
      if (user) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        await api.post("/cart/merge", {
          items: guestCart.map((i) => ({
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

  // size must be selected
  if (!size) {
    alert("Please select a size.");
    return;
  }

  if (user) {
    await api.post("/cart/add", {
      productId: product._id,
      size,
      qty: 1,
    });
    fetchCart();
    alert("Added to cart!"); // 🔥 FEEDBACK
  } else {
    const exists = cart.find(
      (i) => i._id === product._id && i.size === size
    );

    if (exists) {
      exists.qty += 1;
    } else {
      cart.push({
        ...product,
        productId: product._id,
        qty: 1,
        size,
      });
    }

    setCart([...cart]);
    alert("Added to cart!"); // 🔥 FEEDBACK
  }
};

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};
