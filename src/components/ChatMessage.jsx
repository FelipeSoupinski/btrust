// src/components/ChatMessage.jsx
import React, { useState } from 'react';
import {
    userMessageStyles,
    aiMessageContainerStyles,
    aiMessageStyles,
    confidenceBarContainerStyles,
    confidenceLabelStyles,
    confidenceBadgeStyles,
    progressBarBackgroundStyles,
    progressBarFillStyles,
    referencesContainerStyles,
    referencesTitleStyles,
    referenceItemStyles,
    referenceFlexStyles,
    referencePageStyles,
    expandButtonStyles,
} from './styles/ChatMessageStyles.js';
import { COLORS } from '../styles/theme.js';

function ChatMessage({ type, content, confidence, references }) {
    const [showAllReferences, setShowAllReferences] = useState(false);

    if (type === 'user') {
        return (
            <div style={userMessageStyles}>
                {content}
            </div>
        );
    }

    if (type === 'ai') {
        const visibleReferences = showAllReferences ? references : references?.slice(0, 3);

        return (
            <div style={aiMessageContainerStyles}>
                <div style={aiMessageStyles}>
                    <div>{content}</div>

                    {confidence !== undefined && (
                        <div style={confidenceBarContainerStyles}>
                            <div style={confidenceLabelStyles}>
                                Confiança
                                <span style={confidenceBadgeStyles}>
                                    {confidence}%
                                </span>
                            </div>
                            <div style={progressBarBackgroundStyles}>
                                <div style={progressBarFillStyles(confidence)} />
                            </div>
                        </div>
                    )}

                    {references && references.length > 0 && (
                        <div style={referencesContainerStyles}>
                            <div style={referencesTitleStyles}>
                                Referências utilizadas:
                            </div>
                            {visibleReferences.map((ref, index) => (
                                <div 
                                    key={index}
                                    style={referenceItemStyles}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e8e8e8'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.fundo}
                                >
                                    <span>📄</span>
                                    <span style={referenceFlexStyles}>{ref.title}</span>
                                    <span style={referencePageStyles}>
                                        p. {ref.page}
                                    </span>
                                </div>
                            ))}

                            {references.length > 3 && (
                                <div 
                                    style={expandButtonStyles}
                                    onClick={() => setShowAllReferences(!showAllReferences)}
                                >
                                    {showAllReferences ? 'Ver menos' : 'Ver mais'}
                                    <span>{showAllReferences ? '▲' : '▼'}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
}

export default ChatMessage;
