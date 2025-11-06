// src/components/ChatInputMenu.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import * as styles from '../styles/chatInputMenu.styles.js';

const ChatInputMenu = ({ onAddFileClick, onBranchChatClick }) => {
  return (
    <div style={styles.menuContainerStyles}>
      <div style={styles.menuItemStyles} onClick={onBranchChatClick}>
        <FontAwesomeIcon icon={faCodeBranch} style={styles.menuIconStyles} />
        <span style={styles.menuTextStyles}>Duplicar Chat</span>
      </div>

      <div style={styles.menuItemStyles} onClick={onAddFileClick}>
        <FontAwesomeIcon icon={faPaperclip} style={styles.menuIconStyles} />
        <span style={styles.menuTextStyles}>Anexar Arquivo</span>
      </div>
    </div>
  );
};

export default ChatInputMenu;