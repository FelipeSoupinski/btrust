import { COLORS, FONTS } from './theme';

export const messageContainerStyles = isUser => ({
  display: 'flex',
  flexDirection: isUser ? 'row-reverse' : 'row',
  alignItems: 'flex-start',
  gap: '15px',
  width: '100%',
  maxWidth: '842px',
  margin: '15px 0',
  alignSelf: isUser ? 'flex-end' : 'flex-start',
});

export const avatarStyles = isUser => ({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backgroundColor: isUser ? COLORS.principal : COLORS.azulClaro,
  color: isUser ? COLORS.branco : COLORS.principal,
  fontFamily: FONTS.secundaria,
  fontWeight: '700',
});

export const contentStyles = isUser => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: isUser ? 'auto' : '100%',
});

export const botTextStyles = {
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
};

export const userBubbleStyles = {
  backgroundColor: COLORS.principal,
  color: COLORS.branco,
  padding: '10px 15px',
  borderRadius: '18px',
  ...botTextStyles,
  maxWidth: '650px',
  wordBreak: 'break-word',
};

export const seeMoreUserMessageStyle = {
  background: 'none',
  border: 'none',
  color: COLORS.principal,
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '12px',
  padding: '5px 0',
  marginTop: '5px',
};
