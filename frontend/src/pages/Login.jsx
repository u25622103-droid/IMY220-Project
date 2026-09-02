import { Link } from "react-router";
import { useState } from "react";
import "../css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    // Simple validation
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address (e.g., name@domain.com)';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    console.log('Login:', formData);
    // Handle login logic here
  };

  return (
    <div>
      <div className="login-bg"></div>
        <h1 id="log-heading">Login to BEAUTIFY</h1>
        <div className="login-container">
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