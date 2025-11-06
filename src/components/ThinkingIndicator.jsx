// src/components/ThinkingIndicator.jsx
import { useState } from 'react';
import { faRobot, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 1. Importa o seu componente de Score
import ConfidenceScore from './ConfidenceScore';

import * as styles from '../styles/ThinkingIndicator.styles.js';

/**
 * Indicador de pensamento que mostra os passos e
 * o score de confiança progressivo.
 */
// 2. Recebe 'steps' e 'currentScore' do ChatPage.jsx
const ThinkingIndicator = ({ steps, currentScore }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div style={styles.thinkingContainerStyles}>
      <div style={styles.avatarStyles}>
        <FontAwesomeIcon icon={faRobot} />
      </div>

      <div style={styles.contentContainerStyles}>
        
        {/* 3. Renderiza o Score Progressivo */}
        {/* Só mostra o container se o score existir */}
        {currentScore && (
          <div style={styles.scoreContainerStyles}>
            {/* Passa 'level' e 'value' desestruturados do objeto
              'currentScore' para o componente ConfidenceScore 
            */}
            <ConfidenceScore
              level={currentScore.level}
              value={currentScore.value}
            />
          </div>
        )}

        {/* Header clicável para expandir/recolher */}
        <div style={styles.headerStyles} onClick={() => setIsExpanded(!isExpanded)}>
          <strong>Pensando...</strong>
          <FontAwesomeIcon
            icon={isExpanded ? faChevronDown : faChevronRight}
            style={styles.toggleIconStyles}
          />
        </div>

        {/* Os passos do pensamento (chain of thought) */}
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