// src/components/ChatInput.jsx
import React from 'react';
import {
    inputContainerStyles,
    inputFieldStyles,
    iconStyle,
    sendButtonStyles,
    sendIconStyles,
} from './styles/ChatInputStyles.js';

function ChatInput({ value = '', onChange, onSend }) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (onSend && value.trim()) {
                onSend(value);
            }
        }
    };

    const handleSendClick = () => {
        if (onSend && value.trim()) {
            onSend(value);
        }
    };

    return (
        <div style={inputContainerStyles}>
            <span 
                style={iconStyle}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
                📎
            </span>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem... (Enter para enviar, Shift+Enter para nova linha)"
                style={inputFieldStyles}
            />

            <button 
                style={sendButtonStyles}
                onClick={handleSendClick}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(1, 44, 99, 0.3)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                <span style={sendIconStyles}>➤</span>
            </button>
        </div>
    );
}

export default ChatInput;
