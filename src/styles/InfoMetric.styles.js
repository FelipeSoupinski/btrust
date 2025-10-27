import { COLORS, FONT_SIZES } from './theme';

export const metricContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

export const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

export const infoIconStyles = {
  cursor: 'pointer',
  position: 'relative',
};

export const tooltipStyles = {
  position: 'absolute',
  bottom: '125%',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: COLORS.principal,
  color: COLORS.branco,
  padding: '5px 10px',
  borderRadius: '4px',
  fontSize: '12px',
  whiteSpace: 'nowrap',
  zIndex: 10,
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
};

export const labelStyles = {
  fontSize: FONT_SIZES.subtexto,
  color: COLORS.principal,
  fontWeight: '600',
};

export const valueStyles = {
  marginLeft: 'auto',
  fontWeight: '600',
};

export const barBackgroundStyles = {
  width: '100%',
  height: '8px',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
};

export const getBarColor = value => {
  if (value >= 80) return '#2e7d32';
  if (value >= 50) return '#ebc623ff';
  return '#d32f2f';
};

export const barFillStyles = value => ({
  width: `${value}%`,
  height: '100%',
  backgroundColor: getBarColor(value),
  borderRadius: '4px',
  transition: 'width 0.5s ease-in-out',
});
