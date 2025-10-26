// src/components/BotMessage.jsx
import React from 'react';
import ConfidenceScore from './ConfidenceScore';
import References from './References';
import { COLORS, FONT_SIZES } from '../styles/theme';

const botMessageContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%', // Garante que o conteúdo não ultrapasse o container pai
    gap: '20px',
};

const textStyles = {
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
};

const detailsLinkStyles = {
    color: COLORS.principal,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: FONT_SIZES.subtexto,
    fontWeight: '600',
};

const BotMessage = ({ text, score, references }) => {
    return (
        <div style={botMessageContainerStyles}>
            <div style={textStyles}>{text}</div>
            
            {score && <ConfidenceScore level={score.level} value={score.value} />}
            
            {references && references.length > 0 && <References items={references} />}

            <div>
                <span style={detailsLinkStyles}>Ver detalhes</span>
            </div>
        </div>
    );
};

export default BotMessage;