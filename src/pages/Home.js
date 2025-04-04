import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../styles/home.css";
import FlipCard from "../components/FlipCard";

// Import local images
import careerImage from "../assets/your-image.png";
import gradHat from "../components/gradHat.png";
import money from "../components/money.png";
import handshake from "../components/handshake.png";
import calendar from "../components/calendar.png";
import certificate from "../components/certificate.png";

export default function Home() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    interest: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleStartJourney = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please log in to start your journey!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", mobile: "", interest: "" });
    
    // Reset form submission status after 5 seconds
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const cards = [
    {
      frontImage: "https://digitallearning.eletsonline.com/wp-content/uploads/2019/03/Online-courses.jpg",
      frontText: "Free Courses 🎓",
      backImage: gradHat,
      backText: "Provide free online courses in subjects like tech, design and many other. Courses include video lectures, assignments. All students have access to content, with optional certification upgrades.",
      altText: "Online courses illustration"
    },
    {
      frontImage: "https://www.ssims.edu.in/wp-content/uploads/2020/03/ssit-students-scholarship-loans.jpg",
      frontText: "Scholarships 💰",
      backImage: money,
      backText: "Offer financial aid or full scholarships to students based on merit or need. Application process with eligibility criteria. Automatic recommendations based on user profile & course engagement.",
      altText: "Scholarship illustration"
    },
    {
      frontImage: "https://virtuzone.com/wp-content/uploads/2023/07/business-mentorship-6.jpg",
      frontText: "Mentorship 🤝",
      backImage: handshake,
      backText: "One-on-one & group mentorship available for all registered. Experienced industry professionals and educators help students with career guidance, and problem-solving. Scheduled live Q&A sessions, webinars.",
      altText: "Mentorship illustration"
    },
    {
      frontImage: "https://veracontent.com/contenedor/uploads/2021/08/windows-SwHvzwEzCfA-unsplash.jpg",
      frontText: "Scheduler 📅",
      backImage: calendar,
      backText: "Our study planner helps students organize their learning. Generates a personalized study plan based on selected courses, availability, and deadlines. Calendar integration for tracking assignments.",
      altText: "Calendar illustration"
    },
    {
      frontImage: "https://static.vecteezy.com/system/resources/previews/002/349/754/non_2x/modern-elegant-certificate-template-free-vector.jpg",
      frontText: "Certification 📜",
      backImage: certificate,
      backText: "Students receive verified certificates upon course completion. Certificates include QR codes & digital verification for employers. Option for premium industry-recognized certificates.",
      altText: "Certificate illustration"
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-content">
          <h1 id="hero-heading">
            <span className="highlight">EDIFY:</span> Learn by Doing, Succeed in Your Career
          </h1>
          <p className="subtitle">Why Just Learn When You Can Do?</p>
          <p className="description">
            At EDIFY, We Transform Learning Into Action Through Career Tracks And Real-World 
            Projects Designed To Equip You With The Skills And Confidence To Excel In Your Dream Career.
          </p>
          <Link 
            to="/courses2" 
            className="cta-button" 
            onClick={handleStartJourney}
            aria-label="Start your learning journey"
          >
            Start Your Journey
          </Link>
        </div>
        <div className="hero-image">
          <img 
            src="https://t4.ftcdn.net/jpg/01/31/96/99/360_F_131969925_4npM7jqii8Dlo76mRROdD0r285Oojc8d.jpg" 
            alt="People collaborating on career growth" 
            loading="lazy"
          />
        </div>
      </section>
      
      {/* Track Section */}
      <section className="track-section" aria-labelledby="tracks-heading">
        <h2 id="tracks-heading" className="section-title">Types of Track Offerings</h2>
        <p className="section-description">
          Edify Career Tracks go beyond traditional lessons or courses by immersing you in real-world 
          in-demand skills, projects, and challenges, giving you the experience and confidence to succeed in your career.
        </p>

        <div className="track-container">
          <article className="track-box online-track">
            <h3>Online Tracks</h3>
            <ul>
              <li>Access to a wide range of career paths and industries</li>
              <li>Flexible learning at your own pace, from anywhere</li>
              <li>Comprehensive training with projects, resources, and online support</li>
              <li>Study remotely, wherever you are in the world</li>
              <li>Experience job simulation virtually</li>
            </ul>
          </article>
        </div>
      </section>

      {/* Career Boost Section */}
      <section className="career-boost-section" aria-labelledby="career-boost-heading">
        <div className="container">
          <div className="content">
            {/* Left Side - Image */}
            <div className="image-box">
              <img 
                src={careerImage} 
                alt="Person achieving career success" 
                loading="lazy"
              />
              <div className="icon top-right" aria-hidden="true">✔️</div>
              <div className="icon bottom-left" aria-hidden="true">👤</div>
            </div>
            
            {/* Right Side - Form */}
            <div className="form-box">
              <h2 id="career-boost-heading">Get A Call To Boost Your Career With A New Skill</h2>
              {formSubmitted ? (
                <div className="success-message">
                  <p>Thank you for your interest! We'll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name" className="form"></label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    placeholder="Name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                  
                  <label htmlFor="email" className="sr-only"></label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                  
                  <label htmlFor="mobile" className="sr-only"></label>
                  <input 
                    type="tel" 
                    id="mobile"
                    name="mobile"
                    placeholder="Mobile" 
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required 
                  />
                  
                  <label htmlFor="interest" className="sr-only"></label>
                  <select 
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Interested in</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                  
                  <button type="submit">SUBMIT</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Flip Cards Section */}
      <section className="flip-cards-section" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Key Features</h2>
        <div className="card-container">
          {cards.map((card, index) => (
            <FlipCard
              key={index}
              frontImage={card.frontImage}
              frontText={card.frontText}
              backImage={card.backImage}
              backText={card.backText}
              altText={card.altText}
            />
          ))}
        </div>
      </section>
    </div>
  );
}