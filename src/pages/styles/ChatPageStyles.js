import { COLORS, FONT_SIZES, FONTS } from '../../styles/theme.js';

export const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
};

export const messagesAreaStyles = {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '80px 40px 20px 40px',
    display: 'flex',
    flexDirection: 'column',
};

export const titleContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '200px',
};

export const titleStyles = {
    fontSize: FONT_SIZES.titulo,
    color: COLORS.textosSecundarios,
    fontWeight: '700',
    fontFamily: FONTS.secundaria,
    opacity: 0.3,
};

export const inputAreaStyles = {
    padding: '0 20px 20px 20px',
    backgroundColor: COLORS.fundo,
    flexShrink: 0,
};
