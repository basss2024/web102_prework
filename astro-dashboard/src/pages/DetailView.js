import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailView() {
  const { date } = useParams();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    async function fetchDetail() {
      const res = await fetch(
        "https://archive-api.open-meteo.com/v1/archive?latitude=40.7128&longitude=-74.006&start_date=2025-04-01&end_date=2025-04-20&daily=temperature_2m_min,moon_phase,moonrise,visibility&timezone=America%2FNew_York"
      );
      const json = await res.json();

      const index = json.daily.time.findIndex((d) => d === date);
      if (index === -1) return;

      const moonNum = json.daily.moon_phase[index];

      const detail = {
        date: date,
        temperature: json.daily.temperature_2m_min[index],
        visibility: json.daily.visibility[index],
        moonrise: json.daily.moonrise[index],
        phase: getMoonPhase(moonNum),
        description:
          "This moon phase represents a point in the lunar cycle. The exact visibility and moonrise vary depending on location and date.",
      };

      setEntry(detail);
    }

    fetchDetail();
  }, [date]);

  function getMoonPhase(num) {
    if (num === 0 || num === 1) return "New Moon";
    if (num < 0.25) return "Waxing Crescent";
    if (num === 0.25) return "First Quarter";
    if (num < 0.5) return "Waxing Gibbous";
    if (num === 0.5) return "Full Moon";
    if (num < 0.75) return "Waning Gibbous";
    if (num === 0.75) return "Last Quarter";
    return "Waning Crescent";
  }

  if (!entry) return <p style={{ padding: "20px", color: "white" }}>Loading data...</p>;

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Details for {entry.date}</h2>
      <p><strong>🌘 Phase:</strong> {entry.phase}</p>
      <p><strong>🌫️ Visibility:</strong> {entry.visibility} km</p>
      <p><strong>🌅 Moonrise:</strong> {entry.moonrise}</p>
      <p><strong>🌡️ Temperature:</strong> {entry.temperature}°F</p>
      <p style={{ marginTop: "10px" }}>{entry.description}</p>
    </div>
  );
}

export default DetailView;
