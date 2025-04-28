import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImageURL, setEditImageURL] = useState('');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  async function fetchPost() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (!error) {
      setPost(data);
      setEditTitle(data.title);
      setEditContent(data.content);
      setEditImageURL(data.image_url);
    }
  }

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: true });

    if (!error) {
      setComments(data);
    }
  }

  async function handleUpvote() {
    const { data, error } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id)
      .select()
      .single();

    if (!error) {
      setPost(data);
    }
  }

  async function handleAddComment() {
    if (newComment.trim() === '') return;

    const { error } = await supabase
      .from('comments')
      .insert([{ post_id: id, comment_text: newComment }]);

    if (!error) {
      setNewComment('');
      fetchComments();
    }
  }

  async function handleDeletePost() {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (!error) {
      navigate('/');
    }
  }

  async function handleEditPost() {
    const { error } = await supabase
      .from('posts')
      .update({
        title: editTitle,
        content: editContent,
        image_url: editImageURL
      })
      .eq('id', id);

    if (!error) {
      setIsEditing(false);
      fetchPost(); // Refresh post after editing
    }
  }

  if (!post) return <div>Loading...</div>;

  return (
    <div style={{
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
    }}>
      {isEditing ? (
        <>
          <h2>Edit Character</h2>
          <input 
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          />
          <textarea 
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="Content"
            rows="4"
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          />
          <input 
            value={editImageURL}
            onChange={(e) => setEditImageURL(e.target.value)}
            placeholder="Image URL"
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          />
          <button onClick={handleEditPost} style={{ marginRight: '10px', padding: '10px' }}>
            Save Changes
          </button>
          <button onClick={() => setIsEditing(false)} style={{ padding: '10px' }}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h1>{post.title}</h1>
          {post.image_url && (
            <img 
              src={post.image_url} 
              alt={post.title} 
              style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }}
            />
          )}
          <p>{post.content}</p>
          <p><strong>Upvotes:</strong> {post.upvotes}</p>
          <button onClick={handleUpvote} style={{ marginBottom: '20px', padding: '10px' }}>
            Upvote 🔼
          </button>
          <br />
          <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px', padding: '10px' }}>
            ✏️ Edit Post
          </button>
          <button onClick={handleDeletePost} style={{ padding: '10px' }}>
            🗑️ Delete Post
          </button>
        </>
      )}

      <hr style={{ margin: '20px 0' }} />

      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id} style={{
          padding: '10px',
          borderBottom: '1px solid #eee'
        }}>
          <p>{comment.comment_text}</p>
        </div>
      ))}

      <textarea 
        placeholder="Write a comment..." 
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows="3"
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />
      <button onClick={handleAddComment} style={{ marginTop: '10px', padding: '10px' }}>
        Add Comment
      </button>
    </div>
  );
}

export default PostDetail;
