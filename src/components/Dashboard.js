import React from 'react';
import { Radio, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import StadiumMap from './StadiumMap';
import LiveAlerts from './LiveAlerts';
import CameraFeeds from './CameraFeeds';
import { useAlerts, useAlertStats } from '../useAlerts';
import './Dashboard.css';

function Dashboard() {
  const { alerts, loading, error } = useAlerts(3000);
  const stats = useAlertStats(alerts);

  // Determine system status based on live data
  const hasNewAlerts = stats.newAlerts > 0;
  const systemStatus = hasNewAlerts ? 'ALERTE' : 'DÉGAGÉ';
  const systemSubtitle = hasNewAlerts
    ? `${stats.newAlerts} nouvelle(s) détection(s)`
    : 'Aucun danger détecté';

  const dashboardStats = [
    {
      id: 'total',
      label: 'TOTAL INCIDENTS',
      value: loading ? '...' : String(stats.totalAlerts).padStart(2, '0'),
      subtitle: `${stats.gunAlerts} arme(s) · ${stats.knifeAlerts} couteau(x) · ${stats.violenceAlerts} violence`,
      subtitleUp: false,
      icon: ShieldAlert,
      color: '#6c5ce7',
      bgColor: '#f8f7ff',
    },
    {
      id: 'capteurs',
      label: 'CAPTEURS ACTIFS',
      value: '4 892',
      subtitle: 'Disponibilité de 99,8%',
      icon: Radio,
      color: '#6c5ce7',
      bgColor: '#f8f7ff',
    },
    {
      id: 'alertes',
      label: 'ALERTES OUVERTES',
      value: loading ? '...' : String(stats.newAlerts).padStart(2, '0'),
      subtitle: stats.newAlerts > 0 ? 'Action immédiate requise' : 'Aucune alerte ouverte',
      icon: AlertTriangle,
      color: '#e74c3c',
      bgColor: '#fef2f2',
      isAlert: stats.newAlerts > 0,
    },
    {
      id: 'statut',
      label: 'STATUT SYSTÈME',
      value: loading ? '...' : systemStatus,
      subtitle: systemSubtitle,
      icon: hasNewAlerts ? AlertTriangle : CheckCircle,
      color: hasNewAlerts ? '#e74c3c' : '#27ae60',
      bgColor: hasNewAlerts ? '#fef2f2' : '#f0fdf4',
      isSuccess: !hasNewAlerts,
      isAlert: hasNewAlerts,
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <div className="dashboard-title-section">
          <h1>Vue d'ensemble du système</h1>
          <p>Surveillance de sécurité en temps réel pour le Complexe du Stade Nord</p>
          {error && (
            <span className="backend-error-badge">
              ⚠ Backend hors ligne — données en cache
            </span>
          )}
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-secondary">Générer un rapport</button>
          <button className="btn btn-danger">Protocole d'urgence</button>
        </div>
      </div>

      <div className="stats-grid">
        {dashboardStats.map((stat) => {
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
          <StadiumMap alerts={alerts} />
        </div>
        <div className="dashboard-side">
          <LiveAlerts alerts={alerts} loading={loading} />
          <CameraFeeds />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
