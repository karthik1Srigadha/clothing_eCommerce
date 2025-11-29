import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [item, setItem] = useState(null);
  const [size, setSize] = useState("");
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then((res) => setItem(res.data));
  }, [id]);

  // 🔥 Show popup and hide after 1.5s
  const showPopup = () => {
    setPopup(true);
    setTimeout(() => setPopup(false), 1500);
  };

  if (!item) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        display: "flex",
        gap: "40px",
        padding: "20px",
      }}
    >
      {/* PRODUCT IMAGE */}
      <div style={{ flex: 1 }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100%",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        />
      </div>

      {/* PRODUCT INFO */}
      <div style={{ flex: 1 }}>
        <h2 style={{ marginBottom: 10, fontSize: "32px" }}>{item.name}</h2>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>₹{item.price}</p>

        <p style={{ marginTop: 15 }}>{item.description}</p>

        {/* SIZE SELECT */}
        <div style={{ marginTop: 20 }}>
          <label style={{ fontSize: "16px" }}>Select Size:</label>
          <br />
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              marginTop: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "200px",
            }}
          >
            <option value="">Select Size</option>
            {item.sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={() => {
            if (!size) {
              alert("Please select a size.");
              return;
            }
            addToCart(item, size);
            showPopup(); // 🔥 show popup
          }}
          disabled={!size}
          style={{
            marginTop: "25px",
            background: size ? "black" : "#999",
            color: "white",
            padding: "12px 30px",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: size ? "pointer" : "not-allowed",
            border: "none",
          }}
        >
          Add to Cart
        </button>
      </div>

      {/* 🔥 POPUP MESSAGE */}
      {popup && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "black",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 2000,
            animation: "fadeInOut 1.5s ease",
          }}
        >
          Added to Cart!
        </div>
      )}
    </div>
  );
}
