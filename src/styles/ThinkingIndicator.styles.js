import { COLORS, FONTS } from './theme';

// --- Estilos Mantidos (Estão ótimos) ---

export const thinkingContainerStyles = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '15px',
  width: '100%',
  maxWidth: '842px',
  margin: '15px 0',
  alignSelf: 'flex-start',
};

export const avatarStyles = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  backgroundColor: COLORS.azulClaro, // Mantido
  color: COLORS.principal,           // Mantido
  fontFamily: FONTS.secundaria,     // Mantido
  fontWeight: '700',
};

// Container para o header e o conteúdo dos passos
export const contentContainerStyles = {
  flexGrow: 1,
  backgroundColor: '#F9F9F9', // (Ajuste para seu COLORS.cinzaClaro ou similar)
  borderRadius: '8px',
  border: `1px solid ${COLORS.azulClaro}`, // (Ajuste para seu COLORS.borda)
  overflow: 'hidden',
  marginTop: '5px', 
};

// Header (título "Pensando..." e ícone)
export const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 14px',
  cursor: 'pointer',
  userSelect: 'none',
  borderBottom: `1px solid #EAEAEA`, 
  backgroundColor: COLORS.branco, 
  fontFamily: FONTS.primaria, 
  fontWeight: '600',
  color: COLORS.textos, 
};

// Ícone de expandir/recolher (chevron)
export const toggleIconStyles = {
  fontSize: '0.8rem',
  color: COLORS.textosSecundarios, // Usando sua variável
};

// Container para os passos (o conteúdo de texto)
export const stepsContainerStyles = {
  padding: '12px 14px',
  fontSize: '0.9rem',
  color: COLORS.textos, // (Assumindo que você tem COLORS.textos)
  fontFamily: FONTS.primaria, // (Assumindo que você tem FONTS.primaria)
};

// Estilo do <pre> para formatar o texto dos passos
export const preStyles = {
  margin: 0,
  fontFamily: 'inherit', // Herda a fonte do stepsContainerStyles
  whiteSpace: 'pre-wrap', // Faz a quebra de linha automática
  wordWrap: 'break-word', // Quebra palavras longas
  fontSize: 'inherit',
  color: 'inherit',
};

export const scoreContainerStyles = {
  padding: '12px 14px',
  borderBottom: `1px solid ${COLORS.borda || '#EAEAEA'}`, // Use sua cor de borda
  backgroundColor: COLORS.white || '#FFFFFF', // Use sua cor de fundo
};