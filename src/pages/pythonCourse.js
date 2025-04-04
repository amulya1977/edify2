import React, { useState } from "react";
//import Navbar from "../components/Navbar";
//import CourseCard from "../MyComponents/CourseCard";
//import Tabs from "../MyComponents/Tabs";
import "../styles/JavaCourse.css";
import CourseCardPython from "../pages/pythoncoursecard";

const PythonCourse = () => {
    const [activeTab, setActiveTab] = useState("Description");
  return (
    <div>

      <div className="course-container">
        <div className="course-content">
          <h1>Python Full Stack: Unleashing the Power of Web Applications</h1>
          <p>📅 Oct/2024 | 📚 60 lessons | 🌍 English</p>
          <div className="tabs-container">
      <div className="tabs">
        {["Description", "Curriculum", "Instructor"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {activeTab === "Description" && (
            <div>
            <h5>Description:</h5>
            <p>
            Python Full Stack Development is one of the most in-demand skills in the tech industry, allowing developers to build dynamic, scalable, and efficient web applications. A Python Full Stack Developer is skilled in both frontend and backend technologies, creating seamless user experiences while managing server-side logic, databases, and APIs.

This course will equip you with the expertise needed to develop full-fledged web applications from scratch, covering everything from Python programming fundamentals to advanced frameworks like Django and Flask, and frontend technologies like React.js.
            </p>

            <h5>Method of Learning:</h5>
            <ul>
              <li><strong>Getting Started with Python</strong> Understanding Python fundamentals (syntax, data types, loops, functions).</li>
              <li><strong>Building a Strong Foundation</strong> Frontend Basics: HTML, CSS, JavaScript.</li>
              <li><strong>Backend Development with Python</strong> Flask & Django: Build scalable and secure web applications.</li>
              <li><strong>Database Management & ORM</strong> SQL & PostgreSQL: Managing relational data.</li>
              <li><strong>Real-World Project Development</strong> Building full-stack web applications from scratch.</li>
              <li><strong>Version Control & Deployment</strong>  Hosting on Cloud Platforms: AWS, Heroku, DigitalOcean.</li>
              <li><strong>Capstone Project & Career Readiness</strong>Building a portfolio-worthy project.</li>
              
            </ul>
          </div>
        )}
        {activeTab === "Curriculum" && (
            <div>
              <h5>Curriculum:</h5>
<p>Welcome to our <strong>120-Day Python Full Stack Development Career Track</strong>. This program is designed to transition you from Python basics to developing sophisticated full-stack web applications.</p>

<h6>Introduction to Python & Web Development</h6>
<ul>
  <li><strong>Python Basics:</strong> Learn Python syntax, data types, loops, functions, and object-oriented programming.</li>
  <li><strong>Development Setup:</strong> Set up Python, VS Code/PyCharm, Git, and virtual environments for efficient coding.</li>
</ul>

<h6>Frontend Development with React.js</h6>
<ul>
  <li><strong>HTML & CSS:</strong> Master the foundations of web development, styling, and responsive design.</li>
  <li><strong>JavaScript & React.js:</strong> Build interactive user interfaces using React, components, state management, and API integration.</li>
</ul>

<h6>Backend Development with Python</h6>
<ul>
  <li><strong>Django & Flask:</strong> Learn backend development, create RESTful APIs, and manage authentication.</li>
  <li><strong>Security & Middleware:</strong> Implement security measures like JWT authentication, CORS handling, and middleware usage.</li>
</ul>

<h6>Database Management & ORM</h6>
<ul>
  <li><strong>SQL & PostgreSQL:</strong> Understand database design, perform CRUD operations, and optimize queries.</li>
  <li><strong>MongoDB & Django ORM:</strong> Work with NoSQL databases and interact with relational databases using Django ORM & SQLAlchemy.</li>
</ul>

<h6>Advanced Backend Concepts</h6>
<ul>
  <li><strong>WebSockets & Real-time Communication:</strong> Build real-time applications like live chat and notifications.</li>
  <li><strong>Microservices & Task Automation:</strong> Learn Celery, Redis, and API-based architecture for scalable applications.</li>
</ul>

<h6>Version Control & Deployment</h6>
<ul>
  <li><strong>Git & GitHub:</strong> Master version control for collaborative coding and efficient project management.</li>
  <li><strong>Cloud Deployment:</strong> Deploy applications using Docker, AWS, Heroku, and CI/CD pipelines.</li>
</ul>

<h6>Project Development & Capstone</h6>
<ul>
  <li><strong>Real-World Projects:</strong> Work on an e-commerce website, social media platform, or blogging app.</li>
  <li><strong>Portfolio Building:</strong> Develop and deploy a complete full-stack application to showcase your skills.</li>
</ul>

            </div>

        )}
        {activeTab === "Instructor" && <p>Instructor details here...</p>}
      </div>
    </div>
        </div>
      
        <CourseCardPython />
      </div>
    </div>
  );
};

export default PythonCourse;
