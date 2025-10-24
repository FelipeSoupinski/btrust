// src/pages/ChatPage.jsx

import React from 'react';
import ChatInput from '../components/ChatInput.jsx';
import { FONT_SIZES, COLORS, FONTS } from '../styles/theme.js';

const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end', // Alinha o conteúdo para a parte de baixo
    height: '100%', 
    width: '100%',
    padding: '0 20px 50px 20px', // Adiciona padding no rodapé para o input
};

const titleContainerStyles = {
    flexGrow: 1, // Faz com que ocupe todo o espaço acima do input
    display: 'flex',
    alignItems: 'center', // Centraliza verticalmente o título
    justifyContent: 'center',
    width: '100%',
};

const titleStyles = {
    fontSize: FONT_SIZES.titulo,
    color: COLORS.textosSecundarios,
    fontWeight: '700',
    fontFamily: FONTS.secundaria,
    opacity: 0.3, // Opacidade baixa para simular o texto "placeholder"
};


function ChatPage() {
  return (
    <div style={containerStyles}>
        
        <div style={titleContainerStyles}>
             {/* Texto Centralizado na Tela Vazia */}
            <h1 style={titleStyles}>BTrust</h1> 
        </div>
        
        {/* O ChatInput, alinhado no rodapé desta área */}
        <ChatInput />
        
    </div>
  );
}

export default ChatPage;