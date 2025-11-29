import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

export default function Products() {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
  });

  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get("/products", {
      params: {
        search: filters.search,
        category: filters.category,
      },
    });
    setData(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <div className="container">
  <h2 style={{ margin: "20px 0" }}>Products</h2>

  <div className="grid grid-4">
    {data.map((p) => (
      <ProductCard key={p._id} item={p} />
    ))}
  </div>
</div>

  );
}
