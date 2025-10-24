import { COLORS, FONT_SIZES, FONTS } from '../../styles/theme.js';

export const inputContainerStyles = {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 10px 10px 18px',
    backgroundColor: COLORS.branco,
    borderRadius: '25px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${COLORS.fundo}`,
};

export const inputFieldStyles = {
    flexGrow: 1,
    border: 'none',
    padding: '10px 15px',
    fontSize: FONT_SIZES.texto,
    outline: 'none',
    color: COLORS.textosSecundarios,
    background: 'transparent',
};

export const iconStyle = {
    fontSize: '20px',
    color: COLORS.textosSecundarios,
    cursor: 'pointer',
    padding: '5px',
    transition: 'opacity 0.2s',
};

export const sendButtonStyles = {
    width: '40px',
    height: '40px',
    backgroundColor: COLORS.principal,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'none',
    marginLeft: '8px',
    flexShrink: 0,
    transition: 'transform 0.2s, box-shadow 0.2s',
};

export const sendIconStyles = {
    fontSize: '18px',
    color: COLORS.branco,
};
