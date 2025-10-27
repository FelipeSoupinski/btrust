import { COLORS, FONTS } from './theme';

export const thinkingContainerStyles = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '15px',
  width: '100%',
  maxWidth: '842px',
  margin: '15px 0',
  alignSelf: 'flex-start',
};

export const avatarStyles = {
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

export const dotsContainerStyles = {
  display: 'flex',
  gap: '5px',
};

export const dotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: COLORS.textosSecundarios,
};
