import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cat, setCat] = useState(null);
  const [banList, setBanList] = useState([]);
  const [viewedCats, setViewedCats] = useState([]);

  // Fetch a random cat
  const fetchCat = async () => {
    try {
      const response = await axios.get(
        "https://api.thecatapi.com/v1/images/search?has_breeds=1",
        {
          headers: { "x-api-key": import.meta.env.VITE_CAT_API_KEY },
        }
      );

      const newCat = response.data[0];

      // Prevent banned breeds & origins from appearing
      if (
        banList.includes(newCat.breeds[0]?.name) ||
        banList.includes(newCat.breeds[0]?.origin)
      ) {
        fetchCat();
        return;
      }

      setCat(newCat);
      setViewedCats((prev) => [newCat, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error("Error fetching cat:", error);
    }
  };

  // Ban functions
  const banBreed = () => {
    if (cat && cat.breeds[0]) {
      setBanList((prev) => [...prev, cat.breeds[0].name]);
    }
  };

  const banOrigin = () => {
    if (cat && cat.breeds[0]) {
      setBanList((prev) => [...prev, cat.breeds[0].origin]);
    }
  };

  // Fetch a cat when the component loads
  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">🐱 Discover Random Cats!</h1>

      {cat && (
        <div className="bg-white shadow-lg rounded-lg p-6 text-center w-96">
          {/* Cat Image (Fixed Size) */}
          <img src={cat.url} alt="Random Cat" className="w-64 h-64 object-cover rounded-lg mx-auto mb-4" />

          {/* Cat Info */}
          <h2 className="text-2xl font-semibold text-gray-700">{cat.breeds[0]?.name}</h2>
          <p className="text-gray-600">🌍 Origin: {cat.breeds[0]?.origin}</p>
          <p className="text-gray-600">😺 Temperament: {cat.breeds[0]?.temperament}</p>
          <p className="text-gray-600">⏳ Lifespan: {cat.breeds[0]?.life_span} years</p>

          {/* Buttons */}
          <div className="mt-4 space-x-2">
            <button
              onClick={fetchCat}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
            >
              Show Another Cat
            </button>

            <button
              onClick={banBreed}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
            >
              Ban This Breed
            </button>

            <button
              onClick={banOrigin}
              className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600"
            >
              Ban This Country
            </button>
          </div>
        </div>
      )}

      {/* Banned List */}
      {banList.length > 0 && (
        <div className="mt-6 w-3/4 bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-bold text-gray-700">🚫 Banned Breeds & Countries</h3>
          <ul className="text-gray-600">
            {banList.map((item, index) => (
              <li key={index} className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-lg m-1">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Previously Viewed Cats (Fixed Small Size) */}
      {viewedCats.length > 0 && (
        <div className="mt-6 w-3/4 bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-bold text-gray-700">📜 Previously Viewed Cats</h3>
          <div className="flex overflow-x-auto space-x-2 mt-2">
            {viewedCats.map((prevCat, index) => (
              <img key={index} src={prevCat.url} alt="Past cat" className="w-24 h-24 rounded-lg object-cover" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
