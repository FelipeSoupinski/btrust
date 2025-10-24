import React, { useState } from 'react';
import ConversationSidebar from '../components/ConversationSidebar.jsx';
import TopBar from '../components/TopBar.jsx';
import UserMessage from '../components/UserMessage.jsx';
import ResponseMessage from '../components/ResponseMessage.jsx';
import {
    pageContainerStyles,
    mainContentStyles,
    chatAreaStyles,
    messagesContainerStyles,
    suggestionsContainerStyles,
    suggestionButtonStyles,
    suggestionTextStyles,
    inputAreaStyles,
    inputCardStyles,
    inputContainerStyles,
    attachButtonStyles,
    textareaWrapperStyles,
    textareaStyles,
    sendButtonStyles,
    sendButtonDisabledStyles,
    disclaimerStyles,
} from './styles/AgentResponsePageStyles.js';

function AgentResponsePage() {
    const [selectedChatId, setSelectedChatId] = useState(1);
    const [inputValue, setInputValue] = useState('');

    const suggestions = [
        'primeira sugestão para um possível próximo passo',
        'segunda sugestão para um possível próximo passo',
        'terceira sugestão para um possível',
    ];

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            // Lógica para enviar mensagem
            console.log('Enviando mensagem:', inputValue);
            setInputValue('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
    };

    return (
        <div style={pageContainerStyles}>
            <ConversationSidebar
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
                onNewChat={() => console.log('Novo chat')}
                onDeleteChat={(id) => console.log('Deletar chat:', id)}
            />

            <div style={mainContentStyles}>
                <TopBar databaseName="Marketing" userName="Fulano de tal" />

                <div style={chatAreaStyles}>
                    <div style={messagesContainerStyles}>
                        <UserMessage text="Pergunta" />
                        
                        <ResponseMessage
                            text="Com base na análise dos documentos enviados, posso fornecer uma resposta detalhada sobre o tema solicitado. Os dados apresentam uma visão abrangente da situação atual."
                            confidence={87}
                            references={[
                                { id: 1, name: 'Relatório Financeiro Q3.pdf', page: 3 },
                                { id: 2, name: 'Relatório Financeiro Q3.pdf', page: 3 },
                                { id: 3, name: 'Relatório Financeiro Q3.pdf', page: 3 },
                            ]}
                        />
                    </div>

                    <div style={suggestionsContainerStyles}>
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                style={suggestionButtonStyles}
                                onClick={() => handleSuggestionClick(suggestion)}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = '#E8E8E8';
                                    e.currentTarget.style.transform = 'scale(1.02)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = '#F3F3F5';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                <span style={suggestionTextStyles}>{suggestion}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div style={inputAreaStyles}>
                    <div style={inputCardStyles}>
                        <div style={inputContainerStyles}>
                            <button
                                style={attachButtonStyles}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = '#F9F9F9';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="M12 8L8 12L4 8M8 12V2"
                                        stroke="#0A0A0A"
                                        strokeWidth="1.33"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M2 12L2 14L14 14L14 12"
                                        stroke="#0A0A0A"
                                        strokeWidth="1.33"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>

                            <div style={textareaWrapperStyles}>
                                <textarea
                                    style={textareaStyles}
                                    placeholder="Digite sua mensagem... (Enter para enviar, Shift+Enter para nova linha)"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    rows={1}
                                />
                                
                                <button
                                    style={inputValue.trim() ? sendButtonStyles : sendButtonDisabledStyles}
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim()}
                                    onMouseOver={(e) => {
                                        if (inputValue.trim()) {
                                            e.currentTarget.style.opacity = '1';
                                            e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (inputValue.trim()) {
                                            e.currentTarget.style.opacity = '1';
                                            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                                        }
                                    }}
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M2 2L14 8L2 14V8.5L10 8L2 7.5V2Z"
                                            fill="#FFFFFF"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <p style={disclaimerStyles}>
                            O ChatBot GPT pode cometer erros. Verifique informações importantes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentResponsePage;
