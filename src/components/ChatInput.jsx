// src/components/ChatInput.jsx
import { useEffect, useRef, useState } from 'react';

// Novos imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ChatInputMenu from './ChatInputMenu'; // O novo componente de menu

import * as styles from '../styles/ChatInput.styles.js';

// Recebe a nova prop 'onBranchChat'
function ChatInput({ onSendMessage, disabled, onStop, onAddFiles, hasFiles, onBranchChat }) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Novo estado para controlar o menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Nova ref para detectar cliques fora
  const menuRef = useRef(null);

  const canSend = !disabled && (inputValue.trim() || hasFiles);

  // Efeito para ajustar a altura do textarea (sem alterações)
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '24px';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [inputValue]);

  // Novo efeito para fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Se o menu está aberto e o clique foi fora do 'menuRef'
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    // Adiciona o listener
    document.addEventListener('mousedown', handleClickOutside);
    // Limpa o listener ao desmontar
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]); // A dependência é o próprio ref

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

  // Esta função agora é chamada pelo *menu*
  const handleFileIconClick = () => {
    if (!disabled) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = e => {
    if (e.target.files.length > 0) {
      onAddFiles(e.target.files);
      e.target.value = null;
    }
  };

  return (
    <div style={styles.inputContainerStyles(disabled)}>
      
      {/* Container para o botão de ação e o menu */}
      <div style={styles.actionButtonContainerStyles} ref={menuRef}>
        {/* Ícone de "Mais" (substitui o clip) */}
        <FontAwesomeIcon
          icon={faPlus}
          style={styles.iconStyle(disabled)}
          // Abre/fecha o menu
          onClick={!disabled ? () => setIsMenuOpen(prev => !prev) : undefined}
        />

        {/* Renderização condicional do menu */}
        {isMenuOpen && (
          <ChatInputMenu
            // Passa a função de anexar
            onAddFileClick={() => {
              handleFileIconClick();
              setIsMenuOpen(false); // Fecha o menu
            }}
            // Passa a função de ramificar
            onBranchChatClick={() => {
              onBranchChat();
              setIsMenuOpen(false); // Fecha o menu
            }}
          />
        )}
      </div>
      
      {/* O 'input file' escondido permanece o mesmo */}
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} multiple accept=".pdf" onChange={handleFileChange} />

      {/* Campo de Texto (sem alterações) */}
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

      {/* Botão de Envio / Parar (sem alterações) */}
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