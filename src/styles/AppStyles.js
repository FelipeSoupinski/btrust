import { COLORS } from './theme.js';

export const getLayoutStyles = (isSidebarOpen) => ({
  display: 'grid',
  gridTemplateColumns: isSidebarOpen ? '280px 1fr' : '0 1fr',
  height: '100vh',
  backgroundColor: COLORS.fundo,
  transition: 'grid-template-columns 0.3s ease',
  position: 'relative',
});

// O Header vai "flutuar" sobre o conteúdo.
export const mainContentStyles = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%',
  height: '100vh',
  minWidth: 0,
  position: 'relative',
};

export const openButtonStyles = {
  position: 'absolute',
  top: '15px',
  left: '15px', // Fixo no canto da página
  zIndex: 20, // zIndex alto para ficar por cima
  fontSize: '20px',
  cursor: 'pointer',
  color: COLORS.principal, // Cor do botão
  padding: '5px',
};
