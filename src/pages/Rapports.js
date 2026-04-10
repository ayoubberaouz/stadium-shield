import React from 'react';
import { FileText, Download, Calendar, BarChart3, TrendingUp, Clock } from 'lucide-react';
import './Rapports.css';

const reports = [
  { id: 1, title: 'Rapport de Sécurité Quotidien', date: '09 Avr 2026', type: 'Automatique', status: 'Complété', icon: FileText, iconColor: '#6c5ce7' },
  { id: 2, title: 'Analyse de Densité de Foule', date: '08 Avr 2026', type: 'Analytique', status: 'Complété', icon: BarChart3, iconColor: '#3b82f6' },
  { id: 3, title: 'Rapport d\'Incident - Zone 5', date: '08 Avr 2026', type: 'Incident', status: 'En révision', icon: TrendingUp, iconColor: '#f59e0b' },
  { id: 4, title: 'Performance Capteurs Hebdomadaire', date: '07 Avr 2026', type: 'Automatique', status: 'Complété', icon: FileText, iconColor: '#6c5ce7' },
  { id: 5, title: 'Audit de Conformité Mensuel', date: '01 Avr 2026', type: 'Conformité', status: 'Complété', icon: FileText, iconColor: '#27ae60' },
];

function Rapports() {
  return (
    <div className="rapports-page">
      <div className="rapports-header">
        <div>
          <h1>Centre de Rapports</h1>
          <p>Génération et consultation des rapports de sécurité du stade.</p>
        </div>
        <button className="generate-report-btn">
          <FileText size={16} />
          Générer un Rapport
        </button>
      </div>

      <div className="rapports-stats">
        <div className="rapport-stat">
          <FileText size={20} color="#6c5ce7" />
          <div>
            <span className="rapport-stat-val">24</span>
            <span className="rapport-stat-label">Rapports ce mois</span>
          </div>
        </div>
        <div className="rapport-stat">
          <Calendar size={20} color="#3b82f6" />
          <div>
            <span className="rapport-stat-val">7</span>
            <span className="rapport-stat-label">Programmés</span>
          </div>
        </div>
        <div className="rapport-stat">
          <Clock size={20} color="#f59e0b" />
          <div>
            <span className="rapport-stat-val">2</span>
            <span className="rapport-stat-label">En attente</span>
          </div>
        </div>
      </div>

      <div className="rapports-table">
        <div className="rapports-table-header">
          <span>Rapport</span>
          <span>Date</span>
          <span>Type</span>
          <span>Statut</span>
          <span>Action</span>
        </div>
        {reports.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.id} className="rapport-row">
              <div className="rapport-name">
                <div className="rapport-icon" style={{ color: r.iconColor }}>
                  <Icon size={18} />
                </div>
                <span>{r.title}</span>
              </div>
              <span className="rapport-date">{r.date}</span>
              <span className="rapport-type">{r.type}</span>
              <span className={`rapport-status ${r.status === 'Complété' ? 'done' : 'pending'}`}>{r.status}</span>
              <button className="rapport-download-btn"><Download size={16} /></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rapports;
