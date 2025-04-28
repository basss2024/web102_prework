import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function EditWarrior() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '', breathing: '', rank: '', specialty: '', category: ''
  })

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
        setFormData(data)
      }
    }

    fetchWarrior()
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase
      .from('warriors')
      .update(formData)
      .eq('id', id)

    if (!error) {
      navigate(`/warrior/${id}`)
    } else {
      console.error('Error updating warrior:', error.message)
    }
  }

  const handleDelete = async () => {
    const { error } = await supabase.from('warriors').delete().eq('id', id)
    if (!error) {
      navigate('/gallery')
    } else {
      console.error('Error deleting warrior:', error.message)
    }
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
        <h1>Edit Warrior ✏️</h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '1rem' }}
        >
          <input name="name" value={formData.name} onChange={handleChange} required />
          <input name="breathing" value={formData.breathing} onChange={handleChange} required />
          <input name="rank" value={formData.rank} onChange={handleChange} required />
          <input name="specialty" value={formData.specialty} onChange={handleChange} />
          <input name="category" value={formData.category} onChange={handleChange} />

          <button type="submit">💾 Save Changes</button>
          <button
            type="button"
            onClick={handleDelete}
            style={{ backgroundColor: 'red', color: 'white' }}
          >
            🗑️ Delete Warrior
          </button>
        </form>
      </div>
    </div>
  )
}
