// src/components/InfoMetric.jsx
import { useState } from 'react';

import { COLORS, FONT_SIZES } from '../styles/theme';

const metricContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

const infoIconStyles = {
  cursor: 'pointer',
  position: 'relative',
};

const tooltipStyles = {
  position: 'absolute',
  bottom: '125%', // Posiciona acima do ícone
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: COLORS.principal,
  color: COLORS.branco,
  padding: '5px 10px',
  borderRadius: '4px',
  fontSize: '12px',
  whiteSpace: 'nowrap',
  zIndex: 10, // Aumentado para garantir que fique acima de outros elementos do modal
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
};

const labelStyles = {
  fontSize: FONT_SIZES.subtexto,
  color: COLORS.principal,
  fontWeight: '600',
};

const valueStyles = {
  marginLeft: 'auto',
  fontWeight: '600',
};

const barBackgroundStyles = {
  width: '100%',
  height: '8px',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
};

const getBarColor = value => {
  if (value >= 80) return '#2e7d32'; // Verde
  if (value >= 50) return '#ebc623ff'; // Laranja
  return '#d32f2f'; // Vermelho
};

const barFillStyles = value => ({
  width: `${value}%`,
  height: '100%',
  backgroundColor: getBarColor(value),
  borderRadius: '4px',
  transition: 'width 0.5s ease-in-out',
});

const InfoMetric = ({ label, value, tooltip, showBar = false }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div style={metricContainerStyles}>
      <div style={headerStyles}>
        <div
          style={infoIconStyles}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <span>ℹ️</span>
          {isTooltipVisible && <div style={tooltipStyles}>{tooltip}</div>}
        </div>
        <span style={labelStyles}>{label}:</span>
        <span style={valueStyles}>
          {value}
          {showBar ? '%' : ''}
        </span>
      </div>
      {showBar && (
        <div style={barBackgroundStyles}>
          <div style={barFillStyles(value)}></div>
        </div>
      )}
    </div>
  );
};

export default InfoMetric;
