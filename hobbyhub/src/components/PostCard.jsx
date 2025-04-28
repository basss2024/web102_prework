import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div>
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>Created at: {new Date(post.created_at).toLocaleString()}</p>
      <p>Upvotes: {post.upvotes}</p>
    </div>
  );
};

export default PostCard;
