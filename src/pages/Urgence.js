import React from 'react';
import { AlertTriangle, Phone, Shield, Users, Siren, MapPin, Radio, Clock } from 'lucide-react';
import './Urgence.css';

const protocols = [
  { id: 1, name: 'Évacuation Générale', level: 'NIVEAU 3', color: '#e74c3c', icon: Siren, desc: 'Évacuation complète du stade via toutes les sorties.' },
  { id: 2, name: 'Évacuation Partielle', level: 'NIVEAU 2', color: '#f59e0b', icon: MapPin, desc: 'Évacuation ciblée de zones spécifiques.' },
  { id: 3, name: 'Confinement', level: 'NIVEAU 1', color: '#3b82f6', icon: Shield, desc: 'Confinement sur place - verrouillage des accès.' },
  { id: 4, name: 'Alerte Médicale', level: 'URGENCE', color: '#e74c3c', icon: Phone, desc: 'Déploiement des équipes médicales d\'urgence.' },
];

const teams = [
  { name: 'Équipe Alpha', zone: 'Zone 1-2', status: 'En position', statusColor: '#27ae60', members: 8 },
  { name: 'Équipe Bravo', zone: 'Zone 3-4', status: 'En déplacement', statusColor: '#f59e0b', members: 6 },
  { name: 'Équipe Charlie', zone: 'Zone 5-6', status: 'En intervention', statusColor: '#e74c3c', members: 10 },
  { name: 'Équipe Delta', zone: 'Zone 7-8', status: 'En position', statusColor: '#27ae60', members: 7 },
];

function Urgence() {
  return (
    <div className="urgence-page">
      <div className="urgence-header">
        <div>
          <h1>Centre d'Urgence</h1>
          <p>Protocoles d'urgence et coordination des équipes de sécurité.</p>
        </div>
        <button className="urgence-panic-btn">
          <AlertTriangle size={18} />
          ACTIVER PROTOCOLE D'URGENCE
        </button>
      </div>

      <div className="urgence-status-bar">
        <div className="urgence-status-item">
          <Clock size={16} />
          <span>Dernière vérification : il y a 2 min</span>
        </div>
        <div className="urgence-status-item">
          <Radio size={16} />
          <span>Communications : Opérationnelles</span>
        </div>
        <div className="urgence-status-item ok">
          <Shield size={16} />
          <span>Statut : Normal</span>
        </div>
      </div>

      <div className="urgence-grid">
        <div className="urgence-protocols">
          <h2>Protocoles d'Urgence</h2>
          <div className="protocols-list">
            {protocols.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="protocol-card">
                  <div className="protocol-icon" style={{ background: `${p.color}15`, color: p.color }}>
                    <Icon size={22} />
                  </div>
                  <div className="protocol-info">
                    <div className="protocol-title-row">
                      <strong>{p.name}</strong>
                      <span className="protocol-level" style={{ color: p.color, borderColor: p.color }}>{p.level}</span>
                    </div>
                    <p>{p.desc}</p>
                  </div>
                  <button className="protocol-activate-btn" style={{ borderColor: p.color, color: p.color }}>Activer</button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="urgence-teams">
          <h2>Équipes de Sécurité</h2>
          <div className="teams-list">
            {teams.map((t, i) => (
              <div key={i} className="team-card">
                <div className="team-header">
                  <strong>{t.name}</strong>
                  <span className="team-status" style={{ color: t.statusColor }}>
                    <span className="team-status-dot" style={{ background: t.statusColor }}></span>
                    {t.status}
                  </span>
                </div>
                <div className="team-details">
                  <span><MapPin size={14} /> {t.zone}</span>
                  <span><Users size={14} /> {t.members} membres</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Urgence;
