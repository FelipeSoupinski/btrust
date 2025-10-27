// src/components/InfoMetric.jsx
import { useState } from 'react';
import * as styles from '../styles/InfoMetric.styles.js';

const InfoMetric = ({ label, value, tooltip, showBar = false }) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  return (
    <div style={styles.metricContainerStyles}>
      <div style={styles.headerStyles}>
        <div
          style={styles.infoIconStyles}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <span>ℹ️</span>
          {isTooltipVisible && <div style={styles.tooltipStyles}>{tooltip}</div>}
        </div>
        <span style={styles.labelStyles}>{label}:</span>
        <span style={styles.valueStyles}>
          {value}
          {showBar ? '%' : ''}
        </span>
      </div>
      {showBar && (
        <div style={styles.barBackgroundStyles}>
          <div style={styles.barFillStyles(value)}></div>
        </div>
      )}
    </div>
  );
};

export default InfoMetric;
