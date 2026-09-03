import { useState } from 'react';

const EditPost = ({ post, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    description: post.description || '',
    hashtags: post.hashtags?.join(' ') || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.description) {
      setErrors({ description: 'Description is required' });
      return;
    }
    
    const hashtags = formData.hashtags.split(' ').filter(tag => tag.startsWith('#'));
    onSave({ ...formData, hashtags });
  };

  return (
    <div className="edit-post">
      <h4>Edit Post</h4>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <div className="form-group">
          <label htmlFor="edit-description">Description</label>
          <textarea
            id="edit-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error-input' : ''}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="edit-hashtags">Hashtags</label>
          <input
            id="edit-hashtags"
            name="hashtags"
            value={formData.hashtags}
            onChange={handleChange}
            placeholder="#photography #nature"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn">Save Changes</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;