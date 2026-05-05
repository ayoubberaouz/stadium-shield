import React, { useState } from 'react';
import { AlertTriangle, Clock, Filter, AlertCircle, Eye, Crosshair, Swords, X, Loader } from 'lucide-react';
import { useAlerts, useAlertStats } from '../useAlerts';
import { getEvidenceUrl } from '../api';
import './Alertes.css';

const typeConfig = {
  gun: { icon: Crosshair, iconColor: '#e74c3c', iconBg: '#fef2f2', label: 'Arme à feu', level: 'HAUT', severity: 'critical' },
  knife: { icon: Swords, iconColor: '#f59e0b', iconBg: '#fffbeb', label: 'Couteau', level: 'MOYEN', severity: 'warning' },
  violence: { icon: AlertTriangle, iconColor: '#e74c3c', iconBg: '#fef2f2', label: 'Violence', level: 'HAUT', severity: 'critical' },
};

const statusMap = {
  new: { label: '● Nouveau', color: '#e74c3c' },
  in_progress: { label: '◐ En cours', color: '#f59e0b' },
  resolved: { label: '✓ Résolu', color: '#27ae60' },
};

function formatTimestamp(iso) {
  if (!iso) return '--:--';
  const d = new Date(iso);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}

const zoneAnalysisCards = [
  { title: 'Cluster Nord', label: 'CARTE DES RISQUES', icon: AlertTriangle },
  { title: 'Ascenseurs VIP', label: 'FLUX DE SUPPORTERS', icon: Clock },
];

