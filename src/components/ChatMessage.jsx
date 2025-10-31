// src/components/ChatMessage.jsx
import { faFilePdf, faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import * as styles from '../styles/ChatMessage.styles.js';

const UserMessageBubble = ({ text, files }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 300;
  const isLongText = text && text.length > characterLimit;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Se não houver nem texto nem arquivos, não renderiza nada.
  if ((!files || files.length === 0) && !text) {
    return null;
  }

  return (
    <>
      {files?.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: text ? '12px' : '0' }}>
          {files.map((file, index) => (
            <div key={index} style={styles.filePillStyles}>
              <FontAwesomeIcon icon={faFilePdf} style={styles.fileIconStyles} />
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      )}
      {text && <div style={styles.userBubbleStyles}>{isLongText && !isExpanded ? `${text.substring(0, characterLimit)}...` : text}</div>}
      {isLongText && (
        <button onClick={toggleExpand} style={styles.seeMoreUserMessageStyle}>
          {isExpanded ? 'Ver menos' : 'Ver mais'}
        </button>
      )}
    </>
  );
};

const ChatMessage = ({ message }) => {
  const { text, author, files } = message;
  const isUser = author === 'user';

  return (
    <div style={styles.messageContainerStyles(isUser)}>
      <div style={styles.avatarStyles(isUser)}>
        <FontAwesomeIcon icon={isUser ? faUser : faRobot} />
      </div>
      {/* Para o bot, o container ocupa 100% da largura. Para o usuário, não. */}
      <div style={styles.contentStyles(isUser)}>
        {isUser ? (
          <UserMessageBubble text={text} files={files} />
        ) : typeof text === 'string' ? (
          <div style={styles.botTextStyles}>{text}</div>
        ) : (
          text
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
