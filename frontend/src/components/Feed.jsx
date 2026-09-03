import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const Feed = ({ type, sortBy }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading = true

  useEffect(() => {
    // Dummy data inside the effect
    const dummyPosts = {
      local: [
        { 
          id: 1, 
          user: 'Your Friend', 
          username: '@friend',
          avatar: '👤',
          image: '/assets/images/post1.jpg', 
          description: 'Beautiful sunset at the beach! 🌅',
          hashtags: ['#sunset', '#beach', '#nature'],
          likes: 24,
          comments: 5,
          timestamp: '2024-01-15T14:30:00',
          isFriend: true
        },
        { 
          id: 2, 
          user: 'Another Friend', 
          username: '@anotherfriend',
          avatar: '👤',
          image: '/assets/images/post2.jpg', 
          description: 'Just finished this amazing painting 🎨',
          hashtags: ['#art', '#painting', '#creative'],
          likes: 18,
          comments: 3,
          timestamp: '2024-01-15T12:15:00',
          isFriend: true
        },
        { 
          id: 3, 
          user: 'Your Sister', 
          username: '@sister',
          avatar: '👤',
          image: '/assets/images/post3.jpg', 
          description: 'Coffee and books = perfect morning ☕📚',
          hashtags: ['#coffee', '#books', '#morning'],
          likes: 32,
          comments: 8,
          timestamp: '2024-01-15T09:45:00',
          isFriend: true
        }
      ],
      global: [
        { 
          id: 4, 
          user: 'PhotographerPro', 
          username: '@photopro',
          avatar: '📷',
          image: '/assets/images/post4.jpg', 
          description: 'Captured this moment in NYC 🗽',
          hashtags: ['#nyc', '#streetphotography', '#city'],
          likes: 156,
          comments: 23,
          timestamp: '2024-01-15T16:20:00',
          isFriend: false
        },
        { 
          id: 5, 
          user: 'NatureLover', 
          username: '@naturelover',
          avatar: '🌿',
          image: '/assets/images/post5.jpg', 
          description: 'Mountain views that take your breath away ⛰️',
          hashtags: ['#mountains', '#nature', '#adventure'],
          likes: 89,
          comments: 12,
          timestamp: '2024-01-15T15:10:00',
          isFriend: false
        },
        { 
          id: 6, 
          user: 'FoodieGram', 
          username: '@foodiegram',
          avatar: '🍕',
          image: '/assets/images/post6.jpg', 
          description: 'Homemade pasta from scratch! 🍝',
          hashtags: ['#food', '#cooking', '#homemade'],
          likes: 67,
          comments: 9,
          timestamp: '2024-01-15T13:00:00',
          isFriend: false
        },
        { 
          id: 7, 
          user: 'TravelBug', 
          username: '@travelbug',
          avatar: '✈️',
          image: '/assets/images/post7.jpg', 
          description: 'Exploring the ancient temples of Kyoto 🇯🇵',
          hashtags: ['#japan', '#travel', '#kyoto'],
          likes: 203,
          comments: 34,
          timestamp: '2024-01-15T11:30:00',
          isFriend: false
        }
      ]
    };

    // REMOVED: setLoading(true) - loading is already true from useState
    
    // Simulate API call
    const timer = setTimeout(() => {
      let feedPosts = type === 'local' ? dummyPosts.local : dummyPosts.global;
      
      // Sort posts
      if (sortBy === 'recent') {
        feedPosts = [...feedPosts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      } else if (sortBy === 'popular') {
        feedPosts = [...feedPosts].sort((a, b) => b.likes - a.likes);
      }
      
      setPosts(feedPosts);
      setLoading(false); // Only set loading to false when done
    }, 500);

    // Cleanup timeout
    return () => clearTimeout(timer);
  }, [type, sortBy]); // Dependencies

  if (loading) {
    return (
      <div className="feed-loading">
        <div className="loading-spinner">⏳</div>
        <p>Loading feed...</p>
      </div>
    );
  }

  return (
    <div className="feed">
      <div className="feed-header">
        <div className="feed-info">
          <h3>{type === 'local' ? '👥 Local Feed' : '🌍 Global Feed'}</h3>
          <span className="feed-count">{posts.length} posts</span>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="feed-empty">
          <p>No posts to show</p>
          {type === 'local' && (
            <p className="feed-hint">Connect with friends to see their posts!</p>
          )}
        </div>
      ) : (
        <div className="feed-grid">
          {posts.map(post => (
            <Link to={`/post/${post.id}`} key={post.id} className="post-grid-item">
              <div className="post-image-wrapper">
                <img src={post.image} alt={post.description} />
              </div>
              <div className="post-grid-overlay">
                <div className="post-grid-user">
                  <span className="post-avatar">{post.avatar || '📸'}</span>
                  <span className="post-username">{post.user}</span>
                  {post.isFriend && <span className="friend-badge">🤝</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;