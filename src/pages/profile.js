import React, { useState, useEffect, useCallback } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

const courseDetails = {
  java_course: { title: "Java Developer", image: "/java.jpg" },
  python_course: { title: "Python Developer", image: "/python.png" },
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  const fetchUserData = useCallback(async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const userData = userSnap.data();
  
        setUser((prevUser) => ({
          ...prevUser,
          phone: userData.phone || "Not provided",
        }));
  
        setEnrolledCourses(
          (userData.enrolledCourses || []).map(id => courseDetails[id]).filter(Boolean)
        );
  
        setCertificates(
          (userData.completedCourses || []).map(id => ({
            title: courseDetails[id]?.title,
            image: "/certificate.png",
            provider: "Edify Platform",
            userName: userData.name,
          })).filter(Boolean)
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [db]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          name: currentUser.displayName || "Not provided",
          email: currentUser.email,
          phone: currentUser.phone || "Not provided",
          avatar: currentUser.photoURL || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
        });
        await fetchUserData(currentUser.uid);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, [auth, navigate, fetchUserData]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {user ? (
          <div className="profile-card">
            <img className="profile-avatar" src={user.avatar} alt="Profile Avatar" />
            <div className="profile-details">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="enrolled-courses-container">
        <h2 className="enrolled-courses-title">Enrolled Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="enrolled-courses-grid">
            {enrolledCourses.map((course, index) => (
              <div key={index} className="enrolled-course-box">
                <img src={course.image} alt={course.title} className="enrolled-course-image" />
                <div className="enrolled-course-content">
                  <h3 className="enrolled-course-title">{course.title}</h3>
                  <button className="continue-button" onClick={() => navigate("/Schedule")}>
                    ▶ Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No enrolled courses yet.</p>
        )}
      </div>

      {certificates.length > 0 && (
        <div className="certificates-container">
          <h2 className="certificates-title">Certificates</h2>
          <div className="certificates-grid">
            {certificates.map((cert, index) => (
              <div key={index} className="certificate-box">
                <img src={cert.image} alt="Certificate" className="certificate-image" />
                <h3 className="certificate-title">{cert.title}</h3>
                <p className="certificate-provider">Provider: {cert.provider}</p>
                <p className="certificate-user">Awarded to: {cert.userName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;



