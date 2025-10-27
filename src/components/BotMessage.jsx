// src/components/BotMessage.jsx
import { useState } from 'react';

import { COLORS, FONT_SIZES } from '../styles/theme.js';

import ConfidenceScore from './ConfidenceScore.jsx';
import DetailsModal from './DetailsModal.jsx';

const botMessageContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  width: '100%',
};

const botTextStyles = {
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
};

const detailsButtonStyles = {
  background: 'none',
  border: 'none',
  color: COLORS.principal,
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: FONT_SIZES.subtexto,
  padding: '5px 0',
  alignSelf: 'flex-start',
};

const BotMessage = ({ text, score, references, metrics, scoreExplanation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={botMessageContainerStyles}>
      <div style={botTextStyles}>{text}</div>

      {score && <ConfidenceScore level={score.level} value={score.value} />}

      <button style={detailsButtonStyles} onClick={() => setIsModalOpen(true)}>
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
