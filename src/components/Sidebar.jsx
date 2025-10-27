// src/components/Sidebar.jsx

import { faChevronLeft, faGear, faMessage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppContext } from '../context/AppContext.jsx';
import * as styles from '../styles/Sidebar.styles.js';

// ----------------------------------------------------
// DADOS SIMULADOS E FUNÇÕES DE AJUDA
// ----------------------------------------------------
const groupChatsByMonth = chats => {
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
// SUB-COMPONENTES
// ----------------------------------------------------

const ChatHistoryItem = ({ chat, activeChat, setActiveChat, onDelete }) => {
  const navigate = useNavigate();

  const isSelected = chat.id === activeChat;

  const combinedStyles = {
    ...styles.navItemBaseStyles,
    ...styles.itemActiveStyles(isSelected, false),
    marginLeft: '0',
    padding: '10px 15px',
  };

  return (
    <div
      style={combinedStyles}
      onClick={() => {
        setActiveChat(chat.id);
        navigate('/chat'); // Navega para a rota de chat
      }}
      onMouseOver={e =>
        (e.currentTarget.style.backgroundColor = isSelected
          ? 'rgba(0, 0, 0, 0.2)'
          : 'rgba(255, 255, 255, 0.1)')
      }
      onMouseOut={e =>
        (e.currentTarget.style.backgroundColor = isSelected ? 'rgba(0, 0, 0, 0.2)' : 'transparent')
      }
    >
      <span style={styles.chatItemTextStyles}>{chat.title}</span>
      <FontAwesomeIcon
        icon={faTrash}
        style={styles.deleteIconStyles}
        onClick={e => {
          e.stopPropagation();
          onDelete(chat.id);
        }}
        onMouseOver={e => (e.currentTarget.style.opacity = 1)}
        onMouseOut={e => (e.currentTarget.style.opacity = 0.5)}
      />
    </div>
  );
};

const NavItem = ({ title, icon, action, isActive, isNewChat = false }) => {
  const combinedStyles = {
    ...styles.navItemBaseStyles,
    ...styles.itemActiveStyles(false, isActive),
    fontWeight: isNewChat ? '600' : 'normal',
  };

  return (
    <div
      style={combinedStyles}
      onClick={action}
      onMouseOver={e =>
        (e.currentTarget.style.backgroundColor = isActive
          ? 'rgba(0, 0, 0, 0.2)'
          : 'rgba(255, 255, 255, 0.1)')
      }
      onMouseOut={e =>
        (e.currentTarget.style.backgroundColor = isActive ? 'rgba(0, 0, 0, 0.2)' : 'transparent')
      }
    >
      <div style={styles.navItemContainerStyles}>
        <FontAwesomeIcon icon={icon} style={styles.navItemIconStyles} />
        {title}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// COMPONENTE PRINCIPAL (Sidebar)
// ----------------------------------------------------

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
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
    const newChatTitle = 'Novo Chat ' + (chats.length + 1);
    const newChat = {
      id: Date.now(),
      title: newChatTitle,
      date: new Date().toISOString().split('T')[0],
    };
    setChats([newChat, ...chats]);
    setChatMessages(prev => ({ ...prev, [newChat.id]: [] })); // Cria um array de mensagens vazio para o novo chat
    setActiveChat(newChat.id);
    navigate('/chat');
  };

  const handleDeleteChat = id => {
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

  const isNewChatActive = activeChat === null && location.pathname === '/chat';
  const isModelSelectActive = location.pathname === '/model-select';

  const finalSidebarStyles = {
    ...styles.sidebarStyles,
    ...(!isSidebarOpen && styles.closedSidebarStyles),
  };

  return (
    <div style={finalSidebarStyles}>
      <div style={styles.contentStyles(isSidebarOpen)}>
        {/* 1. Logo B3 e Botão de Fechar */}
        <div style={styles.logoContainerStyles}>
          <span style={styles.logoStyles}>BTrust</span>
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => setIsSidebarOpen(false)}
            style={styles.closeButtonStyles}
            onMouseOver={e => (e.currentTarget.style.opacity = 1)}
            onMouseOut={e => (e.currentTarget.style.opacity = 0.7)}
          />
        </div>

        {/* 2. Ações Principais */}
        <nav style={styles.navAreaStyles}>
          <NavItem
            title="Criar novo chat"
            icon={faMessage}
            action={handleCreateNewChat}
            isActive={isNewChatActive}
            isNewChat={true}
          />
          <NavItem
            title="Escolher um modelo"
            icon={faGear}
            action={() => {
              navigate('/model-select');
              setActiveChat(null); // Desmarca qualquer chat ativo
            }}
            isActive={isModelSelectActive}
          />
        </nav>

        {/* Separador */}
        <hr style={styles.separatorStyles} />

        {/* 3. Histórico de Conversas */}
        <div style={styles.historySectionStyles}>
          {Object.entries(chatsByMonth).map(([monthYear, monthlyChats]) => (
            <React.Fragment key={monthYear}>
              <h3 style={styles.historyTitleStyles}>{monthYear}</h3>
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
    </div>
  );
}

export default Sidebar;
