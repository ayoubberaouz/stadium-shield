import React, { useState } from 'react';
import { Grid3X3, List, Filter, X, Search as SearchIcon, Wifi, Eye, ZoomIn, ZoomOut, Circle, Maximize2, AlertTriangle, Zap } from 'lucide-react';
import './Cameras.css';

const camerasData = [
  { id: 'CAM-104', zone: 'Zone 4 - Tribune Nord', status: 'ACTIVE', statusColor: '#27ae60', lastUpdate: 'À L\'INSTANT', badge: '4K DIRECT' },
  { id: 'CAM-082', zone: 'Zone 1 - Entrée Principale', status: 'ACTIVE', statusColor: '#27ae60', lastUpdate: 'À L\'INSTANT', badge: '4K DIRECT', selected: true },
  { id: 'CAM-211', zone: 'Zone 7 - Tunnel Joueurs', status: 'ACTIVE', statusColor: '#27ae60', lastUpdate: 'IL Y A 2M', badge: '4K DIRECT' },
  { id: 'CAM-115', zone: 'Zone 3 - Concourse Ouest', status: 'ALERTE', statusColor: '#f59e0b', lastUpdate: 'IL Y A 5M', badge: '4K DIRECT' },
];

function Cameras() {
  const [selectedCam, setSelectedCam] = useState('CAM-082');
  const [inspectorOpen, setInspectorOpen] = useState(true);

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
            <div className="inspector-feed-inner">
              <svg viewBox="0 0 360 220" className="inspector-feed-svg">
                <defs>
                  <linearGradient id="inspGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#1a0a20" />
                    <stop offset="50%" stopColor="#2a1030" />
                    <stop offset="100%" stopColor="#1a0a20" />
                  </linearGradient>
                </defs>
                <rect width="360" height="220" fill="url(#inspGrad)" />
                <ellipse cx="180" cy="130" rx="140" ry="65" fill="none" stroke="#c0392b" strokeWidth="2" opacity="0.3" />
                {[...Array(15)].map((_, i) => (
                  <line key={`ip1${i}`} x1={30 + i * 20} y1="70" x2={40 + i * 20} y2="160" stroke="#c0392b" strokeWidth="0.5" opacity="0.15" />
                ))}
                {[...Array(15)].map((_, i) => (
                  <line key={`ip2${i}`} x1={40 + i * 20} y1="70" x2={30 + i * 20} y2="160" stroke="#e74c3c" strokeWidth="0.5" opacity="0.1" />
                ))}
              </svg>
              <div className="inspector-rec">
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
              <button className="command-btn"><Circle size={16} /> Enregistrer</button>
              <button className="command-btn"><Maximize2 size={16} /> Plein écran</button>
            </div>
          </div>

          <button className="inspector-alert-btn">
            <Wifi size={18} />
            ENVOYER UNE ALERTE SECTEUR
          </button>

          <div className="inspector-ai-card">
            <div className="inspector-ai-header">
              <Zap size={16} />
              <span>ANALYSE AI SENTINEL</span>
            </div>
            <p>La densité de foule actuelle est dans les paramètres de sécurité (0,4 p/m²). Aucune anomalie détectée dans le flux d'entrée.</p>
            <div className="inspector-ai-score">
              <span>SCORE DE CONFIANCE : 98.4%</span>
              <Zap size={14} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cameras;
