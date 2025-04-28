import { useEffect, useState } from "react";
import CoinInfo from "./components/CoinInfo";
import "./App.css";

const API_KEY = import.meta.env.VITE_APP_API_KEY; // Secure API Key

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Debugging: Log API Key
  console.log("Loaded API Key:", API_KEY);

  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`
        );
        const data = await response.json();
        
        // Debugging: Log API Response
        console.log("Full API Response:", data);

        if (data.Data) {
          setList(data.Data);
          setFilteredResults(Object.keys(data.Data));
        } else {
          console.error("API Error: Data field is missing", data);
        }
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchAllCoinData();
  }, []);

  
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    
    if (searchValue !== "" && list) {
      const filteredData = Object.keys(list).filter((key) =>
        list[key].FullName.toLowerCase().includes(searchValue.toLowerCase()) ||
        list[key].Symbol.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list || {}));
    }
  };

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => searchItems(event.target.value)}
        className="search-bar"
        value={searchInput}
      />
      <ul>
        {list ? (
          searchInput.length > 0
            ? filteredResults.map((key) =>
                list[key].PlatformType === "blockchain" ? (
                  <CoinInfo
                    key={key}
                    image={list[key].ImageUrl}
                    name={list[key].FullName}
                    symbol={list[key].Symbol}
                  />
                ) : null
              )
            : Object.entries(list).map(([key, coin]) =>
                coin.PlatformType === "blockchain" ? (
                  <CoinInfo
                    key={key}
                    image={coin.ImageUrl}
                    name={coin.FullName}
                    symbol={coin.Symbol}
                  />
                ) : null
              )
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}

export default App;
