import React, { useState } from 'react';
import { Thermometer, Wind, Users, Activity, AlertTriangle, CheckCircle, Download, AlertCircle } from 'lucide-react';
import './Capteurs.css';

const sensorsData = [
  {
    zone: 'ZONE 1 • TRIBUNE NORD', type: 'Capteur de température', value: '24.2°C',
    change: '~0.5°', changeDir: 'down', status: 'OK', statusColor: '#27ae60',
    lastUpdate: 'il y a 2s', icon: Thermometer, iconColor: '#6c5ce7', iconBg: '#f8f7ff',
  },
  {
    zone: 'ZONE 4 • ESPACE RESTAURATION', type: 'Capteur de fumée', value: '12%',
    change: '↗4%', changeDir: 'up', status: 'AVERTISSEMENT', statusColor: '#f59e0b',
    lastUpdate: 'il y a 5s', icon: Wind, iconColor: '#f59e0b', iconBg: '#fffbeb',
  },
  {
    zone: 'ZONE 2 • ENTRÉE OUEST', type: 'Capteur de densité de foule', value: '85%',
    change: null, status: 'Critique', statusColor: '#e74c3c',
    lastUpdate: 'temps réel', icon: Users, iconColor: '#e74c3c', iconBg: '#fef2f2',
    isDanger: true,
  },
  {
    zone: 'ZONE 3 • NIVEAU VIP', type: 'Capteur de mouvement', value: 'Actif',
    change: null, status: 'OK', statusColor: '#27ae60',
    lastUpdate: 'il y a 1s', icon: Activity, iconColor: '#27ae60', iconBg: '#f0fdf4',
  },
];

const tempDataPoints = [
  { x: 0, y: 12 }, { x: 1, y: 11 }, { x: 2, y: 13 }, { x: 3, y: 14 },
  { x: 4, y: 16 }, { x: 5, y: 20 }, { x: 6, y: 24 }, { x: 7, y: 28 },
  { x: 8, y: 30 }, { x: 9, y: 28 }, { x: 10, y: 25 }, { x: 11, y: 24 },
];

const smokeData = [
  { zone: 'Concours Nord', value: 4, color: '#3b82f6' },
  { zone: 'Porte Ouest A', value: 12, color: '#f59e0b' },
  { zone: 'Cuisine Centrale', value: 32, color: '#e74c3c' },
];

const densityPorts = [
  { label: 'PORTE 1', value: 85, isAlert: true },
  { label: 'PORTE 2', value: 40 },
  { label: 'PORTE 3', value: 35 },
  { label: 'PORTE 4', value: 25 },
  { label: 'PORTE 5', value: 20 },
  { label: 'PORTE 6', value: 30 },
];

const alertsJournal = [
  {
    icon: AlertTriangle, iconColor: '#e74c3c', iconBg: '#fef2f2',
    title: 'Haute Densité Détectée',
    desc: 'La Porte 2 dépasse le seuil de sécurité de 15%. Recommandation : ouvrir le débordement Porte 3.',
    time: '14:23:05', status: 'Non résolu', statusColor: '#e74c3c',
  },
  {
    icon: CheckCircle, iconColor: '#27ae60', iconBg: '#f0fdf4',
    title: 'Cycle CVC Terminé',
    desc: 'Qualité de l\'air en Zone 4 rétablie aux niveaux de base. Capteurs nominaux.',
    time: '13:58:22', status: 'Résolu', statusColor: '#27ae60',
  },
];

