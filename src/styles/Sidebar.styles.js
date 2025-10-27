import { COLORS, FONT_SIZES, FONTS } from './theme.js';

export const sidebarStyles = {
  minWidth: '280px',
  maxWidth: '280px',
  height: '100vh',
  boxSizing: 'border-box',
  backgroundColor: COLORS.principal,
  color: COLORS.branco,
  padding: '20px 0',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: FONTS.principal,
  boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
  flexShrink: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  transition: 'min-width 0.3s ease-in-out, max-width 0.3s ease-in-out, padding 0.3s ease-in-out',
};

export const closedSidebarStyles = {
  minWidth: '0',
  maxWidth: '0',
  padding: '20px 0',
  overflow: 'hidden',
};

export const logoContainerStyles = {
  padding: '0 20px',
  marginBottom: '30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const logoStyles = {
  fontSize: FONT_SIZES.titulo,
  fontWeight: '700',
  fontFamily: FONTS.secundaria,
};

export const closeButtonStyles = {
  fontSize: '20px',
  cursor: 'pointer',
  color: COLORS.branco,
  padding: '5px',
  opacity: 0.7,
  transition: 'opacity 0.2s',
};

export const navAreaStyles = {
  padding: '0 20px',
};

export const navItemBaseStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 15px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginBottom: '8px',
  fontSize: FONT_SIZES.texto,
  textDecoration: 'none',
  color: COLORS.branco,
  borderLeft: '5px solid transparent',
  transition: 'background-color 0.1s',
};

export const separatorStyles = {
  borderColor: 'rgba(255, 255, 255, 0.2)',
  margin: '15px 0',
  borderStyle: 'solid',
  borderWidth: '0 0 1px 0',
};

export const historySectionStyles = {
  marginTop: '20px',
  overflowY: 'auto',
  flexGrow: 1,
  padding: '0 20px',
};

export const historyTitleStyles = {
  fontSize: FONT_SIZES.subtexto,
  color: COLORS.azulClaro,
  textTransform: 'uppercase',
  marginBottom: '10px',
  fontWeight: '600',
  paddingLeft: '15px',
};

export const deleteIconStyles = {
  color: 'rgba(255, 255, 255, 0.5)',
  cursor: 'pointer',
  opacity: 0.5,
  padding: '0 5px',
  transition: 'opacity 0.2s',
};

export const itemActiveStyles = (isSelected, isActive) => ({
  backgroundColor: isSelected || isActive ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
  borderLeft: isSelected || isActive ? `5px solid ${COLORS.detalhes}` : '5px solid transparent',
});

export const chatItemTextStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '80%',
};

export const navItemIconStyles = {
  marginRight: '10px',
};

export const navItemContainerStyles = {
  display: 'flex',
  alignItems: 'center',
};

export const contentStyles = isSidebarOpen => ({
  opacity: isSidebarOpen ? 1 : 0,
  transition: 'opacity 0.2s ease-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transitionDelay: isSidebarOpen ? '0.1s' : '0s',
});
