import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {app} from "../components/firebase";  // Import Firebase config
import "../styles/auth2.css";

export default function Signup() {
  const auth = getAuth();
  const db = getFirestore(app);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!formData.agreeTerms) {
      alert("You must agree to the terms & conditions.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // Store additional user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        uid: user.uid,
      });

      alert("Registration successful!");
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <img src="/edify.png" alt="Edify Logo" className="edify-logo" />
        <h2 className="title">New account</h2>
        <p className="subtext">
          Have an account? <a href="/login">Login</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <select name="phoneCode">
              <option value="+91">+91</option>
            </select>
            <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          </div>
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          <div className="input-group">
            <input type="password" name="password" placeholder="Must contain at least 10 characters" onChange={handleChange} required minLength={10} />
            <input type="password" name="confirmPassword" placeholder="Confirm your password" onChange={handleChange} required />
          </div>
          <div className="checkbox-group">
            <input type="checkbox" name="agreeTerms" id="terms" onChange={handleChange} required />
            <label htmlFor="terms">I agree to all terms & conditions</label>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
