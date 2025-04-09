import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import logo from '../assets/logo.png';
import '../styles/Header.css';

interface HeaderProps {
  name?: string;
  email?: string;
}

const Header: React.FC<HeaderProps> = ({ name, email }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fallback to localStorage
  const userName = name || localStorage.getItem('userName') || 'Guest';
  const userEmail = email || localStorage.getItem('userEmail') || 'guest@example.com';

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <img src={logo} alt="BabyNest Logo" className="logo" />
        <span className="app-name">BabyNest</span>
      </div>

      <div className="user-dropdown-wrapper">
        <button
          className="initials-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {initials}
        </button>

        {dropdownOpen && (
          <UserDropdown
            name={userName}
            email={userEmail}
            onSignOut={handleSignOut}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
