import React, { useState } from 'react';
import { AlertTriangle, Clock, Filter, AlertCircle, Eye } from 'lucide-react';
import './Alertes.css';

const alertsData = [
  {
    id: 1, severity: 'critical', icon: AlertTriangle, iconColor: '#e74c3c', iconBg: '#fef2f2',
    title: 'Détection d\'Incendie', time: '14:21', zone: 'Zone 5 / Porte Nord',
    type: 'Détection d\'Incendie', level: 'HAUT', status: 'Actif', statusColor: '#e74c3c',
  },
  {
    id: 2, severity: 'warning', icon: AlertCircle, iconColor: '#f59e0b', iconBg: '#fffbeb',
    title: 'Panique de la foule', time: '14:19', zone: 'Zone 7 / Salon VIP',
    type: 'Panique de la foule', level: 'MOYEN', status: 'En cours d\'investigation', statusColor: '#f59e0b',
  },
  {
    id: 3, severity: 'warning', icon: AlertCircle, iconColor: '#f59e0b', iconBg: '#fffbeb',
    title: 'Détection de fumée', time: '13:45', zone: 'Zone 2 / Hall Sud',
    type: 'Détection de fumée', level: 'BAS', status: 'Résolu', statusColor: '#27ae60',
  },
  {
    id: 4, severity: 'critical', icon: AlertTriangle, iconColor: '#e74c3c', iconBg: '#fef2f2',
    title: 'Alerte d\'obstruction', time: '12:12', zone: 'Zone 11 / Porte Est',
    type: 'Alerte d\'obstruction', level: 'HAUT', status: 'Actif', statusColor: '#e74c3c',
  },
];

const zoneAnalysisCards = [
  {
    title: 'Cluster Nord',
    label: 'CARTE DES RISQUES',
    icon: AlertTriangle,
  },
  {
    title: 'Ascenseurs VIP',
    label: 'FLUX DE SUPPORTERS',
    icon: Clock,
  },
];

function Alertes() {
  const criticalCount = '03';
  const investigationCount = '14';

  return (
    <div className="alertes-page">
      <div className="alertes-top-section">
        <div>
          <h3 className="alertes-section-label">HUE DE SÉCURITÉ</h3>
          <h1>Alertes Actives</h1>
          <p>Surveillance en temps réel de la sécurité des supporters et des données environnementales sur 12 zones du stade.</p>
        </div>
      </div>

      <div className="alertes-stats-compact">
        <div className="alerte-stat-compact critical">
          <AlertTriangle size={18} />
          <div>
            <span className="stat-value">{criticalCount}</span>
            <span className="stat-label">PRIORITÉ HAUTE</span>
          </div>
        </div>
        <div className="alerte-stat-compact warning">
          <Eye size={18} />
          <div>
            <span className="stat-value">{investigationCount}</span>
            <span className="stat-label">EN INVESTIGATION</span>
          </div>
        </div>
      </div>

      <div className="alertes-controls">
        <button className="alerte-filter-btn-main"><Filter size={16} /> Filtrer le système</button>
        <div className="alerte-tabs">
          <button className="alerte-tab active">Toutes les alertes</button>
          <button className="alerte-tab">Aujourd'hui</button>
          <button className="alerte-tab">Résolues</button>
        </div>
        <div className="alerte-actions-right">
          <button className="sort-btn">TRIER PAR</button>
          <button className="download-btn">↓</button>
        </div>
      </div>

      <div className="alertes-table-container">
        <table className="alertes-table">
          <thead>
            <tr>
              <th>HEURE</th>
              <th>ZONE</th>
              <th>TYPE D'INCIDENT</th>
              <th>NIVEAU</th>
              <th>STATUT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {alertsData.map((alert) => {
              const Icon = alert.icon;
              return (
                <tr key={alert.id} className={`table-row ${alert.severity}`}>
                  <td className="time-cell">{alert.time}</td>
                  <td className="zone-cell">
                    <div className="zone-indicator" style={{ background: alert.iconBg }}>
                      <Icon size={14} style={{ color: alert.iconColor }} />
                    </div>
                    <span>{alert.zone}</span>
                  </td>
                  <td className="type-cell">{alert.type}</td>
                  <td className="level-cell">
                    <span className={`level-badge ${alert.level.toLowerCase()}`}>{alert.level}</span>
                  </td>
                  <td className="status-cell">
                    <span className="status-label" style={{ color: alert.statusColor }}>
                      {alert.status === 'Actif' ? '● Actif' : alert.status === 'En cours d\'investigation' ? '◐ En cours d\'investigation' : '✓ Résolu'}
                    </span>
                  </td>
                  <td className="action-cell">
                    <button className="view-details-btn">Voir les détails</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="alertes-pagination">
        <span className="pagination-info">AFFICHAGE DE 1-4 SUR 124 RÉSULTATS</span>
        <div className="pagination-controls">
          <button>1</button>
          <button className="active">2</button>
          <button>3</button>
          <button className="next">›</button>
        </div>
      </div>

      <div className="alertes-bottom">
        <div className="alertes-zone-analysis">
          <h3>Analyse des Zones</h3>
          <p>Cartographie de la densité thermique en temps réel sur tous les segments du stade.</p>
          <div className="zone-cards-grid">
            {zoneAnalysisCards.map((card, idx) => (
              <div key={idx} className="zone-analysis-card">
                <h4>{card.label}</h4>
                <p>{card.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="alertes-emergency-protocols">
          <ZapIcon size={28} />
          <h3>Protocoles d'Urgence</h3>
          <p>Examinez les déclencheurs d'automatisation actuelle pour l'évacuation des zones.</p>
          <button className="launch-exercise-btn">Lancer l'exercice</button>
        </div>
      </div>
    </div>
  );
}

export default Alertes;
