// src/components/ThinkingIndicator.jsx
import { useState } from 'react';
import { faRobot, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ConfidenceScore from './ConfidenceScore';

import * as styles from '../styles/ThinkingIndicator.styles.js';

/**
 * Indicador de "pensando" que mostra os passos e o score de confiança progressivo.
 */
const ThinkingIndicator = ({ steps, currentScore }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div style={styles.thinkingContainerStyles}>
      <div style={styles.avatarStyles}>
        <FontAwesomeIcon icon={faRobot} />
      </div>

      <div style={styles.contentContainerStyles}>
        
        {currentScore && (
          <div style={styles.scoreContainerStyles}>
            <ConfidenceScore
              level={currentScore.level}
              value={currentScore.value}
            />
          </div>
        )}

        <div style={styles.headerStyles} onClick={() => setIsExpanded(!isExpanded)}>
          <strong>Pensando...</strong>
          <FontAwesomeIcon
            icon={isExpanded ? faChevronDown : faChevronRight}
            style={styles.toggleIconStyles}
          />
        </div>

        {isExpanded && (
          <div style={styles.stepsContainerStyles}>
            <pre style={styles.preStyles}>{steps}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThinkingIndicator;