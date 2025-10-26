// src/components/Sidebar.jsx

import React, { useState } from 'react';
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme.js';
import { useAppContext } from '../context/AppContext.jsx';

// ----------------------------------------------------
// DADOS SIMULADOS E FUNÇÕES DE AJUDA
// ----------------------------------------------------
const groupChatsByMonth = (chats) => {
    return chats.reduce((groups, chat) => {
        const date = new Date(chat.date);
        const monthYear = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
        
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
    minWidth: '280px',
    maxWidth: '280px',
    height: '100vh',
    boxSizing: 'border-box',
    backgroundColor: COLORS.principal,
    color: COLORS.branco,
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: FONTS.principal,
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    flexShrink: 0,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    transition: 'min-width 0.3s ease-in-out, max-width 0.3s ease-in-out, padding 0.3s ease-in-out',
};

const closedSidebarStyles = {
    minWidth: '0',
    maxWidth: '0',
    padding: '20px 0',
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
};

const closeButtonStyles = {
    fontSize: '20px',
    cursor: 'pointer',
    color: COLORS.branco,
    padding: '5px',
    opacity: 0.7,
    transition: 'opacity 0.2s',
};

const navAreaStyles = {
    padding: '0 20px',
};

const navItemBaseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '8px',
    fontSize: FONT_SIZES.texto,
    textDecoration: 'none',
    color: COLORS.branco,
    borderLeft: '5px solid transparent',
    transition: 'background-color 0.1s',
};

const navItemIconStyles = {
    marginRight: '10px',
};

const separatorStyles = { 
    borderColor: 'rgba(255, 255, 255, 0.2)',
    margin: '15px 0',
    borderStyle: 'solid', 
    borderWidth: '0 0 1px 0' 
};

const historySectionStyles = {
    marginTop: '20px',
    overflowY: 'auto',
    flexGrow: 1,
    padding: '0 20px',
};

const historyTitleStyles = {
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.detalhes, 
    textTransform: 'uppercase',
    marginBottom: '10px',
    fontWeight: '600',
    paddingLeft: '15px',
};

const deleteIconStyles = {
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    opacity: 0.5,
    padding: '0 5px',
    transition: 'opacity 0.2s',
};


// ----------------------------------------------------
// SUB-COMPONENTES
// ----------------------------------------------------

const ChatHistoryItem = ({ chat, activeChat, setActiveChat, onDelete, setActiveScreen }) => {
    
    const isSelected = chat.id === activeChat;
    
    const itemActiveStyles = {
        backgroundColor: isSelected ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        borderLeft: isSelected ? `5px solid ${COLORS.detalhes}` : '5px solid transparent', 
    };
    
    const combinedStyles = {
        ...navItemBaseStyles,
        ...itemActiveStyles,
        marginLeft: '0', 
        padding: '10px 15px',
    };

    return (
        <div 
            style={combinedStyles}
            onClick={() => {
                setActiveChat(chat.id);
                setActiveScreen('chat'); // Navega para a tela de chat
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = isSelected ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = isSelected ? 'rgba(0, 0, 0, 0.2)' : 'transparent'}
        >
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                {chat.title}
            </span>
            <span 
                style={deleteIconStyles}
                onClick={(e) => { e.stopPropagation(); onDelete(chat.id); }}
                onMouseOver={(e) => e.currentTarget.style.opacity = 1}
                onMouseOut={(e) => e.currentTarget.style.opacity = 0.5}
            >
                🗑️
            </span>
        </div>
    );
};

const NavItem = ({ title, icon, action, isActive, isNewChat = false }) => {
        
    const itemActiveStyles = {
        backgroundColor: isActive ? 'rgba(0, 0, 0, 0.2)' : 'transparent',
        borderLeft: isActive ? `5px solid ${COLORS.detalhes}` : '5px solid transparent',
    };

    const combinedStyles = {
        ...navItemBaseStyles,
        ...itemActiveStyles,
        fontWeight: isNewChat ? '600' : 'normal',
    };
    
    const navItemIconStyles = { 
        marginRight: '10px',
    };

    return (
        <div 
            style={combinedStyles}
            onClick={action}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = isActive ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = isActive ? 'rgba(0, 0, 0, 0.2)' : 'transparent'}
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
        isSidebarOpen,
        setIsSidebarOpen,
        chats,
        setChats,
        activeChat,
        setActiveChat,
        setChatMessages,
    } = useAppContext(); 

    const chatsByMonth = groupChatsByMonth(chats);
    
    const handleCreateNewChat = () => {
        const newChatTitle = "Novo Chat " + (chats.length + 1);
        const newChat = { 
            id: Date.now(), 
            title: newChatTitle, 
            date: new Date().toISOString().split('T')[0]
        };
        setChats([newChat, ...chats]);
        setChatMessages(prev => ({ ...prev, [newChat.id]: [] })); // Cria um array de mensagens vazio para o novo chat
        setActiveChat(newChat.id);
        setActiveScreen('chat');
    };
    
    const handleDeleteChat = (id) => {
        setChats(chats.filter(chat => chat.id !== id));
        if (activeChat === id) {
            const remainingChats = chats.filter(chat => chat.id !== id);
            setActiveChat(remainingChats[0]?.id || null);
        }
        // Opcional: remover as mensagens do chat deletado do estado
        setChatMessages(prev => {
            const newMessages = { ...prev };
            delete newMessages[id];
            return newMessages;
        });
    };
    
    const isNewChatActive = activeChat === null && activeScreen === 'chat';

    const finalSidebarStyles = {
        ...sidebarStyles,
        ...(!isSidebarOpen && closedSidebarStyles)
    };

    return (
        <div style={finalSidebarStyles}>

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
                    action={() => {
                        setActiveScreen('model-select');
                        setActiveChat(null); // Desmarca qualquer chat ativo
                    }}
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
                                setActiveChat={setActiveChat}
                                setActiveScreen={setActiveScreen}
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