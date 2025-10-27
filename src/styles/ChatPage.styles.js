import { COLORS, FONT_SIZES, FONTS } from './theme.js';

export const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  flexGrow: 1,
};

export const chatWindowStyles = {
  flexGrow: 1,
  overflowY: 'auto',
  padding: '20px 0',
  display: 'flex',
  flexDirection: 'column',
};

export const inputAreaStyles = {
  padding: '20px',
  backgroundColor: COLORS.fundo,
};

export const messagesContainerStyles = {
  width: '100%',
  maxWidth: '842px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
};

export const noChatContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  flexGrow: 1,
};

export const noChatTitleStyles = {
  fontSize: FONT_SIZES.titulo,
  color: COLORS.principal,
  fontFamily: FONTS.secundaria,
};

export const noChatTextStyles = {
  color: COLORS.textosSecundarios,
};

export const inputWrapperStyles = {
  maxWidth: '842px',
  margin: '0 auto',
};
