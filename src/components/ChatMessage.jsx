// src/components/ChatMessage.jsx
import { faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import * as styles from '../styles/ChatMessage.styles.js';

const UserMessageBubble = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 300;
  const isLongText = text.length > characterLimit;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div>
      <div style={styles.userBubbleStyles}>
        {isLongText && !isExpanded ? `${text.substring(0, characterLimit)}...` : text}
      </div>
      {isLongText && (
        <button onClick={toggleExpand} style={styles.seeMoreUserMessageStyle}>
          {isExpanded ? 'Ver menos' : 'Ver mais'}
        </button>
      )}
    </div>
  );
};

const ChatMessage = ({ message }) => {
  const { text, author } = message;
  const isUser = author === 'user';

  return (
    <div style={styles.messageContainerStyles(isUser)}>
      <div style={styles.avatarStyles(isUser)}>
        <FontAwesomeIcon icon={isUser ? faUser : faRobot} />
      </div>
      {/* Para o bot, o container ocupa 100% da largura. Para o usuário, não. */}
      <div style={styles.contentStyles(isUser)}>
        {isUser ? (
          <UserMessageBubble text={text} />
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
