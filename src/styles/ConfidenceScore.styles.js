import { COLORS, FONT_SIZES } from './theme';

export const scoreContainerStyles = {
  width: '100%',
};

export const headerStyles = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '8px',
};

export const titleStyles = {
  fontSize: FONT_SIZES.subtexto,
  fontWeight: '600',
  color: COLORS.principal,
};

export const lowScoreIndicatorStyles = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#d32f2f',
  marginRight: '8px',
};

export const warningTextStyles = {
  fontSize: FONT_SIZES.subtexto,
  color: COLORS.textosSecundarios,
  marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

export const barBackgroundStyles = {
  width: '100%',
  height: '8px',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
};

export const getBarColor = level => {
  switch (level) {
    case 'high':
      return '#2e7d32';
    case 'medium':
      return '#ebc623ff';
    case 'low':
      return '#d32f2f';
    default:
      return COLORS.textosSecundarios;
  }
};

export const barFillStyles = (level, value) => ({
  width: `${value}%`,
  height: '100%',
  backgroundColor: getBarColor(level),
  borderRadius: '4px',
  transition: 'width 0.5s ease-in-out',
});

export const warningBoldStyles = {
  fontWeight: '900',
};
