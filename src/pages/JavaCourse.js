import React from "react";
//import Navbar from "../components/Navbar";
import CourseCard from "../pages/CourseCard";
import Tabs from "../pages/Tabs";
import "../styles/JavaCourse.css";

const JavaCourse = () => {
  return (
    <div>

      <div className="course-container">
        <div className="course-content">
          <h1>Become a Java Developer</h1>
          <p>📅 Oct/2024 | 📚 60 lessons | 🌍 English</p>
          <Tabs />
        </div>
        <CourseCard />
      </div>
    </div>
  );
};

export default JavaCourse;
