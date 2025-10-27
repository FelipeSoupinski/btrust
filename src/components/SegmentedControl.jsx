// src/components/SegmentedControl.jsx
import * as styles from '../styles/SegmentedControl.styles.js';

const SegmentedControl = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div style={styles.containerStyles}>
      {tabs.map(tab => (
        <div
          key={tab}
          style={styles.getTabStyles(activeTab === tab)}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default SegmentedControl;
