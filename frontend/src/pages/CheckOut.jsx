import { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const nav = useNavigate();

  const placeOrder = async () => {
    if (user) {
      const res = await api.post("/orders");
      nav(`/order/${res.data.order._id}`);
    } else {
      const email = prompt("Enter email for order:");
      const items = cart.map((i) => ({
        productId: i._id,
        name: i.name,
        size: i.size,
        qty: i.qty,
        price: i.price,
      }));
      const res = await api.post("/orders", { items, email });
      nav(`/order/${res.data.order._id}`);
    }
  };

  return (
    <div className="container checkout-box">
  <h2>Checkout</h2>

  <button onClick={placeOrder} className="btn" style={{ marginTop: 20 }}>
    Place Order
  </button>
</div>

  );
}
