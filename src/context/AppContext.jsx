// src/context/AppContext.jsx

import React, { createContext, useState, useContext } from 'react';

// 1. Criação do Contexto
export const AppContext = createContext();

// Dados de Exemplo para as Bases de Dados
const MOCK_DATA_SOURCES = [
    { id: 1, name: 'Marketing', description: 'Descrição simples sobre a base de dados' },
    { id: 2, name: 'Finanças', description: 'Dados financeiros e relatórios de mercado' },
    { id: 3, name: 'Regulatório', description: 'Documentação e normas da B3' },
    { id: 4, name: 'Tecnologia', description: 'Dados sobre infraestrutura e sistemas' },
    { id: 5, name: 'Risco', description: 'Modelos e análises de risco' },
    { id: 6, name: 'Ativos', description: 'Informações detalhadas sobre ativos' },
];

// 2. Criação do Provider
export const AppProvider = ({ children }) => {
    // Controla qual tela está ativa: 'chat' (padrão) ou 'model-select'
    const [activeScreen, setActiveScreen] = useState('chat'); 
    
    // Controla o estado da sidebar (aberta ou fechada)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

    // Lista de todas as bases de dados disponíveis
    const [availableDataSources] = useState(MOCK_DATA_SOURCES);
    
    // Lista de IDs das bases de dados que o usuário SELECIONOU e estão ATIVAS para o chat
    // Inicialmente vazia, só será preenchida após a seleção na tela ModelSelectPage
    const [selectedDataSources, setSelectedDataSources] = useState([]); 

    // Função para ligar/desligar uma base de dados no Dropdown do Header
    const toggleDataSource = (id) => {
        setSelectedDataSources(prev => 
            prev.includes(id) 
                ? prev.filter(sourceId => sourceId !== id) // Remove se já estiver lá
                : [...prev, id] // Adiciona se não estiver lá
        );
    };

    const contextValue = {
        activeScreen,
        setActiveScreen,
        isSidebarOpen,
        setIsSidebarOpen,
        availableDataSources,
        selectedDataSources,
        setSelectedDataSources,
        toggleDataSource,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// Hook customizado para fácil consumo
export const useAppContext = () => {
    return useContext(AppContext);
};