import React from 'react';
import { Users, Thermometer, LayoutGrid, Camera, Wind, Zap } from 'lucide-react';
import './Zones.css';

const zonesData = [
  {
    id: 1, name: 'Zone 1', code: '011', status: 'OK', statusColor: '#27ae60',
    personnes: '1 240', temperature: '24°C', densite: 'Normale', densiteColor: '#27ae60',
    fumee: null, cameras: '12 Actives',
  },
  {
    id: 2, name: 'Zone 2', code: '014', status: 'AVERTISSEMENT', statusColor: '#f59e0b',
    personnes: '3 892', temperature: '28°C', densite: 'Élevée', densiteColor: '#f59e0b',
    fumee: 'Non', cameras: null,
  },
  {
    id: 3, name: 'Zone 3', code: '021', status: 'DANGER', statusColor: '#e74c3c',
    personnes: '5 102', temperature: '32°C', densite: 'Critique', densiteColor: '#e74c3c',
    fumee: 'Oui (Nord)', fumeeColor: '#e74c3c', cameras: null,
    isDanger: true,
  },
  {
    id: 4, name: 'Zone 4', code: '009', status: 'OK', statusColor: '#27ae60',
    personnes: '892', temperature: '22°C', densite: 'Normale', densiteColor: '#27ae60',
    fumee: null, cameras: '8 Actives',
  },
  {
    id: 5, name: 'Zone 5', code: '102', status: 'AVERTISSEMENT', statusColor: '#f59e0b',
    personnes: '4 110', temperature: '27°C', densite: 'Élevée', densiteColor: '#f59e0b',
    fumee: null, cameras: '15 Actives',
  },
  {
    id: 6, name: 'Zone 6', code: '088', status: 'OK', statusColor: '#27ae60',
    personnes: '1 560', temperature: '23°C', densite: 'Normale', densiteColor: '#27ae60',
    fumee: null, cameras: '9 Actives',
  },
  {
    id: 7, name: 'Zone 7', code: '077', status: 'OK', statusColor: '#27ae60',
    personnes: '1 020', temperature: '22°C', densite: 'Normale', densiteColor: '#27ae60',
    fumee: null, cameras: '6 Actives',
  },
  {
    id: 8, name: 'Zone 8', code: '064', status: 'OK', statusColor: '#27ae60',
    personnes: '2 300', temperature: '24°C', densite: 'Normale', densiteColor: '#27ae60',
    fumee: null, cameras: '11 Actives',
  },
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
  const maxBar = 100;

  return (
    <div className="zones-page">
      <div className="zones-page-header">
        <div>
          <h1>Surveillance des Zones</h1>
          <p>Analyses de sécurité en temps réel et contrôle d'urgence pour les clusters de la Coupe du Monde 2030.</p>
        </div>
      </div>

      <div className="zones-grid">
        {zonesData.map((zone) => (
          <div key={zone.id} className={`zone-card ${zone.isDanger ? 'danger' : ''} ${zone.status === 'AVERTISSEMENT' ? 'warning' : ''}`}>
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
              {zone.fumee !== null && zone.fumee !== undefined && (
                <div className="zone-stat-row">
                  <Wind size={16} className="zone-stat-icon" />
                  <span className="zone-stat-name">Fumée</span>
                  <span className="zone-stat-val" style={{ color: zone.fumeeColor || '#1a1a2e', fontWeight: zone.fumeeColor ? 700 : undefined }}>{zone.fumee}</span>
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
            <div className="live-feed-item warning">
              <span className="feed-dot warning"></span>
              <div>
                <strong>Zone 5 :</strong> Accumulation de foule à l'entrée B-12. Capacité proche de 85 %.
              </div>
            </div>
            <div className="live-feed-item danger">
              <span className="feed-dot danger"></span>
              <div>
                <strong>Zone 3 :</strong> Capteur thermique déclenché à la concession A. Équipe d'urgence notifiée.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Zones;
