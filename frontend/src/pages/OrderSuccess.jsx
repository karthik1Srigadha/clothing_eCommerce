import { useParams, useEffect, useState } from "react";
import api from "../api/api";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((res) => setOrder(res.data));
  }, []);

  if (!order) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Successful!</h2>
      <p>Order ID: {order._id}</p>
      <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
      <h3>Total: ₹{order.totalPrice}</h3>
    </div>
  );
}
