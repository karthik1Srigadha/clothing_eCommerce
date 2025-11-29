import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="container">
  <h2>Your Cart</h2>

  {cart.map((item) => (
    <div className="cart-item" key={item._id + item.size}>
      <div>
        <h4>{item.name}</h4>
        <p>Size: {item.size}</p>
        <p>Qty: {item.qty}</p>
      </div>

      <p style={{ fontWeight: 600 }}>₹{item.price * item.qty}</p>
    </div>
  ))}

  <a href="/checkOut" className="btn">Checkout</a>
</div>

  );
}
