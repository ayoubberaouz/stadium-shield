import React, { useState, useEffect } from 'react';
import { Grid3X3, List, Filter, X, Wifi, ZoomIn, ZoomOut, Circle, Maximize2, AlertTriangle, Play, Pause } from 'lucide-react';
import './Cameras.css';

const camerasData = [
  { id: 'CAM-1', zone: 'Zone 4 - Tribune Nord', status: 'ACTIVE', statusColor: '#27ae60', lastUpdate: 'À L\'INSTANT', badge: '4K DIRECT' },
  { id: 'CAM-2', zone: 'Zone 1 - Entrée Principale', status: 'ACTIVE', statusColor: '#27ae60', lastUpdate: 'À L\'INSTANT', badge: '4K DIRECT' },
  { id: 'CAM-3', zone: 'Zone 7 - Tunnel Joueurs', status: 'ACTIVE', statusColor: '#27ae60', lastUpdate: 'À L\'INSTANT', badge: '4K DIRECT' },
  { id: 'CAM-115', zone: 'Zone 3 - Concourse Ouest', status: 'INACTIF', statusColor: '#e74c3c', lastUpdate: 'IL Y A 5M', badge: 'HORS LIGNE' },
];

function Cameras() {
  const [selectedCam, setSelectedCam] = useState('CAM-1');
  const [inspectorOpen, setInspectorOpen] = useState(true);
  
  // State for individual cameras
  const [inspectionStates, setInspectionStates] = useState({});
  const [globalInspecting, setGlobalInspecting] = useState(true);

  // Fetch initial state from backend on mount
  useEffect(() => {
    fetch(`http://${window.location.hostname}:5000/api/inspection_status`)
      .then(res => res.json())
      .then(data => {
        setGlobalInspecting(data.active);
        const newStates = {};
        camerasData.forEach(c => {
           // If backend has specific state, use it. Otherwise use global.
           newStates[c.id] = data.states[c.id] !== undefined ? data.states[c.id] : data.active;
        });
        setInspectionStates(newStates);
      })
      .catch(err => console.error("Failed to load initial inspection state:", err));
  }, []);

  // Sync inspection state with Backend
  const toggleInspectionState = async (camId, newState) => {
    try {
      await fetch(`http://${window.location.hostname}:5000/api/inspection_status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: newState, camera_id: camId })
      });
      
      if (camId === 'ALL') {
        setGlobalInspecting(newState);
        const newStates = {};
        camerasData.forEach(c => newStates[c.id] = newState);
        setInspectionStates(newStates);
      } else {
        setInspectionStates(prev => ({ ...prev, [camId]: newState }));
      }
    } catch (err) {
      console.error("Backend Sync Error:", err);
      // Local fallback
      if (camId === 'ALL') {
        setGlobalInspecting(newState);
        const newStates = {};
        camerasData.forEach(c => newStates[c.id] = newState);
        setInspectionStates(newStates);
      } else {
        setInspectionStates(prev => ({ ...prev, [camId]: newState }));
      }
    }
  };

  return (
    <div className="cameras-page">
      <div className="cameras-content">
        <div className="cameras-header">
          <div>
            <h1>Surveillance des Caméras</h1>
            <div className="cameras-status-bar">
              <span className="cameras-online">
                <span className="online-dot"></span>
                24 SYSTÈMES EN LIGNE
              </span>
              <span className="cameras-latency">Toutes les zones répondent sous 12ms</span>
            </div>
          </div>
          <div className="cameras-toolbar">
            <button 
              className="cam-filter-btn" 
              onClick={() => toggleInspectionState('ALL', !globalInspecting)}
              style={globalInspecting ? { borderColor: '#e74c3c', color: '#e74c3c' } : { borderColor: '#27ae60', color: '#27ae60' }}
            >
              {globalInspecting ? <Pause size={16} /> : <Play size={16} />} 
              {globalInspecting ? 'Tout Suspendre' : 'Tout Démarrer'}
            </button>
            <button className="cam-tool-btn active"><Grid3X3 size={18} /></button>
            <button className="cam-tool-btn"><List size={18} /></button>
            <button className="cam-filter-btn"><Filter size={16} /> Filtrer les Zones</button>
          </div>
        </div>

        <div className="cameras-grid-main">
          {camerasData.map((cam) => (
            <div
              key={cam.id}
              className={`camera-card-main ${selectedCam === cam.id ? 'selected' : ''}`}
              onClick={() => { setSelectedCam(cam.id); setInspectorOpen(true); }}
            >
              <div className="camera-card-header">
                <div>
                  <h3>{cam.id}</h3>
                  <span className="camera-zone-label">{cam.zone}</span>
                </div>
                <span className="camera-badge-4k">{cam.badge}</span>
              </div>

              <div className="camera-feed-main">
                <svg viewBox="0 0 320 200" className="camera-feed-svg">
                  <defs>
                    <linearGradient id={`camGrad-${cam.id}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1a0a20" />
                      <stop offset="50%" stopColor="#2a1030" />
                      <stop offset="100%" stopColor="#1a0a20" />
                    </linearGradient>
                  </defs>
                  <rect width="320" height="200" fill={`url(#camGrad-${cam.id})`} />
                  {/* Stadium silhouette */}
                  <ellipse cx="160" cy="120" rx="130" ry="60" fill="none" stroke="#c0392b" strokeWidth="2" opacity="0.3" />
                  <ellipse cx="160" cy="120" rx="110" ry="50" fill="none" stroke="#e74c3c" strokeWidth="1" opacity="0.2" />
                  {/* Criss-cross pattern */}
                  {[...Array(12)].map((_, i) => (
                    <line key={`p1${i}`} x1={40 + i * 20} y1="70" x2={50 + i * 20} y2="140" stroke="#c0392b" strokeWidth="0.5" opacity="0.15" />
                  ))}
                  {[...Array(12)].map((_, i) => (
                    <line key={`p2${i}`} x1={50 + i * 20} y1="70" x2={40 + i * 20} y2="140" stroke="#e74c3c" strokeWidth="0.5" opacity="0.1" />
                  ))}
                  {/* Lights */}
                  {[80, 140, 200, 260].map((x, i) => (
                    <circle key={`l${i}`} cx={x} cy="160" r="2" fill="#ffd700" opacity="0.4" />
                  ))}
                </svg>
                {selectedCam === cam.id && inspectionStates[cam.id] && (
                    <div className="camera-live-indicator" style={{position: 'absolute', top: 10, right: 10, background: '#e74c3c', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold'}}>
                        EN COURS D'INSPECTION
                    </div>
                )}
                {selectedCam === cam.id && !inspectionStates[cam.id] && (
                    <div className="camera-live-indicator" style={{position: 'absolute', top: 10, right: 10, background: '#f59e0b', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold'}}>
                        INSPECTION EN PAUSE
                    </div>
                )}
                <div className="camera-status-overlay" style={{ color: cam.statusColor }}>
                  <span className="status-dot" style={{ background: cam.statusColor }}></span>
                  STATUT: {cam.status}
                </div>
              </div>

              <div className="camera-card-footer">
                <span className="camera-update" style={{ color: cam.statusColor === '#f59e0b' ? '#f59e0b' : '#6c5ce7' }}>
                  DERNIÈRE MISE À JOUR : {cam.lastUpdate}
                </span>
                <button className="camera-details-btn">Détails &gt;</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspector Panel */}
      {inspectorOpen && (
        <div className="inspector-panel">
          <div className="inspector-header">
            <h2>Inspecteur Système</h2>
            <button className="inspector-close" onClick={() => setInspectorOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="inspector-feed">
            <div className="inspector-feed-inner" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
              {selectedCam === 'CAM-115' ? (
                <div style={{ width: '100%', height: '100%', minHeight: '220px', background: '#1a0a20', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#e74c3c' }}>
                  FLUX HORS LIGNE
                </div>
              ) : !inspectionStates[selectedCam] ? (
                <div style={{ width: '100%', height: '100%', minHeight: '220px', background: '#1a0a20', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#888', gap: '15px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '1px' }}>INSPECTION EN PAUSE</div>
                  <button 
                    onClick={() => toggleInspectionState(selectedCam, true)} 
                    style={{ padding: '10px 20px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Circle size={14} fill="currentColor" /> Reprendre le flux
                  </button>
                </div>
              ) : (
                <img 
                  src={`http://${window.location.hostname}:5000/api/video_feed/${selectedCam}`} 
                  alt={`Flux en direct ${selectedCam}`} 
                  style={{ width: '100%', height: 'auto', display: 'block', minHeight: '220px', objectFit: 'cover' }}
                />
              )}
              
              <div className="inspector-rec" style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)'}}>
                <span className="rec-dot-insp"></span>
                REC <span className="rec-green">●</span> 01:24:05
              </div>
              <div className="inspector-meta">
                FLUX DIRECT 1080P | 60 FPS | {new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC
              </div>
            </div>
          </div>

          <div className="inspector-specs">
            <div className="inspector-specs-header">
              <span className="inspector-info-icon">ℹ</span>
              <div>
                <strong>Spécifications {selectedCam}</strong>
                <span className="inspector-cluster">CLUSTER MATÉRIEL ZONE 1</span>
              </div>
            </div>
            <div className="inspector-specs-grid">
              <div>
                <span className="spec-label">MODÈLE</span>
                <span className="spec-value">Sentry-X900</span>
              </div>
              <div>
                <span className="spec-label">ADRESSE IP</span>
                <span className="spec-value">192.168.1.82</span>
              </div>
            </div>
            <div className="inspector-location">
              <span className="spec-label">LOCALISATION</span>
              <span className="spec-value">Porte A, Niveau 0, Section 102</span>
            </div>
          </div>

          <div className="inspector-commands">
            <span className="commands-title">COMMANDES À DISTANCE</span>
            <div className="commands-grid">
              <button className="command-btn"><ZoomIn size={16} /> Zoom Avant</button>
              <button className="command-btn"><ZoomOut size={16} /> Zoom Arrière</button>
              <button 
                className="command-btn" 
                onClick={() => toggleInspectionState(selectedCam, !inspectionStates[selectedCam])}
                style={inspectionStates[selectedCam] ? { borderColor: '#e74c3c', color: '#e74c3c' } : { borderColor: '#27ae60', color: '#27ae60' }}
              >
                <Circle size={16} fill={inspectionStates[selectedCam] ? "#e74c3c" : "#27ae60"} color={inspectionStates[selectedCam] ? "#e74c3c" : "#27ae60"} /> 
                {inspectionStates[selectedCam] ? 'Arrêter Inspection' : 'Démarrer Inspection'}
              </button>
              <button className="command-btn"><Maximize2 size={16} /> Plein écran</button>
            </div>
          </div>

          <button className="inspector-alert-btn">
            <Wifi size={18} />
            ENVOYER UNE ALERTE SECTEUR
          </button>

          <div className="inspector-ai-card">
            <div className="inspector-ai-header">
              <AlertTriangle size={16} />
              <span>ANALYSE AI SENTINEL</span>
            </div>
            <p>La densité de foule actuelle est dans les paramètres de sécurité (0,4 p/m²). Aucune anomalie détectée dans le flux d'entrée.</p>
            <div className="inspector-ai-score">
              <span>SCORE DE CONFIANCE : 98.4%</span>
              <AlertTriangle size={14} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cameras;
