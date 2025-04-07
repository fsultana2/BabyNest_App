import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home'; // This is your actual home/dashboard content
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const name = location.state?.name || localStorage.getItem('userName') || 'Guest';
  const email = location.state?.email || localStorage.getItem('userEmail') || 'guest@example.com';

  return (
    <div className="dashboard-container">
      {/* Show common header only once */}
      <Header name={name} email={email} />
      <main className="dashboard-main">
        <Home />
      </main>
    </div>
  );
};

export default Dashboard;
