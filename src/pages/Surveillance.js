import React from 'react';
import { Users, Map, Camera, AlertTriangle, Zap, RefreshCw, Flame, AlertCircle } from 'lucide-react';
import './Surveillance.css';

const statsCards = [
  { label: 'TOTAL SUPPORTERS', value: '1,276', subtitle: '↗ 12% depuis le dernier match', icon: Users, color: '#6c5ce7' },
  { label: 'ZONES ACTIVES', value: '8', subtitle: 'Couverture Totale Active', icon: Map, color: '#6c5ce7' },
  { label: 'CAMÉRAS ACTIVES', value: '21', subtitle: 'Disponibilité 98.2%', icon: Camera, color: '#6c5ce7' },
  { label: 'ALERTES ACTIVES', value: '3', subtitle: 'Nécessite une Attention Immédiate', icon: AlertTriangle, color: '#e74c3c', isAlert: true },
];

const zoneDetails = [
  {
    name: 'Zone 1',
    status: 'OK',
    statusColor: '#27ae60',
    personnes: '111',
    code: '011',
    temperature: '28°C',
    cameras: '3',
    lastUpdate: 'il y a 2 sec',
  },
  {
    name: 'Zone 5',
    status: 'CRITIQUE',
    statusColor: '#e74c3c',
    personnes: '482',
    code: '999',
    temperature: '42°C',
    temperatureUp: true,
    cameras: '6',
    alert: 'FUMÉE DÉTECTÉE',
    isCritical: true,
  },
  {
    name: 'Zone 7',
    status: 'ATTENTION',
    statusColor: '#f59e0b',
    personnes: '290',
    code: '042',
    alert: 'Densité de Foule Élevée',
    isWarning: true,
  },
];

const liveAlerts = [
  { id: 1, text: 'Feu détecté dans la Zone 5', sub: 'Suppression automatique lancée', icon: Flame, color: '#e74c3c' },
  { id: 2, text: 'Panique de la foule dans la Zone 7', sub: 'Déploiement de la sécurité tactique', icon: Users, color: '#e74c3c' },
  { id: 3, text: 'Fumée détectée dans la Zone 5', sub: 'Capteurs ont confirmé 42°C', icon: AlertCircle, color: '#e74c3c' },
];

