import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, Users, Radio, Bell } from 'lucide-react';
import { useAlerts } from '../useAlerts';
import { updateAlertStatus } from '../api';
import './Urgence.css';

const activityLog = [
  { id: 1, action: 'Séquence d\'évacuation initiée', time: 'Aujourd\'hui 14:23 • Système Réel', icon: Phone, color: '#27ae60' },
  { id: 2, action: 'Équipes de sécurité Alpha & Beta déployées', time: 'Aujourd\'hui 14:23 • Admin Niveau', icon: Users, color: '#6c5ce7' },
  { id: 3, action: 'Alarme incendie déclenchée manuellement', time: 'Aujourd\'hui 14:19 • Neuil', icon: Bell, color: '#e74c3c' },
  { id: 4, action: 'Capteurs en ligne - Zones 1-8 Contrôlés', time: 'Aujourd\'hui 14:00 • Contrôle Global', icon: Radio, color: '#999' },
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

function Urgence() {
  const { alerts } = useAlerts(3000);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeAlerts = alerts.filter(a => {
    if (a.status !== 'new' && a.status !== 'in_progress') return false;
    const alertTime = new Date(a.timestamp).getTime();
    return (currentTime - alertTime) < 35000;
  });

  let worstZoneNum = null;
  let worstAlert = null;
  let worstLevel = 0; // 0=safe, 1=warning, 2=critical

  const dynamicZones = [1, 2, 3, 4, 5, 6, 7, 8].map(zoneNum => {
    const camId = zoneMap[zoneNum];
    let statusObj = { status: 'SÉCURISÉ', color: '#27ae60', isCritical: false };
    
    if (camId) {
      const zoneAlerts = activeAlerts.filter(a => {
        if (a.camera_id !== camId) return false;
        const charCode = a._id.charCodeAt(a._id.length - 1);
        const isEvenZone = zoneNum % 2 === 0;
        const isEvenChar = charCode % 2 === 0;
        return isEvenZone !== isEvenChar;
      });
      
      if (zoneAlerts.length > 0) {
        const hasGun = zoneAlerts.some(a => a.weapon_type === 'gun');
        const hasKnife = zoneAlerts.some(a => a.weapon_type === 'knife');
        const hasViolence = zoneAlerts.some(a => a.weapon_type === 'violence');
        
        let level = 0;
        let activeA = zoneAlerts[0];
        
        if (hasGun) {
          statusObj = { status: 'DANGER', color: '#e74c3c', isCritical: true, alertLabel: 'ARME À FEU' };
          level = 2;
          activeA = zoneAlerts.find(a => a.weapon_type === 'gun');
        } else if (hasViolence || hasKnife) {
          statusObj = { status: 'AVERTISSEMENT', color: '#f59e0b', isCritical: false, alertLabel: hasViolence ? 'VIOLENCE' : 'ARME BLANCHE' };
          level = 1;
          activeA = zoneAlerts.find(a => a.weapon_type === 'violence' || a.weapon_type === 'knife');
        }
        
        if (level > worstLevel) {
          worstLevel = level;
          worstZoneNum = zoneNum;
          worstAlert = activeA;
        }
      }
    }
    
    return {
      id: zoneNum,
      name: `ZONE ${zoneNum}`,
      status: statusObj.status,
      statusColor: statusObj.color,
      isCritical: statusObj.isCritical,
      alertLabel: statusObj.alertLabel
    };
  });

  const zonesInRisk = dynamicZones.filter(z => z.status !== 'SÉCURISÉ').length;
  const isDispatched = worstAlert && worstAlert.status === 'in_progress';

  const handleDispatch = async () => {
    if (worstAlert && !isDispatched) {
      try {
        await updateAlertStatus(worstAlert._id, 'in_progress');
      } catch (e) {
        console.error("Failed to dispatch", e);
      }
    }
  };

  return (
    <div className="urgence-page">
      {/* Critical Alert Banner */}
      {worstAlert ? (
        <div className="urgence-critical-alert" style={{ background: worstLevel === 2 ? '#fdf0ed' : '#fff3cd', borderColor: worstLevel === 2 ? '#fadbd8' : '#ffe69c' }}>
          <div className="alert-content">
            <AlertTriangle size={28} color={worstLevel === 2 ? "#e74c3c" : "#f59e0b"} />
            <div className="alert-text">
              <h2 style={{ color: worstLevel === 2 ? "#c0392b" : "#b9770e" }}>
                ALERTE {worstLevel === 2 ? 'CRITIQUE' : 'ATTENTION'}: {worstAlert.weapon_type === 'gun' ? 'Arme à feu' : worstAlert.weapon_type === 'knife' ? 'Arme blanche' : 'Violence'} détectée en Zone {worstZoneNum}
              </h2>
              <p>Action immédiate requise. Les algorithmes d'analyse d'image (YOLO) signalent un incident de sécurité en cours.</p>
            </div>
          </div>
          <button className="alert-acknowledge-btn" style={{ background: worstLevel === 2 ? '#e74c3c' : '#f59e0b' }} onClick={() => setAcknowledged(!acknowledged)}>
            {acknowledged ? 'RÉCEPTIONNÉ' : 'ACCUSER RÉCEPTION'}
          </button>
        </div>
      ) : (
        <div className="urgence-critical-alert" style={{ background: '#e8f5e9', borderColor: '#c8e6c9' }}>
           <div className="alert-content">
            <AlertTriangle size={28} color="#27ae60" />
            <div className="alert-text">
              <h2 style={{ color: "#27ae60" }}>SYSTÈME SÉCURISÉ</h2>
              <p>Aucune alerte critique ou d'avertissement n'est actuellement détectée par l'IA dans les zones de surveillance.</p>
            </div>
          </div>
        </div>
      )}

      {/* Surveillance des Zones */}
      <div className="urgence-surveillance">
        <div className="surveillance-main">
          <div className="surveillance-header">
            <h2>Surveillance des Zones du Stade</h2>
            <span className="zone-count">8 Zones au total • {zonesInRisk} D'risque</span>
          </div>

          <div className="zones-grid">
            {dynamicZones.map((zone) => (
              <div key={zone.id} className={`zone-card ${zone.isCritical ? 'critical' : ''}`} style={{ borderColor: zone.statusColor }}>
                <div className="zone-card-indicator" style={{ background: zone.statusColor }}></div>
                <h4>{zone.name}</h4>
                <p className="zone-status" style={{ color: zone.statusColor }}>{zone.status}</p>
                {zone.alertLabel && <p className="zone-temp" style={{ color: zone.statusColor, fontSize: '0.8rem', fontWeight: 'bold' }}>{zone.alertLabel}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="thermal-map-card">
          <div className="thermal-header">
            <h3>EN DIRECT • ZONE {worstZoneNum || 'SÉCURISÉE'}</h3>
            <span className="thermal-subtitle">{worstAlert ? 'Détection IA' : 'Surveillance continue'}</span>
          </div>
          <div className="thermal-image" style={{ 
            background: worstAlert && worstAlert.image_path ? `url(http://localhost:5000/evidence/${worstAlert.image_path}) center/cover no-repeat` : '#1a1a2e' 
          }}>
            <div className="thermal-content" style={{ background: worstAlert ? 'rgba(0,0,0,0.7)' : 'rgba(39, 174, 96, 0.8)' }}>
              <span className="temp-display" style={{ fontSize: '1.5rem', color: worstLevel === 2 ? '#e74c3c' : worstLevel === 1 ? '#f59e0b' : '#fff' }}>
                {worstAlert ? (worstAlert.weapon_type === 'gun' ? 'ARME' : worstAlert.weapon_type === 'knife' ? 'COUTEAU' : 'VIOLENCE') : 'RAS'}
              </span>
              <span className="thermal-label">{worstAlert ? 'Menace identifiée' : 'Système nominal'}</span>
              <span className="thermal-status" style={{ color: worstLevel === 2 ? '#e74c3c' : worstLevel === 1 ? '#f59e0b' : '#fff' }}>
                {worstAlert ? '⚠ INTERVENTION REQUISE!' : '✅ TOUT EST NORMAL'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="urgence-actions">
        <div className="actions-header">
          <div>
            <h2>Actions d'urgence {worstZoneNum ? `- Zone ${worstZoneNum}` : ''}</h2>
            <p>Déploiement de sécurité sur site.</p>
          </div>
          <div className="urgence-severity">
            <AlertTriangle size={16} color={worstZoneNum ? '#e74c3c' : '#27ae60'} />
            <span style={{ color: worstZoneNum ? '#e74c3c' : '#27ae60' }}>{worstZoneNum ? 'HAUTE PRIORITÉ' : 'STANDBY'}</span>
          </div>
        </div>

        <div className="actions-grid" style={{ gridTemplateColumns: '1fr' }}>
          <button 
            className={`action-btn primary`} 
            style={{ 
              borderColor: isDispatched ? '#27ae60' : '#e74c3c', 
              color: 'white', 
              background: isDispatched ? '#27ae60' : '#e74c3c',
              opacity: worstZoneNum ? 1 : 0.6,
              cursor: (worstZoneNum && !isDispatched) ? 'pointer' : 'not-allowed',
              padding: '2rem',
              fontSize: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 'auto'
            }}
            onClick={handleDispatch}
            disabled={!worstZoneNum || isDispatched}
          >
            <div className="action-icon" style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
              {isDispatched ? '✅' : '🛡️'}
            </div>
            <span style={{ fontWeight: 'bold' }}>
              {isDispatched ? "ÉQUIPE DE SÉCURITÉ EN ROUTE / EN INTERVENTION" : "DÉPLOYER L'ÉQUIPE DE SÉCURITÉ"}
            </span>
            {isDispatched && (
               <span style={{ fontSize: '0.9rem', fontWeight: 'normal', marginTop: '10px', opacity: 0.9 }}>
                 L'équipe a reçu l'alerte sur son terminal. En attente de résolution.
               </span>
            )}
          </button>
        </div>
      </div>

      {/* Activity Log */}
      <div className="urgence-activity">
        <div className="activity-header">
          <h3>L'Journal d'activité</h3>
          <button type="button" className="view-all">Voir les journaux système complets</button>
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
