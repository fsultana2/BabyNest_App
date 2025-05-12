import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import useRecentValues from '../hooks/useRecentValues';
import logo from '../assets/logo.png';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    values: recentEmails,
    addValue: addEmail,
    deleteValue: deleteEmail,
  } = useRecentValues('recentEmails');

  const filteredEmails = recentEmails.filter((e) =>
    e.toLowerCase().includes(email.toLowerCase())
  );

  // Reset form when component mounts
  useEffect(() => {
    setEmail('');
    setPassword('');
    setShowDropdown(false);
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const storedName = localStorage.getItem('userName') || 'Guest';

      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', storedName);

      addEmail(email);

      navigate('/dashboard', {
        state: { email, name: storedName },
      });

      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-container-wrapper">
      <div className="login-content">
        {/* Logo */}
        <div className="login-logo-section">
          <div className="logo-container">
            <img src={logo} alt="BabyNest Logo" className="logo-image" />
          </div>
          <h1 className="app-title">BabyNest</h1>
          <p className="app-tagline">Your baby's digital nest</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="login-form" autoComplete="off">
          {/* Email */}
          <div className="form-group email-with-dropdown">
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="input-wrapper">
              <input
                id="email"
                name="email"
                type="email"
                className="login-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                autoComplete="off"
                required
              />

              {showDropdown && email && filteredEmails.length > 0 && (
                <ul className="custom-email-dropdown">
                  {filteredEmails.map((item, index) => (
                    <li key={index}>
                      <span
                        onMouseDown={() => {
                          setEmail(item);
                          setShowDropdown(false);
                        }}
                      >
                        {item}
                      </span>
                      <button
                        type="button"
                        className="email-delete-icon"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteEmail(item);
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

          {/* Password */}
          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password" className="form-label">Password</label>
              <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
            </div>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span className="divider-line" />
          <span className="divider-text">OR</span>
          <span className="divider-line" />
        </div>

        {/* Signup Link */}
        <div className="signup-section">
          <p className="signup-text">Don't have an account?</p>
          <Link to="/signup" className="signup-link">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
