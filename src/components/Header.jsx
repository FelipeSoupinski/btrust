// src/components/Header.jsx
import { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { COLORS } from '../styles/theme.js';
import {
    headerStyles,
    profileStyles,
    userIconStyles,
    dropdownToggleStyles,
    dropdownMenuStyles,
    dropdownItemStyles,
    dropdownHeaderStyles,
    dropdownContainerStyles,
    checkboxStyles,
    dropdownArrowStyles,
} from './styles/HeaderStyles.js';

function Header() {
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
            <div style={dropdownContainerStyles}>
                {selectedDataSources.length > 0 && (
                    <div
                        style={dropdownToggleStyles}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)'}
                        onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.08)'}
                    >
                        {displaySourceName}
                        {selectedDataSources.length > 1 && ` (+${selectedDataSources.length - 1})`}
                        <span style={dropdownArrowStyles}>
                            {isDropdownOpen ? '▲' : '▼'}
                        </span>
                    </div>
                )}

                {isDropdownOpen && selectedDataSources.length > 0 && (
                    <div style={dropdownMenuStyles}>
                        <div style={dropdownHeaderStyles}>
                            Bases Ativas
                        </div>
                        {selectedDataSources.map(id => {
                            const source = availableDataSources.find(s => s.id === id);
                            if (!source) return null;
                            return (
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
                                        checked={true}
                                        readOnly
                                        style={checkboxStyles}
                                    />
                                    {source.name}
                                </div>
                            );
                        })}
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

export default Header;
