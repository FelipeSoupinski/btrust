import { COLORS, FONTS } from '../../styles/theme.js';

export const topBarContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
    height: '64px',
    backgroundColor: COLORS.branco,
    borderBottom: '0.8px solid rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
};

export const databaseDropdownStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
};

export const databaseNameStyles = {
    fontFamily: FONTS.principal,
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '28px',
    color: '#0A0A0A',
};

export const dropdownIconStyles = {
    width: '24px',
    height: '24px',
};

export const userProfileContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
};

export const userProfileButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '0 8px',
    height: '32px',
    backgroundColor: COLORS.branco,
    border: '0.8px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
};

export const userProfileTextStyles = {
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#0A0A0A',
};

export const userIconStyles = {
    width: '16px',
    height: '16px',
};
