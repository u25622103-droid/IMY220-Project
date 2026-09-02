import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "../css/Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    // Name validation
    if (!formData.name) {
      newErrors.name = 'Please enter your name';
    } else if (formData.name.length < 4) {
      newErrors.name = 'Name must be at least 4 characters long';
    } else if (formData.name.length > 20) {
      newErrors.name = 'Name must be less than 20 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Please enter your email address';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address (e.g., name@domain.com)';
    } else if (formData.email.length < 5) {
      newErrors.email = 'Email address is too short';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Please enter your password';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    } else if (formData.password.length > 20) {
      newErrors.password = 'Password must be less than 20 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage('Please fix the errors above');
      setMessageType('error');
      return;
    }
    
    // Everything is valid!
    setIsSubmitting(true);
    setMessage('');
    
    setTimeout(() => {
      console.log('Signup successful:', formData);
      
      setMessage('Account created successfully! Redirecting to login...');
      setMessageType('success');
      setIsSubmitting(false);
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      // Clear errors
      setErrors({});
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 5000);
      
    }, 1500);
  };

  return (
    <div className="auth-page">
      <h1>BEAUTIFY</h1>
      <div className="auth-container">
        <p>Create your account</p>
        
        {/* Message display */}
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'error-input' : ''}
              disabled={isSubmitting}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? 'error-input' : ''}
              disabled={isSubmitting}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password (min 4 characters)"
              className={errors.password ? 'error-input' : ''}
              disabled={isSubmitting}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'error-input' : ''}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="form-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-links">
          <p className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;