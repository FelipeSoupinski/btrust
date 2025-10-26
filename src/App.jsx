// src/App.jsx
import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ModelSelectPage from './pages/ModelSelectPage.jsx';
import { COLORS } from './styles/theme.js';

const AppLayout = () => {
    const { isSidebarOpen, activeScreen, setIsSidebarOpen } = useAppContext();

    const layoutStyles = {
        display: 'grid',
        gridTemplateColumns: isSidebarOpen ? '280px 1fr' : '0fr 1fr',
        height: '100vh',
        width: '100vw', // Alterado para garantir a largura total da viewport
        backgroundColor: COLORS.fundo,
        transition: 'grid-template-columns 0.3s ease',
        overflow: 'hidden',
    };

    const mainContentStyles = {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        backgroundColor: COLORS.fundo,
        overflow: 'hidden', // Impede o scroll do container principal
    };


    const pageContainerStyles = {
        flexGrow: 1,
        overflowY: 'auto', // Adiciona scroll apenas à área da página
        width: '100%',
        display: 'flex', // Garante que o filho (ChatPage/ModelSelectPage) ocupe todo o espaço
    };

    const openButtonStyles = {
        position: 'absolute',
        top: '15px',
        left: '15px',
        zIndex: 20,
        fontSize: '20px',
        cursor: 'pointer',
        color: COLORS.principal,
        padding: '5px',
        backgroundColor: COLORS.branco,
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    };

    const CurrentPage = activeScreen === 'chat' ? ChatPage : ModelSelectPage;


    return (
        <div style={layoutStyles}>
            {/* Botão de abrir sidebar */}
            {!isSidebarOpen && (
                <span onClick={() => setIsSidebarOpen(true)} style={openButtonStyles}>
                    ❯
                </span>
            )}

            {/* Sidebar */}
            <Sidebar />

            {/* Área Principal */}
            <div style={mainContentStyles}>
                <Topbar />
                <div style={pageContainerStyles}>
                    <CurrentPage />
                </div>
            </div>
        </div>
    );
};

function App() {
    return (
        <AppProvider>
            <AppLayout />
        </AppProvider>
    );
}

export default App;