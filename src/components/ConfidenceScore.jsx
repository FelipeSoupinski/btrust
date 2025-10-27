// src/components/ConfidenceScore.jsx
import * as styles from '../styles/ConfidenceScore.styles.js';

const ConfidenceScore = ({ level, value }) => {
  return (
    <div style={styles.scoreContainerStyles}>
      <div style={styles.headerStyles}>
        {level === 'low' && <div style={styles.lowScoreIndicatorStyles} />}
        <span style={styles.titleStyles}>Score de Confiança: {value}%</span>
      </div>
      <div style={styles.barBackgroundStyles}>
        <div style={styles.barFillStyles(level, value)}></div>
      </div>
      {level === 'low' && (
        <div style={styles.warningTextStyles}>
          <span>
            Nível de confiança <strong style={styles.warningBoldStyles}>baixo</strong>! Verifique
            antes de usar ou pergunte novamente.
          </span>
          <span>⚠️</span>
        </div>
      )}
    </div>
  );
};

export default ConfidenceScore;
