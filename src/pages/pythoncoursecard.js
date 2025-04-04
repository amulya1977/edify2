import React, { useState, useEffect, useCallback } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import "../styles/CourseCard.css";

const CourseCardPython = () => {
  const [user, setUser] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const auth = getAuth();
  const db = getFirestore();
  const courseId = "python_course"; // Unique Course ID for Python

  // Function to check if the user is enrolled or has completed the course
  const checkEnrollmentStatus = useCallback(async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setIsCompleted(userData.completedCourses?.includes(courseId) || false);
        setIsEnrolled(userData.enrolledCourses?.includes(courseId) || false);
      }
    } catch (error) {
      console.error("Error checking enrollment status:", error);
    }
  }, [db, courseId]); // ✅ Dependencies to avoid stale closures

  // Check user authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  // Fetch enrollment status only when `user` is set
  useEffect(() => {
    if (user) {
      checkEnrollmentStatus(user.uid);
    }
  }, [user, checkEnrollmentStatus]); // ✅ No warning, no infinite loop

  // Function to enroll the user
  const handleEnrollment = async () => {
    if (!user) {
      alert("Please log in to enroll!");
      return;
    }

    if (isCompleted) {
      alert("You have already completed this course and cannot re-enroll.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, { enrolledCourses: [courseId], completedCourses: [] });
      } else {
        await updateDoc(userRef, {
          enrolledCourses: arrayUnion(courseId),
        });
      }

      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <div className="course-card">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlytRRYe4je0g5y3CR8NS1xkrAvurMcvSAxQ&s"
        alt="Python Course"
        className="course-images"
      />
      <div className="course-info">
        <h2>Python Full Stack: Unleashing the Power of Web Applications</h2>
        <p className="price">Free</p>

        {/* Enrollment Button */}
        <button
          className={`start-btn ${isEnrolled || isCompleted ? "enrolled" : ""}`}
          onClick={handleEnrollment}
          disabled={isEnrolled || isCompleted}
        >
          {isCompleted ? "Course Completed 🎉" : isEnrolled ? "Enrolled ✅" : "Start Now"}
        </button>

        <ul className="course-details">
          <li> 100% positive reviews</li>
          <li> 10 students</li>
          <li> 60 lessons</li>
          <li> Language: English</li>
        </ul>
      </div>
    </div>
  );
};

export default CourseCardPython;



