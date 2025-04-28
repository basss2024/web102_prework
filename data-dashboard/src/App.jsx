import { useEffect, useState } from 'react';
import Header from './components/header';
import Filters from './components/filters';
import BreweryList from './components/BreweryList';

function App() {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('https://api.openbrewerydb.org/breweries');
      const data = await res.json();
      setBreweries(data);
      setFiltered(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = breweries;

    if (searchTerm) {
      filteredData = filteredData.filter(brew =>
        brew.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      filteredData = filteredData.filter(brew =>
        brew.brewery_type === filterType
      );
    }

    setFiltered(filteredData);
  }, [searchTerm, filterType, breweries]);

  return (
    <div className="App">
      <Header />
      <Filters
        setSearchTerm={setSearchTerm}
        setFilterType={setFilterType}
      />
      <div style={{ padding: '1rem' }}>
        <h3>Total Breweries: {filtered.length}</h3>
        <BreweryList breweries={filtered} />
      </div>
    </div>
  );
}

export default App;
