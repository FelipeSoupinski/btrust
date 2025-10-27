import { COLORS, FONT_SIZES, FONTS } from './theme.js';

export const topbarStyles = {
  width: '100%',
  padding: '15px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  backgroundColor: COLORS.fundo,
  borderBottom: `1px solid ${COLORS.fundo}`,
};

export const profileStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '5px 15px',
  borderRadius: '20px',
  backgroundColor: COLORS.fundo,
  fontSize: FONT_SIZES.subtexto,
  color: COLORS.textosSecundarios,
  cursor: 'pointer',
  fontWeight: '600',
  fontFamily: FONTS.secundaria,
  border: `1px solid ${COLORS.principal}`,
};

export const userIconStyles = {
  marginLeft: '10px',
  fontSize: '18px',
  color: COLORS.principal,
};

export const dropdownToggleStyles = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: '8px 15px',
  borderRadius: '20px',
  backgroundColor: COLORS.branco,
  border: `1px solid #e0e0e0`,
  color: COLORS.principal,
  fontWeight: '600',
  fontFamily: FONTS.secundaria,
  fontSize: FONT_SIZES.subtexto,
  transition: 'box-shadow 0.2s ease',
};

export const dropdownMenuStyles = {
  position: 'absolute',
  top: '50px',
  left: '0px',
  backgroundColor: COLORS.branco,
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  zIndex: 100,
  minWidth: '200px',
};

export const dropdownItemStyles = {
  padding: '10px 15px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
};

export const dropdownContainerStyles = isSidebarOpen => ({
  position: 'relative',
  marginLeft: !isSidebarOpen ? '60px' : '0px',
  transition: 'margin-left 0.3s ease',
});

export const profileContainerStyles = {
  position: 'relative',
};

export const profileDropdownMenuStyles = {
  position: 'absolute',
  top: '50px',
  right: '0px',
  backgroundColor: COLORS.branco,
  border: '1px solid #e0e0e0',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  zIndex: 100,
  minWidth: '180px',
};

export const logoutButtonStyles = {
  padding: '10px 15px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  color: COLORS.principal,
  fontWeight: '600',
  fontFamily: FONTS.secundaria,
  fontSize: FONT_SIZES.subtexto,
  borderRadius: '8px',
  margin: '5px',
};

export const dropdownHeaderStyles = {
  padding: '8px 15px',
  fontWeight: '700',
  color: COLORS.principal,
};

export const chevronIconStyles = {
  marginLeft: '8px',
  fontSize: '10px',
};

export const logoutIconStyles = {
  marginRight: '8px',
};

export const checkboxStyles = {
  marginRight: '8px',
};
