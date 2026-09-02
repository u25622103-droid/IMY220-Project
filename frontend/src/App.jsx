import { Routes, Route, useLocation } from 'react-router';
import Navbar from './components/Navbar';
import Splash from "./pages/Splash"
import Home from './pages/Home';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import Signup from './pages/Signup';
import Login from './pages/Login';
import "./css/App.css";

function App() {
  const location = useLocation();
  // Pages that should NOT show the navbar/heading
  const noLayoutPages = ['/', '/login', '/signup'];
  const showLayout = !noLayoutPages.includes(location.pathname);

  return (
    <div className="app-wrapper">
      {showLayout ? (
        <>
          <h1 id='main-heading'>BEAUTIFY</h1>
          <div className='main'>
            <Navbar />
            <div className='content'>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/posts" element={<Posts />} />
                {/* Redirect any unknown routes to home */}
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        // Show splash/login/signup without heading and navbar
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </div>
  );
}

export default App;