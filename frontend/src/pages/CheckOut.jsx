// frontend/src/pages/Checkout.jsx
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, fetchCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    try {
      setLoading(true);

      if (!cart || cart.length === 0) {
        alert("Your cart is empty.");
        setLoading(false);
        return;
      }

      if (user) {
        // logged-in user: server will take items from user's cart if none provided
        const res = await api.post("/orders");
        fetchCart?.(); // refresh cart after order
        nav(`/order/${res.data.order._id}`);
      } else {
        // guest checkout: require email
        const email = prompt("Enter your email for order confirmation:");
        if (!email) {
          alert("Email required for guest checkout.");
          setLoading(false);
          return;
        }

        const items = cart.map(i => ({
          productId: i.productId || i._id,
          name: i.name,
          size: i.size,
          qty: i.qty,
          price: i.price
        }));

        const res = await api.post("/orders", { items, email });
        // clear local guest cart after placing order
        localStorage.removeItem("guestCart");
        nav(`/order/${res.data.order._id}`);
      }
    } catch (err) {
      console.error("Place order error", err);
      alert(err?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((s, i) => s + i.qty * i.price, 0);

  return (
    <div className="container checkout-box">
      <h2>Checkout</h2>

      <div style={{ marginTop: 16 }}>
        <p>
          <strong>Items:</strong> {cart.length}
        </p>
        <p>
          <strong>Total:</strong> ₹{total}
        </p>

        <button onClick={placeOrder} className="btn" disabled={loading}>
          {loading ? "Placing order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
