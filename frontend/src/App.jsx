import { Routes, Route } from 'react-router';
import Navbar from './Navbar';
import Splash from './Splash';
import Home from './Home';
import Profile from './Profile';
import Posts from './Posts';

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
            <Route path="/post" element={<Posts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default  App;