// src/components/Sidebar.jsx

import React, { useState } from 'react';
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme.js';
import { useAppContext } from '../context/AppContext.jsx';

// ----------------------------------------------------
// DADOS SIMULADOS E FUNÇÕES DE AJUDA
// ----------------------------------------------------
const INITIAL_CHATS = [
    { id: 101, title: 'Análise de...', date: '2025-05-20' },
    { id: 102, title: 'Predição de...', date: '2025-05-15' },
    { id: 103, title: 'Relatório de...', date: '2025-05-01' },
    { id: 201, title: 'Otimização...', date: '2025-04-28' },
    { id: 202, title: 'Simulação de...', date: '2025-04-10' },
];

const groupChatsByMonth = (chats) => {
    return chats.reduce((groups, chat) => {
        const date = new Date(chat.date);
        const monthYear = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase();
        
        if (!groups[monthYear]) {
            groups[monthYear] = [];
        }
        groups[monthYear].push(chat);
        return groups;
    }, {});
};


// ----------------------------------------------------
// ESTILOS DE COMPONENTE
// ----------------------------------------------------

const sidebarStyles = {
    width: '100%',
    height: '100vh',
    boxSizing: 'border-box',
    backgroundColor: COLORS.principal,
    color: COLORS.branco,
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: FONTS.principal,
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
    flexShrink: 0,
    overflow: 'hidden',
};

const logoContainerStyles = {
    padding: '0 20px',
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const logoStyles = {
    fontSize: FONT_SIZES.titulo,
    fontWeight: '700',
    fontFamily: FONTS.secundaria,
    color: COLORS.branco,
};

const closeButtonStyles = {
    fontSize: '20px',
    cursor: 'pointer',
    color: COLORS.branco,
    padding: '8px',
    opacity: 0.7,
    transition: 'opacity 0.2s',
    borderRadius: '4px',
};

const navAreaStyles = {
    padding: '0 20px',
};

const navItemBaseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '8px',
    fontSize: FONT_SIZES.texto,
    textDecoration: 'none',
    color: COLORS.branco,
    transition: 'all 0.2s',
    borderLeft: '3px solid transparent',
};

const navItemIconStyles = {
    marginRight: '12px',
    fontSize: '18px',
};

const separatorStyles = {
    borderColor: 'rgba(255, 255, 255, 0.15)',
    margin: '20px 20px',
    borderStyle: 'solid',
    borderWidth: '0 0 1px 0',
};

const historySectionStyles = {
    marginTop: '10px',
    overflowY: 'auto',
    flexGrow: 1,
    padding: '0 20px',
};

const historyTitleStyles = {
    fontSize: FONT_SIZES.subtexto,
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    marginBottom: '12px',
    marginTop: '20px',
    fontWeight: '700',
    letterSpacing: '0.5px',
};

const deleteIconStyles = {
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    opacity: 0,
    padding: '4px 8px',
    transition: 'opacity 0.2s',
    fontSize: '16px',
};



// ----------------------------------------------------
// SUB-COMPONENTES
// ----------------------------------------------------

const ChatHistoryItem = ({ chat, activeChat, setActiveChat, onDelete }) => {
    const isSelected = chat.id === activeChat;
    
    const itemActiveStyles = {
        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        borderLeft: isSelected ? `3px solid ${COLORS.detalhes}` : '3px solid transparent',
    };
    
    const combinedStyles = {
        ...navItemBaseStyles,
        ...itemActiveStyles,
        padding: '10px 12px',
    };

    return (
        <div 
            style={combinedStyles}
            onClick={() => setActiveChat(chat.id)}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = isSelected ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)';
                const deleteIcon = e.currentTarget.querySelector('.delete-icon');
                if (deleteIcon) deleteIcon.style.opacity = 1;
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = isSelected ? 'rgba(255, 255, 255, 0.1)' : 'transparent';
                const deleteIcon = e.currentTarget.querySelector('.delete-icon');
                if (deleteIcon) deleteIcon.style.opacity = 0;
            }}
        >
            <span style={{ 
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap', 
                maxWidth: '80%',
                fontSize: FONT_SIZES.subtexto,
            }}>
                {chat.title}
            </span>
            <span 
                className="delete-icon"
                style={deleteIconStyles}
                onClick={(e) => { 
                    e.stopPropagation(); 
                    onDelete(chat.id); 
                }}
            >
                🗑️
            </span>
        </div>
    );
};

