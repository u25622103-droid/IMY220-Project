import { useState } from 'react';

const Comments = ({ postId, comments = [] }) => {
  const [newComment, setNewComment] = useState('');
  const [allComments, setAllComments] = useState(comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      user: 'You',
      text: newComment,
      timestamp: 'Just now'
    };
    
    setAllComments(prev => [...prev, comment]);
    setNewComment('');
    console.log(`Comment on post ${postId}:`, comment);
  };

  return (
    <div className="comments">
      <h4>Comments ({allComments.length})</h4>
      
      {allComments.length === 0 ? (
        <p className="no-comments">No comments yet. Be the first!</p>
      ) : (
        allComments.map(comment => (
          <div key={comment.id} className="comment">
            <span className="comment-user">{comment.user}</span>
            <span className="comment-text">{comment.text}</span>
            <span className="comment-time">{comment.timestamp}</span>
          </div>
        ))
      )}
      
      <form onSubmit={handleSubmit} className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Comments;