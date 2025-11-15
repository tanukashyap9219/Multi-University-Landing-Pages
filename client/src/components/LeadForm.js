import React, { useState } from 'react';
import axios from 'axios';
import './LeadForm.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://multi-university-landing-pages.onrender.com';

const LeadForm = ({ universityId, universityName }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    course: '',
    intakeYear: '',
    consent: false
  });
  
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry'
  ];

  const courses = [
    'B.Tech Computer Science',
    'B.Tech CSE',
    'B.Tech ECE',
    'B.Tech Mechanical',
    'MBA',
    'BBA',
    'M.Tech Data Science',
    'M.Tech AI & ML'
  ];

  const intakeYears = ['2024', '2025', '2026', '2027'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear message when user starts typing
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setMessage({ type: 'error', text: 'Full Name is required' });
      return false;
    }
    
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Email is required' });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return false;
    }
    
    if (!formData.phone.trim()) {
      setMessage({ type: 'error', text: 'Phone number is required' });
      return false;
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setMessage({ type: 'error', text: 'Phone number must be 10 digits starting with 6-9' });
      return false;
    }
    
    if (!formData.state) {
      setMessage({ type: 'error', text: 'Please select your state' });
      return false;
    }
    
    if (!formData.course) {
      setMessage({ type: 'error', text: 'Please select a course' });
      return false;
    }
    
    if (!formData.intakeYear) {
      setMessage({ type: 'error', text: 'Please select intake year' });
      return false;
    }
    
    if (!formData.consent) {
      setMessage({ type: 'error', text: 'Please accept the consent to proceed' });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
    try {
      const response = await axios.post(`${API_BASE_URL}/api/lead/submit`, {
        ...formData,
        university: universityName
      });
      
      if (response.data.success) {
        setMessage({ 
          type: 'success', 
          text: 'Thank you! Your information has been submitted successfully. We will contact you soon.' 
        });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          state: '',
          course: '',
          intakeYear: '',
          consent: false
        });
      } else {
        setMessage({ type: 'error', text: response.data.error || 'Something went wrong' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to submit. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lead-form-container">
      <h2 className="form-title">Get in Touch</h2>
      <p className="form-subtitle">Fill out the form below and our team will contact you</p>
      
      <form onSubmit={handleSubmit} className="lead-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name <span className="required">*</span></label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email <span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number <span className="required">*</span></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="state">State <span className="required">*</span></label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select your state</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="course">Course Interested <span className="required">*</span></label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="intakeYear">Intake Year <span className="required">*</span></label>
          <select
            id="intakeYear"
            name="intakeYear"
            value={formData.intakeYear}
            onChange={handleChange}
            required
          >
            <option value="">Select intake year</option>
            {intakeYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <span>I consent to receive communications from {universityName} regarding admissions and course information <span className="required">*</span></span>
          </label>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;

