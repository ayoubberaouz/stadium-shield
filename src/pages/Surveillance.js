import React, { useState, useEffect } from 'react';
import { Users, Map, Camera, AlertTriangle, Zap, RefreshCw, Crosshair, Swords, Trash2, X } from 'lucide-react';
import { useAlerts, useAlertStats } from '../useAlerts';
import { clearAllAlerts, deleteAlert } from '../api';
import './Surveillance.css';

const typeConfig = {
  gun: { icon: Crosshair, label: 'Arme à feu détectée', sub: 'Alerte critique — sécurité déployée' },
  knife: { icon: Swords, label: 'Couteau détecté', sub: 'Vérification en cours' },
  violence: { icon: AlertTriangle, label: 'Violence détectée', sub: 'Déploiement de la sécurité tactique' },
};

function Surveillance() {
  const { alerts, loading } = useAlerts(3000);
  const stats = useAlertStats(alerts);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const statsCards = [
    { label: 'TOTAL SUPPORTERS', value: '1,276', subtitle: '↗ 12% depuis le dernier match', icon: Users, color: '#6c5ce7' },
    { label: 'ZONES ACTIVES', value: '8', subtitle: 'Couverture Totale Active', icon: Map, color: '#6c5ce7' },
    { label: 'CAMÉRAS ACTIVES', value: '21', subtitle: 'Disponibilité 98.2%', icon: Camera, color: '#6c5ce7' },
    {
      label: 'ALERTES ACTIVES',
      value: loading ? '...' : String(stats.newAlerts),
      subtitle: stats.newAlerts > 0 ? 'Nécessite une Attention Immédiate' : 'Aucune alerte active',
      icon: AlertTriangle,
      color: '#e74c3c',
      isAlert: stats.newAlerts > 0,
    },
  ];

  const zoneMap = {
    1: 'CAM-1',
    2: 'CAM-1',
    3: 'CAM-2',
    4: 'CAM-2',
    5: 'CAM-115',
    6: 'CAM-115',
    7: 'CAM-3',
    8: 'CAM-3',
  };

  const getZoneStatus = (zoneNum) => {
    const camId = zoneMap[zoneNum];
    if (!camId) return { status: 'SÛR', level: 'safe', color: '#27ae60', bgColor: 'rgba(39,174,96,0.12)' };

    const recentAlertsForCam = alerts.filter(a => {
      if (a.status !== 'new' && a.status !== 'in_progress') return false;
      const alertTime = new Date(a.timestamp).getTime();
      
      // To show the alert in ONLY ONE of the 2 zones for this camera,
      // we pseudo-randomly pick a zone based on the alert's ID.
      // This way it doesn't light up both zones simultaneously.
      const charCode = a._id.charCodeAt(a._id.length - 1);
      const isEvenZone = zoneNum % 2 === 0;
      const isEvenChar = charCode % 2 === 0;
      
      // If charCode is even, assign to ODD zone (1,3,5,7).
      // If charCode is odd, assign to EVEN zone (2,4,6,8).
      if (isEvenZone === isEvenChar) return false;

      return (currentTime - alertTime) < 35000 && a.camera_id === camId;
    });

    if (recentAlertsForCam.length === 0) return { status: 'SÛR', level: 'safe', color: '#27ae60', bgColor: 'rgba(39,174,96,0.12)' };

    const hasGun = recentAlertsForCam.some(a => a.weapon_type === 'gun');
    const hasKnife = recentAlertsForCam.some(a => a.weapon_type === 'knife');
    const hasViolence = recentAlertsForCam.some(a => a.weapon_type === 'violence');

    if (hasGun) return { status: 'CRITIQUE', level: 'critical', color: '#e74c3c', bgColor: 'rgba(231,76,60,0.12)', alertLabel: 'ARME À FEU DÉTECTÉE' };
    if (hasViolence || hasKnife) return { status: 'ATTENTION', level: 'warning', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.12)', alertLabel: hasViolence ? 'VIOLENCE DÉTECTÉE' : 'ARME BLANCHE' };

    return { status: 'SÛR', level: 'safe', color: '#27ae60', bgColor: 'rgba(39,174,96,0.12)' };
  };

  const getCamStatus = (camId) => {
    const recentAlertsForCam = alerts.filter(a => {
      if (a.status !== 'new' && a.status !== 'in_progress') return false;
      const alertTime = new Date(a.timestamp).getTime();
      return (currentTime - alertTime) < 35000 && a.camera_id === camId;
    });

    if (recentAlertsForCam.length === 0) return { status: 'SÛR', level: 'safe', color: '#27ae60', bgColor: 'rgba(39,174,96,0.12)' };

    const hasGun = recentAlertsForCam.some(a => a.weapon_type === 'gun');
    const hasKnife = recentAlertsForCam.some(a => a.weapon_type === 'knife');
    const hasViolence = recentAlertsForCam.some(a => a.weapon_type === 'violence');

    if (hasGun) return { status: 'CRITIQUE', level: 'critical', color: '#e74c3c', bgColor: 'rgba(231,76,60,0.12)', alertLabel: 'ARME À FEU DÉTECTÉE' };
    if (hasViolence || hasKnife) return { status: 'ATTENTION', level: 'warning', color: '#f59e0b', bgColor: 'rgba(245,158,11,0.12)', alertLabel: hasViolence ? 'VIOLENCE DÉTECTÉE' : 'ARME BLANCHE' };

    return { status: 'SÛR', level: 'safe', color: '#27ae60', bgColor: 'rgba(39,174,96,0.12)' };
  };

  const baseZoneDetails = [
    { camId: 'CAM-1', name: 'Tribune Nord', zones: 'Zones 1-2', personnes: '842', code: '102', temperature: '22°C', cameras: '2' },
    { camId: 'CAM-2', name: 'Entrée Principale', zones: 'Zones 3-4', personnes: '315', code: '034', temperature: '26°C', cameras: '2' },
    { camId: 'CAM-115', name: 'Concourse Ouest', zones: 'Zones 5-6', personnes: '111', code: '011', temperature: '28°C', cameras: '2' },
    { camId: 'CAM-3', name: 'Tunnel Joueurs', zones: 'Zones 7-8', personnes: '290', code: '042', temperature: '29°C', cameras: '2' }
  ];

  const dynamicZoneDetails = baseZoneDetails.map(bz => {
    const zStat = getCamStatus(bz.camId);
    return {
      name: bz.name,
      subName: bz.zones,
      status: zStat.status === 'SÛR' ? 'OK' : zStat.status,
      statusColor: zStat.color,
      personnes: bz.personnes,
      code: bz.code,
      temperature: bz.temperature,
      cameras: bz.cameras,
      alert: zStat.alertLabel,
      isCritical: zStat.level === 'critical',
      isWarning: zStat.level === 'warning',
      lastUpdate: 'À l\'instant'
    };
  });

  // Take 5 most recent alerts for the live feed
  const recentAlerts = alerts.slice(0, 5);

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

                {/* Top row zones (1-2) - Tribune Nord */}
                {[1, 2].map(zoneNum => {
                  const zStat = getZoneStatus(zoneNum);
                  const x = 180 + (zoneNum - 1) * 135;
                  return (
                    <g key={`zone-${zoneNum}`}>
                      <rect x={x} y="45" width="105" height="65" rx="8" fill={zStat.bgColor} stroke={zStat.color} strokeWidth="1.5" />
                      <text x={x + 52.5} y="73" textAnchor="middle" fontSize="11" fill={zStat.color} fontWeight="700">ZONE {zoneNum}</text>
                      <text x={x + 52.5} y="90" textAnchor="middle" fontSize="9" fill={zStat.color}>{zStat.status}</text>
                    </g>
                  );
                })}

                {/* Right side zones (3-4) - Entrée Principale */}
                {[3, 4].map(zoneNum => {
                  const zStat = getZoneStatus(zoneNum);
                  const y = 135 + (zoneNum - 3) * 80;
                  return (
                    <g key={`zone-${zoneNum}`}>
                      <rect x="440" y={y} width="105" height="65" rx="8" fill={zStat.bgColor} stroke={zStat.color} strokeWidth="1.5" />
                      <text x={492.5} y={y + 28} textAnchor="middle" fontSize="11" fill={zStat.color} fontWeight="700">ZONE {zoneNum}</text>
                      <text x={492.5} y={y + 45} textAnchor="middle" fontSize="9" fill={zStat.color}>{zStat.status}</text>
                    </g>
                  );
                })}

                {/* Bottom row zones (5-6) - Tunnel Joueurs */}
                {[5, 6].map(zoneNum => {
                  const zStat = getZoneStatus(zoneNum);
                  // Render right-to-left or left-to-right? Let's do left-to-right: x=180, x=315
                  const x = 180 + (zoneNum - 5) * 135;
                  return (
                    <g key={`zone-${zoneNum}`}>
                      <rect x={x} y="290" width="105" height="65" rx="8" fill={zStat.bgColor} stroke={zStat.color} strokeWidth="1.5" />
                      <text x={x + 52.5} y="318" textAnchor="middle" fontSize="11" fill={zStat.color} fontWeight="700">ZONE {zoneNum}</text>
                      <text x={x + 52.5} y="335" textAnchor="middle" fontSize="9" fill={zStat.color}>{zStat.status}</text>
                    </g>
                  );
                })}

                {/* Left side zones (7-8) - Concourse Ouest */}
                {[7, 8].map(zoneNum => {
                  const zStat = getZoneStatus(zoneNum);
                  const y = 135 + (zoneNum - 7) * 80;
                  return (
                    <g key={`zone-${zoneNum}`}>
                      <rect x="55" y={y} width="105" height="65" rx="8" fill={zStat.bgColor} stroke={zStat.color} strokeWidth="1.5" />
                      <text x={107.5} y={y + 28} textAnchor="middle" fontSize="11" fill={zStat.color} fontWeight="700">ZONE {zoneNum}</text>
                      <text x={107.5} y={y + 45} textAnchor="middle" fontSize="9" fill={zStat.color}>{zStat.status}</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Live Alerts Feed — Connected to Backend */}
          <div className="surv-alerts-feed">
            <div className="surv-alerts-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className="surv-alerts-title">
                <Zap size={18} />
                <h3>Flux d'Alertes en Direct</h3>
                {alerts.length > 0 && <span className="surv-alerts-badge">{alerts.length}</span>}
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {alerts.length > 0 && (
                  <button 
                    onClick={() => clearAllAlerts()} 
                    style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}
                    title="Tout Effacer"
                  >
                    <Trash2 size={14} /> Vider
                  </button>
                )}
                <button className="see-all-link">Voir tous les enregistrements</button>
              </div>
            </div>
            <div className="surv-alerts-cards">
              {recentAlerts.length === 0 ? (
                <div className="surv-alert-card" style={{ justifyContent: 'center', opacity: 0.6 }}>
                  <div>
                    <div className="surv-alert-text">✅ Aucun incident détecté</div>
                    <div className="surv-alert-sub">Le système YOLO surveille en temps réel</div>
                  </div>
                </div>
              ) : (
                recentAlerts.map((alert) => {
                  const config = typeConfig[alert.weapon_type] || typeConfig.violence;
                  const Icon = config.icon;
                  return (
                    <div key={alert._id} className="surv-alert-card" style={{ position: 'relative' }}>
                      <button 
                        onClick={() => deleteAlert(alert._id)}
                        style={{ position: 'absolute', top: '8px', right: '8px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                        title="Supprimer"
                      >
                        <X size={14} />
                      </button>
                      <div className="surv-alert-main-content">
                        <div className="surv-alert-icon" style={{ background: alert.weapon_type === 'gun' ? '#e74c3c' : '#f39c12' }}>
                          <Icon size={20} color="white" />
                        </div>
                        <div className="surv-alert-details">
                          <div className="surv-alert-text">{config.label}</div>
                          <div className="surv-alert-sub">{alert.camera_id} · {new Date(alert.timestamp).toLocaleTimeString()}</div>
                        </div>
                      </div>
                      {alert.image_path && (
                        <div className="surv-alert-screenshot">
                          <img 
                            src={`http://${window.location.hostname}:5000/evidence/${alert.image_path}`} 
                            alt="Incident Evidence" 
                            className="surv-evidence-img"
                          />
                          <div className="screenshot-badge">PREUVE DIRECTE</div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right sidebar: zone details */}
        <div className="surveillance-side">
          <h3 className="zone-details-title">DÉTAILS DES ZONES</h3>
          {dynamicZoneDetails.map((zone, i) => (
            <div key={i} className={`zone-detail-card ${zone.isCritical ? 'critical' : ''} ${zone.isWarning ? 'warning' : ''}`}>
              <div className="zone-detail-header">
                <div>
                  <h4 style={{ margin: 0 }}>{zone.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: '#888', display: 'block', marginTop: '2px' }}>{zone.subName}</span>
                </div>
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
