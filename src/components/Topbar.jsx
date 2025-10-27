// src/components/Topbar.jsx
import { faChevronDown, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx';
import * as styles from '../styles/Topbar.styles.js';

function Topbar() {
  const {
    availableDataSources = [],
    selectedDataSources = [],
    toggleDataSource = () => {},
    isSidebarOpen,
  } = useAppContext();

  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Efeito para fechar o dropdown se todas as fontes forem desmarcadas
  useEffect(() => {
    if (selectedDataSources.length === 0) {
      setIsDropdownOpen(false);
    }
  }, [selectedDataSources]);

  const activeSources = availableDataSources.filter(source =>
    selectedDataSources.includes(source.id)
  );

  const displaySourceName = activeSources.length > 0 ? activeSources[0].name : 'Selecionar Base';

  const handleLogout = () => {
    // Aqui você pode adicionar lógica de limpeza de autenticação se necessário
    // Por exemplo: localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header style={styles.topbarStyles}>
      <div style={styles.dropdownContainerStyles(isSidebarOpen)}>
        {availableDataSources.length > 0 && (
          <div
            style={styles.dropdownToggleStyles}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {displaySourceName}
            {selectedDataSources.length > 1 && ` (+${selectedDataSources.length - 1})`}
            <FontAwesomeIcon icon={faChevronDown} style={styles.chevronIconStyles} />
          </div>
        )}

        {isDropdownOpen && (
          <div style={styles.dropdownMenuStyles}>
            <div style={styles.dropdownHeaderStyles}>Bases Ativas:</div>
            {availableDataSources.map(source => (
              <div
                key={source.id}
                style={styles.dropdownItemStyles}
                onClick={e => {
                  e.stopPropagation();
                  toggleDataSource(source.id);
                }}
                onMouseOver={e => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseOut={e => (e.currentTarget.style.backgroundColor = '#fff')}
              >
                <input
                  type="checkbox"
                  checked={selectedDataSources.includes(source.id)}
                  readOnly
                  style={styles.checkboxStyles}
                />
                {source.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={styles.profileContainerStyles}>
        <div
          style={styles.profileStyles}
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        >
          Fulano de tal
          <FontAwesomeIcon icon={faUser} style={styles.userIconStyles} />
        </div>

        {isProfileDropdownOpen && (
          <div style={styles.profileDropdownMenuStyles}>
            <div
              style={styles.logoutButtonStyles}
              onClick={handleLogout}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = '#fff')}
            >
              <FontAwesomeIcon icon={faRightFromBracket} style={styles.logoutIconStyles} />
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;
