import React, { useState } from 'react';
import { Plus, Minus, Layers, Fan, Thermometer, Wind } from 'lucide-react';
import './StadiumMap.css';

function StadiumMap() {
  const [zoom, setZoom] = useState(1);

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

        <button className="layers-btn">
          <Layers size={14} />
          <span>COUCHES</span>
        </button>

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

            {/* Alert dot - red pulsing */}
            <circle cx="420" cy="170" r="6" fill="#e74c3c">
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="420" cy="170" r="12" fill="none" stroke="#e74c3c" strokeWidth="1.5" opacity="0.4">
              <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Sensor dots */}
            <circle cx="280" cy="380" r="5" fill="#3b82f6" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="480" cy="340" r="5" fill="#3b82f6" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.5;0.9" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="200" r="4" fill="#22c55e" opacity="0.8" />
            <circle cx="510" cy="280" r="4" fill="#22c55e" opacity="0.8" />
          </svg>
        </div>

        {/* Alert Banner */}
        <div className="map-alert-banner">
          <div className="alert-dot-pulse"></div>
          <div className="alert-banner-content">
            <div className="alert-banner-title">ALERTE ZONE B-14</div>
            <div className="alert-banner-text">
              Forte concentration de CO2 détectée dans le hall sud. Ventilateurs 88-92 réglés sur extraction max.
            </div>
          </div>
          <div className="alert-banner-stats">
            <div className="alert-stat">
              <Fan size={14} />
              <div>
                <span className="alert-stat-label">FANS</span>
                <span className="alert-stat-value">92%</span>
              </div>
            </div>
            <div className="alert-stat">
              <Wind size={14} />
              <div>
                <span className="alert-stat-label">O2</span>
                <span className="alert-stat-value">20.9%</span>
              </div>
            </div>
            <div className="alert-stat">
              <Thermometer size={14} />
              <div>
                <span className="alert-stat-label">TEMP</span>
                <span className="alert-stat-value">23°C</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StadiumMap;
