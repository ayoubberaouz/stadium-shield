import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, AtSign, Lock, Eye, EyeOff } from 'lucide-react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-bg-overlay"></div>
        <svg className="login-bg-stadium" viewBox="0 0 1200 600">
          <defs>
            <linearGradient id="stadiumGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1a1040" />
              <stop offset="50%" stopColor="#0d0a2a" />
              <stop offset="100%" stopColor="#1a0a30" />
            </linearGradient>
            <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c0392b" />
              <stop offset="100%" stopColor="#8b1a1a" />
            </linearGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#stadiumGrad)" />
          {/* Stadium structure */}
          <ellipse cx="600" cy="350" rx="400" ry="150" fill="none" stroke="#c0392b" strokeWidth="3" opacity="0.4" />
          <ellipse cx="600" cy="350" rx="380" ry="140" fill="none" stroke="#e74c3c" strokeWidth="2" opacity="0.2" />
          {/* Criss-cross roof pattern */}
          {[...Array(20)].map((_, i) => (
            <line key={`r1${i}`} x1={200 + i * 30} y1="200" x2={250 + i * 30} y2="350"
              stroke="#c0392b" strokeWidth="1" opacity="0.15" />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={`r2${i}`} x1={250 + i * 30} y1="200" x2={200 + i * 30} y2="350"
              stroke="#e74c3c" strokeWidth="1" opacity="0.1" />
          ))}
          {/* Lights */}
          {[300, 500, 700, 900].map((x, i) => (
            <g key={`light${i}`}>
              <circle cx={x} cy="420" r="3" fill="#ffd700" opacity="0.6" />
              <circle cx={x} cy="420" r="8" fill="#ffd700" opacity="0.1" />
            </g>
          ))}
          {/* Road lights at bottom */}
          {[...Array(15)].map((_, i) => (
            <g key={`road${i}`}>
              <circle cx={80 + i * 80} cy="520" r="2" fill="#ffd700" opacity="0.4" />
              <line x1={80 + i * 80} y1="520" x2={80 + i * 80} y2="500" stroke="#666" strokeWidth="1" opacity="0.3" />
            </g>
          ))}
        </svg>
      </div>

      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">
            <Shield size={28} />
          </div>
        </div>
        <h1 className="login-title">StadiumShield</h1>
        <p className="login-subtitle">CONNEXION ADMINISTRATEUR</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>EMAIL</label>
            <div className="login-input-wrapper">
              <AtSign size={18} className="login-input-icon" />
              <input
                type="email"
                placeholder="admin@stadiumshield.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="login-field">
            <label>MOT DE PASSE</label>
            <div className="login-input-wrapper">
              <Lock size={18} className="login-input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="login-checkbox">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>Se souvenir de moi</span>
            </label>
            <button type="button" className="login-forgot">Mot de passe oublié ?</button>
          </div>

          <button type="submit" className="login-submit">
            Se connecter <span>&rarr;</span>
          </button>
        </form>

        <div className="login-divider"></div>

        <div className="login-footer">
          <div className="login-status">
            <span className="login-status-dot"></span>
            <span>SYSTÈME EN LIGNE</span>
          </div>
          <span className="login-version">V2.4.0 ACCÈS SÉCURISÉ</span>
        </div>
      </div>

      <p className="login-disclaimer">
        Personnel autorisé uniquement. Toutes les tentatives d'accès sont surveillées et enregistrées selon le Protocole de Sécurité du Stade (SSP-2030).
      </p>
    </div>
  );
}

export default Login;
