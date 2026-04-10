import React from 'react';
import { AlertTriangle, Zap, Wrench } from 'lucide-react';
import './LiveAlerts.css';

const alerts = [
  {
    id: 1,
    icon: AlertTriangle,
    iconColor: '#e74c3c',
    iconBg: '#fef2f2',
    title: 'D\u00e9faillance Capteur',
    description: 'Porte 4, ID Capteur #092',
    time: 'IL Y A 2 MIN',
    severity: 'critical',
  },
  {
    id: 2,
    icon: Zap,
    iconColor: '#f59e0b',
    iconBg: '#fffbeb',
    title: 'Fluctuation de tension',
    description: 'R\u00e9seau \u00e9lectrique Zone D',
    time: 'IL Y A 14 MIN',
    severity: 'warning',
  },
  {
    id: 3,
    icon: Wrench,
    iconColor: '#6c5ce7',
    iconBg: '#f8f7ff',
    title: 'Log Maintenance',
    description: 'Technicien First_Last_Name entr\u00e9 en Zone A',
    time: 'IL Y A 45 MIN',
    severity: 'info',
  },
];

function LiveAlerts() {
  return (
    <div className="live-alerts-card">
      <div className="card-header">
        <h3>Alertes en direct</h3>
        <button className="see-all-btn">Voir tout</button>
      </div>
      <div className="alerts-list">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className={`alert-item ${alert.severity}`}>
              <div className="alert-icon" style={{ background: alert.iconBg }}>
                <Icon size={18} style={{ color: alert.iconColor }} />
              </div>
              <div className="alert-content">
                <span className="alert-title">{alert.title}</span>
                <span className="alert-desc">{alert.description}</span>
              </div>
              <span className="alert-time">{alert.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LiveAlerts;
