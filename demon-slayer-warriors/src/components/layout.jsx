import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <nav style={{
        width: '200px',
        backgroundColor: '#444',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        fontWeight: 'bold'
      }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link>
        <Link to="/create" style={{ color: 'white', textDecoration: 'none' }}>Create Warrior</Link>
        <Link to="/gallery" style={{ color: 'white', textDecoration: 'none' }}>Gallery</Link>
      </nav>

      {/* Main content area where each page gets rendered */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  )
}
