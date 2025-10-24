// src/components/Header.jsx
import React, { useState } from 'react';
import { FONT_SIZES, COLORS, FONTS } from '../styles/theme.js';
import { useAppContext } from '../context/AppContext.jsx';

const headerStyles = {
    position: 'absolute', // Flutua sobre o conteúdo
    top: 0,
    left: 0,
    zIndex: 10, 
    width: '100%', 
    height: '60px', 
    padding: '15px 30px', 
    display: 'flex',
    justifyContent: 'space-between', 
    alignItems: 'center',
    boxSizing: 'border-box',
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

            {/* Área Esquerda (APENAS Dropdown) */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

                {/* O BOTÃO DE ABRIR FOI REMOVIDO DESTE FICHEIRO */}

                {/* Dropdown Toggle */}
                {selectedDataSources.length > 0 && (
                    <div
                        style={dropdownToggleStyles}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {displaySourceName}
                        {selectedDataSources.length > 1 && ` (+${selectedDataSources.length - 1})`}
                        <span style={{ marginLeft: '10px' }}>▼</span>
                    </div>
                )}

                {/* Menu Dropdown */}
                {isDropdownOpen && selectedDataSources.length > 0 && (
                    <div style={dropdownMenuStyles}>
                        <div style={{ padding: '0 15px 5px', fontSize: FONT_SIZES.subtexto, color: COLORS.principal, fontWeight: '700' }}>
                            Bases Ativas:
                        </div>
                        {selectedDataSources.map(id => {
                            const source = availableDataSources.find(s => s.id === id);
                            if (!source) return null;
                            return (
                                <div
                                    key={source.id}
                                    style={dropdownItemStyles}
                                    onClick={(e) => { e.stopPropagation(); toggleDataSource(source.id); }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = COLORS.fundo}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.branco}
                                >
                                    <input
                                        type="checkbox"
                                        checked={true}
                                        readOnly
                                        style={{ marginRight: '10px' }}
                                    />
                                    {source.name}
                                </div>
                            );
                        })}
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