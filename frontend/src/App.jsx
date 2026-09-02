import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/post/:postId" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App
