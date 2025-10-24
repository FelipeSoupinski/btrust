// src/App.jsx
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import { AppProvider, useAppContext } from './context/AppContext.jsx';
import ChatPage from './pages/ChatPage.jsx';
import ModelSelectPage from './pages/ModelSelectPage.jsx';
import { getLayoutStyles, mainContentStyles, openButtonStyles } from './styles/AppStyles.js';

// --- Componente de Layout Central ---
const AppLayout = () => {
  const { isSidebarOpen, activeScreen, setIsSidebarOpen } = useAppContext();

    const CurrentPage = activeScreen === 'chat'
        ? ChatPage
        : ModelSelectPage;

    return (
        <div style={getLayoutStyles(isSidebarOpen)}>

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