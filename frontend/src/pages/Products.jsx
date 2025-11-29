import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    size: "",
    minPrice: "",
    maxPrice: "",
  });

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(1);

  const fetchProducts = async () => {
    const res = await api.get("/products", {
      params: {
        search: filters.search,
        category: filters.category,
        size: filters.size,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        page,
        limit: 9,
      },
    });

    setData(res.data.products);
    setPages(res.data.pages);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  return (
    <div className="container" style={{ padding: "30px 0" }}>

      {/* ---------- PAGE TITLE ---------- */}
      <h2 style={{ marginBottom: 25, fontSize: 28 }}>Products</h2>

      {/* ---------- FILTERS UI ---------- */}
      <div
        style={{
          marginBottom: 30,
          display: "grid",
          gridTemplateColumns: "1fr 150px 150px 150px 150px",
          gap: 15,
          alignItems: "center",
        }}
      >
        {/* Search */}
        <input
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="filter-input"
        />

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="filter-select"
        >
          <option value="All">All</option>
          <option>Men</option>
          <option>Women</option>
          <option>Kids</option>
        </select>

        {/* Size */}
        <select
          value={filters.size}
          onChange={(e) => setFilters({ ...filters, size: e.target.value })}
          className="filter-select"
        >
          <option value="">Size</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>

        {/* Min Price */}
        <input
          placeholder="Min ₹"
          type="number"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          className="filter-input"
        />

        {/* Max Price */}
        <input
          placeholder="Max ₹"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          className="filter-input"
        />
      </div>

      {/* ---------- PRODUCTS GRID ---------- */}
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "25px",
        }}
      >
        {data.map((p) => (
          <ProductCard key={p._id} item={p} />
        ))}
      </div>

      {/* ---------- PAGINATION ---------- */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "center",
          gap: 20,
          alignItems: "center",
        }}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="pagination-btn"
        >
          Previous
        </button>

        <span style={{ fontSize: 18 }}>
          Page <b>{page}</b> / {pages}
        </span>

        <button
          disabled={page === pages}
          onClick={() => setPage(page + 1)}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
}
