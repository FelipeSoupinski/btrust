// src/components/ChatMessage.jsx
import React, { useState } from 'react';
import { COLORS, FONTS } from '../styles/theme';

const messageContainerStyles = (isUser) => ({
    display: 'flex',
    flexDirection: isUser ? 'row-reverse' : 'row',
    alignItems: 'flex-start',
    gap: '15px',
    width: '100%',
    maxWidth: '842px',
    margin: '15px 0',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
});

const avatarStyles = (isUser) => ({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    backgroundColor: isUser ? COLORS.detalhes : COLORS.principal,
    color: isUser ? COLORS.principal : COLORS.detalhes,
    fontFamily: FONTS.secundaria,
    fontWeight: '700',
});

const contentStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    // A largura será controlada pelo conteúdo filho
};

const botTextStyles = {
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap', // Mantém quebras de linha e espaços
};

const userBubbleStyles = {
    backgroundColor: COLORS.principal,
    color: COLORS.branco,
    padding: '10px 15px',
    borderRadius: '18px',
    ...botTextStyles,
    maxWidth: '650px', // Limite máximo para o balão não ficar muito largo
    wordBreak: 'break-word', // Garante a quebra de palavras longas
}

const seeMoreUserMessageStyle = {
    background: 'none',
    border: 'none',
    color: COLORS.principal,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '12px',
    padding: '5px 0',
    marginTop: '5px',
};

const UserMessageBubble = ({ text }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const characterLimit = 300;
    const isLongText = text.length > characterLimit;

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <div>
            <div style={userBubbleStyles}>
                {isLongText && !isExpanded ? `${text.substring(0, characterLimit)}...` : text}
            </div>
            {isLongText && (
                <button onClick={toggleExpand} style={seeMoreUserMessageStyle}>
                    {isExpanded ? 'Ver menos' : 'Ver mais'}
                </button>
            )}
        </div>
    );
};

const ChatMessage = ({ message }) => {
    const { text, author } = message;
    const isUser = author === 'user';

    return (
        <div style={messageContainerStyles(isUser)}>
            <div style={avatarStyles(isUser)}>
                {isUser ? '👤' : '🤖'}
            </div>
            {/* Para o bot, o container ocupa 100% da largura. Para o usuário, não. */}
            <div style={{ ...contentStyles, width: isUser ? 'auto' : '100%' }}>
                {isUser ? (
                    <UserMessageBubble text={text} />
                ) : (
                    typeof text === 'string' ? <div style={botTextStyles}>{text}</div> : text
                )}
            </div>
        </div>
    );
};

export default ChatMessage;