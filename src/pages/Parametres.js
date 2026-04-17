import React, { useState } from 'react';
import { Settings, Bell, Camera, Radio, Grid3X3, CheckCircle, Eye, EyeOff, Shield } from 'lucide-react';
import './Parametres.css';

function Parametres() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Admin_Name',
    email: 'admin@stadiumshield.com',
    password: '••••••••',
    role: 'Super Admin - Lecture seule',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: true,
    pushNotifications: false,
  });

  const systemConfigs = [
    {
      id: 1,
      title: 'Configuration des caméras',
      icon: Camera,
      description: 'Gérer les protocoles IP et la résolution de diffusion',
      stats: '48 UNITÉS ACTIVES',
      color: '#e8e8f0',
      textColor: '#1a1a2e',
    },
    {
      id: 2,
      title: 'Calibrage des capteurs',
      icon: Radio,
      description: 'Calibrer les seuils de bruit et du champ radiatif',
      stats: 'AUTO-VÉRIFICATION ACTIF',
      color: '#e8e8f0',
      textColor: '#1a1a2e',
    },
    {
      id: 3,
      title: 'Configuration des zones',
      icon: Grid3X3,
      description: 'Définir les limites du stade et les sorties',
      stats: '12 ZONES VIRTUELLES',
      color: '#e8e8f0',
      textColor: '#1a1a2e',
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="parametres-page">
      {/* Header */}
      <div className="parametres-header">
        <div>
          <h1>Paramètres du système</h1>
          <p>Gérez votre profil de sécurité et les configurations globales du système.</p>
        </div>
        <div className="system-status">
          <CheckCircle size={18} color="#27ae60" />
          <span>État du système : Actif et sécurisé</span>
        </div>
      </div>

      <div className="parametres-content">
        {/* Left Section */}
        <div className="parametres-left">
          {/* User Profile */}
          <div className="settings-card">
            <div className="card-header">
              <Settings size={24} color="#6c5ce7" />
              <h2>Paramètres du profil utilisateur</h2>
            </div>

            <div className="form-group">
              <label>NOM COMPLET</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>ADRESSE E-MAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </div>

            <div className="form-row">
              <div className="form-group flex-1">
                <label>MOT DE PASSE</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    className="form-input"
                    readOnly
                  />
                  <button
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-group flex-1">
                <label>RÔLE UTILISATEUR</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  className="form-input"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* System Configurations */}
          <div className="settings-card">
            <div className="card-header">
              <Shield size={24} color="#6c5ce7" />
              <h2>Configurations du système</h2>
            </div>

            <div className="config-grid">
              {systemConfigs.map((config) => {
                const Icon = config.icon;
                return (
                  <div key={config.id} className="config-card" style={{ background: config.color }}>
                    <Icon size={32} color={config.textColor} />
                    <h3>{config.title}</h3>
                    <p>{config.description}</p>
                    <span className="config-stats">{config.stats}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="parametres-right">
          {/* Notifications Preferences */}
          <div className="settings-card notifications-card">
            <div className="card-header">
              <Bell size={24} color="#6c5ce7" />
              <h2>Préférences de notification</h2>
            </div>

            <div className="notification-toggle">
              <div className="toggle-content">
                <span className="toggle-label">Alertes e-mail</span>
                <span className="toggle-description">Résumé quotidien et articles critiques</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.emailAlerts}
                  onChange={() => toggleNotification('emailAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="notification-toggle">
              <div className="toggle-content">
                <span className="toggle-label">Alertes SMS</span>
                <span className="toggle-description">Protocoles d'urgence immédiats</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.smsAlerts}
                  onChange={() => toggleNotification('smsAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="notification-toggle">
              <div className="toggle-content">
                <span className="toggle-label">Notifications Push</span>
                <span className="toggle-description">Occupation du stade en temps réel</span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={notifications.pushNotifications}
                  onChange={() => toggleNotification('pushNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Security Protocol */}
          <div className="security-protocol-card">
            <Shield size={32} color="white" />
            <h3>Protocoles d'Urgence</h3>
            <p>Examinez les déclencheurs d'automatisation actuelle pour l'évacuation des zones.</p>
            <div className="protocol-info">
              <span className="protocol-title">Chiffrement système</span>
              <span className="protocol-value">AES-256 actif</span>
            </div>
            <button className="certified-btn">
              <CheckCircle size={16} />
              ACCÈS HUB CERTIFIÉ
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="parametres-actions">
        <button className="btn-cancel">Annuler</button>
        <button className="btn-save">
          <CheckCircle size={16} />
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}

export default Parametres;
