// src/components/ChatInput.jsx

import React from 'react';
import { COLORS, FONT_SIZES } from '../styles/theme.js';

const inputContainerStyles = {
    width: '100%',
    maxWidth: '700px', // Limita a largura do input na tela
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    backgroundColor: COLORS.branco,
    borderRadius: '25px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${COLORS.fundo}`, // Borda leve para definição
};

const inputFieldStyles = {
    flexGrow: 1,
    border: 'none',
    padding: '10px 15px',
    fontSize: FONT_SIZES.texto,
    outline: 'none',
    color: COLORS.textosSecundarios,
    background: 'transparent',
};

// Estilo para os ícones (Anexo e Envio)
const iconStyle = {
    fontSize: '20px',
    color: COLORS.textosSecundarios,
    cursor: 'pointer',
    padding: '5px',
};

const sendButtonStyles = {
    width: '40px',
    height: '40px',
    backgroundColor: COLORS.principal, // Principal: 012C63
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'none',
    marginLeft: '5px',
    flexShrink: 0, // Garante que o botão não encolha
};

const sendIconStyles = {
    fontSize: '18px',
    color: COLORS.branco,
};

function ChatInput() {
  return (
    <div style={inputContainerStyles}>
      
      {/* Ícone de Anexo (Clip) */}
      <span style={{...iconStyle, marginRight: '10px'}}>📎</span>
      
      {/* Campo de Texto */}
      <input
        type="text"
        placeholder="Digite sua mensagem... (Enter para enviar, Shift+Enter para nova linha)"
        style={inputFieldStyles}
      />
      
      {/* Botão de Envio */}
      <button style={sendButtonStyles}>
        <span style={sendIconStyles}>➤</span>
      </button>

    </div>
  );
}

export default ChatInput;