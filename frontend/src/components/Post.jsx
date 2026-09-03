import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import "../css/Post.css";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Dummy data 
  const getPostData = (id) => {
    const posts = {
      1: {
        id: 1,
        user: 'Your Friend',
        username: '@friend',
        avatar: '👤',
        image: '../../public/assets/images/profile-1.jpg',
        description: 'Beautiful sunset at the beach! The colors were absolutely stunning today. Perfect way to end the day.',
        hashtags: ['#sunset', '#beach', '#nature', '#photography'],
        likes: 24,
        comments: [
          { id: 1, user: 'Jane', text: 'Gorgeous shot!', timestamp: '2h ago' },
          { id: 2, user: 'Mike', text: 'Where is this?', timestamp: '1h ago' },
          { id: 3, user: 'Sarah', text: 'Beautiful colors ', timestamp: '30m ago' }
        ],
        timestamp: '2024-01-15T14:30:00',
        isFriend: true
      },
      2: {
        id: 2,
        user: 'Another Friend',
        username: '@anotherfriend',
        avatar: '👤',
        image: '../../public/assets/images/splash-1.jpg',
        description: 'Just finished this amazing painting, Took me weeks but totally worth it!',
        hashtags: ['#art', '#painting', '#creative', '#artist'],
        likes: 18,
        comments: [
          { id: 1, user: 'Alex', text: 'Incredible talent!', timestamp: '3h ago' }
        ],
        timestamp: '2024-01-15T12:15:00',
        isFriend: true
      },
    };
    return posts[id] || posts[1];
  };

  useEffect(() => {
    let isMounted = true; 
    
    const timer = setTimeout(() => {
      if (isMounted) {
        const postData = getPostData(parseInt(postId));
        setPost(postData);
        setLikesCount(postData.likes);
        setLoading(false); 
      }
    }, 500);

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
    <div className="posts-bg"></div>
      <div className="post-container">
        <Link to="/home" className="back-link">← Back to Feed</Link>
        
        <div className="post-full">
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
          <div className="post-full-image">
            <img src={post.image} alt={post.description} />
          </div>
          <div className="post-full-content">
            <p className="post-description">{post.description}</p>
            
            <div className="post-hashtags">
              {post.hashtags.map(tag => (
                <span key={tag} className="hashtag">{tag}</span>
              ))}
            </div>
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