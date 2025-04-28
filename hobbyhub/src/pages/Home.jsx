import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [filterAnime, setFilterAnime] = useState('All');

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order(sortBy, { ascending: false });

    if (error) {
      console.error('Error fetching anime characters:', error);
    } else {
      setPosts(data);
    }
  }

  const filteredPosts = posts
    .filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    .filter(post => filterAnime === 'All' ? true : post.anime_series === filterAnime);

  const topPosts = [...posts]
    .sort((a, b) => b.upvotes - a.upvotes)
    .slice(0, 3);

  function getBannerImage(anime) {
    switch (anime) {
      case 'Naruto':
        return 'https://www.abystyle.com/c/22-category_default/naruto.jpg';
      case 'Demon Slayer':
        return 'https://y2kfonts.com/wp-content/uploads/Screenshot-2025-01-01-184218-1024x655.jpg';
      case 'Death Note':
        return 'https://becomingthemuse.net/wp-content/uploads/2017/08/death-note.jpg';
      case 'Attack on Titan':
        return 'https://preview.redd.it/made-this-banner-for-attack-on-titan-thoughts-v0-jv413frdq80c1.jpg?width=640&crop=smart&auto=webp&s=e48c30a27ae1eb152550386280565115b9c5e6c5';
      case 'One Piece':
        return 'https://wallpapersok.com/images/high/one-piece-title-logo-x6sm3qr1gxyqmrzg.webp';
      default:
        return 'https://i.pinimg.com/736x/a4/0c/07/a40c07636807774d6ef7be7944ecc162.jpg';
    }
  }

  const cardStyle = {
    background: 'white',
    border: '2px solid #e0e0e0',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer'
  };

  const topCardStyle = {
    background: '#fff8dc',
    border: '2px solid #ffcc00',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer'
  };

  const hoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '20px auto',
      padding: '20px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
      backdropFilter: 'blur(10px)'
    }}>
      <h1 style={{
        fontSize: '3rem',
        textAlign: 'center',
        color: '#6246ea',
        marginBottom: '30px'
      }}>
        Anime Characters 🎌🌸
      </h1>

      {/* ➕ Add New Character Button */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <Link to="/create">
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#7F5AF0',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            ➕ Add New Character
          </button>
        </Link>
      </div>

      {/* 🔍 Search + Sort + Filter */}
      <div style={{
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute',
            top: '50%',
            left: '12px',
            transform: 'translateY(-50%)',
            color: '#aaa',
            fontSize: '1.2rem'
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Search characters..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: '10px 10px 10px 35px',
              width: '250px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              fontSize: '1rem'
            }}
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        >
          <option value="created_at">Sort by Newest</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>

        <select
          value={filterAnime}
          onChange={(e) => setFilterAnime(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        >
          <option value="All">All Anime</option>
          <option value="Demon Slayer">Demon Slayer</option>
          <option value="Naruto">Naruto</option>
          <option value="Death Note">Death Note</option>
          <option value="Attack on Titan">Attack on Titan</option>
          <option value="One Piece">One Piece</option>
        </select>
      </div>

      {/* 🖼 Banner */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <img
          src={getBannerImage(filterAnime)}
          alt={`${filterAnime} Banner`}
          style={{
            width: '100%',
            maxHeight: '250px',
            objectFit: 'cover',
            borderRadius: '15px'
          }}
        />
      </div>

      {/* 📋 All Characters */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px'
      }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div key={post.id}
              style={cardStyle}
              onMouseEnter={e => e.currentTarget.style.transform = hoverStyle.transform}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '250px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      borderRadius: '12px',
                      marginBottom: '10px'
                    }}
                  />
                )}
                <h2>{post.title}</h2>
              </Link>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Posted: {new Date(post.created_at).toLocaleString()}
              </p>
              <p><strong>Upvotes:</strong> {post.upvotes}</p>
              <p style={{ fontStyle: 'italic', color: '#999' }}>
                Anime: {post.anime_series || 'Unknown'}
              </p>
            </div>
          ))
        ) : (
          <p>No anime characters found. Try creating one!</p>
        )}
      </div>

      {/* 🏆 Top 3 moved to bottom */}
      <h2 style={{
        fontSize: '2rem',
        color: '#ff9900',
        textAlign: 'center',
        marginTop: '50px',
        marginBottom: '20px'
      }}>
        🏆 Top 3 Characters
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {topPosts.map((post, index) => (
          <div key={post.id}
            style={topCardStyle}
            onMouseEnter={e => e.currentTarget.style.transform = hoverStyle.transform}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: '#000' }}>
              <h3>#{index + 1} — {post.title}</h3>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '12px',
                    marginTop: '10px'
                  }}
                />
              )}
              <p style={{ marginTop: '10px' }}>Upvotes: {post.upvotes}</p>
            </Link>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '50px',
        paddingTop: '20px',
        fontSize: '0.9rem',
        color: '#888'
      }}>
        Built with ❤️ by Shamiah Bass | Z Number: 
      </div>
    </div>
  );
}

export default Home;
