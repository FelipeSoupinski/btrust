import { COLORS, FONT_SIZES } from './theme';

export const containerStyles = {
  display: 'flex',
  backgroundColor: COLORS.fundo,
  borderRadius: '24px',
  padding: '4px',
  width: '100%',
};

export const getTabStyles = isActive => ({
  flex: 1,
  padding: '8px 12px',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '24px',
  fontSize: FONT_SIZES.subtexto,
  fontWeight: isActive ? '600' : '500',
  color: isActive ? COLORS.branco : COLORS.textosSecundarios,
  backgroundColor: isActive ? COLORS.principal : 'transparent',
  transition: 'all 0.3s ',
  boxShadow: isActive ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
});
