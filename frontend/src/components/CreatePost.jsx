import { useState } from 'react';
//import { Link } from 'react-router';

const CreatePost = ({ onCancel, onPostCreated }) => {
  const [formData, setFormData] = useState({
    image: null,
    description: '',
    hashtags: ''
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.image) newErrors.image = 'Please select an image';
    if (!formData.description) newErrors.description = 'Please add a description';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Creating post:', formData);
    if (onPostCreated) onPostCreated();
  };

  return (
    <div className="create-post">
      <h3>Create New Post</h3>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="post-image">Image</label>
          <input
            id="post-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={errors.image ? 'error-input' : ''}
          />
          {errors.image && <span className="error">{errors.image}</span>}
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="post-description">Description</label>
          <textarea
            id="post-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What's on your mind?"
            className={errors.description ? 'error-input' : ''}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="post-hashtags">Hashtags</label>
          <input
            id="post-hashtags"
            name="hashtags"
            value={formData.hashtags}
            onChange={handleChange}
            placeholder="#photography #nature"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Share Post</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;