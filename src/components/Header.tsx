import React, { useState } from 'react';
import UserDropdown from './UserDropdown';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import babyLogo from '../assets/logo.png'; // ✅ Use your actual logo

interface HeaderProps {
  email: string;
  name: string;
}

const Header: React.FC<HeaderProps> = ({ email, name }) => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    alert("✅ You've been signed out.");
    navigate('/');
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="dashboard-header">
      {/* ✅ Replacing emoji with actual logo image */}
      <div className="dashboard-logo">
        <img
          src={babyLogo}
          alt="BabyNest Logo"
          className="header-logo-img"
        />
        <span>BabyNest</span>
      </div>

      <div
        className="dashboard-user"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="dashboard-initials">{getInitials(name)}</div>
        {dropdownOpen && (
          <UserDropdown email={email} name={name} onSignOut={handleSignOut} />
        )}
      </div>
    </header>
  );
};

export default Header;
