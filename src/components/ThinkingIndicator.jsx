// src/components/ThinkingIndicator.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { COLORS, FONTS } from '../styles/theme';

const thinkingContainerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    width: '100%',
    maxWidth: '842px',
    margin: '15px 0',
    alignSelf: 'flex-start',
};

const avatarStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: COLORS.principal,
    color: COLORS.detalhes,
    fontFamily: FONTS.secundaria,
    fontWeight: '700',
};

const dotsContainerStyles = {
    display: 'flex',
    gap: '5px',
};

// Estilos para os pontos da animação (serão controlados por CSS se movermos para lá)
const dotStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: COLORS.textosSecundarios,
    // A animação real seria adicionada aqui com @keyframes
};

const ThinkingIndicator = () => (
    <div style={thinkingContainerStyles}>
        <div style={avatarStyles}>
            <FontAwesomeIcon icon={faRobot} />
        </div>
        <div style={dotsContainerStyles}>
            <div style={dotStyle}></div><div style={dotStyle}></div><div style={dotStyle}></div>
        </div>
    </div>
);

export default ThinkingIndicator;