export default function Filters({ filters, setFilters }) {
  return (
    <div style={{ marginBottom: 20 }}>
      
      {/* Search */}
      <input
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      {/* Category */}
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option>All</option>
        <option>Men</option>
        <option>Women</option>
        <option>Kids</option>
      </select>

      {/* Size */}
      <select
        value={filters.size}
        onChange={(e) => setFilters({ ...filters, size: e.target.value })}
      >
        <option value="">Size</option>
        <option>S</option>
        <option>M</option>
        <option>L</option>
        <option>XL</option>
      </select>

      {/* Min Price */}
      <input
        type="number"
        placeholder="Min ₹"
        onChange={(e) =>
          setFilters({ ...filters, minPrice: e.target.value })
        }
      />

      {/* Max Price */}
      <input
        type="number"
        placeholder="Max ₹"
        onChange={(e) =>
          setFilters({ ...filters, maxPrice: e.target.value })
        }
      />
    </div>
  );
}
