// src/components/ConfidenceScore.jsx
import { COLORS, FONT_SIZES } from '../styles/theme';

const scoreContainerStyles = {
  width: '100%',
};

const headerStyles = {
  display: 'flex',
  // justifyContent: 'space-between', // Removido para alinhar o ponto à esquerda
  alignItems: 'center',
  marginBottom: '8px',
};

const titleStyles = {
  fontSize: FONT_SIZES.subtexto,
  fontWeight: '600',
  color: COLORS.principal,
};

const lowScoreIndicatorStyles = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#d32f2f', // Vermelho
  marginRight: '8px',
};

const warningTextStyles = {
  fontSize: FONT_SIZES.subtexto,
  color: COLORS.textosSecundarios, // Vermelho
  marginTop: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

const barBackgroundStyles = {
  width: '100%',
  height: '8px',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
};

const getBarColor = level => {
  switch (level) {
    case 'high':
      return '#2e7d32'; // Verde
    case 'medium':
      return '#ebc623ff'; // Laranja
    case 'low':
      return '#d32f2f'; // Vermelho
    default:
      return COLORS.textosSecundarios;
  }
};

const barFillStyles = (level, value) => ({
  width: `${value}%`,
  height: '100%',
  backgroundColor: getBarColor(level),
  borderRadius: '4px',
  transition: 'width 0.5s ease-in-out',
});

const ConfidenceScore = ({ level, value }) => {
  return (
    <div style={scoreContainerStyles}>
      <div style={headerStyles}>
        {level === 'low' && <div style={lowScoreIndicatorStyles} />}
        <span style={titleStyles}>Score de Confiança: {value}%</span>
      </div>
      <div style={barBackgroundStyles}>
        <div style={barFillStyles(level, value)}></div>
      </div>
      {level === 'low' && (
        <div style={warningTextStyles}>
          <span>
            Nível de confiança <strong style={{ fontWeight: '900' }}>baixo</strong>! Verifique antes
            de usar ou pergunte novamente.
          </span>
          <span>⚠️</span>
        </div>
      )}
    </div>
  );
};

export default ConfidenceScore;
