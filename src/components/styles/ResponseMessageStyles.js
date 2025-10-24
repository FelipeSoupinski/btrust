import { COLORS } from '../../styles/theme.js';

export const responseMessageContainerStyles = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '12px',
    width: '100%',
    marginBottom: '16px',
};

export const botAvatarStyles = {
    width: '32px',
    height: '32px',
    backgroundColor: '#030213',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
};

export const botIconStyles = {
    width: '16px',
    height: '16px',
};

export const responseBubbleStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '12px 12px 0',
    gap: '12px',
    maxWidth: '571px',
    borderRadius: '14px',
    boxSizing: 'border-box',
};

export const responseTextStyles = {
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#0A0A0A',
    wordBreak: 'break-word',
};
