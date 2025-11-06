import { COLORS, FONT_SIZES, FONTS } from './theme.js';

export const menuContainerStyles = {
  position: 'absolute',
  bottom: '55px', // Posiciona acima do ícone '+'
  left: '0px',
  width: '200px',
  backgroundColor: COLORS.branco,
  borderRadius: '12px',
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  border: `1px solid ${COLORS.fundo || '#f0f0f0'}`, // Usa COLORS.fundo se existir
  zIndex: 10,
  overflow: 'hidden',
};

export const menuItemStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  // Para :hover, idealmente usaríamos styled-components ou CSS
};

export const menuIconStyles = {
  fontSize: '14px',
  color: COLORS.principal,
  marginRight: '12px',
  width: '16px',
  textAlign: 'center',
};

export const menuTextStyles = {
  fontFamily: FONTS.principal,
  fontSize: FONT_SIZES.texto,
  color: COLORS.textos,
  fontWeight: '500',
};