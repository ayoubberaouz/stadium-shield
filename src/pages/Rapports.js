import React, { useState } from 'react';
import { Calendar, MapPin, AlertTriangle, Eye, Clock, Zap, TrendingUp, Download } from 'lucide-react';
import './Rapports.css';

const statsData = [
  { label: 'Total Supporters', value: '842 000', change: '+12%', icon: '👥', negative: false },
  { label: 'Temps de réponse moyen', value: '1.4m', change: '+0.2m', icon: '⏱️', negative: true },
  { label: 'Disponibilité du système', value: '99.98%', label2: 'Derniers 30 jours', icon: '✓', negative: false },
  { label: 'Total des incidents', value: '124', change: '+18%', icon: '⚠️', negative: true },
];

const frequencyData = [
  { day: 'LUN', value: 28 },
  { day: 'MAR', value: 35 },
  { day: 'MER', value: 32 },
  { day: 'JEU', value: 42 },
  { day: 'VEN', value: 38 },
  { day: 'SAM', value: 25 },
  { day: 'DIM', value: 18 },
];

const incidentDistribution = [
  { label: 'Contrôle de la foule', value: 45, color: '#6c5ce7' },
  { label: 'Détection de fumée', value: 25, color: '#f59e0b' },
  { label: 'Alerte incendie', value: 15, color: '#e74c3c' },
  { label: 'Urgence médicale', value: 15, color: '#3b82f6' },
];

const zoneData = [
  { zone: 'Zone 1 - Tribune Nord', value: 84200 },
  { zone: 'Zone 2 - Coin Est', value: 42100 },
  { zone: 'Zone 3 - Porte Sud', value: 68500 },
  { zone: 'Zone 4 - Loge VIP', value: 12000 },
];

const thermalZones = [
  { id: 'Z1', label: 'Z1', temp: '48°C', density: 48, color: '#65da9f' },
  { id: 'Z2', label: 'Z2', temp: '34°C', density: 34, color: '#65da9f' },
  { id: 'Z3', label: 'Z3', temp: '72°C', density: 72, color: '#ffd97d' },
  { id: 'Z4', label: 'Z4', temp: '63°C', density: 63, color: '#65da9f' },
  { id: 'Z5', label: 'Z5', temp: '58°C', density: 58, color: '#65da9f' },
  { id: 'Z6', label: 'Z6', temp: '45°C', density: 45, color: '#ee6b6e' },
  { id: 'Z7', label: 'Z7', temp: '61°C', density: 61, color: '#ffd97d' },
  { id: 'Z8', label: 'Z8', temp: '54°C', density: 54, color: '#65da9f' },
];

