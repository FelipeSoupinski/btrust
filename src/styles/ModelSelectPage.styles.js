import { COLORS, FONT_SIZES, FONTS } from './theme.js';

export const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  overflowY: 'auto',
  flexGrow: 1,
  width: '100%',
  minHeight: '100%',
  boxSizing: 'border-box',
};

export const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '20px',
  width: '100%',
  maxWidth: '1200px',
};

export const titleStyles = {
  fontSize: FONT_SIZES.titulo,
  color: COLORS.principal,
  fontFamily: FONTS.secundaria,
  marginBottom: '5px',
  textAlign: 'center',
};

export const subtitleStyles = {
  fontSize: FONT_SIZES.subtitulo,
  color: COLORS.textosSecundarios,
  fontWeight: '400',
  marginBottom: '40px',
  textAlign: 'center',
  maxWidth: '800px',
};

export const confirmButtonStyles = {
  padding: '12px 30px',
  backgroundColor: COLORS.detalhes,
  color: COLORS.principal,
  border: 'none',
  borderRadius: '6px',
  fontSize: FONT_SIZES.texto,
  fontWeight: '700',
  marginTop: '30px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

export const cardStyles = isSelected => ({
  height: '180px',
  padding: '20px',
  borderRadius: '8px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  border: isSelected ? `2px solid ${COLORS.principal}` : `2px dashed ${COLORS.textosSecundarios}`,
  backgroundColor: isSelected ? COLORS.principal : COLORS.branco,
  color: isSelected ? COLORS.branco : COLORS.principal,
  transition: 'all 0.3s ease',
});

export const iconStyles = isSelected => ({
  fontSize: '32px',
  marginBottom: '10px',
  color: isSelected ? COLORS.branco : COLORS.principal,
});

export const cardTitleStyles = {
  fontSize: FONT_SIZES.texto,
  fontWeight: '600',
  fontFamily: FONTS.secundaria,
  marginBottom: '5px',
};

export const descriptionStyles = isSelected => ({
  fontSize: FONT_SIZES.subtexto,
  color: isSelected ? COLORS.fundo : COLORS.textosSecundarios,
  lineHeight: 1.3,
});
