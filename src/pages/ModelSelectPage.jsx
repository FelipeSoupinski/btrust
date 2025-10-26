// src/pages/ModelSelectPage.jsx
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme.js';

const ModelCard = ({ source, isSelected, onSelect }) => {
  const cardStyles = {
    height: '180px',
    padding: '20px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: isSelected 
      ? `2px solid ${COLORS.principal}` 
      : `2px dashed ${COLORS.textosSecundarios}`,
    backgroundColor: isSelected ? COLORS.principal : COLORS.branco,
    color: isSelected ? COLORS.branco : COLORS.principal,
    transition: 'all 0.3s ease',
  };

  const iconStyles = {
    fontSize: '32px',
    marginBottom: '10px',
    color: isSelected ? COLORS.branco : COLORS.principal,
  };
  
  const titleStyles = {
    fontSize: FONT_SIZES.texto,
    fontWeight: '600',
    fontFamily: FONTS.secundaria,
    marginBottom: '5px',
  };
  
  const descriptionStyles = {
    fontSize: FONT_SIZES.subtexto,
    color: isSelected ? COLORS.fundo : COLORS.textosSecundarios,
    lineHeight: 1.3,
  };

  return (
    <div 
      style={cardStyles}
      onClick={() => onSelect(source.id)}
      onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)'}
      onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      <span style={iconStyles}>Chart Icon</span>
      <div style={titleStyles}>{source.name}</div>
      <div style={descriptionStyles}>{source.description}</div>
    </div>
  );
};

function ModelSelectPage() {
  const { 
    availableDataSources, 
    setSelectedDataSources, 
    setActiveScreen, 
    selectedDataSources 
  } = useAppContext();
  
  const [localSelected, setLocalSelected] = useState(selectedDataSources);

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Restaurado para centralizar o conteúdo da página
    padding: '20px',
    overflowY: 'auto',
    flexGrow: 1,
    width: '100%',
    minHeight: '100%',
    boxSizing: 'border-box',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    width: '100%',
    maxWidth: '1200px', // Mantém um limite máximo de largura para o grid
  };

  const handleSelect = (id) => {
    setLocalSelected(prev => 
      prev.includes(id) 
        ? prev.filter(sourceId => sourceId !== id)
        : [...prev, id]
    );
  };
  
  const handleConfirmSelection = () => {
    setSelectedDataSources(localSelected);
    setActiveScreen('chat');
  };

  return (
    <div style={containerStyles}>
      <h1 style={{
        fontSize: FONT_SIZES.titulo,
        color: COLORS.principal,
        fontFamily: FONTS.secundaria,
        marginBottom: '5px',
        textAlign: 'center'
      }}>
        BTrust
      </h1>
      <h2 style={{
        fontSize: FONT_SIZES.subtitulo,
        color: COLORS.textosSecundarios,
        fontWeight: '400',
        marginBottom: '40px',
        textAlign: 'center',
        maxWidth: '800px'
      }}>
        Escolha a base de dados que melhor corresponde a sua área de trabalho.
      </h2>

      <div style={gridStyles}>
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
          style={{
            padding: '12px 30px',
            backgroundColor: COLORS.detalhes,
            color: COLORS.principal,
            border: 'none',
            borderRadius: '6px',
            fontSize: FONT_SIZES.texto,
            fontWeight: '700',
            marginTop: '30px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          Confirmar Seleção ({localSelected.length})
        </button>
      )}
    </div>
  );
}

export default ModelSelectPage;