import React from 'react';
import { Search, Bell, Settings, LogOut, Menu } from 'lucide-react';
import './Header.css';

function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger-btn" onClick={onToggleSidebar}>
          <Menu size={20} />
        </button>
        <h2 className="stadium-name">Stade Prince Moulay Abdellah</h2>
      </div>
      <div className="header-center">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher capteurs, zones ou logs..."
          />
        </div>
      </div>
      <div className="header-right">
        <button className="header-icon-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
        <button className="header-icon-btn">
          <Settings size={20} />
        </button>
        <button className="logout-btn">
          <LogOut size={16} />
          <span>D&eacute;connexion</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
