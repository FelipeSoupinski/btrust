import { COLORS, FONT_SIZES, FONTS } from '../../styles/theme.js';

export const sidebarStyles = {
    width: '280px',
    height: '100vh',
    boxSizing: 'border-box',
    backgroundColor: COLORS.principal,
    color: COLORS.branco,
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: FONTS.principal,
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
    flexShrink: 0,
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
    color: COLORS.branco,
};

export const closeButtonStyles = {
    fontSize: '20px',
    cursor: 'pointer',
    color: COLORS.branco,
    padding: '8px',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    borderRadius: '4px',
};

export const navAreaStyles = {
    padding: '0 20px',
};

export const navItemBaseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '8px',
    fontSize: FONT_SIZES.texto,
    textDecoration: 'none',
    color: COLORS.branco,
    transition: 'all 0.2s',
    borderLeft: '3px solid transparent',
};

export const navItemIconStyles = {
    marginRight: '12px',
    fontSize: '18px',
};

export const separatorStyles = {
    borderColor: 'rgba(255, 255, 255, 0.15)',
    margin: '20px 20px',
    borderStyle: 'solid',
    borderWidth: '0 0 1px 0',
};

export const historySectionStyles = {
    marginTop: '10px',
    overflowY: 'auto',
    flexGrow: 1,
    padding: '0 20px',
};

export const historyTitleStyles = {
    fontSize: FONT_SIZES.subtexto,
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    marginBottom: '12px',
    marginTop: '20px',
    fontWeight: '700',
    letterSpacing: '0.5px',
};

export const deleteIconStyles = {
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    opacity: 0,
    padding: '4px 8px',
    transition: 'opacity 0.2s',
    fontSize: '16px',
};

export const chatTitleStyles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '80%',
    fontSize: FONT_SIZES.subtexto,
};

export const navItemContentStyles = {
    display: 'flex',
    alignItems: 'center',
};
