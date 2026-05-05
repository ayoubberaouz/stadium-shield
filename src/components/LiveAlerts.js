import React from 'react';
import { AlertTriangle, Swords, Crosshair, Loader, Trash2, X } from 'lucide-react';
import { deleteAlert, clearAllAlerts } from '../api';
import './LiveAlerts.css';

// Map weapon_type from backend to display config
const typeConfig = {
  gun: { icon: Crosshair, iconColor: '#e74c3c', iconBg: '#fef2f2', label: 'Arme à feu détectée' },
  knife: { icon: Swords, iconColor: '#f59e0b', iconBg: '#fffbeb', label: 'Couteau détecté' },
  violence: { icon: AlertTriangle, iconColor: '#e74c3c', iconBg: '#fef2f2', label: 'Violence détectée' },
};

function formatTimeAgo(isoString) {
  if (!isoString) return '';
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 60) return `IL Y A ${diff}s`;
  if (diff < 3600) return `IL Y A ${Math.floor(diff / 60)} MIN`;
  if (diff < 86400) return `IL Y A ${Math.floor(diff / 3600)}H`;
  return `IL Y A ${Math.floor(diff / 86400)}J`;
}

function LiveAlerts({ alerts = [], loading = false }) {
  // Show only the 5 most recent alerts
  const recentAlerts = alerts.slice(0, 5);

  if (loading) {
    return (
      <div className="live-alerts-card">
        <div className="card-header">
          <h3>Alertes en direct</h3>
        </div>
        <div className="alerts-list" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <Loader size={24} className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
          <span style={{ marginLeft: '0.5rem', color: '#888' }}>Connexion au backend...</span>
        </div>
      </div>
    );
  }

  if (recentAlerts.length === 0) {
    return (
      <div className="live-alerts-card">
        <div className="card-header">
          <h3>Alertes en direct</h3>
        </div>
        <div className="alerts-list" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
          <p>✅ Aucun incident détecté</p>
          <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Le système YOLO surveille en temps réel</p>
        </div>
      </div>
    );
  }

  return (
    <div className="live-alerts-card">
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3>Alertes en direct</h3>
          <span className="live-alerts-count">{alerts.length}</span>
        </div>
        {alerts.length > 0 && (
          <button 
            onClick={() => clearAllAlerts()} 
            style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}
            title="Tout Effacer"
          >
            <Trash2 size={14} /> Vider
          </button>
        )}
      </div>
      <div className="alerts-list">
        {recentAlerts.map((alert) => {
          const config = typeConfig[alert.weapon_type] || typeConfig.violence;
          const Icon = config.icon;
          const severity = alert.weapon_type === 'gun' ? 'critical' : alert.weapon_type === 'knife' ? 'warning' : 'critical';
          return (
            <div key={alert._id} className={`alert-item ${severity}`} style={{ position: 'relative' }}>
              <button 
                onClick={() => deleteAlert(alert._id)}
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                title="Supprimer"
              >
                <X size={14} />
              </button>
              <div className="alert-icon" style={{ background: config.iconBg }}>
                <Icon size={18} style={{ color: config.iconColor }} />
              </div>
              <div className="alert-content">
                <span className="alert-title">{config.label}</span>
                <span className="alert-desc">
                  📷 {alert.camera_id || 'CAM-01'} · {alert.image_path}
                </span>
              </div>
              <span className="alert-time">{formatTimeAgo(alert.timestamp)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LiveAlerts;
