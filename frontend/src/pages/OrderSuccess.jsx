// frontend/src/pages/OrderSuccess.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!id) return;
    // try to fetch order (requires auth if route is protected)
    (async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data.order);
      } catch (err) {
        console.warn("Could not fetch order details (may be protected).", err);
      }
    })();
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Successful!</h2>
      <p>Your order ID: <strong>{id}</strong></p>

      {order ? (
        <div style={{ marginTop: 20 }}>
          <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
          <h3>Items</h3>
          <ul>
            {order.items.map(i => (
              <li key={i.product + i.size}>
                {i.name} ({i.size}) x {i.qty} — ₹{i.price} each
              </li>
            ))}
          </ul>
          <h3>Total: ₹{order.totalPrice}</h3>
        </div>
      ) : (
        <p style={{ color: "#666" }}>If you're logged in, order details will appear here.</p>
      )}
    </div>
  );
}
