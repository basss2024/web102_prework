function BreweryList({ breweries }) {
    return (
      <div>
        {breweries.map(brew => (
          <div key={brew.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
            <h2>{brew.name}</h2>
            <p>Type: {brew.brewery_type}</p>
            <p>City: {brew.city}</p>
            <p>State: {brew.state}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default BreweryList;
  