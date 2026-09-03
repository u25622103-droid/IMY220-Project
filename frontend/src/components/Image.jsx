import { useState } from 'react';

const Image = ({ src, alt, className, onClick, thumbnail = false }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <div className={`image-container ${thumbnail ? 'thumbnail' : ''}`}>
      {loading && <div className="image-loader">⏳</div>}
      {error ? (
        <div className="image-error">📸 No image</div>
      ) : (
        <img
          src={src}
          alt={alt || 'Image'}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          onClick={onClick}
          style={{ display: loading ? 'none' : 'block' }}
        />
      )}
    </div>
  );
};

export default Image;