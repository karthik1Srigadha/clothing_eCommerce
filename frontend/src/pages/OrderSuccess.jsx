import { useParams } from "react-router-dom";

export default function OrderSuccess() {
  const { id } = useParams();
  return (
    <div style={{ padding: 20 }}>
      <h2>Order Successful!</h2>
      <p>Your order ID: {id}</p>
    </div>
  );
}
