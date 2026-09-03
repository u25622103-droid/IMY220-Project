import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import CreatePost from '../components/CreatePost';
import "../css/Posts.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  
  const user = {
    id: 1,
    name: 'Your Name',
    username: '@yourname',
    avatar: '👤',
    bio: 'Photography enthusiast 📸'
  };

  useEffect(() => {
    // Dummy data 
    const userPosts = [
      { 
        id: 1, 
        userId: 1,
        user: 'Your Name', 
        username: '@yourname',
        avatar: '👤',
        image: '../../public/assets/images/feed-1.jpg', 
        description: 'Beautiful sunset at the beach! The colors were absolutely stunning.',
        hashtags: ['#sunset', '#beach', '#nature'],
        likes: 24,
        comments: 5,
        timestamp: '2024-01-15T14:30:00'
      },
      { 
        id: 3, 
        userId: 1,
        user: 'Your Name', 
        username: '@yourname',
        avatar: '👤',
        image: '../../public/assets/images/feed-3.jpg', 
        description: 'Coffee and books = perfect morning ',
        hashtags: ['#coffee', '#books', '#morning'],
        likes: 32,
        comments: 8,
        timestamp: '2024-01-15T09:45:00'
      },
      { 
        id: 8, 
        userId: 1,
        user: 'Your Name', 
        username: '@yourname',
        avatar: '👤',
        image: '../../public/assets/images/splash-2.jpg', 
        description: 'Exploring the city streets ',
        hashtags: ['#city', '#streetphotography', '#urban'],
        likes: 45,
        comments: 12,
        timestamp: '2024-01-14T18:20:00'
      }
    ];

    // Simulate API call
    const timer = setTimeout(() => {
      setPosts(userPosts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handlePostCreated = (newPost) => {
    // Add new post to the list
    setPosts(prev => [newPost, ...prev]);
    setShowCreatePost(false);
  };

  if (loading) {
    return (
      <div className="posts-loading">
        <div className="loading-spinner">⏳</div>
        <p>Loading your posts...</p>
      </div>
    );
  }

  return (
    <div className="posts-page">
      <div className="posts-bg"></div>
      <div className="posts-main">
        <div className="posts-user-profile">
          <div className="profile-avatar">
            <span className="avatar-large">{user?.avatar || '👤'}</span>
          </div>
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p className="profile-username">{user?.username}</p>
            <p className="profile-bio">{user?.bio}</p>
          </div>
        </div>

        <div className="posts-section">
          <div className="posts-section-header">
            <h3>My Photos</h3>
            <div className="posts-header-actions">
              <span className="post-count">{posts.length} posts</span>
              <button 
                className="create-post-btn-small"
                onClick={() => setShowCreatePost(true)}
              >
                + New Post
              </button>
            </div>
          </div>

          {showCreatePost && (
            <CreatePost 
              onCancel={() => setShowCreatePost(false)}
              onPostCreated={handlePostCreated}
            />
          )}

          {posts.length === 0 ? (
            <div className="posts-empty">
              <div className="empty-icon">📸</div>
              <h3>No posts yet</h3>
              <p>Share your first photo with the world!</p>
              <button 
                onClick={() => setShowCreatePost(true)} 
                className="create-post-btn"
              >
                Create Post
              </button>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map(post => (
                <Link to={`/post/${post.id}`} key={post.id} className="post-card">
                  <div className="post-card-image">
                    <img src={post.image} alt={post.description} />
                  </div>
                  <div className="post-card-overlay">
                    <div className="post-card-stats">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;