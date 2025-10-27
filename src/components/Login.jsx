import { faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logoB3 from '../assets/b3.svg';
import '../styles/Login.css';

export default function BTrustLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();

    if (email && password) {
      navigate('/chat');
    }
  };

  const handleClearEmail = () => setEmail('');

  return (
    <div className="login-container">
      {/* Logo B3 */}
      <div className="logo-b3">
        <img src={logoB3} alt="B3 Logo" />
      </div>

      {/* Conteúdo Principal */}
      <div className="login-form-wrapper">
        {/* Header */}
        <div>
          <h1 className="login-title">BTrust</h1>
          <p className="login-subtitle">
            Seja bem-vindo ao seu agente pessoal. Faça login para continuar
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Email Input */}
          <div className="text-field">
            <div className="text-field-input-wrapper">
              <div className="text-field-content">
                <label>email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="email@b3.com.br"
                  required
                />
              </div>
              {email && (
                <FontAwesomeIcon
                  size="sm"
                  icon={faXmark}
                  onClick={handleClearEmail}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
          </div>

          {/* Password Input */}
          <div className="text-field">
            <div className="text-field-input-wrapper">
              <div className="text-field-content">
                <label>senha</label>
                <input
                  required
                  value={password}
                  placeholder="Sua senha aqui"
                  type={showPassword ? 'text' : 'password'}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              {password && (
                <FontAwesomeIcon
                  size="sm"
                  style={{ cursor: 'pointer' }}
                  icon={showPassword ? faEyeSlash : faEye}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password">
              <a href="#">Esqueci minha senha</a>
            </div>
          </div>

          {/* Enter Button */}
          <button type="submit" className="btn-primary">
            Entrar
          </button>

          {/* Divider */}
          <div className="divider-container">
            <div className="divider-line"></div>
            <span className="divider-text">ou</span>
            <div className="divider-line"></div>
          </div>

          {/* Register Button */}
          <button type="button" className="btn-secondary">
            Clique aqui e cadastre-se
          </button>
        </form>
      </div>
    </div>
  );
}
