// src/components/Topbar.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../context/AppContext.jsx';
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme.js';

const topbarStyles = {
    width: '100%',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: COLORS.fundo,
    borderBottom: `1px solid ${COLORS.fundo}`,
};

const profileStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 15px',
    borderRadius: '20px',
    backgroundColor: COLORS.fundo,
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.textosSecundarios,
    cursor: 'pointer',
    fontWeight: '600',
    fontFamily: FONTS.secundaria,
    border: `1px solid ${COLORS.principal}`,
};

const userIconStyles = {
    marginLeft: '10px',
    fontSize: '18px',
    color: COLORS.principal,
};

const dropdownToggleStyles = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 15px',
    borderRadius: '20px',
    backgroundColor: COLORS.branco,
    border: `1px solid #e0e0e0`,
    color: COLORS.principal,
    fontWeight: '600',
    fontFamily: FONTS.secundaria,
    fontSize: FONT_SIZES.subtexto,
    transition: 'box-shadow 0.2s ease',
};

const dropdownMenuStyles = {
    position: 'absolute',
    top: '50px', // Aumentado para dar mais espaço
    left: '0px',
    backgroundColor: COLORS.branco,
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    minWidth: '200px',
};

const dropdownItemStyles = {
    padding: '10px 15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
};

const dropdownContainerStyles = (isSidebarOpen) => ({
  position: 'relative',
  // Adiciona margem à esquerda quando a sidebar está fechada para não ficar sob o botão de abrir
  marginLeft: !isSidebarOpen ? '60px' : '0px',
  transition: 'margin-left 0.3s ease',
});

const profileContainerStyles = {
    position: 'relative',
};

const profileDropdownMenuStyles = {
    position: 'absolute',
    top: '50px',
    right: '0px',
    backgroundColor: COLORS.branco,
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    zIndex: 100,
    minWidth: '180px',
};

const logoutButtonStyles = {
    padding: '10px 15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: COLORS.principal,
    fontWeight: '600',
    fontFamily: FONTS.secundaria,
    fontSize: FONT_SIZES.subtexto,
    borderRadius: '8px',
    margin: '5px',
};

function Topbar() {
    const {
        availableDataSources = [],
        selectedDataSources = [],
        toggleDataSource = () => { },
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

    const displaySourceName = activeSources.length > 0 ? activeSources[0].name : "Selecionar Base";

    const handleLogout = () => {
        // Aqui você pode adicionar lógica de limpeza de autenticação se necessário
        // Por exemplo: localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header style={topbarStyles}>
            <div style={dropdownContainerStyles(isSidebarOpen)}>
                {availableDataSources.length > 0 && ( // Renderiza se houver fontes disponíveis, não apenas selecionadas
                    <div
                        style={dropdownToggleStyles}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {displaySourceName}
                        {selectedDataSources.length > 1 && ` (+${selectedDataSources.length - 1})`}
                        <FontAwesomeIcon icon={faChevronDown} style={{ marginLeft: '8px', fontSize: '10px' }} />
                    </div>
                )}

                {isDropdownOpen && ( // A visibilidade do menu depende apenas do estado 'isDropdownOpen'
                    <div style={dropdownMenuStyles}>
                        <div style={{ padding: '8px 15px', fontWeight: '700', color: COLORS.principal }}>
                            Bases Ativas:
                        </div>
                        {availableDataSources.map(source => (
                            <div
                                key={source.id}
                                style={dropdownItemStyles}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDataSource(source.id);
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.fundo}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.branco}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedDataSources.includes(source.id)} // O checkbox controla o estado visual
                                    readOnly
                                    style={{ marginRight: '8px' }}
                                />
                                {source.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div style={profileContainerStyles}>
                <div 
                    style={profileStyles}
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                    Fulano de tal
                    <FontAwesomeIcon icon={faUser} style={userIconStyles} />
                </div>

                {isProfileDropdownOpen && (
                    <div style={profileDropdownMenuStyles}>
                        <div
                            style={logoutButtonStyles}
                            onClick={handleLogout}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.fundo}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.branco}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: '8px' }} />
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Topbar;