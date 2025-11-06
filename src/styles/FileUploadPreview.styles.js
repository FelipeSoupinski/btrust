// src/styles/FileUploadPreview.styles.js
import { COLORS, FONT_SIZES } from './theme';

export const previewContainerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  padding: '0 0 10px 0',
  maxWidth: '100%',
};

export const filePillStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#e9ecef',
  border: `1px solid #dee2e6`,
  borderRadius: '16px',
  padding: '4px 10px',
  fontSize: FONT_SIZES.subtexto,
  color: COLORS.textosSecundarios,
};

export const fileIconStyles = {
  color: '#D32F2F', // Cor vermelha para PDF
};

export const fileNameStyles = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '200px',
};

export const removeIconStyles = {
  cursor: 'pointer',
  color: '#868e96',
  fontSize: '14px',
};
