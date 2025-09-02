export default function FilterBar({ filters, setFilters }) {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginTop: "20px",
      marginBottom: "20px",
      justifyContent: "center"
    }}>
      <input
        type="text"
        placeholder="Search events..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      />

      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      >
        <option value="">All Categories</option>
        <option value="Music">Music</option>
        <option value="Technology">Technology</option>
        <option value="Art">Art</option>
      </select>

      <select
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      >
        <option value="">All Locations</option>
        <option value="KL Convention Centre">KL Convention Centre</option>
        <option value="Penang Digital Hub">Penang Digital Hub</option>
        <option value="KL Art Gallery">KL Art Gallery</option>
      </select>

      <input
        type="date"
        lang="en-CA"
        value={filters.dateRange.start}
        onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        type="date"
        lang="en-CA"
        value={filters.dateRange.end}
        onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })}
        style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
    </div>
  );
}
