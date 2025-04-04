import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/schedule.css";

// Moved outside component to prevent recreation
const courseSchedules = {
  java_course: {
    title: "Java Developer",
    image: "/java.jpg",
    days: Array.from({ length: 15 }, (_, i) => ({
      title: `Day ${i + 1} - Java Lesson`,
      videos: [`https://youtu.be/java${i + 1}`],
    })),
  },
  python_course: {
    title: "Python Developer",
    image: "/python.png",
    days: Array.from({ length: 15 }, (_, i) => ({
      title: `Day ${i + 1} - Python Lesson`,
      videos: [`https://youtu.be/python${i + 1}`],
    })),
  },
};

const Schedule = () => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [dayStatus, setDayStatus] = useState({});
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserCourses = async (userId) => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setEnrolledCourses(userData.enrolledCourses || []);
          setDayStatus(userData.dayProgress || {});
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserCourses(currentUser.uid);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate, db]);

  const toggleDayStatus = async (courseId, dayIndex) => {
    if (!user) return;
    
    try {
      const updatedStatus = { ...dayStatus };
      updatedStatus[courseId] = updatedStatus[courseId] || {};
      updatedStatus[courseId][dayIndex] = !updatedStatus[courseId][dayIndex];

      setDayStatus(updatedStatus);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { dayProgress: updatedStatus });

      checkCourseCompletion(courseId, updatedStatus);
    } catch (error) {
      console.error("Error updating day status:", error);
    }
  };

  const checkCourseCompletion = async (courseId, updatedStatus) => {
    if (!user) return;

    try {
      const allDaysChecked = 
        Object.values(updatedStatus[courseId] || {}).filter(Boolean).length === 15;

      if (allDaysChecked) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const updatedEnrolledCourses = userData.enrolledCourses.filter(
            (id) => id !== courseId
          );
          const updatedCompletedCourses = [
            ...(userData.completedCourses || []), 
            courseId
          ];

          await updateDoc(userRef, {
            enrolledCourses: updatedEnrolledCourses,
            completedCourses: updatedCompletedCourses,
          });

          setEnrolledCourses(updatedEnrolledCourses);
        }
      }
    } catch (error) {
      console.error("Error checking course completion:", error);
    }
  };

  return (
    <div className="schedule-page">
      <h1 className="schedule-title">Your Course Schedule</h1>

      {enrolledCourses.length > 0 ? (
        enrolledCourses.map((courseId) => {
          const course = courseSchedules[courseId];
          if (!course) return null; // Handle case where course doesn't exist
          
          return (
            <div key={courseId} className="course-section">
              <div 
                className="course-header" 
                onClick={() => setExpandedCourse(expandedCourse === courseId ? null : courseId)}
              >
                <img src={course.image} alt={course.title} className="course-image" />
                <h2>{course.title}</h2>
              </div>
              {expandedCourse === courseId && (
                <div className="course-dropdown">
                  {course.days.map((day, dayIndex) => (
                    <div key={dayIndex} className="day-item">
                      <input
                        type="checkbox"
                        checked={!!dayStatus[courseId]?.[dayIndex]}
                        onChange={() => toggleDayStatus(courseId, dayIndex)}
                      />
                      <span>{day.title}</span>
                      {day.videos.map((video, vidIndex) => (
                        <a 
                          key={vidIndex} 
                          href={video} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          📺 Video {vidIndex + 1}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No courses enrolled.</p>
      )}
    </div>
  );
};

export default Schedule;





