import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Moon, Baby, Play, Droplet, Book, Music, FileText, Camera } from 'lucide-react';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'profiles'>('dashboard');
  const [selectedChild, setSelectedChild] = useState('');
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Toggle Bar */}
      <div className="toggle-bar">
        <button
          className={`toggle-button ${currentTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => {
            setCurrentTab('dashboard');
            navigate('/dashboard');
          }}
        >
          Dashboard
        </button>
        <button
          className={`toggle-button ${currentTab === 'profiles' ? 'active' : ''}`}
          onClick={() => {
            setCurrentTab('profiles');
            navigate('/child-profiles');
          }}
        >
          Child Profiles
        </button>
      </div>

      {/* Child Selector */}
      <div className="child-selector">
        <span className="child-label">Current Child:</span>
        <div className="child-dropdown">
          <span className="child-name">{selectedChild || 'Select'}</span>
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Upload Section */}
      <div className="upload-section">
        <div className="upload-circle">
          <Camera size={32} color="#777" />
        </div>
        <button className="upload-button">Upload</button>
      </div>

      {/* Activity Cards */}
      <div className="activity-grid">
        <div className="activity-card">
          <Baby size={28} />
          <span>Feeding</span>
        </div>
        <div className="activity-card">
          <Moon size={28} />
          <span>Sleep</span>
        </div>
        <div className="activity-card">
          <Droplet size={28} />
          <span>Diaper</span>
        </div>
        <div className="activity-card">
          <Play size={28} />
          <span>Play</span>
        </div>
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <h3 className="summary-title">Today's Summary</h3>
        <div className="summary-grid">
          <div className="summary-card">
            <strong>Feedings:</strong> <span>4</span>
          </div>
          <div className="summary-card">
            <strong>Sleep:</strong> <span>8.5 hrs</span>
          </div>
          <div className="summary-card">
            <strong>Diapers:</strong> <span>6</span>
          </div>
          <div className="summary-card">
            <strong>Play:</strong> <span>2 hrs</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="bottom-icon">
          <Music size={20} />
          <span>Lullabies</span>
        </div>
        <div className="bottom-icon">
          <Book size={20} />
          <span>Books</span>
        </div>
        <div className="bottom-icon">
          <FileText size={20} />
          <span>Reports</span>
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        BabyNest © 2025 • Made with 💖 for families
      </footer>
    </div>
  );
};

export default Home;
