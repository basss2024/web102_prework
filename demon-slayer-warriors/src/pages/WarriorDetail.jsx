import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function WarriorDetail() {
  const { id } = useParams()
  const [warrior, setWarrior] = useState(null)

  useEffect(() => {
    const fetchWarrior = async () => {
      const { data, error } = await supabase
        .from('warriors')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching warrior:', error.message)
      } else {
        setWarrior(data)
      }
    }

    fetchWarrior()
  }, [id])

  if (!warrior) return <p style={{ color: 'white' }}>Loading warrior...</p>

  return (
    <div
      style={{
        backgroundImage: 'url(/demonslayer.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          padding: '2rem',
          borderRadius: '12px',
          color: 'white',
          width: '100%',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <h1>{warrior.name}'s Profile 🗡️</h1>
        <p><strong>Breathing:</strong> {warrior.breathing}</p>
        <p><strong>Rank:</strong> {warrior.rank}</p>
        <p><strong>Specialty:</strong> {warrior.specialty}</p>
        <p><strong>Category:</strong> {warrior.category}</p>
        <p><strong>Created:</strong> {new Date(warrior.created_at).toLocaleString()}</p>

        <div style={{ marginTop: '1rem' }}>
          <Link to={`/edit/${warrior.id}`}>
            <button>✏️ Edit Warrior</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
