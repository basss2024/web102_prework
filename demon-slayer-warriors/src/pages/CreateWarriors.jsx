import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const names = ['Haruto Tsukino', 'Ayaka Fujimoto', 'Renji Hoshizora', 'Kaede Kamizaki']
const styles = ['Water', 'Flame', 'Thunder', 'Beast', 'Mist', 'Wind']
const ranks = ['Hashira', 'Mizunoto', 'Kanoe', 'Tsuguko']
const specialties = ['Dual Blades', 'Speed', 'Stealth', 'Explosive Techniques']
const categories = ['Frontline', 'Support', 'Stealth']
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

export default function CreateWarrior() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '', breathing: '', rank: '', specialty: '', category: ''
  })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('warriors').insert([formData])
    if (!error) navigate('/gallery')
    else console.error('Error creating warrior:', error.message)
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
        }}
      >
        <h1>Create a New Demon Slayer 📝</h1>

        <button
          type="button"
          onClick={() =>
            setFormData({
              name: getRandom(names),
              breathing: getRandom(styles),
              rank: getRandom(ranks),
              specialty: getRandom(specialties),
              category: getRandom(categories),
            })
          }
        >
          🎲 Generate Random Warrior
        </button>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="breathing" placeholder="Breathing Style" value={formData.breathing} onChange={handleChange} required />
          <input name="rank" placeholder="Rank" value={formData.rank} onChange={handleChange} required />
          <input name="specialty" placeholder="Specialty" value={formData.specialty} onChange={handleChange} />
          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          <button type="submit">Add Warrior</button>
        </form>
      </div>
    </div>
  )
}
