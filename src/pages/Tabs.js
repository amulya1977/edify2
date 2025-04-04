import React, { useState } from "react";
import "../styles/Tabs.css";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Description");

  return (
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
              Java is a powerful, object-oriented programming language widely used for 
              building robust, secure applications. Known for its portability across 
              platforms, Java is a top choice for developing everything from mobile apps 
              to enterprise-level solutions. At SkillBridge, our Java career track takes 
              you from the basics to advanced Java development, ensuring you’re well-equipped 
              for the programming challenges of today. Begin your journey into Java 
              programming now and advance your skills in a highly sought-after field.
            </p>

            <h5>Method of Learning:</h5>
            <ul>
              <li><strong>Getting Started with Java:</strong> Understand Java fundamentals and set up your development environment using tools like Eclipse and IntelliJ IDEA.</li>
              <li><strong>Building a Strong Foundation:</strong> Master Java syntax, variables, control structures (such as loops and conditionals), and essential data structures (arrays, lists, and maps).</li>
              <li><strong>Stepping Up Your Game:</strong> Explore object-oriented programming in Java, focusing on classes, objects, inheritance, and interfaces.</li>
              <li><strong>Diving Deeper:</strong> Delve into advanced Java topics like multi-threading, generics, and the Java Stream API.</li>
              <li><strong>Applying Your Skills:</strong> Develop desktop and web applications using frameworks like Swing and Spring, manage databases with JDBC, and automate tasks.</li>
              <li><strong>Understanding Version Control:</strong> Learn to manage your code with Git, mastering version control to enhance project workflow and collaboration.</li>
              <li><strong>Managing Data:</strong> Dive into SQL for database interactions and utilize JDBC for integrating Java applications with databases.</li>
              <li><strong>Testing and Deployment:</strong> Develop unit tests with JUnit and deploy applications on servers like Apache Tomcat.</li>
              <li><strong>Specializing Your Knowledge:</strong> Focus on advanced frameworks and libraries such as Spring Boot for building microservices and Hibernate for object-relational mapping.</li>
            </ul>
          </div>
        )}
        {activeTab === "Curriculum" && (
            <div>
            <h5>Curriculum:</h5>
            <p>Welcome to our <strong>30-Day Java Programming Career Track</strong>. This program is designed to transition you from Java basics to sophisticated application development and project management.</p>

            <h6>Introduction to Java</h6>
            <ul>
              <li><strong>Overview and Popularity:</strong> Learn about Java’s creation, its wide usage, and key features that make it popular.</li>
              <li><strong>Java Basics:</strong> Introduction to Java syntax, the JVM ecosystem, data types, and fundamental programming structures.</li>
            </ul>

            <h6>Version Control Systems</h6>
            <ul>
              <li><strong>Introduction to Git and GitHub:</strong> Basics of using Git and GitHub for Java projects, including repository management and team collaboration.</li>
            </ul>

            <h6>Development Environments</h6>
            <ul>
              <li><strong>Setting Up IDEs:</strong> Introduction to Eclipse and IntelliJ IDEA, tailored for effective Java development.</li>
            </ul>

            <h6>Database Management</h6>
            <ul>
              <li><strong>Introduction to SQL:</strong> Basic SQL syntax and operations essential for Java developers.</li>
              <li><strong>JDBC Essentials:</strong> Setting up JDBC in Eclipse for database management in Java applications.</li>
            </ul>

            <h6>Java Programming Foundations</h6>
            <ul>
              <li><strong>OOP Principles:</strong> Comprehensive exploration of object-oriented concepts in Java.</li>
              <li><strong>Exception Handling:</strong> Strategies for robust error handling in Java applications.</li>
            </ul>

            <h6>Advanced Java Concepts</h6>
            <ul>
              <li><strong>Advanced OOP and Design Patterns:</strong> Deep dive into complex OOP techniques and the use of design patterns.</li>
              <li><strong>Concurrency and Multithreading:</strong> Understanding Java threads and concurrency models to build responsive applications.</li>
            </ul>

            <h6>Project and Database Handling</h6>
            <ul>
              <li><strong>Practical Projects:</strong> Real-world Java project scenarios to apply your skills comprehensively.</li>
              <li><strong>Advanced JDBC Techniques:</strong> Advanced database operations with Java, integrating complex SQL queries and transaction management.</li>
            </ul>
          </div>

        )}
        {activeTab === "Instructor" && <p>Instructor details here...</p>}
      </div>
    </div>
  );
};

export default Tabs;
