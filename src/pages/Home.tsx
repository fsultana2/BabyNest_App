import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation for current path
import { ChevronDown, Camera, Baby, Moon, Play, Droplet } from 'lucide-react';
import { Music, Book, FileText } from 'lucide-react';
import useSelectedChild from '../hooks/useSelectedChild';
import '../styles/Home.css';
import ChildSelector from '../components/ChildSelector'; 

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get current location

  const { selectedChild, setChild } = useSelectedChild();  // Using custom hook for selected child
  const [children, setChildren] = useState<{ name: string; dob: string }[]>([]);  // Store both name and dob
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Load children names and profile image from localStorage
  useEffect(() => {
    const savedChildren = JSON.parse(localStorage.getItem('children') || '[]');
    setChildren(savedChildren);

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, []);

  // Handle the image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);  // Store in localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Handle child selection
  const handleChildSelect = (child: { name: string }) => {
    setChild(child.name);  // Select child by name
    setIsDropdownOpen(false);  // Close dropdown after selecting a child
  };

  return (
    <div className="home-page">
      {/* Toggle Bar */}
      <div className="toggle-bar">
        <button
          className={`toggle-button ${location.pathname === '/dashboard' ? 'active' : ''}`}  
          onClick={() => {
            navigate('/dashboard');
          }}
        >
          Dashboard
        </button>
        <button
          className={`toggle-button ${location.pathname === '/child-profiles' ? 'active' : ''}`}  
          onClick={() => {
            navigate('/child-profiles');
          }}
        >
          Child Profiles
        </button>
      </div>

      {/* Current Child Dropdown */}
      <ChildSelector
        children={children}
        onSelectChild={handleChildSelect} // Pass function directly without changing format
        selectedChild={selectedChild}
      />

      {/* Upload Avatar */}
      <div className="upload-section">
        <div className="upload-circle">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="avatar-image" />
          ) : (
            <Camera size={32} color="#777" />
          )}
        </div>
        <label htmlFor="file-upload" className="upload-button">
          Upload
        </label>
        <input
          type="file"
          id="file-upload"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Activity Grid */}
      <div className="activity-grid">
        <div className="activity-card" onClick={() => navigate('/feeding')}>
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

      {/* Today's Summary Section */}
      <div className="summary-section">
        <h3 className="summary-title">Today's Summary</h3>
        <div className="summary-grid">
          <div className="summary-card">
            <strong>Feedings:</strong> 4
          </div>
          <div className="summary-card">
            <strong>Sleep:</strong> 8.5 hrs
          </div>
          <div className="summary-card">
            <strong>Diapers:</strong> 6
          </div>
          <div className="summary-card">
            <strong>Play:</strong> 2 hrs
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="bottom-icon" onClick={() => navigate('/lullabies')}>
          <Music size={24} />
          <span>Lullabies</span>
        </div>
        <div className="bottom-icon" onClick={() => navigate('/books')}>
          <Book size={24} />
          <span>Books</span>
        </div>
        <div className="bottom-icon" onClick={() => navigate('/reports')}>
          <FileText size={24} />
          <span>Reports</span>
        </div>
      </div>

      <footer className="home-footer">
        BabyNest © 2025 • Made with 💖 for families
      </footer>
    </div>
  );
};

export default Home;
