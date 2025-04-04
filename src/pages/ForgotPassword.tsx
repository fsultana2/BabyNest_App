import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useRecentValues from '../hooks/useRecentValues'; // ✅ Corrected this line

import '../styles/Login.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  // ✅ use custom hook
  const {
    values: recentEmails,
    addValue: addEmail,
    deleteValue: deleteEmail
  } = useRecentValues('recentEmails');

  // Countdown logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValid) {
      alert('Please enter a valid email address.');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    // ✅ Save email
    addEmail(email.trim());

    // ✅ Simulate email send with code
    alert(`A reset code has been sent to ${email}.\n\nUse this code: ${code} to reset your password.`);

    setIsSent(true);
    setCountdown(30);

    // ✅ Navigate after delay
    setTimeout(() => {
      navigate('/reset-password');
    }, 3000);
  };

  // ✅ Filter dropdown based on input
  const filteredEmails = recentEmails.filter((e) =>
    e.toLowerCase().includes(email.toLowerCase())
  );

  return (
    <div className="login-container-wrapper">
      <div className="login-content">
        <h2 className="form-title" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
          Forgot Password
        </h2>
        <form onSubmit={handleReset} className="login-form">
          <div className="form-group" style={{ position: 'relative' }}>
            <label htmlFor="email" className="form-label" style={{ fontSize: '1rem' }}>
              Enter your registered email:
            </label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                className="login-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                autoComplete="off"
                required
              />

              {/* ✅ Dropdown */}
              {showDropdown && email.length > 0 && filteredEmails.length > 0 && (
                <ul className="custom-email-dropdown">
                  {filteredEmails.map((item, index) => (
                    <li key={index}>
                      <span
                        onClick={() => {
                          setEmail(item);
                          setShowDropdown(false);
                        }}>
                        {item}
                      </span>
                      <button
                        className="email-delete-icon"
                        onClick={() => deleteEmail(item)}
                        type="button"
                      >
                        <span className="email-delete-icon">&times;</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button type="submit" className="login-button" disabled={countdown > 0}>
            {countdown > 0 ? `Resend in ${countdown}s` : 'Send Reset Link'}
          </button>
        </form>

        {isSent && (
          <p style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>
            ✅ Reset link sent!
          </p>
        )}

        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
          <Link to="/" className="signup-link">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
