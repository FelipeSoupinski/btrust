// src/App.jsx
import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ModelSelectPage from './pages/ModelSelectPage.jsx';
import { COLORS } from './styles/theme.js';

// --- Componente de Layout Central ---
const AppLayout = () => {
  const { isSidebarOpen, activeScreen, setIsSidebarOpen } = useAppContext();
    const layoutStyles = {
        display: 'grid',
        gridTemplateColumns: isSidebarOpen ? '280px 1fr' : '0 1fr',
        height: '100vh',
        backgroundColor: COLORS.fundo,
        transition: 'grid-template-columns 0.3s ease',
        position: 'relative',
    };

    // O Header vai "flutuar" sobre o conteúdo.
    const mainContentStyles = {
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        height: '100vh',
        minWidth: 0,
        position: 'relative', 
    };

    const openButtonStyles = {
        position: 'absolute',
        top: '15px',
        left: '15px', // Fixo no canto da página
        zIndex: 20, // zIndex alto para ficar por cima
        fontSize: '20px',
        cursor: 'pointer',
        color: COLORS.principal, // Cor do botão
        padding: '5px',
    };

    const CurrentPage = activeScreen === 'chat'
        ? ChatPage
        : ModelSelectPage;

    return (
        <div style={layoutStyles}>

            {/* BOTÃO DE ABRIR ADICIONADO AQUI */}
            {/* Só aparece se a sidebar estiver fechada */}
            {!isSidebarOpen && (
                <span
                    onClick={() => setIsSidebarOpen(true)} // Ação: ABRIR
                    style={openButtonStyles}
                >
                    ❯
                </span>
            )}

            {/* Sidebar (Contém o botão de FECHAR) */}
            <Sidebar />

            {/* Área Principal */}
            <div style={mainContentStyles}>
                {/* Header (Contém Perfil e Dropdown) */}
                <Header />

                {/* Conteúdo */}
                <CurrentPage />
            </div>
        </div>
    );
};


// --- Componente App (Provider Wrapper) ---
function App() {
    return (
        <AppProvider>
            <AppLayout />
        </AppProvider>
    );
}

export default App;