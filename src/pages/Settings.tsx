import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../components/ui/select';
import '../styles/Settings.css';
import { Eye, EyeOff } from 'lucide-react';

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const [fontSize, setFontSize] = useState('medium');
  const [relation, setRelation] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium (default)' },
    { value: 'large', label: 'Large' },
  ];

  const relationOptions = [
    { value: 'Mother', label: 'Mother' },
    { value: 'Father', label: 'Father' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Tutor', label: 'Tutor' },
    { value: 'Caregiver', label: 'Caregiver' },
    { value: 'Relatives', label: 'Relatives' },
  ];

  useEffect(() => {
    const savedSize = localStorage.getItem('fontSize') || 'medium';
    setFontSize(savedSize);
    document.body.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    document.body.classList.add(`font-size-${savedSize}`);
  }, []);

  const handleFontSizeChange = (option: any) => {
    setFontSize(option.value);
    localStorage.setItem('fontSize', option.value);
    document.body.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    document.body.classList.add(`font-size-${option.value}`);
  };

  const handleRelationChange = (option: any) => {
    setRelation(option.value);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('❌ Passwords do not match.');
      return;
    }

    // Simulate password update logic
    setUpdateMessage('✅ Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setUpdateMessage(''), 3000);
  };

  return (
    <div className="settings-page">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        ← Back to Dashboard
      </button>

      <h2 className="settings-title">Settings</h2>

      <section className="settings-section">
        <h3>Font Size</h3>
        <CustomSelect
          className="font-size-select"
          value={fontSizeOptions.find(opt => opt.value === fontSize)!}
          onChange={handleFontSizeChange}
          options={fontSizeOptions}
        />
      </section>

      <section className="settings-section">
        <h3>Relation with Baby</h3>
        <CustomSelect
          className="relation-select"
          value={relationOptions.find(opt => opt.value === relation) || relationOptions[0]}
          onChange={handleRelationChange}
          options={relationOptions}
        />
      </section>

      <section className="settings-section">
        <h3>Update Password</h3>
        <form onSubmit={handlePasswordUpdate} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="input-wrapper">
            <input
              type={showCurrent ? 'text' : 'password'}
              className="password-input"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowCurrent(!showCurrent)}
              tabIndex={-1}
            >
              {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="input-wrapper">
            <input
              type={showNew ? 'text' : 'password'}
              className="password-input"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowNew(!showNew)}
              tabIndex={-1}
            >
              {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="input-wrapper">
            <input
              type={showConfirm ? 'text' : 'password'}
              className="password-input"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirm(!showConfirm)}
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="login-button" style={{ width: '60%', marginTop: '1rem' }}>
            Update Password
          </button>

          {updateMessage && (
            <p style={{ color: '#4caf50', marginTop: '1rem' }}>{updateMessage}</p>
          )}
        </form>
      </section>

      <section className="settings-section">
        <h3>Subscription</h3>
        <p>Coming soon...</p>
      </section>
    </div>
  );
};

export default Settings;
