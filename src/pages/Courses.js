import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Python Developer", 
    "Java Developer", 
    "MERN Stack", 
    "DevOps", 
    "Quality Assurance", 
    "UI Design", 
    "Web Development", 
    "Python Full Stack"
  ];

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/courses");
      setCourses(response.data);
      setFilteredCourses(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses. Please try again later.");
      setCourses([]);
      setFilteredCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const filterCourses = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
    
    if (category === "All") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter(course => 
        course.category === category
      );
      setFilteredCourses(filtered);
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="courses-container">
      <h1 className="courses-header">Career Tracks</h1>

      {/* Dropdown Filter */}
      <div className="dropdown-container">
        <button 
          onClick={() => setShowDropdown(!showDropdown)} 
          className="dropdown-btn"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
        >
          {selectedCategory} ▼
        </button>
        
        {showDropdown && (
          <div className="dropdown-content" role="listbox">
            {categories.map((category) => (
              <div
                key={category}
                className={`dropdown-item ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => filterCourses(category)}
                role="option"
                aria-selected={selectedCategory === category}
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading courses...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchCourses} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* Course List */}
      {!loading && !error && (
        <div className="course-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div 
                key={course._id} 
                className="course-card"
                onClick={() => handleCourseClick(course._id)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && handleCourseClick(course._id)}
              >
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="course-image"
                  loading="lazy"
                />
                <div className="course-info">
                  <h2 className="course-title">{course.title}</h2>
                  <p className="course-description">
                    {course.description.length > 100
                      ? `${course.description.substring(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="course-meta">
                    <span className="instructor">
                      Instructor: {course.instructor}
                    </span>
                    {course.duration && (
                      <span className="duration">
                        ⏱️ {course.duration} hours
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-courses">
              <p>No courses found in this category.</p>
              <button 
                onClick={() => filterCourses("All")} 
                className="view-all-btn"
              >
                View All Courses
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}