const NavItem = ({ title, icon, action, isActive, isNewChat = false }) => {
    const itemActiveStyles = {
        backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        borderLeft: isActive ? `3px solid ${COLORS.detalhes}` : '3px solid transparent',
    };

    const combinedStyles = {
        ...navItemBaseStyles,
        ...itemActiveStyles,
        fontWeight: isNewChat ? '600' : 'normal',
    };

    return (
        <div 
            style={combinedStyles}
            onClick={action}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = isActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent';
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={navItemIconStyles}>{icon}</span>
                {title}
            </div>
        </div>
    );
};


// ----------------------------------------------------
// COMPONENTE PRINCIPAL (Sidebar)
// ----------------------------------------------------

function Sidebar() {
    const { 
        activeScreen, 
        setActiveScreen,
        setIsSidebarOpen,
    } = useAppContext(); 

    const [chats, setChats] = useState(INITIAL_CHATS);
    const [activeChat, setActiveChat] = useState(INITIAL_CHATS[0].id); 
    const chatsByMonth = groupChatsByMonth(chats);
    
    const handleCreateNewChat = () => {
        const newChatTitle = "Novo Chat " + (chats.length + 1);
        const newChat = { 
            id: Date.now(), 
            title: newChatTitle, 
            date: new Date().toISOString().split('T')[0]
        };
        setChats([newChat, ...chats]);
        setActiveChat(newChat.id);
        setActiveScreen('chat');
    };
    
    const handleDeleteChat = (id) => {
        setChats(chats.filter(chat => chat.id !== id));
        if (activeChat === id) {
            const remainingChats = chats.filter(chat => chat.id !== id);
            setActiveChat(remainingChats[0]?.id || null);
        }
    };
    
    const isNewChatActive = activeChat === null && activeScreen === 'chat';

    return (
        // O 'return' está correto, sem a lógica de display:none
        <div style={sidebarStyles}>

            {/* 1. Logo B3 e Botão de Fechar */}
            <div style={logoContainerStyles}>
                <span style={logoStyles}>B3 Logo</span>
                <span
                    onClick={() => setIsSidebarOpen(false)} // Ação: FECHAR
                    style={closeButtonStyles}
                    onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                    onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
                >
                    ❮
                </span>
            </div>

            {/* 2. Ações Principais */}
            <nav style={navAreaStyles}>
                <NavItem
                    title="Criar novo chat"
                    icon="📝"
                    action={handleCreateNewChat}
                    isActive={isNewChatActive}
                    isNewChat={true}
                />
                <NavItem
                    title="Escolher um modelo"
                    icon="⚙️"
                    action={() => setActiveScreen('model-select')}
                    isActive={activeScreen === 'model-select'}
                />
            </nav>
            
            {/* Separador */}
            <hr style={separatorStyles} />

            {/* 3. Histórico de Conversas */}
            <div style={historySectionStyles}>
                {Object.entries(chatsByMonth).map(([monthYear, monthlyChats]) => (
                    <React.Fragment key={monthYear}>
                        <h3 style={historyTitleStyles}>{monthYear}</h3>
                        {monthlyChats.map(chat => (
                            <ChatHistoryItem 
                                key={chat.id}
                                chat={chat}
                                activeChat={activeChat}
                                setActiveChat={(id) => {
                                    setActiveChat(id);
                                    setActiveScreen('chat');
                                }}
                                onDelete={handleDeleteChat}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
            
        </div>
    );
}

export default Sidebar;