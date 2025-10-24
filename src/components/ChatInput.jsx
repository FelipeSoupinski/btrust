// src/components/ChatInput.jsx

import React from 'react';
import { COLORS, FONT_SIZES } from '../styles/theme.js';

const inputContainerStyles = {
    width: '100%',
    maxWidth: '700px', // Limita a largura máxima
    position: 'relative',
    // margin: '0 auto', // <-- ADICIONADO: Isto centra o container
    display: 'flex',
    alignItems: 'center',
    // padding: '8px',
    backgroundColor: COLORS.branco,
    borderRadius: '30px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${COLORS.fundo}`,
};

const inputFieldStyles = {
    flexGrow: 1,
    padding: '15px 20px',
    border: 'none',
    fontSize: FONT_SIZES.texto,
    outline: 'none',
    color: COLORS.textosSecundarios,
    background: 'transparent',
    outline: 'none',
    paddingLeft: '12px', // Espaço para o ícone de clipe
    borderRadius: '30px',
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
    backgroundColor: COLORS.principal,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'none',
    marginLeft: '5px',
    flexShrink: 0,
};

const sendIconStyles = {
    fontSize: '18px',
    color: COLORS.branco,
};

function ChatInput() {
    return (
        <div style={inputContainerStyles}>

            {/* Ícone de Anexo (Clip) */}
            <span style={{ ...iconStyle, marginRight: '10px' }}>📎</span>

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