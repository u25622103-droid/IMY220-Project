import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../css/Post.css";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Start with loading = true
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Dummy data - replace with API call
  const getPostData = (id) => {
    const posts = {
      1: {
        id: 1,
        user: 'Your Friend',
        username: '@friend',
        avatar: '👤',
        image: '/assets/images/post1.jpg',
        description: 'Beautiful sunset at the beach! 🌅 The colors were absolutely stunning today. Perfect way to end the day.',
        hashtags: ['#sunset', '#beach', '#nature', '#photography'],
        likes: 24,
        comments: [
          { id: 1, user: 'Jane', text: 'Gorgeous shot!', timestamp: '2h ago' },
          { id: 2, user: 'Mike', text: 'Where is this?', timestamp: '1h ago' },
          { id: 3, user: 'Sarah', text: 'Beautiful colors 🌅', timestamp: '30m ago' }
        ],
        timestamp: '2024-01-15T14:30:00',
        isFriend: true
      },
      2: {
        id: 2,
        user: 'Another Friend',
        username: '@anotherfriend',
        avatar: '👤',
        image: '/assets/images/post2.jpg',
        description: 'Just finished this amazing painting 🎨 Took me weeks but totally worth it!',
        hashtags: ['#art', '#painting', '#creative', '#artist'],
        likes: 18,
        comments: [
          { id: 1, user: 'Alex', text: 'Incredible talent!', timestamp: '3h ago' }
        ],
        timestamp: '2024-01-15T12:15:00',
        isFriend: true
      },
      // Add more posts as needed
    };
    return posts[id] || posts[1];
  };

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    
    // REMOVED: setLoading(true) - loading is already true from useState
    
    // Simulate API call
    const timer = setTimeout(() => {
      if (isMounted) {
        const postData = getPostData(parseInt(postId));
        setPost(postData);
        setLikesCount(postData.likes);
        setLoading(false); // Only set loading to false when done
      }
    }, 500);

    // Cleanup
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [postId]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  if (loading) {
    return (
      <div className="post-loading">
        <div className="loading-spinner">⏳</div>
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-not-found">
        <h2>Post not found</h2>
        <Link to="/home">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="post-page">
      <div className="post-container">
        <Link to="/home" className="back-link">← Back to Feed</Link>
        
        <div className="post-full">
          {/* User Info */}
          <div className="post-full-header">
            <div className="post-user-info">
              <span className="post-avatar-large">{post.avatar || '📸'}</span>
              <div>
                <span className="post-username">{post.user}</span>
                <span className="post-username-handle">{post.username}</span>
                {post.isFriend && <span className="friend-badge">🤝 Friend</span>}
              </div>
            </div>
            <span className="post-time">{new Date(post.timestamp).toLocaleDateString()}</span>
          </div>

          {/* Image */}
          <div className="post-full-image">
            <img src={post.image} alt={post.description} />
          </div>

          {/* Content */}
          <div className="post-full-content">
            <p className="post-description">{post.description}</p>
            
            <div className="post-hashtags">
              {post.hashtags.map(tag => (
                <span key={tag} className="hashtag">{tag}</span>
              ))}
            </div>

            {/* Actions */}
            <div className="post-actions">
              <button 
                className={`action-btn like-btn ${liked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                {liked ? '❤️' : '🤍'} {likesCount} Likes
              </button>
              <button className="action-btn comment-btn">
                💬 {post.comments.length} Comments
              </button>
            </div>

            {/* Comments */}
            <div className="post-comments">
              <h4>Comments</h4>
              {post.comments.length === 0 ? (
                <p className="no-comments">No comments yet. Be the first!</p>
              ) : (
                post.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <span className="comment-user">{comment.user}</span>
                    <span className="comment-text">{comment.text}</span>
                    <span className="comment-time">{comment.timestamp}</span>
                  </div>
                ))
              )}
              
              <div className="comment-input">
                <input type="text" placeholder="Write a comment..." />
                <button>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;