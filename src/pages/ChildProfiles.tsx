import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChildProfiles.css';

const ChildProfiles: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="child-profiles-container">
      {/* Toggle Bar */}
      <div className="child-toggle-bar">
        <button
          className="child-toggle-button"
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <button className="child-toggle-button active">
          Child Profiles
        </button>
      </div>

      {/* Page Title */}
      <h2 className="child-profiles-title">Child Profiles</h2>

      {/* Add Child Button */}
      <button className="add-child-gradient-btn">
        Add Child
      </button>
    </div>
  );
};

export default ChildProfiles;
