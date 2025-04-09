import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isSettingsPage = location.pathname === '/settings';

  return (
    <div className="layout-wrapper">
      {/* Show Header on all pages except Settings */}
      {!isSettingsPage && <Header />}
      
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
