// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ChildProfiles from './pages/ChildProfiles';
import Feeding from './pages/Feeding';  // Import the Feeding page

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/child-profiles" element={<ChildProfiles />} />
      <Route path="/feeding" element={<Feeding />} />  {/* Route for Feeding page */}
    </Routes>
  );
}

export default App;
