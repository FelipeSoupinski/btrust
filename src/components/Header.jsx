// src/components/Header.jsx

import React from 'react';
import { FONT_SIZES, COLORS, FONTS} from '../styles/theme.js';

const headerStyles = {
    height: '60px',
    padding: '0 30px',
    display: 'flex',
    justifyContent: 'flex-end', // Alinha o conteúdo à direita
    alignItems: 'center',
    backgroundColor: COLORS.branco, // Fundo branco para contrastar com o fundo F9F9F9
    borderBottom: `1px solid ${COLORS.fundo}`, 
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
};

const profileStyles = {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 15px',
    borderRadius: '20px',
    backgroundColor: COLORS.fundo, // Fundo F9F9F9 para o elemento de perfil
    fontSize: FONT_SIZES.subtexto,
    color: COLORS.textosSecundarios,
    cursor: 'pointer',
    fontWeight: '600',
    fontFamily: FONTS.secundaria,
};

const userIconStyles = {
    marginLeft: '10px',
    fontSize: '18px',
    color: COLORS.principal, // Ícone na cor principal
};

function Header() {
  return (
    <header style={headerStyles}>
      <div style={profileStyles}>
        Fulano de tal
        <span style={userIconStyles}>👤</span> {/* Ícone Placeholder */}
      </div>
    </header>
  );
}

export default Header;