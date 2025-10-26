// src/pages/ChatPage.jsx
import React from 'react';
import ChatInput from '../components/ChatInput.jsx';
import { FONT_SIZES, COLORS, FONTS } from '../styles/theme.js';


const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  padding: '0 20px',
  boxSizing: 'border-box',
  flexGrow: 1,           // ← ESSENCIAL
  overflow: 'hidden',
};


const contentWrapperStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%', // Removido para permitir a centralização pelo container pai
  maxWidth: '612px',  // Mesmo limite do input
};

const titleStyles = {
  fontSize: FONT_SIZES.titulo,
  color: COLORS.principal,
  fontWeight: '700',
  fontFamily: FONTS.secundaria,
  marginBottom: '40px',
  textAlign: 'center',
};

function ChatPage() {
  return (
    <div style={containerStyles}>
      <div style={contentWrapperStyles}>
        <h1 style={titleStyles}>BTrust</h1>
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatPage;