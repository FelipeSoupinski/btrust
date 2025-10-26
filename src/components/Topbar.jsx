// src/components/Topbar.jsx
import React, { useState } from 'react';
import { FONT_SIZES, COLORS, FONTS } from '../styles/theme.js';
import { useAppContext } from '../context/AppContext.jsx';

const topbarStyles = {
    width: '100%',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: COLORS.branco,
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
    zIndex: 100,
    minWidth: '200px',
};

const dropdownItemStyles = {
    padding: '10px 15px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
};

function Topbar() {
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
        <header style={topbarStyles}>
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

                {isDropdownOpen && selectedDataSources.length > 0 && (
                    <div style={dropdownMenuStyles}>
                        <div style={{ padding: '8px 15px', fontWeight: '700', color: COLORS.principal }}>
                            Bases Ativas:
                        </div>
                        {activeSources.map(source => (
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

            <div style={profileStyles}>
                Fulano de tal
                <span style={userIconStyles}>👤</span>
            </div>
        </header>
    );
}

export default Topbar;