import { COLORS, FONTS } from './theme';

export const thinkingContainerStyles = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '15px',
  width: '100%',
  maxWidth: '842px',
  margin: '15px 0',
  alignSelf: 'flex-start',
};

export const avatarStyles = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backgroundColor: COLORS.azulClaro, 
  color: COLORS.principal,           
  fontFamily: FONTS.secundaria,     
  fontWeight: '700',
};

export const contentContainerStyles = {
  flexGrow: 1,
  backgroundColor: '#F9F9F9',
  borderRadius: '8px',
  border: `1px solid ${COLORS.azulClaro}`,
  overflow: 'hidden',
  marginTop: '5px', 
};

export const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 14px',
  cursor: 'pointer',
  userSelect: 'none',
  borderBottom: `1px solid #EAEAEA`, 
  backgroundColor: COLORS.branco, 
  fontFamily: FONTS.primaria, 
  fontWeight: '600',
  color: COLORS.textos, 
};

export const toggleIconStyles = {
  fontSize: '0.8rem',
  color: COLORS.textosSecundarios,
};

export const stepsContainerStyles = {
  padding: '12px 14px',
  fontSize: '0.9rem',
  color: COLORS.textos,
  fontFamily: FONTS.primaria,
};

export const preStyles = {
  margin: 0,
  fontFamily: 'inherit', 
  whiteSpace: 'pre-wrap', 
  wordWrap: 'break-word', 
  fontSize: 'inherit',
  color: 'inherit',
};

export const scoreContainerStyles = {
  padding: '12px 14px',
  borderBottom: `1px solid ${COLORS.borda || '#EAEAEA'}`,
  backgroundColor: COLORS.white || '#FFFFFF',
};