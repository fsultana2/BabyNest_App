import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import useRecentValues from '../hooks/useRecentValues';
import logo from '../assets/logo.png';
import '../styles/Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const {
    values: recentEmails,
    addValue: addEmail,
    deleteValue: deleteEmail,
  } = useRecentValues('recentEmails');

  const navigate = useNavigate();

  useEffect(() => {
    setEmail('');
    setPassword('');
    setShowDropdown(false);
    setIsLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log('Login attempt with:', { email, password });
      addEmail(email);

      setTimeout(() => {
        setIsLoading(false);
        const name = localStorage.getItem('userName') || 'Guest User';
        console.log('Navigating to dashboard with:', { email, name });
        navigate('/dashboard', { state: { email, name } });
      }, 1500);
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };

  const filteredEmails = recentEmails.filter((e) =>
    e.toLowerCase().includes(email.toLowerCase())
  );

  return (
    <div className="login-container-wrapper">
      <div className="login-content">
        <div className="login-logo-section">
          <div className="logo-container">
            <img src={logo} alt="BabyNest Logo" className="logo-image" />
          </div>
          <h1 className="app-title">BabyNest</h1>
          <p className="app-tagline">Your baby's digital nest</p>
        </div>

        <div className="form-container">
          <h2 className="form-title">Welcome Back</h2>

          <form onSubmit={handleLogin} className="login-form">
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
                  onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                  autoComplete="off"
                  required
                />

                {showDropdown && email.length > 0 && filteredEmails.length > 0 && (
                  <ul className="custom-email-dropdown">
                    {filteredEmails.map((item, index) => (
                      <li key={index}>
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
                            deleteEmail(item);
                          }}
                        >
                          <span className="email-delete-icon">&times;</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>
              <div className="input-wrapper">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="login-input"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log In'}
            </Button>
          </form>

          <div className="auth-divider">
            <span className="divider-line"></span>
            <span className="divider-text">OR</span>
            <span className="divider-line"></span>
          </div>

          <div className="signup-section">
            <p className="signup-text">Don't have an account?</p>
            <Link className="signup-link" to="/signup">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
