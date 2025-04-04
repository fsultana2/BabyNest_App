import React from 'react';
import { Link } from 'react-router-dom';

interface UserDropdownProps {
  name: string;
  email: string;
  onSignOut: () => void; // ✅ Accepts a sign out handler
}

const UserDropdown: React.FC<UserDropdownProps> = ({ name, email, onSignOut }) => {
  return (
    <div className="dashboard-dropdown">
      <div className="dashboard-dropdown-header">
        <strong>{name}</strong>
        <p>{email}</p>
      </div>
      <div className="dashboard-dropdown-option">
        <Link to="/settings">⚙️ Settings</Link>
      </div>
      <div className="dashboard-dropdown-option" onClick={onSignOut}>
        ↩️ Sign out
      </div>
    </div>
  );
};

export default UserDropdown;
