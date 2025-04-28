import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY; 

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getCoinPrice = async () => {
      try {
        const response = await fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`
        );
        const data = await response.json();
        setPrice(data);
      } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error);
      }
    };

    getCoinPrice().catch(console.error);
  }, [symbol]);

  return (
    <li className="main-list" key={symbol}>
      {/* Fix Image URL Formatting */}
      {image ? (
        <img
          className="icons"
          src={`https://www.cryptocompare.com${image}`} 
          alt={`Icon for ${name}`}
          onError={(e) => (e.target.style.display = "none")} 
        />
      ) : (
        <span>No Image</span> 
      )}
      {name} <span className="tab"></span> {price ? `${price.USD} USD` : "Loading..."}
    </li>
  );
};

export default CoinInfo;
