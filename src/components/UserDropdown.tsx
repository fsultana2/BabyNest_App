import React from 'react';
import { Link } from 'react-router-dom';

interface UserDropdownProps {
  name: string;
  email: string;
  onSignOut: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ name, email, onSignOut }) => {
  return (
    <div className="user-menu-dropdown">
      <div className="user-menu-header">
        <strong>{name}</strong>
        <p>{email}</p>
      </div>
      <div className="user-menu-option">
        <Link to="/settings">⚙️ Settings</Link>
      </div>
      <div className="user-menu-option" onClick={onSignOut}>
        ↩️ Sign out
      </div>
    </div>
  );
};

export default UserDropdown;
