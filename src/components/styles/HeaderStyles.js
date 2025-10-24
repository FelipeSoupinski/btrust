import { COLORS, FONT_SIZES, FONTS } from '../../styles/theme.js';

export const headerStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: '100%',
    height: '60px',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
};

export const profileStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 18px',
    borderRadius: '20px',
    backgroundColor: COLORS.fundo,
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.textosSecundarios,
    cursor: 'pointer',
    fontWeight: '600',
    fontFamily: FONTS.secundaria,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
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
    padding: '8px 18px',
    borderRadius: '20px',
    backgroundColor: COLORS.branco,
    fontSize: FONT_SIZES.subtexto,
    fontWeight: '600',
    fontFamily: FONTS.principal,
    color: COLORS.principal,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
    border: `1px solid ${COLORS.fundo}`,
    transition: 'all 0.2s',
};

export const dropdownMenuStyles = {
    position: 'absolute',
    top: '50px',
    left: '0px',
    backgroundColor: COLORS.branco,
    border: `1px solid ${COLORS.fundo}`,
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 100,
    minWidth: '220px',
    overflow: 'hidden',
};

export const dropdownItemStyles = {
    padding: '12px 18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.textosSecundarios,
    transition: 'background-color 0.2s',
};

export const dropdownHeaderStyles = {
    padding: '10px 18px 8px',
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.principal,
    fontWeight: '700',
    backgroundColor: COLORS.fundo,
    borderBottom: `1px solid #e0e0e0`,
};

export const dropdownContainerStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
};

export const checkboxStyles = {
    marginRight: '12px',
    cursor: 'pointer',
    accentColor: COLORS.principal,
};

export const dropdownArrowStyles = {
    marginLeft: '10px',
    fontSize: '10px',
};
