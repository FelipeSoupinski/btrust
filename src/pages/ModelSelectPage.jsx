// src/pages/ModelSelectPage.jsx
import { useState } from 'react';

import { useAppContext } from '../context/AppContext.jsx';
import * as styles from '../styles/ModelSelectPage.styles.js';

const ModelCard = ({ source, isSelected, onSelect }) => {
  return (
    <div
      style={styles.cardStyles(isSelected)}
      onClick={() => onSelect(source.id)}
      onMouseOver={e => (e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)')}
      onMouseOut={e => (e.currentTarget.style.boxShadow = 'none')}
    >
      <span style={styles.iconStyles(isSelected)}>Chart Icon</span>
      <div style={styles.cardTitleStyles}>{source.name}</div>
      <div style={styles.descriptionStyles(isSelected)}>{source.description}</div>
    </div>
  );
};

function ModelSelectPage() {
  const { availableDataSources, setSelectedDataSources, setActiveScreen, selectedDataSources } =
    useAppContext();

  const [localSelected, setLocalSelected] = useState(selectedDataSources);

  const handleSelect = id => {
    setLocalSelected(prev =>
      prev.includes(id) ? prev.filter(sourceId => sourceId !== id) : [...prev, id]
    );
  };

  const handleConfirmSelection = () => {
    setSelectedDataSources(localSelected);
    setActiveScreen('chat');
  };

  return (
    <div style={styles.containerStyles}>
      <h1 style={styles.titleStyles}>BTrust</h1>
      <h2 style={styles.subtitleStyles}>
        Escolha a base de dados que melhor corresponde a sua área de trabalho.
      </h2>

      <div style={styles.gridStyles}>
        {availableDataSources.map(source => (
          <ModelCard
            key={source.id}
            source={source}
            isSelected={localSelected.includes(source.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {localSelected.length > 0 && (
        <button
          onClick={handleConfirmSelection}
          style={styles.confirmButtonStyles}
          onMouseOver={e => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={e => (e.currentTarget.style.opacity = '1')}
        >
          Confirmar Seleção ({localSelected.length})
        </button>
      )}
    </div>
  );
}

export default ModelSelectPage;
