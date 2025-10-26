// src/context/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';

// --- Dados Simulados (Mock) para as Bases ---
// Estes são os dados que o ModelSelectPage.jsx vai usar
const MOCK_DATA_SOURCES = [
    { 
        id: 'b1', 
        name: 'Base de Marketing', 
        description: 'Análises de campanhas, performance de anúncios e segmentação de clientes.' 
    },
    { 
        id: 'b2', 
        name: 'Base Financeira', 
        description: 'Relatórios de risco, previsões de mercado e balanços patrimoniais.' 
    },
    { 
        id: 'b3', 
        name: 'Base Operacional', 
        description: 'Logística, eficiência de processos e dados de produção interna.' 
    },
    { 
        id: 'b4', 
        name: 'Base de RH', 
        description: 'Dados de contratação, performance de funcionários e folha de pagamento.' 
    },
    { 
        id: 'b5', 
        name: 'Base Jurídica', 
        description: 'Documentos legais, análise de contratos e compliance.' 
    },
    { 
        id: 'b6', 
        name: 'Base de TI', 
        description: 'Logs de sistema, gestão de incidentes e segurança de rede.' 
    },
    { 
        id: 'b7', 
        name: 'Base de Logística', 
        description: 'Rastreamento de entregas, gestão de inventário e otimização de rotas.' 
    },
];
// ----------------------------------------------


// 1. Criar o Contexto
const AppContext = createContext(null);

// 2. Criar o "Provedor" (O componente "Pai" que guarda a informação)
export function AppProvider({ children }) {
    
    // --- Estados Globais ---
    
    // Estado para controlar a tela atual ('chat' ou 'model-select')
    const [activeScreen, setActiveScreen] = useState('chat');
    
    // Estado para controlar a sidebar (aberta ou fechada)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Estado que guarda TODAS as bases de dados disponíveis
    const [availableDataSources, setAvailableDataSources] = useState(MOCK_DATA_SOURCES);
    
    // Estado que guarda as bases que o utilizador SELECIONOU
    const [selectedDataSources, setSelectedDataSources] = useState([]);

    // --- Funções Globais ---

    // Função para adicionar/remover uma base de dados (usada no Header e ModelSelectPage)
    const toggleDataSource = (id) => {
        setSelectedDataSources(prevSelected => {
            if (prevSelected.includes(id)) {
                // Se já existe, remove
                return prevSelected.filter(sourceId => sourceId !== id);
            } else {
                // Se não existe, adiciona
                return [...prevSelected, id];
            }
        });
    };

    // 3. Montar o "pacote" de informações que todos os filhos podem aceder
    const value = {
        // Variáveis
        activeScreen,
        isSidebarOpen,
        availableDataSources,
        selectedDataSources,
        
        // Funções
        setActiveScreen,
        setIsSidebarOpen,
        setSelectedDataSources,
        toggleDataSource,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

// 4. Criar o "Hook" (O atalho para os componentes "Filho" usarem a informação)
export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext deve ser usado dentro de um AppProvider');
    }
    return context;
}