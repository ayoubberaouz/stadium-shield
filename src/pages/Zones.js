import React, { useState, useEffect } from 'react';
import { Users, Thermometer, LayoutGrid, Camera, Wind, Zap } from 'lucide-react';
import { useAlerts } from '../useAlerts';
import './Zones.css';

const baseZonesData = [
  { id: 1, name: 'Zone 1', code: '011', personnes: '1 240', temperature: '24°C', cameras: '12 Actives' },
  { id: 2, name: 'Zone 2', code: '014', personnes: '3 892', temperature: '28°C', cameras: '12 Actives' },
  { id: 3, name: 'Zone 3', code: '021', personnes: '5 102', temperature: '32°C', cameras: '8 Actives' },
  { id: 4, name: 'Zone 4', code: '009', personnes: '892', temperature: '22°C', cameras: '8 Actives' },
  { id: 5, name: 'Zone 5', code: '102', personnes: '4 110', temperature: '27°C', cameras: '15 Actives' },
  { id: 6, name: 'Zone 6', code: '088', personnes: '1 560', temperature: '23°C', cameras: '15 Actives' },
  { id: 7, name: 'Zone 7', code: '077', personnes: '1 020', temperature: '22°C', cameras: '6 Actives' },
  { id: 8, name: 'Zone 8', code: '064', personnes: '2 300', temperature: '24°C', cameras: '11 Actives' },
];

const densityData = [
  { zone: 'Z1', stable: 55, hausse: 25 },
  { zone: 'Z2', stable: 60, hausse: 35 },
  { zone: 'Z3', stable: 45, hausse: 50 },
  { zone: 'Z4', stable: 50, hausse: 20 },
  { zone: 'Z5', stable: 65, hausse: 40 },
  { zone: 'Z6', stable: 30, hausse: 55 },
  { zone: 'Z7', stable: 40, hausse: 15 },
  { zone: 'Z8', stable: 55, hausse: 25 },
];

