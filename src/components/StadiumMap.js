import React, { useState, useMemo, useEffect } from 'react';
import { Plus, Minus, Layers, Fan, Thermometer, Wind, Users } from 'lucide-react';
import './StadiumMap.css';

function StadiumMap({ alerts = [] }) {
  const [zoom, setZoom] = useState(1);
  const [showPoints, setShowPoints] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [inspectionData, setInspectionData] = useState({ active: false, states: {} });

  useEffect(() => {
    const fetchStatus = () => {
      fetch(`http://${window.location.hostname}:5000/api/inspection_status`)
        .then(res => res.json())
        .then(data => setInspectionData(data))
        .catch(() => {});
    };

    fetchStatus(); // initial fetch
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
      fetchStatus();
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Generate random fan coordinates for realism
  const fans = useMemo(() => {
    const points = [];
    // Zone NORD (CAM-1)
    for(let i=0; i<300; i++) points.push({ id: `n${i}`, zone: 'CAM-1', x: 200 + Math.random()*300, y: 70 + Math.random()*60 });
    // Zone EST (CAM-2)
    for(let i=0; i<150; i++) points.push({ id: `e${i}`, zone: 'CAM-2', x: 550 + Math.random()*70, y: 130 + Math.random()*220 });
    // Zone OUEST (CAM-3) 
    for(let i=0; i<160; i++) points.push({ id: `w${i}`, zone: 'CAM-3', x: 80 + Math.random()*70, y: 130 + Math.random()*220 });
    // Zone SUD (CAM-4) - We don't have CAM-4 explicitely assigned but we add it for layout
    for(let i=0; i<320; i++) points.push({ id: `s${i}`, zone: 'CAM-4', x: 200 + Math.random()*300, y: 350 + Math.random()*60 });
    return points;
  }, []);

  // Determine active alerts and map to specific camera anchors
  const activeAlerts = useMemo(() => {
    const recentAlerts = alerts.filter(a => {
      if (a.status !== 'new' && a.status !== 'in_progress') return false;
      const alertTime = new Date(a.timestamp).getTime();
      if ((currentTime - alertTime) >= 35000) return false; // Must be recent

      // If camera is paused, hide its red dot immediately
      const isCamActive = inspectionData.states[a.camera_id] !== undefined
        ? inspectionData.states[a.camera_id]
        : inspectionData.active;
        
      return isCamActive;
    });
    
    // Group by camera_id so we only draw one dot per camera
    const uniqueByCamera = [];
    const seenCams = new Set();
    
    recentAlerts.forEach(alert => {
      if (!seenCams.has(alert.camera_id)) {
        seenCams.add(alert.camera_id);
        uniqueByCamera.push(alert);
      }
    });
    return uniqueByCamera;
  }, [alerts, currentTime, inspectionData]);

  const alertZones = activeAlerts.map(a => a.camera_id);

  const getAlertAnchor = (camId) => {
    switch (camId) {
      case 'CAM-1': return { x: 350, y: 100, zoneName: "Tribune Nord" };
      case 'CAM-2': return { x: 585, y: 240, zoneName: "Tribune Est" };
      case 'CAM-3': return { x: 115, y: 240, zoneName: "Tribune Ouest" };
      case 'CAM-4': return { x: 350, y: 380, zoneName: "Tribune Sud" };
      default: return null;
    }
  };

  return (
    <div className="stadium-map-card">
      <div className="map-container">
        <div className="map-controls">
          <button className="map-ctrl-btn" onClick={() => setZoom(z => Math.min(z + 0.1, 1.5))}>
            <Plus size={18} />
          </button>
          <button className="map-ctrl-btn" onClick={() => setZoom(z => Math.max(z - 0.1, 0.7))}>
            <Minus size={18} />
          </button>
        </div>

        <div className="map-toolbar">
          <button className={`layers-btn ${showPoints ? 'active' : ''}`} onClick={() => setShowPoints(!showPoints)}>
            <Users size={14} />
            <span>MODE POINTS FANS</span>
          </button>
        </div>

        <div className="stadium-svg-wrapper" style={{ transform: `scale(${zoom})` }}>
          <svg viewBox="0 0 700 480" className="stadium-svg">
            <defs>
              {/* Gradient for the surrounding area */}
              <radialGradient id="bgGrad" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#3a4a5c" />
                <stop offset="100%" stopColor="#1a2332" />
              </radialGradient>
              {/* Grass gradient */}
              <linearGradient id="grassGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a6b3a" />
                <stop offset="50%" stopColor="#348a48" />
                <stop offset="100%" stopColor="#2a6b3a" />
              </linearGradient>
              {/* Stand gradients */}
              <linearGradient id="standNorth" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#3d5a7a" />
                <stop offset="100%" stopColor="#2a4060" />
              </linearGradient>
              <linearGradient id="standSouth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3d5a7a" />
                <stop offset="100%" stopColor="#2a4060" />
              </linearGradient>
              <linearGradient id="standEast" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3d5a7a" />
                <stop offset="100%" stopColor="#2a4060" />
              </linearGradient>
              <linearGradient id="standWest" x1="1" y1="0" x2="0" y2="0">
                <stop offset="0%" stopColor="#3d5a7a" />
                <stop offset="100%" stopColor="#2a4060" />
              </linearGradient>
              {/* Shadow filter */}
              <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.3" />
              </filter>
              <filter id="innerGlow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                <feFlood floodColor="#4a9a5f" floodOpacity="0.2" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background */}
            <rect width="700" height="480" fill="url(#bgGrad)" />

            {/* Outer stadium structure - roof/exterior ring */}
            <ellipse cx="350" cy="240" rx="310" ry="210" fill="#1e2d3d" stroke="#2a3d52" strokeWidth="3" />

            {/* Outer walkway ring */}
            <ellipse cx="350" cy="240" rx="295" ry="198" fill="#243548" stroke="#2a3d52" strokeWidth="1" />

            {/* Stadium seating sections - creating rows of seats effect */}
            {/* North Stand - upper tier */}
            <path d="M120,95 Q350,15 580,95 L560,120 Q350,50 140,120 Z" fill="#344e68" stroke="#3d5a7a" strokeWidth="0.5" />
            {/* North Stand - middle tier */}
            <path d="M140,120 Q350,50 560,120 L540,145 Q350,80 160,145 Z" fill="#3a5878" stroke="#4a6a8a" strokeWidth="0.5" />
            {/* North Stand - lower tier */}
            <path d="M160,145 Q350,80 540,145 L520,168 Q350,108 180,168 Z" fill="#406288" stroke="#5077a0" strokeWidth="0.5" />

            {/* South Stand - upper tier */}
            <path d="M120,385 Q350,465 580,385 L560,360 Q350,430 140,360 Z" fill="#344e68" stroke="#3d5a7a" strokeWidth="0.5" />
            {/* South Stand - middle tier */}
            <path d="M140,360 Q350,430 560,360 L540,335 Q350,400 160,335 Z" fill="#3a5878" stroke="#4a6a8a" strokeWidth="0.5" />
            {/* South Stand - lower tier */}
            <path d="M160,335 Q350,400 540,335 L520,312 Q350,372 180,312 Z" fill="#406288" stroke="#5077a0" strokeWidth="0.5" />

            {/* East Stand - upper tier */}
            <path d="M605,95 Q680,240 605,385 L580,370 Q648,240 580,110 Z" fill="#344e68" stroke="#3d5a7a" strokeWidth="0.5" />
            {/* East Stand - middle tier */}
            <path d="M580,110 Q648,240 580,370 L558,352 Q618,240 558,128 Z" fill="#3a5878" stroke="#4a6a8a" strokeWidth="0.5" />
            {/* East Stand - lower tier */}
            <path d="M558,128 Q618,240 558,352 L538,335 Q592,240 538,145 Z" fill="#406288" stroke="#5077a0" strokeWidth="0.5" />

            {/* West Stand - upper tier */}
            <path d="M95,95 Q20,240 95,385 L120,370 Q52,240 120,110 Z" fill="#344e68" stroke="#3d5a7a" strokeWidth="0.5" />
            {/* West Stand - middle tier */}
            <path d="M120,110 Q52,240 120,370 L142,352 Q82,240 142,128 Z" fill="#3a5878" stroke="#4a6a8a" strokeWidth="0.5" />
            {/* West Stand - lower tier */}
            <path d="M142,128 Q82,240 142,352 L162,335 Q108,240 162,145 Z" fill="#406288" stroke="#5077a0" strokeWidth="0.5" />

            {/* Seat row lines - North */}
            {[0, 1, 2, 3, 4].map(i => (
              <path key={`ns${i}`} d={`M${150 + i * 8},${140 - i * 8} Q350,${75 - i * 12} ${550 - i * 8},${140 - i * 8}`}
                fill="none" stroke="#4a6888" strokeWidth="0.3" opacity="0.5" />
            ))}
            {/* Seat row lines - South */}
            {[0, 1, 2, 3, 4].map(i => (
              <path key={`ss${i}`} d={`M${150 + i * 8},${340 + i * 8} Q350,${405 + i * 12} ${550 - i * 8},${340 + i * 8}`}
                fill="none" stroke="#4a6888" strokeWidth="0.3" opacity="0.5" />
            ))}

            {/* Corner fills - connecting the stands */}
            <path d="M162,145 Q140,140 142,128 L120,110 Q105,100 95,95 L120,95 Q130,120 162,145" fill="#304860" opacity="0.8" />
            <path d="M538,145 Q560,140 558,128 L580,110 Q595,100 605,95 L580,95 Q570,120 538,145" fill="#304860" opacity="0.8" />
            <path d="M162,335 Q140,340 142,352 L120,370 Q105,380 95,385 L120,385 Q130,360 162,335" fill="#304860" opacity="0.8" />
            <path d="M538,335 Q560,340 558,352 L580,370 Q595,380 605,385 L580,385 Q570,360 538,335" fill="#304860" opacity="0.8" />

            {/* Inner field area with shadow */}
            <rect x="170" y="150" width="360" height="180" rx="4" fill="url(#grassGrad)" filter="url(#shadow)" />

            {/* Grass stripe pattern */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
              <rect key={`grass${i}`} x={170 + i * 45} y="150" width="45" height="180"
                fill={i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} />
            ))}

            {/* Field markings */}
            {/* Outer boundary */}
            <rect x="178" y="156" width="344" height="168" rx="2" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
            {/* Center line */}
            <line x1="350" y1="156" x2="350" y2="324" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
            {/* Center circle */}
            <circle cx="350" cy="240" r="32" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
            <circle cx="350" cy="240" r="2.5" fill="rgba(255,255,255,0.5)" />

            {/* Left penalty area */}
            <rect x="178" y="192" width="52" height="96" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" rx="1" />
            {/* Left goal area */}
            <rect x="178" y="214" width="22" height="52" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" rx="1" />
            {/* Left goal */}
            <rect x="172" y="228" width="6" height="24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            {/* Left penalty spot */}
            <circle cx="212" cy="240" r="1.5" fill="rgba(255,255,255,0.4)" />
            {/* Left penalty arc */}
            <path d="M230,215 A32,32 0 0,1 230,265" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />

            {/* Right penalty area */}
            <rect x="470" y="192" width="52" height="96" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" rx="1" />
            {/* Right goal area */}
            <rect x="500" y="214" width="22" height="52" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" rx="1" />
            {/* Right goal */}
            <rect x="522" y="228" width="6" height="24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            {/* Right penalty spot */}
            <circle cx="488" cy="240" r="1.5" fill="rgba(255,255,255,0.4)" />
            {/* Right penalty arc */}
            <path d="M470,215 A32,32 0 0,0 470,265" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />

            {/* Corner arcs */}
            <path d="M178,162 A6,6 0 0,1 184,156" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <path d="M516,156 A6,6 0 0,1 522,162" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <path d="M178,318 A6,6 0 0,0 184,324" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
            <path d="M516,324 A6,6 0 0,0 522,318" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />

            {/* Stadium lights/towers at corners */}
            <rect x="85" y="75" width="6" height="6" rx="1" fill="#5a7a9a" opacity="0.6" />
            <rect x="609" y="75" width="6" height="6" rx="1" fill="#5a7a9a" opacity="0.6" />
            <rect x="85" y="399" width="6" height="6" rx="1" fill="#5a7a9a" opacity="0.6" />
            <rect x="609" y="399" width="6" height="6" rx="1" fill="#5a7a9a" opacity="0.6" />

            {/* FANS (POINTS MODE) */}
            {showPoints && fans.map(fan => {
              // Si la zone est en alerte, créer un cluster rouge (heatmap feeling) vers le centre de l'anomalie
              const isAlertZone = alertZones.includes(fan.zone);
              const anchor = getAlertAnchor(fan.zone);
              let color = "rgba(41, 128, 185, 0.4)"; // Default blue/gray fan

              // Make fans near the alert center glow red
              if (isAlertZone && anchor) {
                const dist = Math.hypot(fan.x - anchor.x, fan.y - anchor.y);
                if (dist < 35) {
                   color = "rgba(231, 76, 60, 0.9)"; // Red
                } else if (dist < 60) {
                   color = "rgba(230, 126, 34, 0.7)"; // Orange
                }
              }

              return <circle key={fan.id} cx={fan.x} cy={fan.y} r={1.2} fill={color} />;
            })}

            {/* DYNAMIC ALERT RENDERING (Red pulsing dot) */}
            {activeAlerts.map(alert => {
              const anchor = getAlertAnchor(alert.camera_id);
              if (!anchor) return null;
              
              return (
                <g key={alert._id}>
                  {/* Central solid dot */}
                  <circle cx={anchor.x} cy={anchor.y} r="6" fill="#e74c3c">
                    <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
                  </circle>
                  {/* Outer pulse */}
                  <circle cx={anchor.x} cy={anchor.y} r="18" fill="none" stroke="#e74c3c" strokeWidth="1.5" opacity="0.4">
                    <animate attributeName="r" values="10;30;10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}

          </svg>
        </div>

        {/* Dynamic Alert Banner based on Real Data */}
        {activeAlerts.length > 0 ? (
          activeAlerts.map((alert, index) => {
            const anchor = getAlertAnchor(alert.camera_id);
            if (index > 0) return null; // Show only the first alert banner on top of map
            return (
              <div key={`banner-${alert._id}`} className="map-alert-banner">
                <div className="alert-dot-pulse"></div>
                <div className="alert-banner-content">
                  <div className="alert-banner-title">ALERTE {anchor ? anchor.zoneName.toUpperCase() : alert.camera_id}</div>
                  <div className="alert-banner-text">
                    INCIDENT ({alert.weapon_type.toUpperCase()}) DÉTECTÉ SUR {alert.camera_id}. Le protocole de sécurité est recommandé. Focus vidéo activé.
                  </div>
                </div>
                <div className="alert-banner-stats">
                  <div className="alert-stat">
                    <Users size={14} />
                    <div>
                      <span className="alert-stat-label">DENSITÉ</span>
                      <span className="alert-stat-value">ELEVÉE</span>
                    </div>
                  </div>
                  <div className="alert-stat">
                    <Thermometer size={14} />
                    <div>
                      <span className="alert-stat-label">RISQUE</span>
                      <span className="alert-stat-value">CRITIQUE</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="map-alert-banner" style={{background: 'rgba(39, 174, 96, 0.9)'}}>
            <div className="alert-dot-pulse" style={{backgroundColor: '#fff', animation: 'none'}}></div>
            <div className="alert-banner-content">
               <div className="alert-banner-title" style={{color: '#fff'}}>SYSTÈME DÉGAGÉ</div>
               <div className="alert-banner-text" style={{color: '#e0e0e0'}}>Aucun incident actif dans les zones de surveillance.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StadiumMap;
