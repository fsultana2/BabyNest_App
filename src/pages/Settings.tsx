import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../components/ui/CustomSelect'; 
import '../styles/Settings.css';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const fontSizes = ['Small', 'Medium', 'Large'];
const relations = ['Mom', 'Dad', 'Grandparent', 'Guardian', 'Other'];

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'Medium');
  const [relation, setRelation] = useState('');

  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [visible, setVisible] = useState({
    current: false,
    newPass: false,
    confirm: false,
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.body.style.fontSize =
      fontSize === 'Small' ? '14px' : fontSize === 'Large' ? '18px' : '16px';
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setCurrent('');
    setNewPass('');
    setConfirm('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="settings-page">
      <button className="back-button" onClick={() => navigate('/dashboard')}>
        <ArrowLeft size={20} />
        Back
      </button>

      <h2 className="settings-title">Settings</h2>

      {/* Font Size Selector */}
      <div className="setting-section">
        <label>Font Size</label>
        <CustomSelect
          options={fontSizes}
          selected={fontSize}
          onSelect={setFontSize}
          className="font-select"
        />
      </div>

      {/* Relation Selector */}
      <div className="setting-section">
        <label>Relation with Baby</label>
        <CustomSelect
          options={relations}
          selected={relation}
          onSelect={setRelation}
          className="relation-select"
        />
      </div>

      {/* Password Update */}
      <form onSubmit={handleSubmit} className="password-section">
        <label>Current Password</label>
        <div className="password-input">
          <input
            type={visible.current ? 'text' : 'password'}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          />
          <span onClick={() => setVisible({ ...visible, current: !visible.current })}>
            {visible.current ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <label>New Password</label>
        <div className="password-input">
          <input
            type={visible.newPass ? 'text' : 'password'}
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          />
          <span onClick={() => setVisible({ ...visible, newPass: !visible.newPass })}>
            {visible.newPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <label>Confirm Password</label>
        <div className="password-input">
          <input
            type={visible.confirm ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <span onClick={() => setVisible({ ...visible, confirm: !visible.confirm })}>
            {visible.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>

        <button type="submit" className="submit-button">Update Password</button>
        {success && <p className="success-msg">✅ Password updated successfully!</p>}
      </form>
    </div>
  );
};

export default Settings;
