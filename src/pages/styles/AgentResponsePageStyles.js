import { COLORS, FONTS } from '../../styles/theme.js';

export const pageContainerStyles = {
    display: 'flex',
    width: '100%',
    height: '100vh',
    backgroundColor: COLORS.branco,
};

export const mainContentStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
};

export const chatAreaStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    overflow: 'auto',
};

export const messagesContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '842px',
    gap: '16px',
    marginBottom: '24px',
};

export const suggestionsContainerStyles = {
    display: 'flex',
    gap: '6px',
    width: '100%',
    maxWidth: '842px',
    marginBottom: '24px',
    overflowX: 'auto',
    paddingBottom: '8px',
};

export const suggestionButtonStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#F3F3F5',
    borderRadius: '100px',
    border: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s, transform 0.2s',
};

export const suggestionTextStyles = {
    fontFamily: FONTS.principal,
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#000000',
};

export const inputAreaStyles = {
    display: 'flex',
    justifyContent: 'center',
    padding: '0 24px 24px',
};

export const inputCardStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '842px',
    padding: '20px',
    backgroundColor: COLORS.branco,
    border: '0.8px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    boxSizing: 'border-box',
    gap: '12px',
};

export const inputContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '12px',
};

export const attachButtonStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '37.6px',
    height: '32px',
    backgroundColor: COLORS.branco,
    border: '0.8px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'background-color 0.2s',
};

export const textareaWrapperStyles = {
    position: 'relative',
    flex: 1,
};

export const textareaStyles = {
    width: '100%',
    minHeight: '60px',
    padding: '8px 48px 8px 12px',
    backgroundColor: '#F3F3F5',
    border: 'none',
    borderRadius: '8px',
    fontFamily: FONTS.principal,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#0A0A0A',
    resize: 'none',
    outline: 'none',
    boxSizing: 'border-box',
};

export const sendButtonStyles = {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '36px',
    height: '32px',
    backgroundColor: '#030213',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'opacity 0.2s, transform 0.2s',
};

export const sendButtonDisabledStyles = {
    ...sendButtonStyles,
    opacity: 0.5,
    cursor: 'not-allowed',
};

export const disclaimerStyles = {
    fontFamily: FONTS.principal,
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
    color: '#6A7282',
};
