// src/context/AppContext.jsx
import { createContext, useContext, useMemo, useState, useCallback } from 'react';

const MOCK_DATA_SOURCES = [
  {
    id: 'b1',
    name: 'Base de Marketing',
    description: 'Análises de campanhas, performance de anúncios e segmentação de clientes.',
  },
  {
    id: 'b2',
    name: 'Base Financeira',
    description: 'Relatórios de risco, previsões de mercado e balanços patrimoniais.',
  },
  {
    id: 'b3',
    name: 'Base Operacional',
    description: 'Logística, eficiência de processos e dados de produção interna.',
  },
  {
    id: 'b4',
    name: 'Base de RH',
    description: 'Dados de contratação, performance de funcionários e folha de pagamento.',
  },
  {
    id: 'b5',
    name: 'Base Jurídica',
    description: 'Documentos legais, análise de contratos e compliance.',
  },
  {
    id: 'b6',
    name: 'Base de TI',
    description: 'Logs de sistema, gestão de incidentes e segurança de rede.',
  },
  {
    id: 'b7',
    name: 'Base de Logística',
    description: 'Rastreamento de entregas, gestão de inventário e otimização de rotas.',
  },
];

const INITIAL_CHATS = [
  { id: 101, title: 'Análise de Risco de Crédito', date: '2025-05-20' },
  { id: 102, title: 'Predição de Mercado', date: '2025-05-15' },
  { id: 103, title: 'Relatório de Ativos Digitais', date: '2025-05-01' },
];

const INITIAL_CHAT_MESSAGES = {
  101: [
    { author: 'user', text: 'Pode me ajudar com uma análise de risco?' },
    { author: 'bot', text: 'Claro! Por favor, forneça os dados do cliente.' },
  ],
  102: [],
  103: [],
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const availableDataSources = useMemo(() => MOCK_DATA_SOURCES, []);
  const [selectedDataSources, setSelectedDataSources] = useState([]);

  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChat, setActiveChat] = useState(INITIAL_CHATS[0]?.id || null);

  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);

  const toggleDataSource = id => {
    setSelectedDataSources(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(sourceId => sourceId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  /**
   * Cria uma cópia do chat ativo e a define como o novo chat ativo.
   */
  const branchActiveChat = useCallback(() => {
    if (!activeChat) {
      console.warn('Nenhum chat ativo para ramificar.');
      return;
    }

    const currentChat = chats.find(c => c.id === activeChat);
    const currentMessages = chatMessages[activeChat] || [];

    if (!currentChat) {
      console.warn('Chat ativo não encontrado nos dados.');
      return;
    }

    const newChatId = `branch-${Date.now()}`;
    const newTitle = currentChat.title + ' (Cópia)';
    const newChat = {
      id: newChatId,
      title: newTitle,
      date: new Date().toISOString().split('T')[0], // Formato AAAA-MM-DD
    };

    setChats(prevChats => [newChat, ...prevChats]);

    setChatMessages(prevMessages => ({
      ...prevMessages,
      [newChatId]: [...currentMessages],
    }));

    setActiveChat(newChatId);
    
  }, [activeChat, chats, chatMessages]);
  const value = {
    // Variáveis
    isSidebarOpen,
    availableDataSources,
    selectedDataSources,
    chats,
    activeChat,
    chatMessages,

    // Funções
    setIsSidebarOpen,
    setSelectedDataSources,
    toggleDataSource,
    setChats,
    setActiveChat,
    setChatMessages,
    branchActiveChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um AppProvider');
  }
  return context;
}