import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, updateCartQty, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="container" style={{ padding: "40px 20px" }}>

      <h2 style={{ marginBottom: "25px", fontSize: "28px" }}>Your Cart</h2>

      {cart.length === 0 && (
        <p style={{ fontSize: "18px", opacity: 0.7 }}>Your cart is empty.</p>
      )}

      {/* CART ITEMS */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cart.map((item) => (
          <div
            className="cart-item"
            key={(item.productId ?? item._id) + item.size}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              borderRadius: "10px",
              background: "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
            }}
          >
            <div>
              <h4 style={{ marginBottom: 6 }}>{item.name}</h4>
              <p style={{ margin: 0 }}>Size: {item.size}</p>

              {/* QTY UPDATE */}
              <div style={{ marginTop: 5 }}>
                <select
                  value={item.qty}
                  onChange={(e) =>
                    updateCartQty(
                      item.productId ?? item._id,
                      item.size,
                      Number(e.target.value)
                    )
                  }
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() =>
                    removeFromCart(item.productId ?? item._id, item.size)
                  }
                  className="btn-outline"
                  style={{
                    marginLeft: "10px",
                    padding: "6px 12px",
                    border: "1px solid black",
                    borderRadius: "5px",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>

            <p style={{ fontWeight: 600, fontSize: "18px" }}>
              ₹{item.price * item.qty}
            </p>
          </div>
        ))}
      </div>

      {/* TOTAL + CHECKOUT */}
      {cart.length > 0 && (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            background: "#fafafa",
            borderRadius: "10px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)"
          }}
        >
          <h3 style={{ margin: 0 }}>Total: ₹{total}</h3>

          <a
            href="/checkOut"
            className="btn"
            style={{
              padding: "10px 20px",
              background: "black",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Checkout
          </a>
        </div>
      )}
    </div>
  );
}
