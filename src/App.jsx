// src/App.jsx
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';
import { AppProvider, useAppContext } from './context/AppContext.jsx';
import AppRoutes from './routes/index.jsx';
import * as styles from './styles/App.styles.js';

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

  return (
    <div style={styles.layoutStyles(isSidebarOpen)}>
      {/* Botão de abrir sidebar */}
      {showOpenButton && !isSidebarOpen && (
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={() => setIsSidebarOpen(true)}
          style={styles.openButtonStyles}
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Área Principal */}
      <div style={styles.mainContentStyles}>
        <Topbar />
        <div style={styles.pageContainerStyles}>
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
