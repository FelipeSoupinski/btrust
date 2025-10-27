// src/components/ChatInput.jsx

import { useState, useRef, useEffect } from 'react';

import { COLORS, FONT_SIZES, FONTS } from '../styles/theme.js';

const inputContainerStyles = {
  width: '100%',
  maxWidth: '842px', // Limita a largura máxima
  minHeight: '60px', // Altura mínima, mas pode crescer
  position: 'relative',
  display: 'flex',
  alignItems: 'center', // Alinha os itens no centro verticalmente
  backgroundColor: COLORS.branco,
  borderRadius: '30px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${COLORS.fundo}`,
};

const inputFieldStyles = {
  flexGrow: 1,
  padding: '0px 20px 0px', // Adiciona padding no topo para empurrar o texto para o centro
  border: 'none',
  fontSize: FONT_SIZES.texto,
  fontFamily: FONTS.principal,
  outline: 'none',
  color: COLORS.textosSecundarios,
  background: 'transparent',
  paddingLeft: '12px', // Espaço para o ícone de clipe
  borderRadius: '30px',
  resize: 'none',
  maxHeight: '150px', // Limite máximo de altura (aprox. 5-6 linhas)
  overflowY: 'auto', // Adiciona scroll quando o limite é atingido
  lineHeight: '24px', // Define uma altura de linha consistente
};

// Estilo para os ícones (Anexo e Envio)
const iconStyle = {
  fontSize: '20px',
  color: COLORS.textosSecundarios,
  cursor: 'pointer',
  padding: '0 5px', // Padding da base removido
  marginLeft: '7px',
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
  flexShrink: 0,
  marginRight: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
};

const stopButtonStyles = {
  ...sendButtonStyles,
  backgroundColor: COLORS.principal, // Um tom de vermelho para indicar "parar"
};

const sendIconStyles = {
  fontSize: '18px',
  color: COLORS.branco,
  lineHeight: '18px', // Ajuda a centralizar alguns ícones
};

function ChatInput({ onSendMessage, disabled, onStop }) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  // Efeito para ajustar a altura do textarea dinamicamente
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reseta a altura para recalcular o scrollHeight
      textarea.style.height = '24px'; // Reseta para a altura de uma linha (igual ao line-height)
      // Define a nova altura com base no conteúdo
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ ...inputContainerStyles, backgroundColor: disabled ? '#f0f0f0' : COLORS.branco }}>
      {/* Ícone de Anexo (Clip) */}
      <span style={{ ...iconStyle, marginRight: '10px', opacity: disabled ? 0.5 : 1 }}>📎</span>

      {/* Campo de Texto */}
      <textarea
        ref={textareaRef}
        type="text"
        placeholder="Digite sua mensagem..."
        style={inputFieldStyles}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      {/* Botão de Envio / Parar */}
      <button
        style={disabled ? stopButtonStyles : sendButtonStyles}
        onClick={disabled ? onStop : handleSend}
      >
        {disabled ? (
          <span style={sendIconStyles}>■</span> // Ícone de "parar"
        ) : (
          <span style={sendIconStyles}>➤</span> // Ícone de "enviar"
        )}
      </button>
    </div>
  );
}

export default ChatInput;
