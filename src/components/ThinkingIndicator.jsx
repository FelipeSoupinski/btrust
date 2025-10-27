// src/components/ThinkingIndicator.jsx
import { faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as styles from '../styles/ThinkingIndicator.styles.js';

const ThinkingIndicator = () => (
  <div style={styles.thinkingContainerStyles}>
    <div style={styles.avatarStyles}>
      <FontAwesomeIcon icon={faRobot} />
    </div>
    <div style={styles.dotsContainerStyles}>
      <div style={styles.dotStyle}></div>
      <div style={styles.dotStyle}></div>
      <div style={styles.dotStyle}></div>
    </div>
  </div>
);

export default ThinkingIndicator;
