import { Link } from 'react-router';
import { useState } from 'react';
import "../css/Friend.css";

const Friend = ({ friend, showActions = false }) => {
  const [isFriend, setIsFriend] = useState(friend.isFriend || false);

  const handleFriendAction = () => {
    setIsFriend(!isFriend);
  };

  return (
    <div className="friend-card">
      <Link to={`/profile/${friend.id}`} className="friend-link">
        
        <div className="friend-info">
          <span className="friend-name">{friend.name}</span>
          <span className="friend-username">{friend.username}</span>
        </div>
      </Link>

      {showActions && (
        <button
          onClick={handleFriendAction}
          className={`friend-action-btn ${isFriend ? 'remove' : 'add'}`}
        >
          {isFriend ? 'Friend' : '+ Add Friend'}
        </button>
      )}
    </div>
  );
};

export default Friend;