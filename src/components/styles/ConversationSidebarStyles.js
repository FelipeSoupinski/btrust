import { COLORS, FONTS } from '../../styles/theme.js';

export const sidebarContainerStyles = {
    width: '328px',
    height: '100vh',
    backgroundColor: '#474747',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    boxSizing: 'border-box',
};

export const logoContainerStyles = {
    width: '70px',
    height: '70px',
    backgroundColor: COLORS.branco,
    borderRadius: '50%',
    marginBottom: '32px',
};

export const actionButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    gap: '10px',
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '8px',
    transition: 'background-color 0.2s',
};

export const actionButtonTextStyles = {
    fontFamily: FONTS.principal,
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '18px',
    color: COLORS.branco,
};

export const dividerStyles = {
    width: '100%',
    height: '1px',
    backgroundColor: COLORS.branco,
    margin: '24px 0',
};

export const chatSectionTitleStyles = {
    fontFamily: FONTS.principal,
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '15px',
    color: COLORS.branco,
    marginBottom: '11px',
};

export const chatItemStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    gap: '10px',
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '4px',
    transition: 'background-color 0.2s',
};

export const chatItemSelectedStyles = {
    ...chatItemStyles,
    backgroundColor: '#353535',
};

export const chatItemTextStyles = {
    fontFamily: FONTS.principal,
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '18px',
    color: COLORS.branco,
    flex: 1,
    textAlign: 'left',
};

export const chatItemSelectedTextStyles = {
    ...chatItemTextStyles,
    fontSize: '16px',
    lineHeight: '20px',
};

export const deleteIconStyles = {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
};
