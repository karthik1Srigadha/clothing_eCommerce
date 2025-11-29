export default function Filters({ filters, setFilters }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <input
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option>All</option>
        <option>Men</option>
        <option>Women</option>
        <option>Kids</option>
      </select>
    </div>
  );
}
