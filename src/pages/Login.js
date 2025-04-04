import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../components/firebase";  // Import Firebase config
import "../styles/auth.css";

export default function Login() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Login successful!");
      navigate("/"); // Redirect user after login
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="logo-container">
          <img src="/edify.png" alt="Edify Logo" className="logo" />
        </div>

        {/* Login Heading */}
        <h2 className="login-title">Login to your account</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            onChange={handleChange}
            required
          />
          <div className="forgot-password">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>

        {/* Sign-up Link */}
        <p className="subtext">
          Don't have an account? <Link to="/Register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

