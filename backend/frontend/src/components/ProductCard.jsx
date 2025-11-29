import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <div className="product-card">
      <div className="product-img-box">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="product-info">
        <h3>{item.name}</h3>
        <p className="price">₹{item.price}</p>
        

        <Link to={`/product/${item._id}`} className="btn view-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}
