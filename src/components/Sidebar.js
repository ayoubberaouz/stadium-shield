import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Eye,
  Map,
  Camera,
  Radio,
  Bell,
  AlertTriangle,
  FileText,
  Settings,
  Shield,
  X
} from 'lucide-react';
import './Sidebar.css';

const menuItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'surveillance', label: 'Surveillance', icon: Eye, path: '/surveillance' },
  { id: 'zones', label: 'Zones', icon: Map, path: '/zones' },
  { id: 'cameras', label: 'Caméras', icon: Camera, path: '/cameras' },
  { id: 'alertes', label: 'Alertes', icon: Bell, path: '/alertes' },
  { id: 'urgence', label: 'Urgence', icon: AlertTriangle, path: '/urgence' },
];

function Sidebar({ activeTab, isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
    onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <Shield size={24} />
            </div>
            <div className="logo-text">
              <h1>StadiumShield</h1>
              <p>Safety Control Center</p>
            </div>
          </div>
          <button className="sidebar-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.path)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer" style={{ padding: '20px 16px', borderTop: '1px solid #2d2d44', marginTop: 'auto' }}>
          <div className="user-profile">
            <div className="user-avatar">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=6c5ce7&color=fff&size=40"
                alt="Admin"
              />
            </div>
            <div className="user-info">
              <span className="user-name">Name_Admin</span>
              <span className="user-role">Admin Principal</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
