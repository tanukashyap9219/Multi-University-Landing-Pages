import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LeadForm from './LeadForm';
import FeesModal from './FeesModal';
import './LandingPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://multi-university-landing-pages.onrender.com';

const LandingPage1 = () => {
  const [universityData, setUniversityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUniversityData();
  }, []);

  const fetchUniversityData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/university/amity`);
      setUniversityData(response.data);
    } catch (error) {
      console.error('Error fetching university data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadBrochure = () => {
    // In a real application, this would download a PDF
    alert('Brochure download will be available soon. For now, please fill out the form and we will send it to your email.');
  };

  const handleApplyNow = () => {
    // Scroll to form
    const formElement = document.getElementById('lead-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  if (!universityData) {
    return <div className="error-screen">Failed to load university data</div>;
  }

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="university-nav">
        <div className="nav-container">
          <Link to="/amity" className="nav-link active">Amity University</Link>
          <span className="nav-separator">|</span>
          <Link to="/vit" className="nav-link">VIT University</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{universityData.name}</h1>
          <p className="hero-subtitle">{universityData.location} • Established {universityData.established}</p>
          <p className="hero-description">{universityData.overview}</p>
          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={() => setIsModalOpen(true)}>
              Check Course-wise Fees
            </button>
            <button className="cta-btn secondary" onClick={handleDownloadBrochure}>
              Download Brochure
            </button>
            <button className="cta-btn accent" onClick={handleApplyNow}>
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title">Overview</h2>
          <p className="section-content">{universityData.overview}</p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="content-section alt-bg">
        <div className="container">
          <h2 className="section-title">Our Courses</h2>
          <div className="courses-grid">
            {universityData.courses.map((course, index) => (
              <div key={index} className="course-card">
                <h3 className="course-name">{course.name}</h3>
                <p className="course-duration">Duration: {course.duration}</p>
                <p className="course-seats">Seats Available: {course.seats}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fees Section */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title">Fee Structure</h2>
          <p className="section-content">
            Our fee structure is designed to be competitive and value-driven. 
            Click below to view detailed course-wise fees.
          </p>
          <button className="info-btn" onClick={() => setIsModalOpen(true)}>
            View Course-wise Fees
          </button>
        </div>
      </section>

      {/* Placements Section */}
      <section className="content-section alt-bg">
        <div className="container">
          <h2 className="section-title">Placements</h2>
          <div className="placements-grid">
            <div className="placement-stat">
              <h3>Average Package</h3>
              <p className="stat-value">{universityData.placements.averagePackage}</p>
            </div>
            <div className="placement-stat">
              <h3>Highest Package</h3>
              <p className="stat-value">{universityData.placements.highestPackage}</p>
            </div>
            <div className="placement-stat">
              <h3>Placement Rate</h3>
              <p className="stat-value">{universityData.placements.placementRate}</p>
            </div>
          </div>
          <div className="recruiters-section">
            <h3 className="recruiters-title">Top Recruiters</h3>
            <div className="recruiters-list">
              {universityData.placements.topRecruiters.map((recruiter, index) => (
                <span key={index} className="recruiter-badge">{recruiter}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="content-section">
        <div className="container">
          <h2 className="section-title">Facilities</h2>
          <div className="facilities-grid">
            {universityData.facilities.map((facility, index) => (
              <div key={index} className="facility-item">
                <span className="facility-icon">✓</span>
                <span className="facility-name">{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="lead-form-section" className="content-section form-section">
        <div className="container">
          <LeadForm universityId="amity" universityName={universityData.name} />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 {universityData.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Fees Modal */}
      <FeesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        universityId="amity"
      />
    </div>
  );
};

export default LandingPage1;

