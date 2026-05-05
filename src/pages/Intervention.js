import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { useAlerts } from '../useAlerts';
import { updateAlertStatus, getEvidenceUrl, toggleCameraInspection } from '../api';
import './Intervention.css';

function formatTimestamp(iso) {
  if (!iso) return '--:--';
  const d = new Date(iso);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function Intervention() {
  const { alerts } = useAlerts(3000);

  // Find alerts that are actively assigned to security (in_progress)
  const inProgressAlerts = alerts.filter(a => a.status === 'in_progress');
  
  // For simplicity, just pick the first one if there are multiple
  const activeAlert = inProgressAlerts[0];

  const handleFinish = async () => {
    if (activeAlert) {
      try {
        // Stop the camera from inspecting automatically
        await toggleCameraInspection(activeAlert.camera_id, false);
        // Mark alert as resolved
        await updateAlertStatus(activeAlert._id, 'resolved');
      } catch (e) {
        console.error("Failed to resolve", e);
      }
    }
  };

  if (!activeAlert) {
    return (
      <div className="intervention-page">
        <div className="intervention-header">
          <h1>Terminal Sécurité</h1>
          <p>En attente d'instructions du centre de contrôle...</p>
        </div>
        <div className="intervention-card intervention-empty">
          <CheckCircle size={64} color="#27ae60" style={{ margin: '0 auto' }} />
          <h2>AUCUNE INTERVENTION EN COURS</h2>
          <p style={{ color: '#999', marginTop: '10px' }}>Restez en position. Le système surveille les zones.</p>
        </div>
      </div>
    );
  }

  const threatLabel = activeAlert.weapon_type === 'gun' ? 'Arme à feu' : activeAlert.weapon_type === 'knife' ? 'Arme blanche' : 'Violence';

  return (
    <div className="intervention-page">
      <div className="intervention-header">
        <h1>Terminal Sécurité</h1>
        <p>Intervention immédiate requise</p>
      </div>
      
      <div className="intervention-card">
        <div className="intervention-details">
          <h2 style={{ color: '#e74c3c' }}><ShieldAlert size={28} /> ALERTE DÉPLOYÉE</h2>
          
          <img 
            src={getEvidenceUrl(activeAlert.image_path)} 
            alt="Incident" 
            className="intervention-image" 
          />
          
          <div className="intervention-info-row">
            <span>Type de menace :</span>
            <span style={{ color: '#e74c3c' }}>{threatLabel.toUpperCase()}</span>
          </div>
          <div className="intervention-info-row">
            <span>Localisation :</span>
            <span>Caméra {activeAlert.camera_id}</span>
          </div>
          <div className="intervention-info-row">
            <span>Heure de détection :</span>
            <span>{formatTimestamp(activeAlert.timestamp)}</span>
          </div>
          <div className="intervention-info-row">
            <span>Statut :</span>
            <span style={{ color: '#f59e0b' }}>EN COURS D'INTERVENTION</span>
          </div>
        </div>

        <button className="finish-btn" onClick={handleFinish}>
          <CheckCircle size={24} />
          TERMINER L'INTERVENTION
        </button>
      </div>
    </div>
  );
}

export default Intervention;
