// src/components/Header.jsx
import React, { useState } from 'react';
import { FONT_SIZES, COLORS, FONTS } from '../styles/theme.js';
import { useAppContext } from '../context/AppContext.jsx';

const headerStyles = {
    width: '100%',
    padding: '15px 30px', // Aumentando o padding lateral para dar mais respiro
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: COLORS.branco, // Adicionando cor de fundo para destaque
    borderBottom: `1px solid ${COLORS.fundo}`, // Borda sutil para separar do conteúdo
};

const profileStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 15px',
    borderRadius: '20px',
    backgroundColor: COLORS.fundo, // Fundo F9F9F9 para o elemento de perfil
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.textosSecundarios,
    cursor: 'pointer',
    fontWeight: '600',
    fontFamily: FONTS.secundaria,
};

const userIconStyles = {
    marginLeft: '10px',
    fontSize: '18px',
    color: COLORS.principal, // Ícone na cor principal
};

// (Adicionei os estilos que faltavam no teu ficheiro original para o dropdown)
const dropdownToggleStyles = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '5px 10px',
    borderRadius: '5px',
    backgroundColor: COLORS.fundo,
};

const dropdownMenuStyles = {
    position: 'absolute',
    top: '40px',
    left: '0px',
    backgroundColor: COLORS.branco,
    border: `1px solid ${COLORS.fundo}`,
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    zIndex: 100, // zIndex alto
    minWidth: '200px',
};

const dropdownItemStyles = {
    padding: '10px 15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
};
function Header() {
    // REMOVEMOS 'setIsSidebarOpen' e 'isSidebarOpen' daqui
    const {
        availableDataSources = [],
        selectedDataSources = [],
        toggleDataSource = () => { },
    } = useAppContext();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const activeSources = availableDataSources.filter(source =>
        selectedDataSources.includes(source.id)
    );

    const displaySourceName = activeSources.length > 0 ? activeSources[0].name : "Selecionar Base";

    return (
        <header style={headerStyles}>
            {/* Dropdown */}
            <div style={{ position: 'relative' }}>
                {selectedDataSources.length > 0 && (
                    <div
                        style={dropdownToggleStyles}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {displaySourceName}
                        {selectedDataSources.length > 1 && ` (+${selectedDataSources.length - 1})`}
                        <span style={{ marginLeft: '8px' }}>Down Arrow</span>
                    </div>
                )}

                {/* Menu Dropdown */}
                {isDropdownOpen && selectedDataSources.length > 0 && (
                    <div style={dropdownMenuStyles}>
                        <div style={{ padding: '8px 15px', fontWeight: '700', color: COLORS.principal }}>
                            Bases Ativas:
                        </div>
                        {activeSources.map(source => (
                            <div
                                key={source.id}
                                style={dropdownItemStyles}
                                // NÃO fecha o dropdown ao clicar
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleDataSource(source.id);
                                    // Mantém aberto
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.fundo}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.branco}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedDataSources.includes(source.id)}
                                    readOnly
                                    style={{ marginRight: '8px' }}
                                />
                                {source.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Área Direita (Perfil) */}
            <div style={profileStyles}>
                Fulano de tal
                <span style={userIconStyles}>👤</span>
            </div>
        </header>
    );
}

export default Header;