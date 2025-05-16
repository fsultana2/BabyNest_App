// src/layouts/Layout.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Import footer if you have it
import '../styles/Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSettingsPage = location.pathname === '/settings';

  return (
    <div className="layout-wrapper">
      {/* Show Header on all pages except Settings */}
      {!isSettingsPage && <Header />}

      {/* Toggle Bar (Dashboard / Child Profiles) */}
      <div className="toggle-bar-wrapper">
      <div className="toggle-bar">
        <button
          className={`toggle-button ${location.pathname === '/dashboard' ? 'active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`toggle-button ${location.pathname === '/child-profiles' ? 'active' : ''}`}
          onClick={() => navigate('/child-profiles')}
        >
          Child Profiles
        </button>
      </div>
      </div>
      <main className="layout-main">
  <React.Fragment key={location.key}>
    {children}
  </React.Fragment>
</main>


      {/* Footer is always shown */}
      <Footer />
    </div>
  );
};

export default Layout;
