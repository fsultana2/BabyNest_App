import React, { useState } from 'react';
import UserDropdown from './UserDropdown'; // Already renamed internally
import logo from '../assets/logo.png';
import '../styles/Header.css'; // Scoped dropdown styles here

interface HeaderProps {
  name: string;
  email: string;
}

const Header: React.FC<HeaderProps> = ({ name, email }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = '/login'; // Or use navigate if preferred
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
    <UserDropdown name={name} email={email} onSignOut={handleSignOut} />
  )}
</div>

    </header>
  );
};

export default Header;
