import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [animeSeries, setAnimeSeries] = useState('Demon Slayer');
  const navigate = useNavigate();

  async function handleCreate() {
    if (!title.trim()) {
      alert('Character Name is required!');
      return;
    }

    const { error } = await supabase
      .from('posts')
      .insert([
        { 
          title: title,
          content: content,
          image_url: imageURL,
          upvotes: 0,
          anime_series: animeSeries
        }
      ]);

    if (error) {
      console.error('Supabase error details:', error);
      alert('Error creating character: ' + error.message);
    } else {
      console.log('Character created successfully!');
      navigate('/');
    }
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(10px)'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        color: '#6246ea',
        marginBottom: '20px'
      }}>
        Add New Anime Character 🌟
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginTop: '20px'
      }}>
        <input 
          type="text" 
          placeholder="Character Name (required)" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
        />

        <textarea 
          placeholder="About the character (story, powers, background)" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
        />

        <input 
          type="text" 
          placeholder="Character Image URL (optional)" 
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
        />

        <select 
          value={animeSeries}
          onChange={(e) => setAnimeSeries(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #ccc'
          }}
        >
          <option value="Demon Slayer">Demon Slayer</option>
          <option value="Naruto">Naruto</option>
          <option value="Death Note">Death Note</option>
          <option value="Attack on Titan">Attack on Titan</option>
          <option value="One Piece">One Piece</option>
        </select>

        <button onClick={handleCreate} style={{
          padding: '12px',
          backgroundColor: '#7F5AF0',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          Submit Character
        </button>
      </div>
    </div>
  );
}

export default Create;