function Zones() {
  const { alerts } = useAlerts(3000);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const maxBar = 100;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    if (!camId) return null;

    const recentAlertsForCam = alerts.filter(a => {
      if (a.status !== 'new' && a.status !== 'in_progress') return false;
      const alertTime = new Date(a.timestamp).getTime();
      
      const charCode = a._id.charCodeAt(a._id.length - 1);
      const isEvenZone = zoneNum % 2 === 0;
      const isEvenChar = charCode % 2 === 0;
      if (isEvenZone === isEvenChar) return false;

      return (currentTime - alertTime) < 35000 && a.camera_id === camId;
    });

    if (recentAlertsForCam.length === 0) return null;

    const hasGun = recentAlertsForCam.some(a => a.weapon_type === 'gun');
    const hasKnife = recentAlertsForCam.some(a => a.weapon_type === 'knife');
    const hasViolence = recentAlertsForCam.some(a => a.weapon_type === 'violence');

    if (hasGun) return { status: 'DANGER', isDanger: true, color: '#e74c3c', densite: 'Critique', alertMsg: 'ARME À FEU DÉTECTÉE' };
    if (hasViolence || hasKnife) return { status: 'AVERTISSEMENT', isWarning: true, color: '#f59e0b', densite: 'Élevée', alertMsg: hasViolence ? 'VIOLENCE DÉTECTÉE' : 'ARME BLANCHE' };
    return null;
  };

  const dynamicZonesData = baseZonesData.map(bz => {
    const stat = getZoneStatus(bz.id);
    if (!stat) {
      return {
        ...bz,
        status: 'OK',
        statusColor: '#27ae60',
        densite: 'Normale',
        densiteColor: '#27ae60',
        fumee: null,
      };
    }
    return {
      ...bz,
      status: stat.status,
      statusColor: stat.color,
      densite: stat.densite,
      densiteColor: stat.color,
      isDanger: stat.isDanger,
      isWarning: stat.isWarning,
      fumee: stat.alertMsg,
      fumeeColor: stat.color,
    };
  });

  // Recent alerts for the bottom feed
  const recentAlerts = alerts.filter(a => a.status === 'new' || a.status === 'in_progress').slice(0, 3);

  return (
    <div className="zones-page">
      <div className="zones-page-header">
        <div>
          <h1>Surveillance des Zones</h1>
          <p>Analyses de sécurité en temps réel et contrôle d'urgence pour les clusters de la Coupe du Monde 2030.</p>
        </div>
      </div>

      <div className="zones-grid">
        {dynamicZonesData.map((zone) => (
          <div key={zone.id} className={`zone-card ${zone.isDanger ? 'danger' : ''} ${zone.isWarning ? 'warning' : ''}`}>
            <div className="zone-card-top">
              <div>
                <h3>{zone.name}</h3>
                <span className="zone-code">CODE DE SÉCURITÉ: {zone.code}</span>
              </div>
              <span className="zone-badge" style={{ background: zone.statusColor }}>{zone.status}</span>
            </div>

            <div className="zone-card-stats">
              <div className="zone-stat-row">
                <Users size={16} className="zone-stat-icon" />
                <span className="zone-stat-name">Personnes</span>
                <span className="zone-stat-val">{zone.personnes}</span>
              </div>
              <div className="zone-stat-row">
                <Thermometer size={16} className="zone-stat-icon" />
                <span className="zone-stat-name">Température</span>
                <span className="zone-stat-val" style={{ color: zone.isDanger ? '#e74c3c' : undefined, fontWeight: zone.isDanger ? 700 : undefined }}>{zone.temperature}</span>
              </div>
              <div className="zone-stat-row">
                <LayoutGrid size={16} className="zone-stat-icon" />
                <span className="zone-stat-name">Densité de la foule</span>
                <span className="zone-stat-val" style={{ color: zone.densiteColor, fontWeight: 700 }}>{zone.densite}</span>
              </div>
              {zone.fumee && (
                <div className="zone-stat-row">
                  <Wind size={16} className="zone-stat-icon" />
                  <span className="zone-stat-name">Alerte IA</span>
                  <span className="zone-stat-val" style={{ color: zone.fumeeColor, fontWeight: 700 }}>{zone.fumee}</span>
                </div>
              )}
              {zone.cameras && (
                <div className="zone-stat-row">
                  <Camera size={16} className="zone-stat-icon" />
                  <span className="zone-stat-name">Caméras</span>
                  <span className="zone-stat-val">{zone.cameras}</span>
                </div>
              )}
            </div>

            <button className={`zone-card-btn ${zone.isDanger ? 'danger' : ''}`}>
              {zone.isDanger ? 'Réponse d\'urgence' : 'Voir les détails'}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="zones-bottom">
        <div className="density-chart-card">
          <div className="density-chart-header">
            <h3>Densité Globale du Stade</h3>
            <div className="density-legend">
              <span className="legend-item"><span className="legend-dot" style={{ background: '#27ae60' }}></span> Stable</span>
              <span className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }}></span> En hausse</span>
            </div>
          </div>
          <div className="density-bars">
            {densityData.map((d, i) => (
              <div key={i} className="density-bar-group">
                <div className="density-bar-container">
                  <div className="density-bar stable" style={{ height: `${(d.stable / maxBar) * 160}px` }}></div>
                  <div className="density-bar hausse" style={{ height: `${(d.hausse / maxBar) * 160}px` }}></div>
                </div>
                <span className="density-bar-label">{d.zone}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="live-alert-feed-card">
          <div className="live-feed-header">
            <Zap size={18} color="#6c5ce7" />
            <div>
              <h3>Flux d'Alertes en Direct</h3>
              <p>Déclenchements en temps réel des capteurs caméra IA.</p>
            </div>
          </div>
          <div className="live-feed-items">
            {recentAlerts.length === 0 ? (
              <div style={{ color: '#888', padding: '1rem 0' }}>✅ Aucun incident actif. Le système est dégagé.</div>
            ) : (
              recentAlerts.map(alert => {
                const isCritical = alert.weapon_type === 'gun';
                const label = isCritical ? 'Arme à feu détectée' : (alert.weapon_type === 'knife' ? 'Arme blanche détectée' : 'Violence détectée');
                return (
                  <div key={alert._id} className={`live-feed-item ${isCritical ? 'danger' : 'warning'}`}>
                    <span className={`feed-dot ${isCritical ? 'danger' : 'warning'}`}></span>
                    <div>
                      <strong>{alert.camera_id} :</strong> {label}. Intervention recommandée.
                      <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '2px' }}>
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Zones;
