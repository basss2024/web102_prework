import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom'

export default function Gallery() {
  const [warriors, setWarriors] = useState([])
  const [breathingFilter, setBreathingFilter] = useState('')
  const [rankFilter, setRankFilter] = useState('')

  const filteredWarriors = warriors.filter(w =>
    (breathingFilter ? w.breathing === breathingFilter : true) &&
    (rankFilter ? w.rank === rankFilter : true)
  )

  useEffect(() => {
    const fetchWarriors = async () => {
      const { data, error } = await supabase
        .from('warriors')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) setWarriors(data)
      else console.error('Error fetching warriors:', error.message)
    }

    fetchWarriors()
  }, [])

  const getBreathingCounts = () => {
    const counts = {}
    warriors.forEach(w => {
      counts[w.breathing] = (counts[w.breathing] || 0) + 1
    })
    return counts
  }

  const getRankCounts = () => {
    const counts = {}
    warriors.forEach(w => {
      counts[w.rank] = (counts[w.rank] || 0) + 1
    })
    return counts
  }

  const calculatePowerScore = () => {
    let score = 0
    warriors.forEach(w => {
      if (w.rank.toLowerCase().includes('hashira')) score += 10
      else if (w.rank.toLowerCase().includes('mizunoto')) score += 3
      else score += 5

      if (['sun'].includes(w.breathing.toLowerCase())) score += 10
      else if (['flame', 'water'].includes(w.breathing.toLowerCase())) score += 5
    })
    return score
  }

  return (
    <div
      style={{
        backgroundImage: 'url(/demonslayer.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        overflowY: 'auto',
        padding: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          padding: '2rem',
          borderRadius: '12px',
          color: 'white',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <h1>Warrior Gallery 📜</h1>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <select value={breathingFilter} onChange={(e) => setBreathingFilter(e.target.value)}>
            <option value="">All Breathing</option>
            {[...new Set(warriors.map(w => w.breathing))].map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>

          <select value={rankFilter} onChange={(e) => setRankFilter(e.target.value)}>
            <option value="">All Ranks</option>
            {[...new Set(warriors.map(w => w.rank))].map(rank => (
              <option key={rank} value={rank}>{rank}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2>Squad Summary 📊</h2>
          <p><strong>Total Warriors:</strong> {warriors.length}</p>
          <p><strong>Squad Power Score:</strong> {calculatePowerScore()}</p>

          <p><strong>By Breathing Style:</strong></p>
          <ul>
            {Object.entries(getBreathingCounts()).map(([style, count]) => (
              <li key={style}>{style}: {count}</li>
            ))}
          </ul>

          <p><strong>By Rank:</strong></p>
          <ul>
            {Object.entries(getRankCounts()).map(([rank, count]) => (
              <li key={rank}>{rank}: {count}</li>
            ))}
          </ul>
        </div>

        {filteredWarriors.length === 0 ? (
          <p>No warriors match your filter.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {filteredWarriors.map(w => (
              <li key={w.id} style={{
                background: 'white',
                color: 'black',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <h3>{w.name}</h3>
                <p><strong>Breathing:</strong> {w.breathing}</p>
                <p><strong>Rank:</strong> {w.rank}</p>
                <p><strong>Specialty:</strong> {w.specialty}</p>
                <p><strong>Category:</strong> {w.category}</p>
                <Link to={`/warrior/${w.id}`}>🔍 View</Link> | <Link to={`/edit/${w.id}`}>✏️ Edit</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
