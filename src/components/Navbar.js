import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import "../styles/navbar.css";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  // Course links data for cleaner JSX
  const courseLinks = [
    { path: "/PythonCourse", text: "Python Developer" },
    { path: "/JavaCourse", text: "Java Developer" },
    { path: "/courses/mern", text: "MERN Stack" },
    { path: "/courses/devops", text: "DevOps" },
    { path: "/courses/qa", text: "Quality Assurance" },
    { path: "/courses/ui", text: "UI Design" },
    { path: "/courses/webdev", text: "Web Development" },
    { path: "/courses/python-fullstack", text: "Python Full Stack" },
  ];

  // Auth state handler
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Click outside handler for closing dropdowns
  const handleClickOutside = useCallback((event) => {
    if (!event.target.closest(".nav-item")) {
      setIsDropdownOpen(false);
      setIsProfileOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Handle course search
  const handleSearch = (e) => {
    e.preventDefault();
    const foundCourse = courseLinks.find((course) =>
      course.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundCourse) {
      navigate(foundCourse.path);
      setSearchTerm(""); // Clear input after navigation
    } else {
      alert("Course not found!");
    }
  };

  // Toggle functions
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      {/* Brand Logo */}
      <Link className="navbar-brand d-flex align-items-center" to="/" aria-label="Edify Home">
        <img 
          src="/edify.png" 
          alt="Edify Logo" 
          height="40" 
          className="mr-2"
          loading="lazy"
        />
      </Link>

      {/* Search Bar */}
      <form className="form-inline mx-auto navbar-search" role="search" onSubmit={handleSearch}>
        <input
          className="form-control"
          type="search"
          placeholder="Search for courses..."
          aria-label="Search courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ml-2"   style={{
    background: "none",
    border: "none",
    color: "inherit",
    padding: "5px",
    cursor: "pointer"
  }}>Search</button>
      </form>

      {/* Navbar Items */}
      <div className="navbar-nav ml-auto d-flex align-items-center">
        {/* Courses Dropdown */}
        <div className="nav-item dropdown position-relative">
          <button 
            className="nav-link dropdown-toggle" 
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            aria-label="Courses dropdown"
          >
            Courses
          </button>
          {isDropdownOpen && (
            <div className="custom-dropdown" role="menu">
              {courseLinks.map((course) => (
                <Link 
                  key={course.path}
                  className="dropdown-item"
                  to={course.path}
                  role="menuitem"
                  aria-label={course.text}
                >
                  {course.text}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Scholarships Button */}
        <Link 
          className="nav-link scholarships-btn" 
          to="/scholar"
          aria-label="Scholarships information"
        >
          Scholarships
        </Link>

        {/* Profile Dropdown */}
        {user ? (
          <div className="nav-item dropdown position-relative">
            <button 
              className="nav-link profile-dropdown-btn" 
              onClick={toggleProfile}
              aria-expanded={isProfileOpen}
              aria-haspopup="true"
              aria-label="User profile"
            >
              <img 
                src={user.photoURL || "/user.png"} 
                alt="Profile" 
                className="profile-icon"
                referrerPolicy="no-referrer"
              />
            </button>
            {isProfileOpen && (
              <div className="custom-dropdown1 profile-dropdown" role="menu">
                <Link 
                  className="dropdown-item" 
                  to="/profile"
                  role="menuitem"
                  aria-label="View profile"
                >
                  Profile
                </Link>
                <button 
                  className="dropdown-item" 
                  onClick={handleLogout}
                  role="menuitem"
                  aria-label="Log out"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link 
              className="login-btn mx-2" 
              to="/login"
              aria-label="Log in"
            >
              Log In
            </Link>
            <Link 
              className="signup-btn" 
              to="/register"
              aria-label="Sign up"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

