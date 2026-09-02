import { Link } from 'react-router-dom';

function Signup() {
    return(
        <div className="auth-page">
            <h1>Create Account</h1>
            <p>Join BEAUTIFY today</p>
            {/* Add signup form here later */}
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default Signup;