function Alertes() {
  const { alerts, loading, error } = useAlerts(3000);
  const stats = useAlertStats(alerts);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  // Filter alerts based on tab
  let filteredAlerts = alerts;
  if (activeTab === 'today') {
    const todayStr = new Date().toISOString().slice(0, 10);
    filteredAlerts = alerts.filter(a => a.timestamp && a.timestamp.startsWith(todayStr));
  } else if (activeTab === 'resolved') {
    filteredAlerts = alerts.filter(a => a.status === 'resolved');
  }

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAlerts.length / perPage));
  const paginatedAlerts = filteredAlerts.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="alertes-page">
      <div className="alertes-top-section">
        <div>
          <h3 className="alertes-section-label">DÉTECTION IA</h3>
          <h1>Alertes Actives</h1>
          <p>Incidents détectés par le système YOLO en temps réel — connecté au backend Flask + MongoDB.</p>
          {error && <span className="backend-error-inline">⚠ Backend hors ligne</span>}
        </div>
      </div>

      <div className="alertes-stats-compact">
        <div className="alerte-stat-compact critical">
          <AlertTriangle size={18} />
          <div>
            <span className="stat-value">{loading ? '...' : String(stats.newAlerts).padStart(2, '0')}</span>
            <span className="stat-label">PRIORITÉ HAUTE</span>
          </div>
        </div>
        <div className="alerte-stat-compact warning">
          <Eye size={18} />
          <div>
            <span className="stat-value">{loading ? '...' : String(stats.totalAlerts).padStart(2, '0')}</span>
            <span className="stat-label">TOTAL INCIDENTS</span>
          </div>
        </div>
      </div>

      <div className="alertes-controls">
        <button className="alerte-filter-btn-main"><Filter size={16} /> Filtrer le système</button>
        <div className="alerte-tabs">
          <button className={`alerte-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => { setActiveTab('all'); setCurrentPage(1); }}>Toutes les alertes</button>
          <button className={`alerte-tab ${activeTab === 'today' ? 'active' : ''}`} onClick={() => { setActiveTab('today'); setCurrentPage(1); }}>Aujourd'hui</button>
          <button className={`alerte-tab ${activeTab === 'resolved' ? 'active' : ''}`} onClick={() => { setActiveTab('resolved'); setCurrentPage(1); }}>Résolues</button>
        </div>
        <div className="alerte-actions-right">
          <button className="sort-btn">TRIER PAR</button>
          <button className="download-btn">↓</button>
        </div>
      </div>

      <div className="alertes-table-container">
        {loading ? (
          <div className="alertes-loading">
            <Loader size={28} className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
            <p>Chargement des incidents depuis MongoDB...</p>
          </div>
        ) : filteredAlerts.length === 0 ? (
          <div className="alertes-empty">
            <p>✅ Aucun incident enregistré</p>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>Lancez detector.py et server.py pour voir les détections en temps réel</p>
          </div>
        ) : (
          <table className="alertes-table">
            <thead>
              <tr>
                <th>HEURE</th>
                <th>CAMÉRA</th>
                <th>TYPE D'INCIDENT</th>
                <th>NIVEAU</th>
                <th>STATUT</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAlerts.map((alert) => {
                const config = typeConfig[alert.weapon_type] || typeConfig.violence;
                const status = statusMap[alert.status] || statusMap.new;
                const Icon = config.icon;
                return (
                  <tr key={alert._id} className={`table-row ${config.severity}`}>
                    <td className="time-cell">
                      <div>{formatTimestamp(alert.timestamp)}</div>
                      <div style={{ fontSize: '0.65rem', color: '#999' }}>{formatDate(alert.timestamp)}</div>
                    </td>
                    <td className="zone-cell">
                      <div className="zone-indicator" style={{ background: config.iconBg }}>
                        <Icon size={14} style={{ color: config.iconColor }} />
                      </div>
                      <span>{alert.camera_id || 'CAM-01'}</span>
                    </td>
                    <td className="type-cell">{config.label}</td>
                    <td className="level-cell">
                      <span className={`level-badge ${config.level.toLowerCase()}`}>{config.level}</span>
                    </td>
                    <td className="status-cell">
                      <span className="status-label" style={{ color: status.color }}>
                        {status.label}
                      </span>
                    </td>
                    <td className="action-cell">
                      <button className="view-details-btn" onClick={() => setSelectedAlert(alert)}>Voir preuve</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {filteredAlerts.length > 0 && (
        <div className="alertes-pagination">
          <span className="pagination-info">
            AFFICHAGE DE {(currentPage - 1) * perPage + 1}-{Math.min(currentPage * perPage, filteredAlerts.length)} SUR {filteredAlerts.length} RÉSULTATS
          </span>
          <div className="pagination-controls">
            {currentPage > 1 && <button onClick={() => setCurrentPage(p => p - 1)}>‹</button>}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
              <button key={p} className={currentPage === p ? 'active' : ''} onClick={() => setCurrentPage(p)}>{p}</button>
            ))}
            {currentPage < totalPages && <button onClick={() => setCurrentPage(p => p + 1)} className="next">›</button>}
          </div>
        </div>
      )}

      <div className="alertes-bottom">
        <div className="alertes-zone-analysis">
          <h3>Analyse des Zones</h3>
          <p>Cartographie de la densité thermique en temps réel sur tous les segments du stade.</p>
          <div className="zone-cards-grid">
            {zoneAnalysisCards.map((card, idx) => (
              <div key={idx} className="zone-analysis-card">
                <h4>{card.label}</h4>
                <p>{card.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="alertes-emergency-protocols">
          <AlertCircle size={28} />
          <h3>Protocoles d'Urgence</h3>
          <p>Examinez les déclencheurs d'automatisation actuelle pour l'évacuation des zones.</p>
          <button className="launch-exercise-btn">Lancer l'exercice</button>
        </div>
      </div>

      {/* Evidence Modal */}
      {selectedAlert && (
        <div className="evidence-modal-overlay" onClick={() => setSelectedAlert(null)}>
          <div className="evidence-modal" onClick={(e) => e.stopPropagation()}>
            <div className="evidence-modal-header">
              <h3>
                🔍 Preuve — {(typeConfig[selectedAlert.weapon_type] || typeConfig.violence).label}
              </h3>
              <button className="evidence-close-btn" onClick={() => setSelectedAlert(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="evidence-modal-body">
              <img
                src={getEvidenceUrl(selectedAlert.image_path)}
                alt={`Evidence: ${selectedAlert.weapon_type}`}
                className="evidence-image"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div className="evidence-details">
                <div className="evidence-detail-row">
                  <span className="evidence-label">Type</span>
                  <span className="evidence-value">{(typeConfig[selectedAlert.weapon_type] || typeConfig.violence).label}</span>
                </div>
                <div className="evidence-detail-row">
                  <span className="evidence-label">Caméra</span>
                  <span className="evidence-value">{selectedAlert.camera_id || 'CAM-01'}</span>
                </div>
                <div className="evidence-detail-row">
                  <span className="evidence-label">Horodatage</span>
                  <span className="evidence-value">{formatTimestamp(selectedAlert.timestamp)} · {formatDate(selectedAlert.timestamp)}</span>
                </div>
                <div className="evidence-detail-row">
                  <span className="evidence-label">Fichier</span>
                  <span className="evidence-value" style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>{selectedAlert.image_path}</span>
                </div>
                <div className="evidence-detail-row">
                  <span className="evidence-label">Statut</span>
                  <span className="evidence-value" style={{ color: (statusMap[selectedAlert.status] || statusMap.new).color }}>
                    {(statusMap[selectedAlert.status] || statusMap.new).label}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alertes;
