import { Link } from 'react-router';

const ProfilePreview = ({ user, showFriendStatus = false }) => {
  return (
    <Link to={`/profile/${user.id}`} className="profile-preview">
      <div className="profile-preview-avatar">
        <span>{user.avatar || '👤'}</span>
      </div>
      <div className="profile-preview-info">
        <span className="profile-preview-name">{user.name}</span>
        <span className="profile-preview-username">{user.username}</span>
      </div>
      {showFriendStatus && user.isFriend && (
        <span className="friend-badge">Friend</span>
      )}
    </Link>
  );
};

export default ProfilePreview;