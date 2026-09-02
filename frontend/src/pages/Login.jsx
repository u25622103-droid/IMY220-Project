import { Link } from "react-router";

function Login() {
    return(
        <div className="auth-page">
            <h1>Login to BEAUTIFY</h1>
            <p>Enter your credentials to continue</p>
            {/* Add login form here later */}
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default Login;