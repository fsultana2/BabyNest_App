import useRecentValues from '../hooks/useRecentValues';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/Login.css'; // Reusing login styles

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const {
    values: recentEmails,
    addValue: addEmail,
    deleteValue: deleteEmail,
  } = useRecentValues('recentEmails');

  const {
    values: recentFirstNames,
    addValue: addFirstName,
    deleteValue: deleteFirstName,
  } = useRecentValues('recentFirstNames');

  const {
    values: recentLastNames,
    addValue: addLastName,
    deleteValue: deleteLastName
  } = useRecentValues('recentLastNames');

  const [showLastNameDropdown, setShowLastNameDropdown] = useState(false);
  const [showEmailDropdown, setShowEmailDropdown] = useState(false);
  const [showFirstNameDropdown, setShowFirstNameDropdown] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const email = formData.email;

    // Storing data in localStorage
    localStorage.setItem('userName', fullName);
    localStorage.setItem('userEmail', email);

    // Add recent values
    addEmail(email);
    addFirstName(formData.firstName);
    addLastName(formData.lastName);

    // Alert notification to the user
    alert('✅ Sign up successful! You can now log in.');

    // After the alert, navigate to the login page
    navigate('/');
  };

  return (
    <div className="login-container-wrapper">
      <div className="login-content">
        <h1 className="app-title" style={{ textAlign: 'center', width: '100%' }}>
          BabyNest
        </h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group email-with-dropdown">
            <label className="form-label">First Name:</label>
            <div className="input-wrapper" style={{ position: 'relative' }}>
              <input
                type="text"
                name="firstName"
                className="login-input"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  setShowFirstNameDropdown(true);
                }}
                onFocus={() => setShowFirstNameDropdown(true)}
                onBlur={() => setTimeout(() => setShowFirstNameDropdown(false), 100)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                required
              />
              {showFirstNameDropdown &&
                formData.firstName.length > 0 &&
                recentFirstNames.length > 0 && (
                  <ul className="signup-email-dropdown">
                    {recentFirstNames
                      .filter((val) =>
                        val.toLowerCase().includes(formData.firstName.toLowerCase())
                      )
                      .map((name) => (
                        <li key={name}>
                          <span
                            onClick={() => {
                              setFormData({ ...formData, firstName: name });
                              setShowFirstNameDropdown(false);
                            }}
                          >
                            {name}
                          </span>
                          <button
                            type="button"
                            className="signup-email-delete-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteFirstName(name);
                            }}
                          >
                            ×
                          </button>
                        </li>
                      ))}
                  </ul>
              )}
            </div>
          </div>

          <div className="form-group email-with-dropdown">
            <label className="form-label">Last Name:</label>
            <div className="input-wrapper" style={{ position: 'relative' }}>
              <input
                type="text"
                name="lastName"
                className="login-input"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                  setShowLastNameDropdown(true);
                }}
                onFocus={() => setShowLastNameDropdown(true)}
                onBlur={() => setTimeout(() => setShowLastNameDropdown(false), 100)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                required
              />
              {showLastNameDropdown &&
                formData.lastName.length > 0 &&
                recentLastNames.length > 0 && (
                  <ul className="signup-email-dropdown">
                    {recentLastNames
                      .filter((val) =>
                        val.toLowerCase().includes(formData.lastName.toLowerCase())
                      )
                      .map((name) => (
                        <li key={name}>
                          <span
                            onClick={() => {
                              setFormData({ ...formData, lastName: name });
                              setShowLastNameDropdown(false);
                            }}
                          >
                            {name}
                          </span>
                          <button
                            type="button"
                            className="signup-email-delete-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteLastName(name);
                            }}
                          >
                            ×
                          </button>
                        </li>
                      ))}
                  </ul>
              )}
            </div>
          </div>

          <div className="form-group email-with-dropdown">
            <label className="form-label">Email:</label>
            <div className="input-wrapper" style={{ position: 'relative' }}>
              <input
                type="email"
                name="email"
                className="login-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setShowEmailDropdown(true);
                }}
                onFocus={() => setShowEmailDropdown(true)}
                onBlur={() => setTimeout(() => setShowEmailDropdown(false), 100)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                required
              />
              {showEmailDropdown &&
                formData.email.length > 0 &&
                recentEmails.length > 0 && (
                  <ul className="signup-email-dropdown">
                    {recentEmails
                      .filter((e) =>
                        e.toLowerCase().includes(formData.email.toLowerCase())
                      )
                      .map((email) => (
                        <li key={email}>
                          <span
                            onClick={() => {
                              setFormData({ ...formData, email });
                              setShowEmailDropdown(false);
                            }}
                          >
                            {email}
                          </span>
                          <button
                            type="button"
                            className="signup-email-delete-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteEmail(email);
                            }}
                          >
                            ×
                          </button>
                        </li>
                      ))}
                  </ul>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Email:</label>
            <input
              type="email"
              name="confirmEmail"
              className="login-input"
              placeholder="Confirm your email"
              value={formData.confirmEmail}
              onChange={handleChange}
              autoComplete="new-email"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password:</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="login-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password:</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="login-input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="login-button">Sign Up</button>

          <div className="signup-section">
            <p className="signup-text">
              Already have an account?{' '}
              <Link className="signup-link" to="/">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;