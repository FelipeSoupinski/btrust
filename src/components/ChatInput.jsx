import { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ChatInputMenu from './ChatInputMenu'; 
import * as styles from '../styles/ChatInput.styles.js';

function ChatInput({ onSendMessage, disabled, onStop, onAddFiles, hasFiles, onBranchChat }) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const canSend = !disabled && (inputValue.trim() || hasFiles);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '24px';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

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
      e.target.value = null;
    }
  };

  return (
    <div style={styles.inputContainerStyles(disabled)}>
      
      <div style={styles.actionButtonContainerStyles} ref={menuRef}>
        <FontAwesomeIcon
          icon={faPlus}
          style={styles.iconStyle(disabled)}
          onClick={!disabled ? () => setIsMenuOpen(prev => !prev) : undefined}
        />

        {isMenuOpen && (
          <ChatInputMenu
            onAddFileClick={() => {
              handleFileIconClick();
              setIsMenuOpen(false);
            }}
            onBranchChatClick={() => {
              onBranchChat();
              setIsMenuOpen(false); 
            }}
          />
        )}
      </div>
      
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} multiple accept=".pdf" onChange={handleFileChange} />

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