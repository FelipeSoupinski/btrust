// src/components/ChatInputMenu.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../styles/chatInputMenu.styles.js';
/**
 * Menu pop-up para o ChatInput com ações de "Anexar" e "Ramificar".
 * @param {object} props
 * @param {function} props.onAddFileClick - Função chamada ao clicar em "Anexar Arquivo".
 * @param {function} props.onBranchChatClick - Função chamada ao clicar em "Ramificar Chat".
 */
const ChatInputMenu = ({ onAddFileClick, onBranchChatClick }) => {
  return (
    <div style={styles.menuContainerStyles}>
      {/* Opção 1: Ramificar Chat */}
      <div style={styles.menuItemStyles} onClick={onBranchChatClick}>
        <FontAwesomeIcon icon={faCodeBranch} style={styles.menuIconStyles} />
        <span style={styles.menuTextStyles}>Ramificar Chat</span>
      </div>

      {/* Opção 2: Anexar Arquivo */}
      <div style={styles.menuItemStyles} onClick={onAddFileClick}>
        <FontAwesomeIcon icon={faPaperclip} style={styles.menuIconStyles} />
        <span style={styles.menuTextStyles}>Anexar Arquivo</span>
      </div>
    </div>
  );
};

export default ChatInputMenu;