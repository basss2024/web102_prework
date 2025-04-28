function Filters({ setSearchTerm, setFilterType }) {
    return (
      <div style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search by name"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select onChange={e => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          <option value="micro">Micro</option>
          <option value="regional">Regional</option>
          <option value="brewpub">Brewpub</option>
        </select>
      </div>
    );
  }
  
  export default Filters;
  