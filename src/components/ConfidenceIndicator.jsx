import React from 'react';
import {
    confidenceContainerStyles,
    confidenceHeaderStyles,
    confidenceLabelStyles,
    confidenceValueStyles,
    progressBarContainerStyles,
    progressBarFillStyles,
} from './styles/ConfidenceIndicatorStyles.js';

function ConfidenceIndicator({ percentage = 87 }) {
    return (
        <div style={confidenceContainerStyles}>
            <div style={confidenceHeaderStyles}>
                <span style={confidenceLabelStyles}>Confiança</span>
                <span style={confidenceValueStyles}>{percentage}%</span>
            </div>
            <div style={progressBarContainerStyles}>
                <div style={progressBarFillStyles(percentage)} />
            </div>
        </div>
    );
}

export default ConfidenceIndicator;
