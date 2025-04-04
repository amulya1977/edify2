import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../components/firebase";
import "../styles/auth.css";

export default function ForgotPassword() {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({ 
        text: "Password reset email sent. Please check your inbox (and spam folder).", 
        type: "success" 
      });
      setEmailSent(true);
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email address.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many attempts. Please try again later.";
          break;
        default:
          errorMessage = error.message;
      }

      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Logo */}
        <div className="logo-container">
          <img 
            src="/edify.png" 
            alt="Edify Logo" 
            className="logo" 
            loading="lazy"
          />
        </div>

        {/* Heading */}
        <h1 className="auth-title">Reset Your Password</h1>
        <p className="auth-subtext">
          {emailSent 
            ? "Check your email for the reset link"
            : "Enter your email to receive a password reset link"}
        </p>

        {/* Form */}
        {!emailSent && (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="your@email.com"
                className="input-field"
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                autoFocus
              />
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                "Send Reset Email"
              )}
            </button>
          </form>
        )}

        {/* Message */}
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
            {message.type === "success" && (
              <div className="resend-link">
                Didn't receive it?{" "}
                <button 
                  onClick={handleSubmit} 
                  className="text-button"
                  disabled={isLoading}
                >
                  Resend email
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer Links */}
        <div className="auth-footer">
          <p>
            Remember your password?{" "}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}