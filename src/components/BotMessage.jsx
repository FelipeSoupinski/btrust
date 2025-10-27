// src/components/BotMessage.jsx
import { useState } from 'react';
import * as styles from '../styles/BotMessage.styles.js';
import ConfidenceScore from './ConfidenceScore.jsx';
import DetailsModal from './DetailsModal.jsx';

const BotMessage = ({ text, score, references, metrics, scoreExplanation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={styles.botMessageContainerStyles}>
      <div style={styles.botTextStyles}>{text}</div>

      {score && <ConfidenceScore level={score.level} value={score.value} />}

      <button style={styles.detailsButtonStyles} onClick={() => setIsModalOpen(true)}>
        Ver detalhes
      </button>

      <DetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        references={references}
        metrics={metrics}
        scoreExplanation={scoreExplanation}
      />
    </div>
  );
};

export default BotMessage;
