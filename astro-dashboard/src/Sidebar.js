import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div style={{
      width: "200px",
      background: "#111",
      color: "#fff",
      padding: "20px",
      height: "100vh"
    }}>
      <h2>🌌 AstroDash</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "10px 0" }}>
            <Link style={{ color: "white", textDecoration: "none" }} to="/">🏠 Dashboard</Link>
          </li>
          <li>
            <Link style={{ color: "white", textDecoration: "none" }} to="/about">ℹ️ About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
