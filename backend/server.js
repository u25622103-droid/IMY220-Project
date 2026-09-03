const express = require('express');

const app = express();
const PORT = 5000;

app.use(express.json());


// 1. SIGN-IN (Login) Endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  // Stubbed authentication - accepts test@test.com / test1234
  if (email === 'test@test.com' && password === 'test1234') {
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      user: { 
        id: 1, 
        email: email, 
        name: 'Test User',
        username: '@testuser'
      }
    });
  }

  // Stubbed authentication - accepts any email with password 'password'
  if (password === 'password') {
    return res.status(200).json({ 
      success: true, 
      message: 'Login successful',
      user: { 
        id: Math.floor(Math.random() * 1000) + 2, 
        email: email, 
        name: email.split('@')[0] || 'User',
        username: '@' + (email.split('@')[0] || 'user')
      }
    });
  }

  return res.status(401).json({ 
    success: false, 
    message: 'Invalid credentials. Please check your email and password.' 
  });
});

// 2. SIGN-UP (Registration) Endpoint
app.post('/signup', (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required: name, email, and password' 
    });
  }

  if (!email.includes('@')) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  if (password.length < 4) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 4 characters long'
    });
  }

  if (email === 'test@test.com') {
    return res.status(400).json({
      success: false,
      message: 'Email already registered. Please use a different email.'
    });
  }

  return res.status(201).json({ 
    success: true, 
    message: 'Registration successful! Please login.',
    user: { 
      id: Math.floor(Math.random() * 1000) + 2,
      email: email, 
      name: name,
      username: '@' + name.toLowerCase().replace(/\s/g, '')
    }
  });
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running'
  });
});

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test login: test@test.com / test1234`);
});