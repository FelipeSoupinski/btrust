// src/pages/ChatPage.jsx
import React, { useState } from 'react';
import ChatInput from '../components/ChatInput.jsx';
import ChatMessage from '../components/ChatMessage.jsx';
import SuggestionButtons from '../components/SuggestionButtons.jsx';
import {
    containerStyles,
    messagesAreaStyles,
    titleContainerStyles,
    titleStyles,
    inputAreaStyles,
} from './styles/ChatPageStyles.js';

const INITIAL_MESSAGES = [];

const SUGGESTIONS = [
    'primeira sugestão para um possível próxima passo',
    'segunda sugestão para um possível próxima passo',
    'terceira sugestão para um possível próxima passo',
];

function ChatPage() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = (messageText) => {
        if (!messageText.trim()) return;

        const userMessage = {
            type: 'user',
            content: messageText,
        };

        const aiMessage = {
            type: 'ai',
            content: 'Com base na análise dos documentos enviados, posso fornecer informações detalhadas sobre o tópico mencionado. Os dados indicam uma tendência positiva nos últimos trimestres.',
            confidence: 87,
            references: [
                { title: 'Relatório Financeiro Q3.pdf', page: 3 },
                { title: 'Relatório Financeiro Q3.pdf', page: 3 },
                { title: 'Relatório Financeiro Q3.pdf', page: 3 },
            ],
        };

        setMessages([...messages, userMessage, aiMessage]);
        setInputValue('');
    };

    const handleSuggestionClick = (suggestion) => {
        handleSendMessage(suggestion);
    };

    return (
        <div style={containerStyles}>
            <div style={messagesAreaStyles}>
                {messages.length === 0 ? (
                    <div style={titleContainerStyles}>
                        <h1 style={titleStyles}>BTrust</h1>
                    </div>
                ) : (
                    <>
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                type={message.type}
                                content={message.content}
                                confidence={message.confidence}
                                references={message.references}
                            />
                        ))}
                        
                        <SuggestionButtons 
                            suggestions={SUGGESTIONS}
                            onSuggestionClick={handleSuggestionClick}
                        />
                    </>
                )}
            </div>

            <div style={inputAreaStyles}>
                <ChatInput 
                    value={inputValue}
                    onChange={setInputValue}
                    onSend={handleSendMessage}
                />
            </div>
        </div>
    );
}

export default ChatPage;
