import ScholarshipList from "../components/scholarships";
import "../styles/scholar.css";

export default function ScholarPage() {
  return (
    <div className="scholar-page-container">
      <div className="scholar-header">
        <h2>Scholarship Portal</h2>
        <p className="header-description">
          We offer financial aid or full scholarships to students based on merit or need. 
          Application process with eligibility criteria.
        </p>
      </div>
      
      <div className="scholarship-list-container">
        <ScholarshipList />
      </div>
    </div>
  );
}