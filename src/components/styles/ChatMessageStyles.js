import { COLORS, FONT_SIZES, FONTS } from '../../styles/theme.js';

export const messageContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
};

export const userMessageStyles = {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.principal,
    color: COLORS.branco,
    padding: '12px 18px',
    borderRadius: '18px 18px 0 18px',
    maxWidth: '70%',
    fontSize: FONT_SIZES.texto,
    fontFamily: FONTS.principal,
};

export const aiMessageContainerStyles = {
    alignSelf: 'flex-start',
    maxWidth: '85%',
};

export const aiMessageStyles = {
    backgroundColor: COLORS.branco,
    color: COLORS.textosSecundarios,
    padding: '18px',
    borderRadius: '0 18px 18px 18px',
    fontSize: FONT_SIZES.texto,
    fontFamily: FONTS.principal,
    lineHeight: '1.6',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
};

export const confidenceBarContainerStyles = {
    marginTop: '15px',
    padding: '10px 0',
};

export const confidenceLabelStyles = {
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.textosSecundarios,
    marginBottom: '8px',
    fontWeight: '600',
};

export const progressBarBackgroundStyles = {
    width: '100%',
    height: '8px',
    backgroundColor: COLORS.fundo,
    borderRadius: '4px',
    overflow: 'hidden',
};

export const progressBarFillStyles = (percentage) => ({
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: COLORS.detalhes,
    transition: 'width 0.3s ease',
});

export const referencesContainerStyles = {
    marginTop: '15px',
};

export const referencesTitleStyles = {
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.textosSecundarios,
    marginBottom: '10px',
    fontWeight: '600',
};

export const referenceItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    backgroundColor: COLORS.fundo,
    borderRadius: '6px',
    marginBottom: '8px',
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.principal,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
};

export const expandButtonStyles = {
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.principal,
    cursor: 'pointer',
    marginTop: '8px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
};

export const confidenceBadgeStyles = {
    marginLeft: '10px',
    fontWeight: '700',
};

export const referenceFlexStyles = {
    flex: 1,
};

export const referencePageStyles = {
    fontSize: '12px',
    color: COLORS.textosSecundarios,
};
