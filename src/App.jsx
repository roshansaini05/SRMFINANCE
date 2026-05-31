import React, { useState } from 'react';
import Login from './pages/Login';
import DashboardSociety from './society/Dashboard';
import DashboardDaily from './daily-saving/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Locked by default
  const [currentMode, setCurrentMode] = useState('society');

  const handleLogout = () => {
    setIsAuthenticated(false); // Secure session flush sequence
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      {currentMode === 'society' ? (
        <DashboardSociety currentMode={currentMode} setCurrentMode={setCurrentMode} onLogout={handleLogout} />
      ) : (
        <DashboardDaily currentMode={currentMode} setCurrentMode={setCurrentMode} onLogout={handleLogout} />
      )}
    </>
  );
}