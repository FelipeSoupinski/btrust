import { COLORS, FONT_SIZES, FONTS } from './theme.js';

export const inputContainerStyles = disabled => ({
  width: '100%',
  maxWidth: '842px',
  minHeight: '60px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: disabled ? '#f0f0f0' : COLORS.branco,
  borderRadius: '30px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${COLORS.fundo}`,
});

export const inputFieldStyles = {
  flexGrow: 1,
  padding: '0px 20px 0px',
  border: 'none',
  fontSize: FONT_SIZES.texto,
  fontFamily: FONTS.principal,
  outline: 'none',
  color: COLORS.textosSecundarios,
  background: 'transparent',
  paddingLeft: '12px',
  borderRadius: '30px',
  resize: 'none',
  maxHeight: '150px',
  overflowY: 'auto',
  lineHeight: '24px',
};

export const iconStyle = disabled => ({
  fontSize: '20px',
  color: COLORS.textosSecundarios,
  cursor: 'pointer',
  padding: '0 5px',
  marginLeft: '7px',
  marginRight: '10px',
  opacity: disabled ? 0.5 : 1,
});

export const sendButtonStyles = {
  width: '40px',
  height: '40px',
  backgroundColor: COLORS.principal,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  border: 'none',
  flexShrink: 0,
  marginRight: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
};

export const stopButtonStyles = {
  ...sendButtonStyles,
  backgroundColor: COLORS.principal,
};

export const sendIconStyles = {
  fontSize: '18px',
  color: COLORS.branco,
  lineHeight: '18px',
};
