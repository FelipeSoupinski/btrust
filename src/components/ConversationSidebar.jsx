import React from 'react';
import {
    sidebarContainerStyles,
    logoContainerStyles,
    actionButtonStyles,
    actionButtonTextStyles,
    dividerStyles,
    chatSectionTitleStyles,
    chatItemStyles,
    chatItemSelectedStyles,
    chatItemTextStyles,
    chatItemSelectedTextStyles,
    deleteIconStyles,
} from './styles/ConversationSidebarStyles.js';

function ConversationSidebar({ selectedChatId, onSelectChat, onNewChat, onDeleteChat }) {
    const todayChats = [
        { id: 1, title: 'Como posso te ajudar hoje?' },
        { id: 2, title: 'Análise de dados' },
        { id: 3, title: 'Consulta rápida' },
    ];

    const weekChats = [
        { id: 4, title: 'Relatório semanal' },
        { id: 5, title: 'Pesquisa mercado' },
        { id: 6, title: 'Resumo executivo' },
    ];

    const handleDeleteClick = (e, chatId) => {
        e.stopPropagation();
        if (onDeleteChat) {
            onDeleteChat(chatId);
        }
    };

    const renderChatItem = (chat, isSelected) => {
        const itemStyle = isSelected ? chatItemSelectedStyles : chatItemStyles;
        const textStyle = isSelected ? chatItemSelectedTextStyles : chatItemTextStyles;

        return (
            <button
                key={chat.id}
                style={itemStyle}
                onClick={() => onSelectChat && onSelectChat(chat.id)}
                onMouseOver={(e) => {
                    if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }
                }}
                onMouseOut={(e) => {
                    if (!isSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }
                }}
            >
                <span style={textStyle}>{chat.title}</span>
                <svg
                    style={deleteIconStyles}
                    viewBox="0 0 24 24"
                    fill="none"
                    onClick={(e) => handleDeleteClick(e, chat.id)}
                >
                    <rect x="7" y="4" width="10" height="2" fill="#FFFFFF" />
                    <rect x="2" y="6" width="20" height="14" rx="1" fill="#FFFFFF" />
                    <rect x="9" y="10" width="2" height="6" fill="#474747" />
                </svg>
            </button>
        );
    };

    return (
        <div style={sidebarContainerStyles}>
            <div style={logoContainerStyles} />

            <button
                style={actionButtonStyles}
                onClick={onNewChat}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16 2L20 6L9 17H5V13L16 2Z" stroke="#FFFFFF" strokeWidth="1.33" />
                    <path d="M2 20H22" stroke="#FFFFFF" strokeWidth="1.33" />
                </svg>
                <span style={actionButtonTextStyles}>Criar novo chat</span>
            </button>

            <button
                style={actionButtonStyles}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" fill="#FFFFFF" />
                </svg>
                <span style={actionButtonTextStyles}>Escolher um modelo</span>
            </button>

            <div style={dividerStyles} />

            <div style={chatSectionTitleStyles}>Hoje</div>
            {todayChats.map((chat) => renderChatItem(chat, chat.id === selectedChatId))}

            <div style={{ ...chatSectionTitleStyles, marginTop: '24px' }}>Esta semana</div>
            {weekChats.map((chat) => renderChatItem(chat, chat.id === selectedChatId))}
        </div>
    );
}

export default ConversationSidebar;
