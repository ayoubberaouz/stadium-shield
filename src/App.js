import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Surveillance from './pages/Surveillance';
import Zones from './pages/Zones';
import Cameras from './pages/Cameras';
import Alertes from './pages/Alertes';
import Urgence from './pages/Urgence';
import Intervention from './pages/Intervention';
import './App.css';

function AppLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Map route paths to sidebar tab ids
  const pathToTab = {
    '/dashboard': 'dashboard',
    '/surveillance': 'surveillance',
    '/zones': 'zones',
    '/cameras': 'cameras',
    '/alertes': 'alertes',
    '/urgence': 'urgence',
  };

  const activeTab = pathToTab[location.pathname] || 'dashboard';

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Header onToggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/surveillance" element={<Surveillance />} />
          <Route path="/zones" element={<Zones />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/alertes" element={<Alertes />} />
          <Route path="/urgence" element={<Urgence />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/intervention" element={<Intervention />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
