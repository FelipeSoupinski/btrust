// src/pages/ChatPage.jsx
import { useEffect, useMemo, useRef, useState } from 'react';

import BotMessage from '../components/BotMessage.jsx';
import ChatInput from '../components/ChatInput.jsx';
import ChatMessage from '../components/ChatMessage.jsx';
import FileUploadPreview from '../components/FileUploadPreview.jsx';
import ThinkingIndicator from '../components/ThinkingIndicator.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import * as styles from '../styles/ChatPage.styles.js';

function ChatPage() {
  // Pega a nova função 'branchActiveChat' do contexto
  const { activeChat, chatMessages, setChatMessages, setChats, branchActiveChat } = useAppContext();
  
  const [thinkingProcess, setThinkingProcess] = useState({
    active: false,
    steps: '',
    currentScore: null,
  });
  
  // O estado 'isThinking' foi removido, pois 'thinkingProcess.active' o substitui
  
  const [filesToSend, setFilesToSend] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef(null);
  const thinkingTimeoutRef = useRef([]);

  const currentMessages = useMemo(() => chatMessages[activeChat] || [], [chatMessages, activeChat]);

  const handleAddFiles = newFiles => {
    const pdfFiles = Array.from(newFiles).filter(file => file.type === 'application/pdf');
    setFilesToSend(prevFiles => {
      if (prevFiles.length + pdfFiles.length > 10) {
        alert('Você pode enviar no máximo 10 arquivos PDF por vez.');
        return prevFiles;
      }
      const combined = [...prevFiles, ...pdfFiles];
      return combined;
    });
  };

  
  const handleRemoveFile = index => {
    setFilesToSend(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleAddFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Atualiza o useEffect para usar 'thinkingProcess.active'
  useEffect(scrollToBottom, [currentMessages, thinkingProcess.active]);

  const handleSendMessage = text => {
    if (!text.trim() && filesToSend.length === 0) {
      return;
    }

    if (currentMessages.length === 0 && text.trim()) {
      const newTitle = text.length > 40 ? text.substring(0, 40) + '...' : text;
      setChats(prevChats =>
        prevChats.map(chat => (chat.id === activeChat ? { ...chat, title: newTitle } : chat))
      );
    }

    const userMessage = {
      author: 'user',
      text,
      files: filesToSend,
    };

    const updatedMessages = [...currentMessages, userMessage];
    setChatMessages(prev => ({ ...prev, [activeChat]: updatedMessages }));
    setFilesToSend([]);

    // --- INÍCIO DA SIMULAÇÃO COM SCORE PROGRESSIVO ---
    
    handleStopGeneration();
    
    setThinkingProcess({
      active: true,
      steps: 'Iniciando análise da sua pergunta...',
      currentScore: { level: 'low', value: 10 },
    });

    const timeouts = [];

    timeouts.push(
      setTimeout(() => {
        setThinkingProcess(prev => ({
          ...prev,
          steps: prev.steps + '\n- Consultando bases de dados selecionadas...',
          currentScore: { level: 'low', value: 35 },
        }));
      }, 1000)
    );

    timeouts.push(
      setTimeout(() => {
        setThinkingProcess(prev => ({
          ...prev,
          steps: prev.steps + '\n- Analisando documentos relevantes para RAG...',
          currentScore: { level: 'medium', value: 65 },
        }));
      }, 2000)
    );

    timeouts.push(
      setTimeout(() => {
        setThinkingProcess(prev => ({
          ...prev,
          steps: prev.steps + '\n- Gerando rascunho da resposta...',
          currentScore: { level: 'high', value: 85 },
        }));
      }, 3000)
    );

    timeouts.push(
      setTimeout(() => {
        const scoreFinal = { level: 'high', value: 95 };
        const metricsToTest = { docCount: 15, coverage: 98, relevance: 85 };
        const testReferences = [{ name: 'Relatório Anual 2023.pdf', page: 12 }];
        const scoreExplanationText = 'O nível de confiança é alto...';
        
        const botResponse = {
          author: 'bot',
          text: (
            <BotMessage
              text={`Esta é uma resposta simulada para a sua pergunta: "${text}".`}
              score={scoreFinal}
              references={testReferences}
              metrics={metricsToTest}
              scoreExplanation={scoreExplanationText}
            />
          ),
        };

        setChatMessages(prev => ({
          ...prev,
          [activeChat]: [...updatedMessages, botResponse],
        }));

        setThinkingProcess({ active: false, steps: '', currentScore: null });
        thinkingTimeoutRef.current = [];
        
      }, 4000)
    );

    thinkingTimeoutRef.current = timeouts;
  };

  const handleStopGeneration = () => {
    if (thinkingTimeoutRef.current.length > 0) {
      thinkingTimeoutRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    }
    thinkingTimeoutRef.current = [];
    
    setThinkingProcess({ active: false, steps: '', currentScore: null });
  };

  if (!activeChat) {
    return (
      <div style={styles.noChatContainerStyles}>
        {/* Você pode preencher com seu JSX de 'noChat' se quiser */}
        <h1>BTrust</h1>
        <p>Selecione um chat ou crie um novo para começar.</p>
      </div>
    );
  }

  return (
    <div
      style={styles.containerStyles}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div style={styles.chatWindowStyles}>
        <div style={styles.messagesContainerStyles}>
          {currentMessages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          
          {thinkingProcess.active && (
            <ThinkingIndicator
              steps={thinkingProcess.steps}
              currentScore={thinkingProcess.currentScore}
            />
          )}
          
          <div ref={messagesEndRef} />
          {isDragging && (
            <div style={{ textAlign: 'center', padding: '20px', color: 'blue' }}>
              Arraste os arquivos PDF aqui...
            </div>
          )}
        </div>
      </div>
      <div style={styles.inputAreaStyles}>
        <div style={styles.inputWrapperStyles}>
          <FileUploadPreview files={filesToSend} onRemoveFile={handleRemoveFile} />
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={thinkingProcess.active}
            onStop={handleStopGeneration}
            hasFiles={filesToSend.length > 0}
            onAddFiles={handleAddFiles}
            // Passa a nova função para o ChatInput
            onBranchChat={branchActiveChat}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;