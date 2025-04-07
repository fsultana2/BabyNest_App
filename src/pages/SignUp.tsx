// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecentValues from '../hooks/useRecentValues';
import '../styles/Login.css';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const {
    values: recentFirstNames,
    addValue: addFirstName,
    deleteValue: deleteFirstName,
  } = useRecentValues('recentFirstNames');

  const {
    values: recentLastNames,
    addValue: addLastName,
    deleteValue: deleteLastName,
  } = useRecentValues('recentLastNames');

  const {
    values: recentEmails,
    addValue: addEmail,
    deleteValue: deleteEmail,
  } = useRecentValues('recentEmails');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [showDropdowns, setShowDropdowns] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setShowDropdowns((prev) => ({ ...prev, [field]: true }));
  };

  const handleDropdownSelect = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setShowDropdowns((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`;
    localStorage.setItem('userName', fullName);
    localStorage.setItem('userEmail', formData.email);

    addFirstName(formData.firstName);
    addLastName(formData.lastName);
    addEmail(formData.email);

    alert('✅ Sign up successful!');
    navigate('/');
  };

  const filterSuggestions = (list: string[], query: string) =>
    list.filter((val) => val.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="login-container-wrapper">
      <div className="login-content">
        <h1 className="app-title" style={{ textAlign: 'center' }}>BabyNest</h1>
        <form onSubmit={handleSubmit} className="login-form">

          {/* First Name */}
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="login-input"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              onFocus={() => setShowDropdowns((prev) => ({ ...prev, firstName: true }))}
              onBlur={() => setTimeout(() => setShowDropdowns((prev) => ({ ...prev, firstName: false })), 100)}
              placeholder="Enter your first name"
              autoComplete="off"
              required
            />
            {showDropdowns.firstName && formData.firstName && (
              <ul className="custom-email-dropdown">
                {filterSuggestions(recentFirstNames, formData.firstName).map((name) => (
                  <li key={name} onMouseDown={() => handleDropdownSelect('firstName', name)}>
                    <span>{name}</span>
                    <button
                      type="button"
                      className="email-delete-icon"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        deleteFirstName(name);
                      }}
                    >×</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="login-input"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              onFocus={() => setShowDropdowns((prev) => ({ ...prev, lastName: true }))}
              onBlur={() => setTimeout(() => setShowDropdowns((prev) => ({ ...prev, lastName: false })), 100)}
              placeholder="Enter your last name"
              autoComplete="off"
              required
            />
            {showDropdowns.lastName && formData.lastName && (
              <ul className="custom-email-dropdown">
                {filterSuggestions(recentLastNames, formData.lastName).map((name) => (
                  <li key={name} onMouseDown={() => handleDropdownSelect('lastName', name)}>
                    <span>{name}</span>
                    <button
                      type="button"
                      className="email-delete-icon"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        deleteLastName(name);
                      }}
                    >×</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Email */}
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="login-input"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onFocus={() => setShowDropdowns((prev) => ({ ...prev, email: true }))}
              onBlur={() => setTimeout(() => setShowDropdowns((prev) => ({ ...prev, email: false })), 100)}
              placeholder="Enter your email"
              autoComplete="off"
              required
            />
            {showDropdowns.email && formData.email && (
              <ul className="custom-email-dropdown">
                {filterSuggestions(recentEmails, formData.email).map((email) => (
                  <li key={email} onMouseDown={() => handleDropdownSelect('email', email)}>
                    <span>{email}</span>
                    <button
                      type="button"
                      className="email-delete-icon"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        deleteEmail(email);
                      }}
                    >×</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Confirm Email */}
          <div className="form-group">
            <label className="form-label">Confirm Email</label>
            <input
              type="email"
              className="login-input"
              value={formData.confirmEmail}
              onChange={(e) => handleInputChange('confirmEmail', e.target.value)}
              placeholder="Confirm your email"
              autoComplete="off"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="login-input"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="login-input"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="login-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
