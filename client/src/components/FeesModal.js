import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FeesModal.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://multi-university-landing-pages.onrender.com';

const FeesModal = ({ isOpen, onClose, universityId }) => {
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && universityId) {
      fetchFees();
    }
  }, [isOpen, universityId]);

  const fetchFees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/fees/${universityId}`);
      setFees(response.data);
    } catch (err) {
      console.error('Error fetching fees:', err);
      setError('Failed to load course fees. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Course-wise Fees</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          {loading && (
            <div className="loading">Loading fees information...</div>
          )}
          
          {error && (
            <div className="error-message">{error}</div>
          )}
          
          {fees && !loading && (
            <div className="fees-list">
              {Object.entries(fees).map(([course, feeInfo]) => (
                <div key={course} className="fee-item">
                  <div className="course-name">{course}</div>
                  <div className="fee-range">
                    <span className="fee-amount">{feeInfo.range}</span>
                    {feeInfo.perYear && (
                      <span className="fee-period">per year</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="modal-close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default FeesModal;

