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
  const isSplashPage = location.pathname === '/';

  return (
    <div className="app-wrapper">
      {/* Only show heading and navbar if NOT on splash page */}
      {!isSplashPage && (
        <>
          <h1>BEAUTIFY</h1>
          <div className='main'>
            <Navbar />
            <div className='content'>
              <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/posts" element={<Posts />} />
              </Routes>
            </div>
          </div>
        </>
      )}
      
      {/* Show splash page without heading and navbar */}
      {isSplashPage && (
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default App;