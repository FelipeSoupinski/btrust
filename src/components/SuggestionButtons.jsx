// src/components/SuggestionButtons.jsx
import React from 'react';
import { COLORS } from '../styles/theme.js';
import {
    containerStyles,
    suggestionButtonStyles,
    suggestionButtonHoverStyles,
} from './styles/SuggestionButtonsStyles.js';

function SuggestionButtons({ suggestions, onSuggestionClick }) {
    return (
        <div style={containerStyles}>
            {suggestions.map((suggestion, index) => (
                <button
                    key={index}
                    style={suggestionButtonStyles}
                    onClick={() => onSuggestionClick(suggestion)}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = suggestionButtonHoverStyles.backgroundColor;
                        e.currentTarget.style.color = suggestionButtonHoverStyles.color;
                        e.currentTarget.style.borderColor = suggestionButtonHoverStyles.borderColor;
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = COLORS.branco;
                        e.currentTarget.style.color = COLORS.textosSecundarios;
                        e.currentTarget.style.borderColor = COLORS.fundo;
                    }}
                >
                    {suggestion}
                </button>
            ))}
        </div>
    );
}

export default SuggestionButtons;
