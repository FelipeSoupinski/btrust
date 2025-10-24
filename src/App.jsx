import React from 'react';
import Sidebar from './components/Sidebar.jsx'; 
import Header from './components/Header.jsx'; 
import ChatPage from './pages/ChatPage.jsx'; 
import { COLORS } from './styles/theme.js'; 

const layoutStyles = {
  display: 'grid',
  gridTemplateColumns: '280px 1fr', 
  height: '100vh',
  backgroundColor: COLORS.fundo, 
};

const mainContentStyles = {
    display: 'grid',
    gridTemplateRows: '60px 1fr', 
    overflow: 'hidden',
};

function App() {
  return (
    <div style={layoutStyles}>
      
      <Sidebar />

      <div style={mainContentStyles}>
        
        <Header />

        <ChatPage /> 
        
      </div>
    </div>
  );
}

export default App;