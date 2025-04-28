import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChartTemp from "../components/ChartTemp";
import ChartVisibility from "../components/ChartVisibility";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterPhase, setFilterPhase] = useState("");
  const [showTemp, setShowTemp] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://archive-api.open-meteo.com/v1/archive?latitude=40.7128&longitude=-74.006&start_date=2023-01-01&end_date=2023-01-10&daily=temperature_2m_min,temperature_2m_max,moonrise,moonset&timezone=America%2FNew_York"
        );
        const json = await res.json();

        console.log("API response:", json);
        window.debugApiResponse = json;


        const result = json.daily.time.map((date, i) => ({
          date,
          temperature: json.daily.temperature_2m_min[i],
          moonrise: json.daily.moonrise[i],
          moonset: json.daily.moonset[i],
          phase: "Full Moon" // TEMP placeholder until we use a proper moon phase API
        }));

        console.log("Processed result:", result);
        setData(result);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const dateMatch = item.date.toLowerCase().includes(search.toLowerCase());
    const phaseMatch = filterPhase === "" || item.phase === filterPhase;
    return dateMatch && phaseMatch;
  });

  const avgTemp =
    filteredData.length > 0
      ? Math.round(
          filteredData.reduce((acc, val) => acc + val.temperature, 0) /
            filteredData.length
        )
      : 0;

  const latest = filteredData[filteredData.length - 1] || {};

  return (
    <div style={{ padding: "20px", flex: 1, color: "white" }}>
      <h1>Dashboard</h1>

      <h2>Summary</h2>
      <ul>
        <li>Total Days: {filteredData.length}</li>
        <li>Avg Temp: {avgTemp}°F</li>
        <li>
          Full Moon Count: {" "}
          {filteredData.filter((d) => d.phase === "Full Moon").length}
        </li>
      </ul>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div className="card">🌍 New York, USA</div>
        <div className="card">🌡️ Avg Temp: {avgTemp}°F</div>
        <div className="card">🌅 Moonrise: {latest.moonrise}</div>
        <div className="card">🌘 Phase: {latest.phase}</div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by date (e.g. 2025-04)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px", padding: "6px" }}
        />
        <select
          value={filterPhase}
          onChange={(e) => setFilterPhase(e.target.value)}
        >
          <option value="">All Phases</option>
          <option value="New Moon">New Moon</option>
          <option value="Waxing Crescent">Waxing Crescent</option>
          <option value="First Quarter">First Quarter</option>
          <option value="Waxing Gibbous">Waxing Gibbous</option>
          <option value="Full Moon">Full Moon</option>
          <option value="Waning Gibbous">Waning Gibbous</option>
          <option value="Last Quarter">Last Quarter</option>
          <option value="Waning Crescent">Waning Crescent</option>
        </select>
      </div>

      <pre style={{ color: 'white' }}>
  {JSON.stringify(filteredData, null, 2)}
</pre>

<table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp (°F)</th>
            <th>Moonrise</th>
            <th>Phase</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((entry) => (
            <tr key={entry.date}>
              <td>{entry.date}</td>
              <td>{entry.temperature}</td>
              <td>{entry.moonrise}</td>
              <td>{entry.phase}</td>
              <td>
                <Link to={`/${entry.date}`}>🔍</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "30px" }}>
        <button onClick={() => setShowTemp(true)} style={{ marginRight: "10px" }}>
          Show Temperature Chart
        </button>
        <button onClick={() => setShowTemp(false)}>Show Visibility Chart</button>
      </div>

      {showTemp ? (
        <ChartTemp data={filteredData} />
      ) : (
        <ChartVisibility data={filteredData} />
      )}
    </div>
  );
}

export default Dashboard;
