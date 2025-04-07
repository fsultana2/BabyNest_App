import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRecentValues from '../hooks/useRecentValues';
import '../styles/Login.css'; // Reuse existing styles

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSending, setIsSending] = useState(false);

  const {
    values: recentEmails,
    addValue,
    deleteValue,
  } = useRecentValues('recentEmails');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSending(true);
    addValue(email);

    setTimeout(() => {
      setIsSending(false);
      setCountdown(30);
      alert('✅ A reset code has been sent to your email.\n\nCode: 123456');

      // Simulate redirect after clicking "OK"
      navigate('/reset-password');
    }, 1000);
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const filteredEmails = recentEmails.filter((val) =>
    val.toLowerCase().includes(email.toLowerCase())
  );

  return (
    <div className="login-container-wrapper">
      <div className="login-content">
        <h2 className="form-title">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group" style={{ position: 'relative' }}>
            <label htmlFor="email" className="form-label">Email Address</label>
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
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                autoComplete="off"
                required
              />
              {showDropdown && email.length > 0 && filteredEmails.length > 0 && (
                <ul className="custom-email-dropdown">
                  {filteredEmails.map((item) => (
                    <li key={item}>
                      <span
                        onClick={() => {
                          setEmail(item);
                          setShowDropdown(false);
                        }}
                      >
                        {item}
                      </span>
                      <button
                        className="email-delete-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteValue(item);
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

          <button type="submit" className="login-button" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send Reset Link'}
          </button>

          {countdown > 0 && (
            <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
              Resend in {countdown}s
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
