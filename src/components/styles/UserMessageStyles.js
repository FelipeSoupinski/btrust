import { COLORS } from '../../styles/theme.js';

export const userMessageContainerStyles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    marginBottom: '16px',
};

export const userMessageBubbleStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '12px 12px 0',
    gap: '8px',
    maxWidth: '155px',
    backgroundColor: '#030213',
    border: '0.8px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '18px 18px 2px 18px',
    boxSizing: 'border-box',
};

export const userMessageTextStyles = {
    fontFamily: 'Arimo, sans-serif',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    color: COLORS.branco,
    wordBreak: 'break-word',
};

export const userAvatarStyles = {
    width: '32px',
    height: '32px',
    backgroundColor: '#ECEEF2',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
};

export const userIconStyles = {
    width: '16px',
    height: '16px',
};
