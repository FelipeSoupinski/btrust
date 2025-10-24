import React from 'react';
import {
    userMessageContainerStyles,
    userMessageBubbleStyles,
    userMessageTextStyles,
    userAvatarStyles,
    userIconStyles,
} from './styles/UserMessageStyles.js';

function UserMessage({ text }) {
    return (
        <div style={userMessageContainerStyles}>
            <div style={userMessageBubbleStyles}>
                <p style={userMessageTextStyles}>{text}</p>
            </div>
            <div style={userAvatarStyles}>
                <svg style={userIconStyles} viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="#0A0A0A" strokeWidth="1.33" />
                    <path
                        d="M3 13C3 10.7909 5.23858 9 8 9C10.7614 9 13 10.7909 13 13"
                        stroke="#0A0A0A"
                        strokeWidth="1.33"
                    />
                </svg>
            </div>
        </div>
    );
}

export default UserMessage;
