import React from 'react';
import { Users, Radio, AlertTriangle, CheckCircle } from 'lucide-react';
import StadiumMap from './StadiumMap';
import LiveAlerts from './LiveAlerts';
import CameraFeeds from './CameraFeeds';
import './Dashboard.css';

const stats = [
  {
    id: 'supporters',
    label: 'TOTAL SUPPORTERS',
    value: '1 248',
    subtitle: '12% depuis l\'heure derni\u00e8re',
    subtitleUp: true,
    icon: Users,
    color: '#6c5ce7',
    bgColor: '#f8f7ff',
  },
  {
    id: 'capteurs',
    label: 'CAPTEURS ACTIFS',
    value: '4 892',
    subtitle: 'Disponibilit\u00e9 de 99,8%',
    icon: Radio,
    color: '#6c5ce7',
    bgColor: '#f8f7ff',
  },
  {
    id: 'alertes',
    label: 'ALERTES OUVERTES',
    value: '03',
    subtitle: 'Action imm\u00e9diate requise',
    icon: AlertTriangle,
    color: '#e74c3c',
    bgColor: '#fef2f2',
    isAlert: true,
  },
  {
    id: 'statut',
    label: 'STATUT SYST\u00c8ME',
    value: 'D\u00c9GAG\u00c9',
    subtitle: 'Aucun danger d\u00e9tect\u00e9',
    icon: CheckCircle,
    color: '#27ae60',
    bgColor: '#f0fdf4',
    isSuccess: true,
  },
];

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="dashboard-title-section">
          <h1>Vue d'ensemble du système</h1>
          <p>Surveillance de sécurité en temps réel pour le Complexe du Stade Nord</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-secondary">Générer un rapport</button>
          <button className="btn btn-danger">Protocole d'urgence</button>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`stat-card ${stat.isAlert ? 'alert' : ''} ${stat.isSuccess ? 'success' : ''}`}
            >
              <div className="stat-header">
                <span className="stat-label">{stat.label}</span>
                <div className="stat-icon" style={{ color: stat.color }}>
                  <Icon size={22} />
                </div>
              </div>
              <div className="stat-value" style={{ color: stat.isAlert ? '#e74c3c' : stat.isSuccess ? '#27ae60' : '#1a1a2e' }}>
                {stat.value}
              </div>
              <div className="stat-subtitle" style={{ color: stat.isAlert ? '#e74c3c' : stat.isSuccess ? '#27ae60' : '#888' }}>
                {stat.subtitleUp && <span className="trend-up">&uarr; </span>}
                {stat.subtitle}
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <StadiumMap />
        </div>
        <div className="dashboard-side">
          <LiveAlerts />
          <CameraFeeds />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
