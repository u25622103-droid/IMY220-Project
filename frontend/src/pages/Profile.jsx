import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import EditProfile from '../components/EditProfile';
import Friend from '../components/Friend';
import "../css/Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = {
      id: 1,
      name: 'Your Name',
      username: '@yourname',
      avatar: '👤',
      bio: 'Photography enthusiast 📸 | Capturing moments',
      location: 'Cape Town, South Africa',
      joinDate: 'January 2024',
      coverImage: '../../public/assets/images/cover.jpg',
      stats: {
        posts: 42,
        followers: 128,
        following: 85
      },
      friends: [
        { id: 2, name: 'Jane Smith', username: '@jane', avatar: '👩', isFriend: true },
        { id: 3, name: 'Mike Johnson', username: '@mike', avatar: '👨', isFriend: true },
        { id: 4, name: 'Sarah Wilson', username: '@sarah', avatar: '👩', isFriend: true },
        { id: 5, name: 'Alex Chen', username: '@alex', avatar: '🧑', isFriend: true }
      ],
      posts: [
        { id: 1, image: '../../public/assets/images/feed-1.jpg', likes: 24, comments: 5 },
        { id: 3, image: '../../public/assets/images/feed-2.jpg', likes: 32, comments: 8 },
        { id: 8, image: '../../public/assets/images/feed-3.jpg', likes: 45, comments: 12 }
      ],
      albums: [
        { id: 1, name: 'Nature Shots', count: 12, cover: '../../public/assets/images/feed-4.jpg' },
        { id: 2, name: 'City Life', count: 8, cover: '../../public/assets/images/feed-5.jpg' },
        { id: 3, name: 'Portraits', count: 6, cover: '../../public/assets/images/feed-6.jpg' }
      ]
    };

    const timer = setTimeout(() => {
      setProfile(userData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleEditSave = (updatedData) => {
    setProfile(prev => ({
      ...prev,
      ...updatedData
    }));
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner">⏳</div>
        <p>Loading profile...</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="profile-page">
        <div className="profile-bg"></div>
        <div className="profile-container">
          <EditProfile
            user={profile}
            onCancel={() => setIsEditing(false)}
            onSave={handleEditSave}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-bg"></div>

      <div className="profile-container">
        <div className="profile-cover">
          <img
            src={profile.coverImage || '/assets/images/default-cover.jpg'}
            alt="Profile Cover"
            className="cover-image"
          />
          <div className="cover-overlay"></div>

          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              <span className="avatar-emoji">{profile.avatar || '👤'}</span>
            </div>
          </div>
        </div>

        <div className="profile-info-section">
          <div className="profile-name-area">
            <h1 className="profile-name">{profile.name}</h1>
            <span className="profile-username">{profile.username}</span>
            {profile.location && (
              <span className="profile-location">📍 {profile.location}</span>
            )}
          </div>

          <div className="profile-bio">
            <p>{profile.bio}</p>
            <span className="profile-join-date">Joined {profile.joinDate}</span>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-number">{profile.stats.posts}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{profile.stats.followers}</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{profile.stats.following}</span>
              <span className="stat-label">Following</span>
            </div>
          </div>

          <button
            className="edit-profile-btn"
            onClick={() => setIsEditing(true)}
          >
            ✏️ Edit Profile
          </button>
        </div>

        <div className="profile-tabs">
          <button
            className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            📸 Posts ({profile.posts.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'albums' ? 'active' : ''}`}
            onClick={() => setActiveTab('albums')}
          >
            🎨 Albums ({profile.albums.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            🤝 Friends ({profile.friends.length})
          </button>
        </div>

        <div className="profile-tab-content">
          {activeTab === 'posts' && (
            <div className="posts-grid">
              {profile.posts.length === 0 ? (
                <div className="empty-state">
                  <p>No posts yet</p>
                </div>
              ) : (
                profile.posts.map(post => (
                  <Link to={`/post/${post.id}`} key={post.id} className="post-card">
                    <div className="post-card-image">
                      <img src={post.image} alt="Post" />
                    </div>
                    <div className="post-card-overlay">
                      <div className="post-card-stats">
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}

          {activeTab === 'albums' && (
            <div className="albums-grid">
              {profile.albums.length === 0 ? (
                <div className="empty-state">
                  <p>No albums yet</p>
                </div>
              ) : (
                profile.albums.map(album => (
                  <div key={album.id} className="album-card">
                    <div className="album-cover">
                      <img src={album.cover} alt={album.name} />
                      <div className="album-count">{album.count} photos</div>
                    </div>
                    <div className="album-info">
                      <h4>{album.name}</h4>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="friends-grid">
              {profile.friends.length === 0 ? (
                <div className="empty-state">
                  <p>No friends yet</p>
                </div>
              ) : (
                profile.friends.map(friend => (
                  <Friend
                    key={friend.id}
                    friend={friend}
                    showActions={true}
                  />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;