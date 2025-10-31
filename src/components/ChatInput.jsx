// src/components/ChatInput.jsx
import { useEffect, useRef, useState } from 'react';

import * as styles from '../styles/ChatInput.styles.js';

function ChatInput({ onSendMessage, disabled, onStop, onAddFiles, hasFiles }) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const canSend = !disabled && (inputValue.trim() || hasFiles);
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
    if (canSend) {
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

  const handleFileIconClick = () => {
    if (!disabled) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = e => {
    if (e.target.files.length > 0) {
      onAddFiles(e.target.files);
      // Limpa o input para permitir selecionar o mesmo arquivo novamente
      e.target.value = null;
    }
  };

  return (
    <div style={styles.inputContainerStyles(disabled)}>
      {/* Ícone de Anexo (Clip) */}
      <span style={styles.iconStyle(disabled)} onClick={handleFileIconClick}>📎</span>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} multiple accept=".pdf" onChange={handleFileChange} />

      {/* Campo de Texto */}
      <textarea
        ref={textareaRef}
        type="text"
        placeholder="Digite sua mensagem..."
        style={styles.inputFieldStyles}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      {/* Botão de Envio / Parar */}
      <button
        style={disabled ? styles.stopButtonStyles : styles.sendButtonStyles(canSend)}
        onClick={disabled ? onStop : handleSend}
        disabled={!canSend && !disabled}
      >
        {disabled ? (
          <span style={styles.sendIconStyles}>■</span> // Ícone de "parar"
        ) : (
          <span style={styles.sendIconStyles}>➤</span> // Ícone de "enviar"
        )}
      </button>
    </div>
  );
}

export default ChatInput;
