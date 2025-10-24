// src/pages/ModelSelectPage.jsx

import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme.js';

// --- Sub-componente Card de Seleção ---
const ModelCard = ({ source, isSelected, onSelect }) => {
    
    // Estilos do Card
    const cardStyles = {
        width: '280px',
        height: '180px',
        padding: '20px',
        margin: '15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        
        // CORREÇÃO UX: Borda tracejada (não selecionado) ou cor principal (selecionado)
        border: isSelected 
            ? `2px solid ${COLORS.principal}` 
            : `2px dashed ${COLORS.textosSecundarios}`,
            
        backgroundColor: isSelected ? COLORS.principal : COLORS.branco,
        color: isSelected ? COLORS.branco : COLORS.principal,
        transition: 'all 0.3s ease',
    };

    const iconStyles = {
        fontSize: '32px',
        marginBottom: '10px',
        color: isSelected ? COLORS.branco : COLORS.principal,
    };
    
    const titleStyles = {
        fontSize: FONT_SIZES.texto,
        fontWeight: '600',
        fontFamily: FONTS.secundaria,
        marginBottom: '5px',
    };
    
    const descriptionStyles = {
        fontSize: FONT_SIZES.subtexto,
        color: isSelected ? COLORS.fundo : COLORS.textosSecundarios,
        lineHeight: 1.3,
    };


    return (
        <div 
            style={cardStyles}
            onClick={() => onSelect(source.id)}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
            <span style={iconStyles}>📣</span> {/* Ícone Placeholder: Marketing */}
            <div style={titleStyles}>{source.name}</div>
            <div style={descriptionStyles}>{source.description}</div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL ModelSelectPage ---
function ModelSelectPage() {
    const { availableDataSources, setSelectedDataSources, setActiveScreen, selectedDataSources } = useAppContext();
    const [localSelected, setLocalSelected] = useState(selectedDataSources); // Estado local para seleção múltipla

    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
    };

    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        maxWidth: '1000px', // Limite de largura para o grid
    };

    const handleSelect = (id) => {
        // Permite seleção MÚLTIPLA no ModelSelectPage (conforme a imagem)
        setLocalSelected(prev => 
            prev.includes(id) 
                ? prev.filter(sourceId => sourceId !== id)
                : [...prev, id]
        );
    };
    
    const handleConfirmSelection = () => {
        // NOVO: Copia a seleção local para o estado global
        setSelectedDataSources(localSelected);
        // Volta para a tela principal de chat
        setActiveScreen('chat'); 
    };

    return (
        <div style={containerStyles}>
            
            <h1 style={{...FONT_SIZES.titulo, color: COLORS.principal, fontFamily: FONTS.secundaria, marginBottom: '5px'}}>
                BTrust
            </h1>
            <h2 style={{...FONT_SIZES.subtitulo, color: COLORS.textosSecundarios, fontWeight: '400', marginBottom: '40px'}}>
                Escolha a base de dados que melhor corresponde a sua área de trabalho.
            </h2>

            <div style={gridStyles}>
                {availableDataSources.map(source => (
                    <ModelCard 
                        key={source.id}
                        source={source}
                        isSelected={localSelected.includes(source.id)}
                        onSelect={handleSelect}
                    />
                ))}
            </div>

            {/* Botão de Confirmação (Visível após alguma seleção) */}
            {localSelected.length > 0 && (
                <button 
                    onClick={handleConfirmSelection}
                    style={{
                        padding: '12px 30px',
                        backgroundColor: COLORS.detalhes, // Amarelo
                        color: COLORS.principal,
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: FONT_SIZES.texto,
                        fontWeight: '700',
                        marginTop: '30px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'darken(COLORS.detalhes, 10%)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = COLORS.detalhes}
                >
                    Confirmar Seleção ({localSelected.length})
                </button>
            )}
        </div>
    );
}

export default ModelSelectPage;