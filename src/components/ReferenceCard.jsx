import React, { useState } from 'react';
import {
    referencesContainerStyles,
    referencesTitleStyles,
    referencesCardStyles,
    referenceItemStyles,
    referenceIconStyles,
    referenceInfoStyles,
    referenceNameStyles,
    referenceBadgeStyles,
    referenceBadgeTextStyles,
    referenceActionsStyles,
    viewDetailsButtonStyles,
    viewDetailsTextStyles,
    viewMoreTextStyles,
    chevronIconStyles,
} from './styles/ReferenceCardStyles.js';

function ReferenceCard({ references = [] }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const defaultReferences = [
        { id: 1, name: 'Relatório Financeiro Q3.pdf', page: 3 },
        { id: 2, name: 'Relatório Financeiro Q3.pdf', page: 3 },
        { id: 3, name: 'Relatório Financeiro Q3.pdf', page: 3 },
    ];

    const displayReferences = references.length > 0 ? references : defaultReferences;

    return (
        <div style={referencesContainerStyles}>
            <span style={referencesTitleStyles}>Referências utilizadas:</span>
            
            <div style={referencesCardStyles}>
                {displayReferences.map((ref) => (
                    <div key={ref.id} style={referenceItemStyles}>
                        <svg style={referenceIconStyles} viewBox="0 0 16 16" fill="none">
                            <rect x="4" y="2" width="8" height="1.33" stroke="#2B7FFF" strokeWidth="1.33" />
                            <rect x="10" y="2" width="4" height="1" stroke="#2B7FFF" strokeWidth="1.33" />
                            <rect x="6" y="6" width="1" height="0" stroke="#2B7FFF" strokeWidth="1.33" />
                            <rect x="6" y="8.67" width="4" height="0" stroke="#2B7FFF" strokeWidth="1.33" />
                            <rect x="6" y="11.33" width="4" height="0" stroke="#2B7FFF" strokeWidth="1.33" />
                        </svg>
                        
                        <div style={referenceInfoStyles}>
                            <span style={referenceNameStyles}>{ref.name}</span>
                            <div style={referenceBadgeStyles}>
                                <span style={referenceBadgeTextStyles}>p. {ref.page}</span>
                            </div>
                        </div>
                    </div>
                ))}

                <div style={referenceActionsStyles}>
                    <button
                        style={viewDetailsButtonStyles}
                        onClick={() => setIsExpanded(!isExpanded)}
                        onMouseOver={(e) => {
                            e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.textDecoration = 'none';
                        }}
                    >
                        <span style={viewDetailsTextStyles}>Ver detalhes</span>
                        <svg
                            style={{
                                ...chevronIconStyles,
                                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s',
                            }}
                            viewBox="0 0 11 7"
                            fill="none"
                        >
                            <path d="M1 1L5.27 5.27L9.54 1" stroke="#000000" strokeWidth="1.5" />
                        </svg>
                    </button>

                    <span
                        style={viewMoreTextStyles}
                        onMouseOver={(e) => {
                            e.currentTarget.style.textDecoration = 'underline';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.textDecoration = 'none';
                        }}
                    >
                        Ver mais
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ReferenceCard;
