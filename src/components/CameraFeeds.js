import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './CameraFeeds.css';

const cameras = [
  { id: 'CAM 014', label: 'NORD', gradient: 'linear-gradient(135deg, #1a2332 0%, #2d3748 50%, #1e2d3d 100%)' },
  { id: 'CAM 082', label: 'TERRAIN', gradient: 'linear-gradient(135deg, #2d3748 0%, #1a2332 50%, #243548 100%)' },
];

function CameraFeeds() {
  return (
    <div className="camera-feeds-card">
      <div className="card-header">
        <h3>Flux Caméras</h3>
        <div className="camera-nav">
          <button className="cam-nav-btn">
            <ChevronLeft size={16} />
          </button>
          <button className="cam-nav-btn">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="cameras-grid">
        {cameras.map((cam) => (
          <div key={cam.id} className="camera-preview">
            <div className="camera-feed" style={{ background: cam.gradient }}>
              <div className="camera-static">
                {/* Stadium/field silhouette for NORD camera */}
                {cam.label === 'NORD' && (
                  <svg viewBox="0 0 160 120" className="camera-scene">
                    {/* Sky */}
                    <rect width="160" height="60" fill="#1a2332" />
                    {/* Stadium structure silhouette */}
                    <path d="M0,70 L20,55 L40,50 L60,48 L80,47 L100,48 L120,50 L140,55 L160,70 L160,120 L0,120 Z" fill="#2a3d52" />
                    {/* Field lights */}
                    <rect x="30" y="35" width="2" height="20" fill="#4a6888" />
                    <circle cx="31" cy="33" r="3" fill="#6a8aaa" opacity="0.6" />
                    <rect x="128" y="35" width="2" height="20" fill="#4a6888" />
                    <circle cx="129" cy="33" r="3" fill="#6a8aaa" opacity="0.6" />
                    {/* Field */}
                    <rect x="25" y="70" width="110" height="40" rx="2" fill="#2a5a3a" opacity="0.7" />
                    {/* Seats/crowd suggestion */}
                    {[0,1,2,3,4,5,6,7,8,9].map(i => (
                      <rect key={i} x={25 + i * 11} y="63" width="9" height="6" rx="1" fill="#3a5a7a" opacity="0.5" />
                    ))}
                  </svg>
                )}
                {/* Person/security silhouette for TERRAIN camera */}
                {cam.label === 'TERRAIN' && (
                  <svg viewBox="0 0 160 120" className="camera-scene">
                    {/* Dark background */}
                    <rect width="160" height="120" fill="#1a2332" />
                    {/* Corridor/tunnel */}
                    <rect x="20" y="10" width="120" height="100" rx="4" fill="#222d3d" />
                    {/* Person silhouette */}
                    <circle cx="80" cy="45" r="12" fill="#2a3d52" />
                    <path d="M68,58 L68,95 L75,95 L75,75 L85,75 L85,95 L92,95 L92,58 Z" fill="#2a3d52" />
                    {/* Ambient light */}
                    <rect x="60" y="15" width="40" height="3" rx="1" fill="#4a6888" opacity="0.3" />
                  </svg>
                )}
              </div>
              <div className="camera-rec">
                <span className="rec-dot"></span>
                REC
              </div>
              <div className="camera-timestamp">
                {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
            <span className="camera-label">{cam.id} - {cam.label}</span>
          </div>
        ))}
      </div>
      <button className="multi-view-btn">CONSOLE MULTI-VUES</button>
    </div>
  );
}

export default CameraFeeds;
