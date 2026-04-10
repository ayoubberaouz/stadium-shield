import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, Filter, Zap, AlertCircle, Info } from 'lucide-react';
import './Alertes.css';

const alertsData = [
  {
    id: 1, severity: 'critical', icon: AlertTriangle, iconColor: '#e74c3c', iconBg: '#fef2f2',
    title: 'Haute Densité Détectée - Zone 3', desc: 'Capacité dépassée de 15%. Risque de mouvement de foule.',
    time: '14:23:05', zone: 'Zone 3', status: 'Non résolu',
  },
  {
    id: 2, severity: 'critical', icon: Zap, iconColor: '#e74c3c', iconBg: '#fef2f2',
    title: 'Capteur Thermique Déclenché', desc: 'Température anormale détectée dans la concession A.',
    time: '14:18:42', zone: 'Zone 5', status: 'En cours',
  },
  {
    id: 3, severity: 'warning', icon: AlertCircle, iconColor: '#f59e0b', iconBg: '#fffbeb',
    title: 'Fluctuation de Tension', desc: 'Réseau électrique Zone D - Variation de 12%.',
    time: '14:10:33', zone: 'Zone 4', status: 'En cours',
  },
  {
    id: 4, severity: 'warning', icon: Bell, iconColor: '#f59e0b', iconBg: '#fffbeb',
    title: 'Accumulation de Foule', desc: 'Entrée B-12 proche de 85% de capacité.',
    time: '13:55:18', zone: 'Zone 5', status: 'Surveillé',
  },
  {
    id: 5, severity: 'info', icon: Info, iconColor: '#6c5ce7', iconBg: '#f8f7ff',
    title: 'Maintenance Programmée', desc: 'Capteur #092 Porte 4 - Remplacement prévu.',
    time: '13:40:00', zone: 'Zone 4', status: 'Planifié',
  },
  {
    id: 6, severity: 'resolved', icon: CheckCircle, iconColor: '#27ae60', iconBg: '#f0fdf4',
    title: 'Cycle CVC Terminé', desc: 'Qualité de l\'air en Zone 4 rétablie.',
    time: '13:58:22', zone: 'Zone 4', status: 'Résolu',
  },
];

function Alertes() {
  const criticalCount = alertsData.filter(a => a.severity === 'critical').length;
  const warningCount = alertsData.filter(a => a.severity === 'warning').length;
  const resolvedCount = alertsData.filter(a => a.severity === 'resolved').length;

  return (
    <div className="alertes-page">
      <div className="alertes-header">
        <div>
          <h1>Centre d'Alertes</h1>
          <p>Gestion centralisée de toutes les alertes de sécurité du stade.</p>
        </div>
        <div className="alertes-actions">
          <button className="alertes-filter-btn"><Filter size={16} /> Filtrer</button>
        </div>
      </div>

      <div className="alertes-stats">
        <div className="alerte-stat critical">
          <AlertTriangle size={20} />
          <span className="alerte-stat-val">{criticalCount}</span>
          <span className="alerte-stat-label">Critiques</span>
        </div>
        <div className="alerte-stat warning">
          <AlertCircle size={20} />
          <span className="alerte-stat-val">{warningCount}</span>
          <span className="alerte-stat-label">Avertissements</span>
        </div>
        <div className="alerte-stat resolved">
          <CheckCircle size={20} />
          <span className="alerte-stat-val">{resolvedCount}</span>
          <span className="alerte-stat-label">Résolues</span>
        </div>
        <div className="alerte-stat total">
          <Clock size={20} />
          <span className="alerte-stat-val">{alertsData.length}</span>
          <span className="alerte-stat-label">Total</span>
        </div>
      </div>

      <div className="alertes-list">
        {alertsData.map((alert) => {
          const Icon = alert.icon;
          return (
            <div key={alert.id} className={`alerte-item ${alert.severity}`}>
              <div className="alerte-icon" style={{ background: alert.iconBg }}>
                <Icon size={20} style={{ color: alert.iconColor }} />
              </div>
              <div className="alerte-content">
                <div className="alerte-title-row">
                  <strong>{alert.title}</strong>
                  <span className={`alerte-severity-badge ${alert.severity}`}>
                    {alert.severity === 'critical' ? 'CRITIQUE' : alert.severity === 'warning' ? 'ATTENTION' : alert.severity === 'resolved' ? 'RÉSOLU' : 'INFO'}
                  </span>
                </div>
                <p>{alert.desc}</p>
                <div className="alerte-meta">
                  <span>{alert.zone}</span>
                  <span>{alert.time}</span>
                  <span style={{ color: alert.severity === 'resolved' ? '#27ae60' : alert.severity === 'critical' ? '#e74c3c' : '#f59e0b' }}>{alert.status}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Alertes;
