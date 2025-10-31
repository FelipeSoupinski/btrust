// src/components/FileUploadPreview.jsx
import { faFilePdf, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as styles from '../styles/FileUploadPreview.styles.js';

const FileUploadPreview = ({ files, onRemoveFile }) => {
  if (files.length === 0) return null;

  return (
    <div style={styles.previewContainerStyles}>
      {files.map((file, index) => (
        <div key={index} style={styles.filePillStyles}>
          <FontAwesomeIcon icon={faFilePdf} style={styles.fileIconStyles} />
          <span style={styles.fileNameStyles}>{file.name}</span>
          <FontAwesomeIcon icon={faXmark} style={styles.removeIconStyles} onClick={() => onRemoveFile(index)} />
        </div>
      ))}
    </div>
  );
};

export default FileUploadPreview;
