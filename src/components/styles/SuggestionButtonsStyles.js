import { COLORS, FONT_SIZES, FONTS } from '../../styles/theme.js';

export const containerStyles = {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '20px 0',
};

export const suggestionButtonStyles = {
    padding: '10px 20px',
    backgroundColor: COLORS.branco,
    border: `1px solid ${COLORS.fundo}`,
    borderRadius: '20px',
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.textosSecundarios,
    cursor: 'pointer',
    fontFamily: FONTS.principal,
    transition: 'all 0.2s',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
};

export const suggestionButtonHoverStyles = {
    backgroundColor: COLORS.principal,
    color: COLORS.branco,
    borderColor: COLORS.principal,
};
