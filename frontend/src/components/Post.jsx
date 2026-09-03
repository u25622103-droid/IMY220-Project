import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import EditPost from '../components/EditPost';
import Comments from '../components/Comments';
import "../css/Post.css";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

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
        isFriend: true,
        isOwner: true // For edit/delete permissions
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
        isFriend: true,
        isOwner: false
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

  const handleEditSave = (updatedData) => {
    setPost(prev => ({
      ...prev,
      description: updatedData.description,
      hashtags: updatedData.hashtags
    }));
    setIsEditing(false);
    console.log('Post updated:', updatedData);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      console.log('Post deleted:', post.id);
      // Navigate back to home
      window.location.href = '/home';
    }
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
        <div className="post-nav">
          <Link to="/home" className="back-link">← Back to Feed</Link>
          {post.isOwner && (
            <div className="post-actions-nav">
              <button 
                className="edit-post-btn"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? '✕ Cancel' : '✏️ Edit'}
              </button>
              <button 
                className="delete-post-btn"
                onClick={handleDelete}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
        
        <div className="post-full">
          {/* Show Edit Form if editing */}
          {isEditing ? (
            <EditPost 
              post={post}
              onCancel={() => setIsEditing(false)}
              onSave={handleEditSave}
            />
          ) : (
            <>
              {/* Post Header */}
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

              {/* Post Image */}
              <div className="post-full-image">
                <img src={post.image} alt={post.description} />
              </div>

              {/* Post Content */}
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

                {/* Comments Component */}
                <Comments postId={post.id} comments={post.comments} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;