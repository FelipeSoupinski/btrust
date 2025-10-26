// src/components/ConfidenceScore.jsx
import React from 'react';
import { COLORS, FONT_SIZES } from '../styles/theme';

const scoreContainerStyles = {
    width: '100%',
};

const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
};

const titleStyles = {
    fontSize: FONT_SIZES.subtexto,
    fontWeight: '600',
    color: COLORS.principal,
};

const barBackgroundStyles = {
    width: '100%',
    height: '8px',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
};

const getBarColor = (level) => {
    switch (level) {
        case 'high': return '#2e7d32'; // Verde
        case 'medium': return '#ed6c02'; // Laranja
        case 'low': return '#d32f2f'; // Vermelho
        default: return COLORS.textosSecundarios;
    }
};

const barFillStyles = (level, value) => ({
    width: `${value}%`,
    height: '100%',
    backgroundColor: getBarColor(level),
    borderRadius: '4px',
    transition: 'width 0.5s ease-in-out',
});

const ConfidenceScore = ({ level, value }) => {
    return (
        <div style={scoreContainerStyles}>
            <div style={headerStyles}>
                <span style={titleStyles}>Score de Confiança: {value}%</span>
            </div>
            <div style={barBackgroundStyles}>
                <div style={barFillStyles(level, value)}></div>
            </div>
        </div>
    );
};

export default ConfidenceScore;