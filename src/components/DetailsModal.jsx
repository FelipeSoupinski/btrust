// src/components/DetailsModal.jsx
import { useState } from 'react';

import * as styles from '../styles/DetailsModal.styles.js';

import InfoMetric from './InfoMetric.jsx';
import SegmentedControl from './SegmentedControl.jsx';

const DetailsModal = ({ isOpen, onClose, metrics, scoreExplanation }) => {
  const [activeTab, setActiveTab] = useState('Referências');

  if (!isOpen) return null;

  return (
    <div style={styles.modalBackdropStyles} onClick={onClose}>
      <div style={styles.modalContentStyles} onClick={e => e.stopPropagation()}>
        <div style={styles.modalHeaderStyles}>
          <h2 style={styles.modalTitleStyles}>Detalhes</h2>
          <button style={styles.closeButtonStyles} onClick={onClose}>
            &times;
          </button>
        </div>

        <SegmentedControl
          tabs={['Referências', 'Score']}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div style={styles.modalBodyStyles}>
          {activeTab === 'Referências' && (
            <div style={styles.metricsContainerStyles}>
              <InfoMetric
                label="Documentos encontrados"
                value={metrics.docCount}
                tooltip="Número de documentos consultados para gerar a resposta."
              />
              <InfoMetric
                label="Cobertura da pergunta"
                value={metrics.coverage}
                tooltip="Percentual da pergunta que foi respondido com base nas fontes."
                showBar
              />
              <InfoMetric
                label="Relevância média"
                value={metrics.relevance}
                tooltip="Média de relevância das fontes utilizadas para a resposta."
                showBar
              />
            </div>
          )}
          {activeTab === 'Score' && (
            <div style={styles.scoreExplanationStyles}>
              {scoreExplanation || 'Nenhuma explicação detalhada disponível para este score.'}
            </div>
          )}
        </div>

        <div style={styles.modalFooterStyles}>
          <button
            style={styles.confirmButtonStyles}
            onClick={onClose}
            onMouseOver={e => (e.currentTarget.style.opacity = 0.9)}
            onMouseOut={e => (e.currentTarget.style.opacity = 1)}
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
