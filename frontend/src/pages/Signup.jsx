import { Link } from "react-router";
import { useState } from "react";
import "../css/Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    const newErrors = {};
    
    // Custom error messages
    if (!formData.name) {
        newErrors.name = 'Please enter your name';
    } else if (formData.name.length < 4) {
        newErrors.name = 'Name must be at least 4 characters long';
    } else if (formData.name.length > 20) {
        newErrors.name = 'Name must be less than 20 characters';
    }

    if (!formData.email) {
        newErrors.email = 'Please enter your email address';
    } else if (!formData.email.includes('@')) {
        newErrors.email = 'Please enter a valid email address (e.g., name@domain.com)';
    } else if (formData.email.length < 5) {
        newErrors.email = 'Email address is too short';
    }
    
    if (!formData.password) {
        newErrors.password = 'Please enter your password';
    } else if (formData.password.length < 4) {
        newErrors.password = 'Password must be at least 4 characters long';
    } else if (formData.password.length > 20) {
        newErrors.password = 'Password must be less than 20 characters';
    }

    if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword != formData.password) {
        newErrors.password = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
    }
    
    console.log('Login:', formData);
};

  return (
    <div className="auth-page">
        <h1>BEAUTIFY</h1>
        <div className="auth-container">
            <p>Create your account</p>
            <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <label htmlFor="name">Full Name: </label>
                <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                />
                <br/>
                {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="email">Email: </label>
                <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                />
                <br/>
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password: </label>
                <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                />
                <br/>
                {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                />
                <br/>
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="form-btn">Sign Up</button>
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