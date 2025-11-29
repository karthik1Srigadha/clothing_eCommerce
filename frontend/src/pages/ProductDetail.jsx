import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [item, setItem] = useState(null);
  const [size, setSize] = useState("");

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setItem(res.data));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <img src={item.image} width="300" alt="" />
      <h2>{item.name}</h2>
      <p>₹{item.price}</p>

      <select onChange={(e) => setSize(e.target.value)}>
        <option value="">Select Size</option>
        {item.sizes.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <button onClick={() => addToCart(item, size)} disabled={!size}>
        Add to Cart
      </button>
    </div>
  );
}
