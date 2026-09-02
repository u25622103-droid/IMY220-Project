import { Link } from "react-router";
import "../css/Splash.css";

function Splash() {
    return(
        <>
            <div className="splash-bg"></div>
            <div className="splash-main">
                <div className="splash-description">
                    <p>BEAUTIFY is a photo sharing platform where photographers, artists, and dreamers come together to showcase 
                    their unique perspectives.</p>
                    <p> Whether you're a professional photographer or just love capturing everyday moments, </p>
                    <p>BEAUTIFY is your canvas, Share Your Vision.</p>
                    <p>Curate your best work into beautiful collections</p>
                    <p>Connect with fellow photographers and grow together</p>
                </div>
                <div className="splash-buttons">
                    <Link to="/Login">Login</Link>
                    <Link to="/SignUp">Sign-up</Link>
                </div>
            </div>
        </>
    );
}

export default Splash;