function Rapports() {
  const [dateRange] = useState('01 Oct - 31 Oct 2030');
  const [selectedZone] = useState('Toutes les zones');
  const [eventType] = useState('Tous les événements');

  return (
    <div className="rapports-page">
      {/* Header */}
      <div className="rapport-dashboard-header">
        <div>
          <h1>Tableau de bord des Rapports et Analyses</h1>
          <p>Analyse complète des données pour le Hub du Stade 01 de la Coupe du Monde 2030</p>
        </div>
      </div>

      {/* Filters */}
      <div className="rapport-filters">
        <div className="filter-group">
          <label>PLAGE DE DATES</label>
          <div className="filter-value">
            <Calendar size={16} />
            <span>{dateRange} 📋</span>
          </div>
        </div>
        <div className="filter-group">
          <label>SÉLECTEUR DE ZONE</label>
          <div className="filter-value">
            <MapPin size={16} />
            <span>{selectedZone}</span>
          </div>
        </div>
        <div className="filter-group">
          <label>TYPE D'ÉVÉNEMENT</label>
          <div className="filter-value">
            <AlertTriangle size={16} />
            <span>{eventType}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="rapport-stats-grid">
        {statsData.map((stat, idx) => (
          <div key={idx} className="rapport-stat-card">
            <div className="stat-header">
              <span className="stat-icon">{stat.icon}</span>
              <span className={`stat-change ${stat.negative ? 'negative' : 'positive'}`}>
                {stat.change}
              </span>
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-value">{stat.value}</div>
            {stat.label2 && <div className="stat-label2">{stat.label2}</div>}
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="rapport-charts-section">
        {/* Frequency Chart */}
        <div className="rapport-chart-card">
          <div className="chart-header">
            <h3>Fréquence des alertes</h3>
            <p>Distribution quotidienne des alertes au cours des 7 derniers jours</p>
            <div className="chart-legend">
              <span><span className="legend-dot critique"></span> Critique</span>
              <span><span className="legend-dot routine"></span> Routine</span>
            </div>
          </div>
          <div className="bar-chart">
            {frequencyData.map((data) => (
              <div key={data.day} className="bar-item">
                <div className="bar-container">
                  <div className="bar" style={{ height: `${(data.value / 50) * 100}%` }}></div>
                </div>
                <span className="bar-label">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Distribution Chart */}
        <div className="rapport-chart-card">
          <div className="chart-header">
            <h3>Répartition des incidents</h3>
          </div>
          <div className="distribution-content">
            <div className="distribution-number">
              <span className="big-number">124</span>
              <span className="small-text">RÉCENTS</span>
            </div>
            <div className="distribution-legend">
              {incidentDistribution.map((item, idx) => (
                <div key={idx} className="legend-item">
                  <span className="legend-color" style={{ background: item.color }}></span>
                  <span className="legend-text">{item.label}</span>
                  <span className="legend-percent">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="rapport-bottom-section">
        {/* Zone Chart */}
        <div className="rapport-zone-chart">
          <div className="section-header">
            <h3>Personnes par Zone</h3>
            <a href="#" className="rapport-link">Rapport complet</a>
          </div>
          <div className="horizontal-bars">
            {zoneData.map((zone, idx) => (
              <div key={idx} className="horizontal-bar">
                <span className="bar-zone-label">{zone.zone}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${(zone.value / 100000) * 100}%` }}></div>
                </div>
                <span className="bar-value">{zone.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Temperature Chart */}
        <div className="rapport-temp-chart">
          <div className="section-header">
            <h3>Tendances de température</h3>
            <span className="current-temp">24.2°C <span className="temp-status">OPTIMAL</span></span>
          </div>
          <div className="line-chart">
            <svg viewBox="0 0 300 150" className="chart-svg">
              <path d="M0,100 Q50,70 100,80 T200,40 T300,60" fill="none" stroke="#6c5ce7" strokeWidth="3" />
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6c5ce7" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="chart-time-labels">
              <span>00:00</span>
              <span>08:00</span>
              <span>12:00</span>
              <span>16:00</span>
              <span>23H59+HAUT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thermal Map */}
      <div className="rapport-thermal-map">
        <div className="thermal-header">
          <h3>Carte thermique de densité de foule</h3>
          <p>Indice de sécurité en direct par zone</p>
          <div className="thermal-legend">
            <span><span className="thermal-dot" style={{ background: '#65da9f' }}></span> SÛR</span>
            <span><span className="thermal-dot" style={{ background: '#ffd97d' }}></span> MODÉRÉ</span>
            <span><span className="thermal-dot" style={{ background: '#ee6b6e' }}></span> CRITIQUE</span>
          </div>
        </div>
        <div className="thermal-zones-grid">
          {thermalZones.map((zone) => (
            <div key={zone.id} className="thermal-zone-card" style={{ background: zone.color }}>
              <h4>{zone.label}</h4>
              <span className="zone-temp">{zone.temp}</span>
              <span className="zone-density">{zone.density}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="rapport-footer">
        <p>© 2026 StadiumShield. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="#">Politique de confidentialité</a>
          <a href="#">Documentation API</a>
          <a href="#">Statut du système</a>
        </div>
      </div>
    </div>
  );
}

export default Rapports;
