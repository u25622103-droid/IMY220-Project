import { Link, useLocation } from 'react-router';
import "../css/Navbar.css"

const Navbar = () => {
const location = useLocation();
  
  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link 
          to="/home" 
          className={isActive('/home') ? 'active' : ''}>
            Home
        </Link>
        
        <Link 
          to="/profile" 
          className={isActive('/profile') ? 'active' : ''}>
          Profile
        </Link>
        
        <Link 
          to="/posts" 
          className={isActive('/posts') ? 'active' : ''}>
          Posts
        </Link>
        
        <Link 
          to="/login" 
          className="logout-btn"
          onClick={() => {
            // Add logout logic here
            console.log('Logging out...');
          }}
        >
        Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;