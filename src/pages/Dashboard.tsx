import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home'; // ✅ Import the actual Home layout
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
    const location = useLocation();
    const email = location.state?.email || 'user@example.com';
  
    // ✅ Add this right below email
    const name = location.state?.name || 'Guest User';
  
    return (
      <div className="dashboard-page">
        <Header email={email} name={name} /> {/* ✅ Pass name too */}
        {/*<main className="dashboard-main">
          <h1 className="dashboard-title">BabyNest</h1>
        </main>*/}
        <main className="dashboard-main">
        <Home /> {/* ✅ Render the full Home layout inside */}
      </main>
      </div>
    );
  };
  
  export default Dashboard;
