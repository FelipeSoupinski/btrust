import { COLORS, FONT_SIZES } from './theme';

export const containerStyles = {
  border: `1px solid #e0e0e0`,
  borderRadius: '8px',
  backgroundColor: COLORS.fundo,
};

export const headerStyles = isOpen => ({
  padding: '12px 15px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontWeight: '600',
  color: COLORS.principal,
  cursor: 'pointer',
  borderBottom: isOpen ? `1px solid #e0e0e0` : 'none',
});

export const listStyles = {
  padding: '10px 15px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

export const itemStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontSize: FONT_SIZES.subtexto,
};

export const pageTagStyles = {
  marginLeft: 'auto',
  backgroundColor: '#e0e0e0',
  color: COLORS.textosSecundarios,
  padding: '2px 6px',
  borderRadius: '4px',
  fontSize: '12px',
};

export const footerStyles = {
  padding: '10px 15px',
  borderTop: '1px solid #e0e0e0',
  textAlign: 'left',
};

export const seeMoreButtonStyles = {
  background: 'none',
  border: 'none',
  color: COLORS.principal,
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: FONT_SIZES.subtexto,
};

export const arrowStyles = isOpen => ({
  transition: 'transform 0.3s ease',
  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
});
