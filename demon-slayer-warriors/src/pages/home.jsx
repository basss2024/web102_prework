import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: 'url(/demonslayer.png)', // make sure this is in /public/
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '2rem',
          borderRadius: '12px',
          textAlign: 'center',
          color: 'white',
          maxWidth: '600px',
        }}
      >
        <h1>Welcome to Demon Slayer Warriors 
            by Shamiah Bass, Z23526337 ⚔️</h1>
        <p>Build your dream squad of powerful warriors from the Demon Slayer universe.</p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
          <Link to="/create">
            <button>Create Warrior</button>
          </Link>
          <Link to="/gallery">
            <button>View Gallery</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
