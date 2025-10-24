import React from 'react';
import ConfidenceIndicator from './ConfidenceIndicator.jsx';
import ReferenceCard from './ReferenceCard.jsx';
import {
    responseMessageContainerStyles,
    botAvatarStyles,
    botIconStyles,
    responseBubbleStyles,
    responseTextStyles,
} from './styles/ResponseMessageStyles.js';

function ResponseMessage({ text, confidence = 87, references = [] }) {
    return (
        <div style={responseMessageContainerStyles}>
            <div style={botAvatarStyles}>
                <svg style={botIconStyles} viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L6 7" stroke="#FFFFFF" strokeWidth="1.33" />
                    <path
                        d="M3 6C3 7.5 4.5 10 8 10C11.5 10 13 7.5 13 6"
                        stroke="#FFFFFF"
                        strokeWidth="1.33"
                    />
                    <rect x="2" y="10" width="1" height="0" fill="#FFFFFF" />
                    <rect x="13" y="10" width="1" height="0" fill="#FFFFFF" />
                    <rect x="10" y="9.67" width="1" height="1.33" fill="#FFFFFF" />
                    <rect x="6" y="9.67" width="1" height="1.33" fill="#FFFFFF" />
                </svg>
            </div>
            
            <div style={responseBubbleStyles}>
                <p style={responseTextStyles}>{text}</p>
                
                <ConfidenceIndicator percentage={confidence} />
                
                <ReferenceCard references={references} />
            </div>
        </div>
    );
}

export default ResponseMessage;
