import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    // Validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address (e.g., name@domain.com)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        // Store user data
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage('✅ Login successful! Redirecting...');
        // Redirect to home after 1 second
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        setMessage('❌ ' + data.message);
        setErrors({ general: data.message });
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('❌ Network error. Please make sure the server is running.');
    }
  };

  return (
    <div>
      <div className="login-bg"></div>
      <h1 id="log-heading">Login to BEAUTIFY</h1>
      <div className="login-container">
        {message && (
          <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
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
              placeholder="Enter your password"
              className={errors.password ? 'error-input' : ''}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit" className="form-btn">Login</button>
        </form>
        
        <div className="auth-links">
          <p className="auth-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;