import { Link } from "react-router";


function Navbar() {
    return(
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/posts">Posts</Link>
        </nav>
    );
}

export default Navbar