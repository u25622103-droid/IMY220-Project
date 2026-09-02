import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Splash from "./pages/Splash"
import Home from './pages/Home';
import Profile from './pages/Profile';
import Posts from './pages/Posts';
import "./css/App.css";

function App() {
  return (
    <div className="app-wrapper">
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
    </div>
  );
}

export default  App;