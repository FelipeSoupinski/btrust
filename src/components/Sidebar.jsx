// src/components/Sidebar.jsx

import React from 'react';
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme.js';

// --- Sub-componente para o item de histórico ---
const HistoryItem = ({ title }) => (
    <div style={historyItemStyles}>
        {/* Usamos um ícone placeholder para a lixeira */}
        <span style={deleteIconStyles}>🗑️</span> 
        <span>{title}</span>
    </div>
);

// --- Estilos de Componente ---

const sidebarStyles = {
    width: '280px',
    backgroundColor: COLORS.principal, // Principal: #012C63
    color: COLORS.branco,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: FONTS.principal,
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
};

const logoStyles = {
    fontSize: FONT_SIZES.titulo,
    fontWeight: '700',
    marginBottom: '30px',
    fontFamily: FONTS.secundaria,
};

// Estilo para itens de navegação (ações principais)
const navItemStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '8px',
    fontSize: FONT_SIZES.texto,
    textDecoration: 'none',
    color: COLORS.branco,
};

// Estilo para o item 'Criar novo chat' (destacado)
const newChatStyles = {
    ...navItemStyles,
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Levemente mais claro
    fontWeight: '600',
};

const separatorStyles = {
    borderColor: 'rgba(255, 255, 255, 0.2)',
    margin: '15px 0',
};

const historySectionStyles = {
    marginTop: '20px',
    overflowY: 'auto', // Permite scroll no histórico
    flexGrow: 1,
};

const historyTitleStyles = {
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.detalhes, // Usando o detalhe para os títulos de seção
    textTransform: 'uppercase',
    marginBottom: '10px',
    fontWeight: '600',
};

const historyItemStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 5px',
    fontSize: FONT_SIZES.texto,
    cursor: 'pointer',
    borderRadius: '4px',
    // Invertemos a ordem no JSX, mas a lixeira fica na direita
    
};

const deleteIconStyles = {
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    marginLeft: '10px',
};


function Sidebar() {
  // Dados simulados do histórico (serão substituídos por dados reais depois)
  const todayHistory = ['seleção esquerda 1', 'seleção esquerda 2', 'seleção esquerda 3'];
  const weekHistory = ['seleção esquerda A', 'seleção esquerda B', 'seleção esquerda C'];

  return (
    <div style={sidebarStyles}>
      
      {/* 1. Logo */}
      <h1 style={logoStyles}>[B]³</h1>

      {/* 2. Ações Principais */}
      <nav>
        
        {/* Novo Chat (Destacado) */}
        <div style={newChatStyles}>
          <span style={{ marginRight: '10px' }}>📝</span>
          Criar novo chat
        </div>
        
        {/* Escolher Modelo */}
        <div style={navItemStyles}>
          <span style={{ marginRight: '10px' }}>⚙️</span>
          Escolher um modelo
        </div>
      </nav>
      
      {/* Separador */}
      <hr style={separatorStyles} />

      {/* 3. Histórico de Conversas */}
      <div style={historySectionStyles}>
        
        {/* Seção "Hoje" */}
        <h3 style={historyTitleStyles}>Hoje</h3>
        {todayHistory.map((title, index) => (
          <HistoryItem key={`t-${index}`} title={title} />
        ))}
        
        {/* Seção "Esta Semana" */}
        <h3 style={{...historyTitleStyles, marginTop: '20px'}}>Esta semana</h3>
        {weekHistory.map((title, index) => (
          <HistoryItem key={`w-${index}`} title={title} />
        ))}
      </div>
      
    </div>
  );
}

export default Sidebar;