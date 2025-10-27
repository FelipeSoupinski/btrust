// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { AppProvider, useAppContext } from './context/AppContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import Login from './components/Login.jsx';
import AppRoutes from './routes/index.jsx';
import { COLORS } from './styles/theme.js';

const AppLayout = () => {
    const { isSidebarOpen, setIsSidebarOpen } = useAppContext();
    const [showOpenButton, setShowOpenButton] = useState(!isSidebarOpen);

    useEffect(() => {
        let timer;
        if (isSidebarOpen) {
            // Se a sidebar está abrindo, esconde o botão imediatamente.
            setShowOpenButton(false);
        } else {
            // Se a sidebar está fechando, espera a animação terminar (300ms) para mostrar o botão.
            timer = setTimeout(() => {
                setShowOpenButton(true);
            }, 300);
        }
        return () => clearTimeout(timer); // Limpa o timeout se o componente for desmontado.
    }, [isSidebarOpen]);

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

    return (
        <div style={layoutStyles}>
            {/* Botão de abrir sidebar */}
            {showOpenButton && !isSidebarOpen && (
                <FontAwesomeIcon 
                    icon={faChevronRight}
                    onClick={() => setIsSidebarOpen(true)} 
                    style={openButtonStyles}
                />
            )}

            {/* Sidebar */}
            <Sidebar />

            {/* Área Principal */}
            <div style={mainContentStyles}>
                <Topbar />
                <div style={pageContainerStyles}>
                    <AppRoutes />
                </div>
            </div>
        </div>
    );
};

function App() {
    return (
        <AppProvider>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<AppLayout />} />
            </Routes>
        </AppProvider>
    );
}

export default App;