// src/components/Sidebar.jsx

import React, { useState } from 'react';
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme.js';

// ----------------------------------------------------
// DADOS SIMULADOS E FUNÇÕES DE AJUDA (MANTIDOS NO TOPO)
// ----------------------------------------------------
const INITIAL_CHATS = [
    { id: 101, title: 'Análise de Risco de Crédito', date: '2025-05-20' },
    { id: 102, title: 'Predição de Mercado', date: '2025-05-15' },
    { id: 103, title: 'Relatório de Ativos Digitais', date: '2025-05-01' },
    { id: 201, title: 'Otimização de Portfólio', date: '2025-04-28' },
    { id: 202, title: 'Simulação de Investimento', date: '2025-04-10' },
];

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
// ESTILOS DE COMPONENTE (AGORA TODOS DEFINIDOS AQUI EM CIMA)
// ----------------------------------------------------

const sidebarStyles = {
    width: '280px',
    backgroundColor: COLORS.principal, // Principal: #012C63
    color: COLORS.branco,
    padding: '20px 0', 
    display: 'flex',
    flexDirection: 'column',
    fontFamily: FONTS.principal,
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
};

const logoContainerStyles = {
    padding: '0 20px',
    marginBottom: '30px',
};

const logoStyles = {
    fontSize: FONT_SIZES.titulo,
    fontWeight: '700',
    fontFamily: FONTS.secundaria,
};

const navAreaStyles = {
    padding: '0 20px',
};

const navItemBaseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 15px 10px 0', 
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '8px',
    fontSize: FONT_SIZES.texto,
    textDecoration: 'none',
    color: COLORS.branco,
    marginLeft: '15px', 
    borderLeft: '5px solid transparent',
    transition: 'background-color 0.1s',
};

const navItemIconStyles = {
    marginRight: '10px',
};

const separatorStyles = { // Definido aqui para ser acessível
    borderColor: 'rgba(255, 255, 255, 0.2)',
    margin: '15px 0',
    borderStyle: 'solid', // Adicionando para garantir a renderização
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
// SUB-COMPONENTES (AGORA DEFINIDOS AQUI EM CIMA PARA ACESSAR OS ESTILOS)
// ----------------------------------------------------

// Componente Item de Histórico (ChatHistoryItem)
const ChatHistoryItem = ({ chat, activeChat, setActiveChat, onDelete }) => {
    
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
            onClick={() => setActiveChat(chat.id)}
            // Simulação do Hover (mantida sem pseudo-seletores)
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

// Componente Item de Navegação (NavItem)
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
    
    const navItemIconStyles = { // Definido aqui para ser acessível
        marginRight: '10px',
    };

    return (
        <div 
            style={combinedStyles}
            onClick={action}
            // Simulação do Hover
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

function Sidebar({ setActiveScreen }) { // Prop para mudar de Chat para Model Select
    const [chats, setChats] = useState(INITIAL_CHATS);
    const [activeChat, setActiveChat] = useState(INITIAL_CHATS[0].id);
    
    const chatsByMonth = groupChatsByMonth(chats);

    // --- Ações ---
    
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
        if (activeChat === id && chats.length > 1) {
            setActiveChat(chats.filter(chat => chat.id !== id)[0]?.id || null);
        } else if (chats.length === 1) {
             setActiveChat(null);
        }
    };
    
    // Define se o botão "Criar Novo Chat" deve estar ativo (quando nenhum chat do histórico está selecionado)
    const isNewChatActive = activeChat === null;

    return (
        <div style={sidebarStyles}>
            
            {/* 1. Logo B3 */}
            <div style={logoContainerStyles}>
                <span style={logoStyles}>B3 Logo</span>
            </div>

            {/* 2. Ações Principais */}
            <nav style={navAreaStyles}>
                
                {/* Criar Novo Chat */}
                <NavItem 
                    title="Criar novo chat"
                    icon="📝"
                    action={handleCreateNewChat}
                    isActive={isNewChatActive} 
                    isNewChat={true}
                />
                
                {/* Escolher um Modelo */}
                <NavItem 
                    title="Escolher um modelo"
                    icon="⚙️"
                    action={() => setActiveScreen('model-select')} 
                    isActive={!isNewChatActive && activeChat === null} // Ativo se Model Select estiver selecionado
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