function Capteurs() {
  const [tempRange, setTempRange] = useState('1H');

  // Build SVG path for temperature chart
  const chartW = 600;
  const chartH = 180;
  const padL = 40;
  const padR = 20;
  const padT = 20;
  const padB = 30;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const points = tempDataPoints.map((p, i) => {
    const x = padL + (i / (tempDataPoints.length - 1)) * plotW;
    const y = padT + plotH - ((p.y / 40) * plotH);
    return `${x},${y}`;
  });
  const linePath = `M${points.join(' L')}`;
  const areaPath = `${linePath} L${padL + plotW},${padT + plotH} L${padL},${padT + plotH} Z`;

  return (
    <div className="capteurs-page">
      <div className="capteurs-header">
        <div>
          <h1>Réseau de Capteurs en Direct</h1>
          <p>Télémétrie en temps réel de toute l'infrastructure du stade. Les indicateurs d'état reflètent les seuils de sécurité actifs.</p>
        </div>
      </div>

      {/* Sensor cards */}
      <div className="sensors-grid">
        {sensorsData.map((sensor, i) => {
          const Icon = sensor.icon;
          return (
            <div key={i} className={`sensor-card ${sensor.isDanger ? 'danger' : ''}`}>
              <div className="sensor-card-top">
                <span className="sensor-zone">{sensor.zone}</span>
                <div className="sensor-icon" style={{ background: sensor.iconBg }}>
                  <Icon size={20} style={{ color: sensor.iconColor }} />
                </div>
              </div>
              <div className="sensor-type">{sensor.type}</div>
              <div className="sensor-value-row">
                <span className="sensor-value" style={{ color: sensor.isDanger ? '#e74c3c' : '#1a1a2e' }}>{sensor.value}</span>
                {sensor.change && <span className="sensor-change">{sensor.change}</span>}
              </div>
              {sensor.isDanger && <span className="sensor-danger-label">DANGER</span>}
              <div className="sensor-footer">
                <div className="sensor-status" style={{ color: sensor.statusColor }}>
                  <span className="sensor-status-dot" style={{ background: sensor.statusColor }}></span>
                  STATUT: {sensor.status}
                </div>
                <span className="sensor-update">Dernière mise à jour: {sensor.lastUpdate}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts section */}
      <div className="capteurs-charts">
        <div className="capteurs-chart-main">
          {/* Temperature chart */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Graphique de température (Historique)</h3>
                <p>Surveillance du cycle de performance sur 24h</p>
              </div>
              <div className="chart-range-btns">
                {['1H', '6H', '24H'].map((r) => (
                  <button key={r} className={`range-btn ${tempRange === r ? 'active' : ''}`} onClick={() => setTempRange(r)}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="chart-area">
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="temp-chart-svg">
                {/* Y axis labels */}
                {[0, 10, 20, 30, 40].map((v) => {
                  const y = padT + plotH - ((v / 40) * plotH);
                  return (
                    <g key={v}>
                      <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#999">{v}°</text>
                      <line x1={padL} y1={y} x2={padL + plotW} y2={y} stroke="#e8e8ef" strokeWidth="0.5" />
                    </g>
                  );
                })}
                {/* Area fill */}
                <path d={areaPath} fill="url(#tempAreaGrad)" opacity="0.3" />
                {/* Line */}
                <path d={linePath} fill="none" stroke="#6c5ce7" strokeWidth="2.5" strokeLinejoin="round" />
                {/* Points */}
                {tempDataPoints.map((p, i) => {
                  const x = padL + (i / (tempDataPoints.length - 1)) * plotW;
                  const y = padT + plotH - ((p.y / 40) * plotH);
                  return <circle key={i} cx={x} cy={y} r="3" fill="#6c5ce7" />;
                })}
                <defs>
                  <linearGradient id="tempAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c5ce7" />
                    <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Crowd density chart */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Graphique de densité de foule</h3>
                <p>Équilibrage de charge des portes en temps réel</p>
              </div>
              <button className="export-btn"><Download size={14} /> Exporter les Données</button>
            </div>
            <div className="density-port-chart">
              {densityPorts.map((port, i) => (
                <div key={i} className="density-port-bar">
                  <div className="density-port-track">
                    <div
                      className="density-port-fill"
                      style={{
                        height: `${port.value}%`,
                        background: port.isAlert ? '#e74c3c' : '#e8e8ef',
                      }}
                    ></div>
                  </div>
                  {port.isAlert && <span className="density-port-value" style={{ color: '#e74c3c' }}>{port.value}%</span>}
                  <span className="density-port-label">{port.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="capteurs-chart-side">
          {/* Smoke chart */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <h3>Graphique de fumée</h3>
                <p>Saturation spécifique par zone</p>
              </div>
            </div>
            <div className="smoke-bars">
              {smokeData.map((s, i) => (
                <div key={i} className="smoke-bar-row">
                  <span className="smoke-zone-name">{s.zone}</span>
                  <div className="smoke-bar-track">
                    <div className="smoke-bar-fill" style={{ width: `${(s.value / 40) * 100}%`, background: s.color }}></div>
                  </div>
                  <span className="smoke-value" style={{ fontWeight: 700 }}>{s.value}%</span>
                </div>
              ))}
            </div>
            <div className="smoke-alert-box">
              <AlertCircle size={16} color="#e74c3c" />
              <span>Pic détecté dans la Cuisine Centrale. Ventilation automatisée CVC activée.</span>
            </div>
          </div>

          {/* System health */}
          <div className="system-health-card">
            <h3>État de Santé du Système</h3>
            <p>Les 1 240 capteurs de périphérie transmettent. Latence de synchro globale : 12ms.</p>
            <button className="diagnostic-btn">Lancer le Diagnostic</button>
          </div>
        </div>
      </div>

      {/* Alerts journal */}
      <div className="alerts-journal">
        <div className="journal-header">
          <h3>JOURNAL DES ALERTES ACTIVES</h3>
          <button className="see-all-link-cap">Voir Toute l'Activité</button>
        </div>
        {alertsJournal.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div key={i} className="journal-item">
              <div className="journal-icon" style={{ background: alert.iconBg }}>
                <Icon size={18} style={{ color: alert.iconColor }} />
              </div>
              <div className="journal-content">
                <strong>{alert.title}</strong>
                <p>{alert.desc}</p>
              </div>
              <div className="journal-meta">
                <span className="journal-time">{alert.time}</span>
                <span className="journal-status" style={{ color: alert.statusColor }}>{alert.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Capteurs;