function Surveillance() {
  return (
    <div className="surveillance-page">
      <div className="stats-grid-surv">
        {statsCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`stat-card-surv ${stat.isAlert ? 'alert' : ''}`}>
              <div className="stat-header-surv">
                <span className="stat-label-surv" style={{ color: stat.isAlert ? '#e74c3c' : '#888' }}>{stat.label}</span>
                <div className="stat-icon-surv" style={{ color: stat.color }}>
                  <Icon size={22} />
                </div>
              </div>
              <div className="stat-value-surv" style={{ color: stat.isAlert ? '#e74c3c' : '#1a1a2e' }}>{stat.value}</div>
              <div className="stat-subtitle-surv" style={{ color: stat.isAlert ? '#e74c3c' : '#27ae60' }}>{stat.subtitle}</div>
            </div>
          );
        })}
      </div>

      <div className="surveillance-grid">
        <div className="surveillance-main">
          <div className="cartography-card">
            <div className="cartography-header">
              <div>
                <h2>Cartographie en Direct</h2>
                <p>Coupe du Monde 2030 - Arena Prime</p>
              </div>
              <div className="cartography-legend">
                <span className="legend-item"><span className="legend-dot" style={{ background: '#27ae60' }}></span> Sûr</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }}></span> Avertissement</span>
                <span className="legend-item"><span className="legend-dot" style={{ background: '#e74c3c' }}></span> Danger</span>
              </div>
            </div>

            <div className="stadium-map-surv">
              <svg viewBox="0 0 600 400" className="stadium-oval-svg">
                <defs>
                  <radialGradient id="mapBg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f8f9fa" />
                    <stop offset="100%" stopColor="#e8ecf0" />
                  </radialGradient>
                </defs>
                {/* Stadium oval outline */}
                <ellipse cx="300" cy="200" rx="270" ry="175" fill="url(#mapBg)" stroke="#d0d5dd" strokeWidth="2" />
                <ellipse cx="300" cy="200" rx="250" ry="158" fill="none" stroke="#d0d5dd" strokeWidth="1" strokeDasharray="4,4" />

                {/* Field center */}
                <rect x="180" y="130" width="240" height="140" rx="8" fill="#e8f5e9" stroke="#a5d6a7" strokeWidth="1" />
                <text x="300" y="205" textAnchor="middle" fontSize="12" fill="#66bb6a" fontWeight="600">AIRE DE JEU</text>

                {/* Top row zones */}
                <rect x="80" y="50" width="110" height="65" rx="8" fill="rgba(39,174,96,0.12)" stroke="#27ae60" strokeWidth="1.5" />
                <text x="135" y="78" textAnchor="middle" fontSize="11" fill="#27ae60" fontWeight="700">ZONE 1</text>
                <text x="135" y="95" textAnchor="middle" fontSize="9" fill="#27ae60">SÛR</text>

                <rect x="200" y="50" width="110" height="65" rx="8" fill="rgba(39,174,96,0.12)" stroke="#27ae60" strokeWidth="1.5" />
                <text x="255" y="78" textAnchor="middle" fontSize="11" fill="#27ae60" fontWeight="700">ZONE 2</text>
                <text x="255" y="95" textAnchor="middle" fontSize="9" fill="#27ae60">SÛR</text>

                <rect x="320" y="50" width="110" height="65" rx="8" fill="rgba(39,174,96,0.12)" stroke="#27ae60" strokeWidth="1.5" />
                <text x="375" y="78" textAnchor="middle" fontSize="11" fill="#27ae60" fontWeight="700">ZONE 3</text>
                <text x="375" y="95" textAnchor="middle" fontSize="9" fill="#27ae60">SÛR</text>

                <rect x="440" y="50" width="110" height="65" rx="8" fill="rgba(39,174,96,0.12)" stroke="#27ae60" strokeWidth="1.5" />
                <text x="495" y="78" textAnchor="middle" fontSize="11" fill="#27ae60" fontWeight="700">ZONE 4</text>
                <text x="495" y="95" textAnchor="middle" fontSize="9" fill="#27ae60">SÛR</text>

                {/* Bottom row zones */}
                <rect x="80" y="285" width="110" height="65" rx="8" fill="rgba(231,76,60,0.12)" stroke="#e74c3c" strokeWidth="1.5" />
                <text x="135" y="313" textAnchor="middle" fontSize="11" fill="#e74c3c" fontWeight="700">ZONE 5</text>
                <text x="135" y="330" textAnchor="middle" fontSize="9" fill="#e74c3c">CRITIQUE</text>

                <rect x="200" y="285" width="110" height="65" rx="8" fill="rgba(39,174,96,0.12)" stroke="#27ae60" strokeWidth="1.5" />
                <text x="255" y="313" textAnchor="middle" fontSize="11" fill="#27ae60" fontWeight="700">ZONE 6</text>
                <text x="255" y="330" textAnchor="middle" fontSize="9" fill="#27ae60">SÛR</text>

                <rect x="320" y="285" width="110" height="65" rx="8" fill="rgba(245,158,11,0.12)" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="375" y="313" textAnchor="middle" fontSize="11" fill="#f59e0b" fontWeight="700">ZONE 7</text>
                <text x="375" y="330" textAnchor="middle" fontSize="9" fill="#f59e0b">AVERTISSEMENT</text>

                <rect x="440" y="285" width="110" height="65" rx="8" fill="rgba(39,174,96,0.12)" stroke="#27ae60" strokeWidth="1.5" />
                <text x="495" y="313" textAnchor="middle" fontSize="11" fill="#27ae60" fontWeight="700">ZONE 8</text>
                <text x="495" y="330" textAnchor="middle" fontSize="9" fill="#27ae60">SÛR</text>
              </svg>
            </div>
          </div>

          {/* Live Alerts Feed */}
          <div className="surv-alerts-feed">
            <div className="surv-alerts-header">
              <div className="surv-alerts-title">
                <Zap size={18} />
                <h3>Flux d'Alertes en Direct</h3>
              </div>
              <button className="see-all-link">Voir tous les enregistrements</button>
            </div>
            <div className="surv-alerts-cards">
              {liveAlerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div key={alert.id} className="surv-alert-card">
                    <div className="surv-alert-icon">
                      <Icon size={20} color="white" />
                    </div>
                    <div>
                      <div className="surv-alert-text">{alert.text}</div>
                      <div className="surv-alert-sub">{alert.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right sidebar: zone details */}
        <div className="surveillance-side">
          <h3 className="zone-details-title">DÉTAILS DES ZONES</h3>
          {zoneDetails.map((zone, i) => (
            <div key={i} className={`zone-detail-card ${zone.isCritical ? 'critical' : ''} ${zone.isWarning ? 'warning' : ''}`}>
              <div className="zone-detail-header">
                <h4>{zone.name}</h4>
                <span className="zone-status-badge" style={{ background: zone.statusColor }}>{zone.status}</span>
              </div>
              <div className="zone-detail-stats">
                <div>
                  <span className="zone-stat-label">Personnes</span>
                  <span className="zone-stat-value">{zone.personnes}</span>
                </div>
                <div>
                  <span className="zone-stat-label">Code de sécurité</span>
                  <span className="zone-stat-value">{zone.code}</span>
                </div>
                {zone.temperature && (
                  <div>
                    <span className="zone-stat-label">Température</span>
                    <span className="zone-stat-value" style={{ color: zone.temperatureUp ? '#e74c3c' : undefined }}>
                      {zone.temperature} {zone.temperatureUp && '↑'}
                    </span>
                  </div>
                )}
                {zone.cameras && (
                  <div>
                    <span className="zone-stat-label">Caméras</span>
                    <span className="zone-stat-value">{zone.cameras}</span>
                  </div>
                )}
              </div>
              {zone.alert && (
                <div className="zone-detail-alert" style={{ color: zone.isCritical ? '#e74c3c' : '#f59e0b' }}>
                  {zone.alert}
                </div>
              )}
              {zone.lastUpdate && (
                <div className="zone-detail-footer">
                  <span>Dernière m.àj : {zone.lastUpdate}</span>
                  <RefreshCw size={14} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Surveillance;
