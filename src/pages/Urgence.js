import React, { useState } from 'react';
import { AlertTriangle, Phone, Users, Radio, Bell } from 'lucide-react';
import './Urgence.css';

const zones = [
  { id: 1, name: 'ZONE 1', status: 'SÉCURISÉ', statusColor: '#27ae60', isCritical: false },
  { id: 2, name: 'ZONE 2', status: 'SÉCURISÉ', statusColor: '#27ae60', isCritical: false },
  { id: 3, name: 'ZONE 3', status: 'SÉCURISÉ', statusColor: '#27ae60', isCritical: false },
  { id: 4, name: 'ZONE 4', status: 'SÉCURISÉ', statusColor: '#27ae60', isCritical: false },
  { id: 5, name: 'ZONE 5', status: 'DANGER', statusColor: '#e74c3c', isCritical: true, temp: '450°C' },
  { id: 6, name: 'ZONE 6', status: 'SÉCURISÉ', statusColor: '#27ae60', isCritical: false },
  { id: 7, name: 'ZONE 7', status: 'SÉCURISÉ', statusColor: '#27ae60', isCritical: false },
  { id: 8, name: 'ZONE 8', status: 'SÉCURISÉ', statusColor: '#27ae60', isCritical: false },
];

const emergencyActions = [
  { id: 1, title: 'Évacuer la zone', color: '#e74c3c', icon: '🚪' },
  { id: 2, title: 'Activer l\'alarme', color: '#f59e0b', icon: '🔔' },
  { id: 3, title: 'Verrouiller les portes', color: '#1a1a2e', icon: '🔐' },
  { id: 4, title: 'Ouvrir les sorties de secours', color: '#888', icon: '📂' },
  { id: 5, title: 'Appeler la sécurité', color: '#6c5ce7', icon: '🛡️' },
  { id: 6, title: 'Appeler la police', color: '#3b82f6', icon: '👮' },
];

const activityLog = [
  { id: 1, action: 'Séquence d\'évacuation initiée', time: 'Aujourd\'hui 14:23 • Système Réel', icon: Phone, color: '#27ae60' },
  { id: 2, action: 'Équipes de sécurité Alpha & Beta déployées', time: 'Aujourd\'hui 14:23 • Admin Niveau', icon: Users, color: '#6c5ce7' },
  { id: 3, action: 'Alarme incendie déclenchée manuellement', time: 'Aujourd\'hui 14:19 • Neuil', icon: Bell, color: '#e74c3c' },
  { id: 4, action: 'Capteurs en ligne - Zones 1-8 Contrôlés', time: 'Aujourd\'hui 14:00 • Contrôle Global', icon: Radio, color: '#999' },
];

function Urgence() {
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="urgence-page">
      {/* Critical Alert Banner */}
      <div className="urgence-critical-alert">
        <div className="alert-content">
          <AlertTriangle size={28} color="#e74c3c" />
          <div className="alert-text">
            <h2>ALERTE CRITIQUE: Feu détecté en Zone 5</h2>
            <p>Action immédiate requise. Les capteurs thermiques signalent des températures > 450°C.</p>
          </div>
        </div>
        <button className="alert-acknowledge-btn" onClick={() => setAcknowledged(!acknowledged)}>
          ACCUSER RÉCEPTION
        </button>
      </div>

      {/* Surveillance des Zones */}
      <div className="urgence-surveillance">
        <div className="surveillance-main">
          <div className="surveillance-header">
            <h2>Surveillance des Zones du Stade</h2>
            <span className="zone-count">8 Zones au total • 1 D'risque</span>
          </div>

          <div className="zones-grid">
            {zones.map((zone) => (
              <div key={zone.id} className={`zone-card ${zone.isCritical ? 'critical' : ''}`}>
                <div className="zone-card-indicator" style={{ background: zone.statusColor }}></div>
                <h4>{zone.name}</h4>
                <p className="zone-status" style={{ color: zone.statusColor }}>{zone.status}</p>
                {zone.temp && <p className="zone-temp">{zone.temp}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="thermal-map-card">
          <div className="thermal-header">
            <h3>EN DIRECT • ZONE THERMIQUE 5</h3>
            <span className="thermal-subtitle">Intégrée d'architecture • ATTENTION PÉRIL!</span>
          </div>
          <div className="thermal-image">
            <div className="thermal-content">
              <span className="temp-display">450°C</span>
              <span className="thermal-label">Température infrarouge</span>
              <span className="thermal-status">⚠ ATTENTION PÉRIL!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="urgence-actions">
        <div className="actions-header">
          <div>
            <h2>Actions d'urgence - Zone 5</h2>
            <p>Protocole d'évacuation ciblé et déploiement de sécurité.</p>
          </div>
          <div className="urgence-severity">
            <AlertTriangle size={16} />
            <span>HAUTE PRIORITÉ</span>
          </div>
        </div>

        <div className="actions-grid">
          {emergencyActions.map((action) => (
            <button key={action.id} className={`action-btn ${action.id === 1 ? 'primary' : ''}`} style={{ borderColor: action.color, color: action.id === 1 ? 'white' : action.color, background: action.id === 1 ? action.color : 'transparent' }}>
              <div className="action-icon">{action.icon}</div>
              <span>{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="urgence-activity">
        <div className="activity-header">
          <h3>L'Journal d'activité</h3>
          <a href="javascript:void(0);" className="view-all">Voir les journaux système complets</a>
        </div>
        <div className="activity-list">
          {activityLog.map((log) => {
            const Icon = log.icon;
            return (
              <div key={log.id} className="activity-item">
                <div className="activity-icon" style={{ background: `${log.color}15` }}>
                  <Icon size={18} style={{ color: log.color }} />
                </div>
                <div className="activity-content">
                  <p className="activity-action">{log.action}</p>
                  <p className="activity-time">{log.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Urgence;
