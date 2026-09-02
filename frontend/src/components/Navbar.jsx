import { Link } from "react-router";


function Navbar() {
    return(
        <nav className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/posts">Posts</Link>
        </nav>
    );
}

export default Navbar