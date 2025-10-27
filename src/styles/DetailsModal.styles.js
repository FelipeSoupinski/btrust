import { COLORS, FONT_SIZES, FONTS } from './theme.js';

export const modalBackdropStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

export const modalContentStyles = {
  backgroundColor: COLORS.branco,
  padding: '25px',
  borderRadius: '12px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  width: '90%',
  maxWidth: '600px',
  maxHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible',
};

export const modalHeaderStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  position: 'relative',
};

export const modalTitleStyles = {
  fontSize: FONT_SIZES.subtitulo,
  fontFamily: FONTS.secundaria,
  color: COLORS.principal,
  fontWeight: '700',
  textAlign: 'center',
  flexGrow: 1,
};

export const closeButtonStyles = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  position: 'absolute',
  right: '25px',
  cursor: 'pointer',
  color: COLORS.textosSecundarios,
};

export const modalBodyStyles = {
  overflowY: 'auto',
  paddingRight: '10px',
};

export const metricsContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  marginTop: '20px',
};

export const modalFooterStyles = {
  marginTop: '25px',
  paddingTop: '20px',
  borderTop: `1px solid ${COLORS.fundo}`,
  display: 'flex',
  justifyContent: 'center',
};

export const confirmButtonStyles = {
  padding: '10px 25px',
  backgroundColor: COLORS.principal,
  color: COLORS.branco,
  border: 'none',
  borderRadius: '6px',
  fontSize: FONT_SIZES.subtexto,
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  fontFamily: FONTS.principal,
};

export const scoreExplanationStyles = {
  marginTop: '20px',
  fontSize: FONT_SIZES.texto,
  color: COLORS.textosSecundarios,
  lineHeight: 1.5,
};
