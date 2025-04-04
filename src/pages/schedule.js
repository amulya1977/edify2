import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/schedule.css"; // Import CSS

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserCourses(currentUser.uid);  // ✅ Using fetchUserCourses
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate, fetchUserCourses]); // ✅ Add all dependencies
  


  const toggleDayStatus = async (courseId, dayIndex) => {
    const updatedStatus = { ...dayStatus };
    updatedStatus[courseId] = updatedStatus[courseId] || {};
    updatedStatus[courseId][dayIndex] = !updatedStatus[courseId][dayIndex];

    setDayStatus(updatedStatus);

    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { dayProgress: updatedStatus });

    checkCourseCompletion(courseId, updatedStatus);
  };

  const checkCourseCompletion = async (courseId, updatedStatus) => {
    const completedDays = Object.values(updatedStatus[courseId] || {}).filter(Boolean).length;
    const totalDays = courseSchedules[courseId]?.days.length || 0;

    if (completedDays === totalDays) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        const updatedEnrolledCourses = userData.enrolledCourses.filter((id) => id !== courseId);
        const updatedCompletedCourses = [...(userData.completedCourses || []), courseId];
        await updateDoc(userRef, {
          enrolledCourses: updatedEnrolledCourses,
          completedCourses: updatedCompletedCourses,
        });
        setEnrolledCourses(updatedEnrolledCourses);
      }
    }
  };

  return (
    <div className="schedule-page">
      <h1 className="schedule-title">Course Schedule</h1>
      {enrolledCourses.length > 0 ? (
        enrolledCourses.map((courseId) => {
          const course = courseSchedules[courseId];
          const completedDays = Object.values(dayStatus[courseId] || {}).filter(Boolean).length;
          const totalDays = course.days.length;

          return (
            <div key={courseId} className="course-section">
              <div className="course-header" onClick={() => setExpandedCourse(expandedCourse === courseId ? null : courseId)}>
                <img src={course.image} alt={course.title} className="course-image" />
                <h2>{course.title}</h2>
                <span className="days-completed">Days Completed: {completedDays}/{totalDays}</span>
              </div>
              {expandedCourse === courseId && (
                <div className="course-dropdown">
                  {course.days.map((day, dayIndex) => (
                    <div key={dayIndex} className="day-item">
                      <input
                        type="checkbox"
                        checked={dayStatus[courseId]?.[dayIndex] || false}
                        onChange={() => toggleDayStatus(courseId, dayIndex)}
                      />
                      <span>{day.title}</span>
                      {day.videos.map((video, vidIndex) => (
                        <a key={vidIndex} href={video} target="_blank" rel="noopener noreferrer">
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