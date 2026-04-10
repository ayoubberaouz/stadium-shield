import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Surveillance from './pages/Surveillance';
import Zones from './pages/Zones';
import Cameras from './pages/Cameras';
import Capteurs from './pages/Capteurs';
import Alertes from './pages/Alertes';
import Urgence from './pages/Urgence';
import Rapports from './pages/Rapports';
import './App.css';

function AppLayout() {
  const location = useLocation();

  // Map route paths to sidebar tab ids
  const pathToTab = {
    '/dashboard': 'dashboard',
    '/surveillance': 'surveillance',
    '/zones': 'zones',
    '/cameras': 'cameras',
    '/capteurs': 'capteurs',
    '/alertes': 'alertes',
    '/urgence': 'urgence',
    '/rapports': 'rapports',
  };

  const activeTab = pathToTab[location.pathname] || 'dashboard';

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/surveillance" element={<Surveillance />} />
          <Route path="/zones" element={<Zones />} />
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/capteurs" element={<Capteurs />} />
          <Route path="/alertes" element={<Alertes />} />
          <Route path="/urgence" element={<Urgence />} />
          <Route path="/rapports" element={<Rapports />} />
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
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
