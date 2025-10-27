import { COLORS } from './theme.js';

export const layoutStyles = isSidebarOpen => ({
  display: 'grid',
  gridTemplateColumns: isSidebarOpen ? '280px 1fr' : '0fr 1fr',
  height: '100vh',
  width: '100vw',
  backgroundColor: COLORS.fundo,
  transition: 'grid-template-columns 0.3s ease',
  overflow: 'hidden',
});

export const mainContentStyles = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  backgroundColor: COLORS.fundo,
  overflow: 'hidden',
};

export const pageContainerStyles = {
  flexGrow: 1,
  overflowY: 'auto',
  width: '100%',
  display: 'flex',
};

export const openButtonStyles = {
  position: 'absolute',
  top: '15px',
  left: '15px',
  zIndex: 20,
  fontSize: '20px',
  cursor: 'pointer',
  color: COLORS.principal,
  padding: '5px',
  backgroundColor: COLORS.branco,
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
};
