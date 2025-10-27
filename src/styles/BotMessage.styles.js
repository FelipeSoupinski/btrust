import { COLORS, FONT_SIZES } from './theme.js';

export const botMessageContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  width: '100%',
};

export const botTextStyles = {
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
};

export const detailsButtonStyles = {
  background: 'none',
  border: 'none',
  color: COLORS.principal,
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: FONT_SIZES.subtexto,
  padding: '5px 0',
  alignSelf: 'flex-start',
};
