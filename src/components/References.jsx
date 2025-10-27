// src/components/References.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFile } from '@fortawesome/free-solid-svg-icons';
import { COLORS, FONT_SIZES } from '../styles/theme';

const containerStyles = {
    border: `1px solid #e0e0e0`,
    borderRadius: '8px',
    backgroundColor: COLORS.fundo,
};

const headerStyles = {
    padding: '12px 15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '600',
    color: COLORS.principal,
    cursor: 'pointer',
};

const listStyles = {
    padding: '10px 15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
};

const itemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: FONT_SIZES.subtexto,
};

const pageTagStyles = {
    marginLeft: 'auto',
    backgroundColor: '#e0e0e0',
    color: COLORS.textosSecundarios,
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
};

const footerStyles = {
    padding: '10px 15px',
    borderTop: '1px solid #e0e0e0',
    textAlign: 'left', // Alinhado à esquerda
};

const seeMoreButtonStyles = {
    background: 'none',
    border: 'none',
    color: COLORS.principal,
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: FONT_SIZES.subtexto,
};

const arrowStyles = (isOpen) => ({
    transition: 'transform 0.3s ease',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
});

const References = ({ items = [], startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);
    const [visibleCount, setVisibleCount] = useState(5);

    const handleSeeMore = () => {
        setVisibleCount(prev => prev + 5);
    };

    const toggleOpen = () => setIsOpen(!isOpen);

    // Define quais itens são visíveis com base nos estados
    const itemsToShow = isOpen ? items.slice(0, visibleCount) : items.slice(0, 1);

    return (
        <div>
            <div style={containerStyles}>
                <div style={{...headerStyles, borderBottom: isOpen ? `1px solid #e0e0e0` : 'none'}} onClick={toggleOpen}>
                    <span>Referências utilizadas:</span>
                    <FontAwesomeIcon icon={faChevronDown} style={arrowStyles(isOpen)} />
                </div>

                {/* A lista só é renderizada se estiver aberta */}
                {isOpen && (
                <div style={listStyles}>
                    {itemsToShow.map((item, index) => (
                        <div key={index} style={itemStyles}>
                            <FontAwesomeIcon icon={faFile} />
                            <span>{item.name}</span>
                            <span style={pageTagStyles}>p.{item.page}</span>
                        </div>
                    ))}
                </div>
                )}

                {isOpen && items.length > visibleCount && (
                    <div style={footerStyles}>
                        <button onClick={handleSeeMore} style={seeMoreButtonStyles}>
                            Ver mais
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default References;
