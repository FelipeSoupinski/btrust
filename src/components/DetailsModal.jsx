// src/components/DetailsModal.jsx
import React, { useState } from 'react';
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme.js';
import SegmentedControl from './SegmentedControl.jsx';
import InfoMetric from './InfoMetric.jsx';
import References from './References.jsx';

const modalBackdropStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyles = {
    backgroundColor: COLORS.branco,
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible', // Permite que o tooltip "vaze" para fora do modal, mas o body interno terá scroll
};

const modalHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
};

const modalTitleStyles = {
    fontSize: FONT_SIZES.subtitulo,
    fontFamily: FONTS.secundaria,
    color: COLORS.principal,
    fontWeight: '700',
    textAlign: 'center',
    flexGrow: 1, // Permite que o título ocupe o espaço e centralize
};

const closeButtonStyles = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    position: 'absolute',
    right: '25px', // Alinha à direita do header, considerando o padding do modal
    cursor: 'pointer',
    color: COLORS.textosSecundarios,
};

const modalBodyStyles = {
    overflowY: 'auto',
    paddingRight: '10px', // Espaço para a barra de rolagem
};

const metricsContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px',
};

const modalFooterStyles = {
    marginTop: '25px',
    paddingTop: '20px',
    borderTop: `1px solid ${COLORS.fundo}`,
    display: 'flex',
    justifyContent: 'center', // Centraliza o botão "Entendi"
};

const confirmButtonStyles = {
    padding: '10px 25px',
    backgroundColor: COLORS.principal,
    // Adiciona hover effect para o botão "Entendi"
    ':hover': {
        opacity: 0.9,
    },
    ':active': {
        opacity: 0.8,
    },
    color: COLORS.branco,
    border: 'none',
    borderRadius: '6px',
    fontSize: FONT_SIZES.subtexto,
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
    fontFamily: FONTS.principal,
};

const DetailsModal = ({ isOpen, onClose, references, metrics, scoreExplanation }) => {
    const [activeTab, setActiveTab] = useState('Referências');

    if (!isOpen) return null;

    return (
        <div style={modalBackdropStyles} onClick={onClose}>
            <div style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
                <div style={modalHeaderStyles}>
                    <h2 style={modalTitleStyles}>Detalhes</h2>
                    <button style={closeButtonStyles} onClick={onClose}>&times;</button>
                </div>

                <SegmentedControl
                    tabs={['Referências', 'Score']}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />

                <div style={modalBodyStyles}>
                    {activeTab === 'Referências' && (
                        <div style={metricsContainerStyles}>
                            <InfoMetric
                                label="Documentos encontrados"
                                value={metrics.docCount}
                                tooltip="Número de documentos consultados para gerar a resposta."
                            />
                            <InfoMetric
                                label="Cobertura da pergunta"
                                value={metrics.coverage}
                                tooltip="Percentual da pergunta que foi respondido com base nas fontes."
                                showBar
                            />
                            <InfoMetric
                                label="Relevância média"
                                value={metrics.relevance}
                                tooltip="Média de relevância das fontes utilizadas para a resposta."
                                showBar
                            />
                        </div>
                    )}
                    {activeTab === 'Score' && ( // Nova aba para a explicação do score
                        <div style={{ marginTop: '20px', fontSize: FONT_SIZES.texto, color: COLORS.textosSecundarios, lineHeight: 1.5 }}>
                            {scoreExplanation || "Nenhuma explicação detalhada disponível para este score."}
                        </div>
                    )}
                </div>

                <div style={modalFooterStyles}>
                    <button 
                        style={confirmButtonStyles} 
                        onClick={onClose}
                        onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
                        onMouseOut={(e) => e.currentTarget.style.opacity = 1}>
                        Entendi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;