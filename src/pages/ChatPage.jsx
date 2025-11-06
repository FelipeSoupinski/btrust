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
  const { activeChat, chatMessages, setChatMessages, setChats } = useAppContext();
  const [thinkingProcess, setThinkingProcess] = useState({
    active: false,
    steps: '',
    currentScore: null, // Pode começar nulo ou com um valor { level: 'low', value: 0 }
  });
  const [isThinking, setIsThinking] = useState(false);
  const [filesToSend, setFilesToSend] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef(null);
  const thinkingTimeoutRef = useRef([]); // Ref para guardar o ID do timeout

  const currentMessages = useMemo(() => chatMessages[activeChat] || [], [chatMessages, activeChat]);

  const handleAddFiles = newFiles => {
    const pdfFiles = Array.from(newFiles).filter(file => file.type === 'application/pdf');
    setFilesToSend(prevFiles => {
      // Rejeita a adição se o total exceder 10
      if (prevFiles.length + pdfFiles.length > 10) {
        alert('Você pode enviar no máximo 10 arquivos PDF por vez.');
        return prevFiles; // Mantém os arquivos anteriores sem adicionar os novos
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
    e.stopPropagation(); // Necessário para o onDrop funcionar
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

  useEffect(scrollToBottom, [currentMessages, isThinking]);

  const handleSendMessage = text => {
    if (!text.trim() && filesToSend.length === 0) {
      return;
    }

    if (currentMessages.length === 0 && text.trim()) {
      // ... (lógica para atualizar título do chat) ...
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
    
    handleStopGeneration(); // Limpa timeouts antigos
    
    // 1. Ativa o "thinking" e define o PRIMEIRO passo e score
    setThinkingProcess({
      active: true,
      steps: 'Iniciando análise da sua pergunta...',
      currentScore: { level: 'low', value: 10 }, // Score inicial
    });

    const timeouts = [];

    // 2. Simula o segundo passo (texto e score)
    timeouts.push(
      setTimeout(() => {
        setThinkingProcess(prev => ({
          ...prev,
          steps: prev.steps + '\n- Consultando bases de dados selecionadas...',
          currentScore: { level: 'low', value: 35 }, // Score melhora
        }));
      }, 1000) // 1s
    );

    // 3. Simula o terceiro passo (texto e score)
    timeouts.push(
      setTimeout(() => {
        setThinkingProcess(prev => ({
          ...prev,
          steps: prev.steps + '\n- Analisando documentos relevantes para RAG...',
          currentScore: { level: 'medium', value: 65 }, // Score melhora mais
        }));
      }, 2000) // 2s
    );

    // 4. Simula o quarto passo (texto e score)
    timeouts.push(
      setTimeout(() => {
        setThinkingProcess(prev => ({
          ...prev,
          steps: prev.steps + '\n- Gerando rascunho da resposta...',
          currentScore: { level: 'high', value: 85 }, // Score quase final
        }));
      }, 3000) // 3s
    );

    // 5. Simula a resposta final (o antigo timeout)
    timeouts.push(
      setTimeout(() => {
        // ... (Toda a lógica de mock de resposta que já existia)
        // Você pode usar os mocks que já tinha
        const scoreFinal = { level: 'high', value: 95 }; // O score final da resposta
        const metricsToTest = { docCount: 15, coverage: 98, relevance: 85 };
        const testReferences = [{ name: 'Relatório Anual 2023.pdf', page: 12 }];
        const scoreExplanationText = 'O nível de confiança é alto...';
        // ...
        
        const botResponse = {
          author: 'bot',
          text: (
            <BotMessage
              text={`Esta é uma resposta simulada para a sua pergunta: "${text}".`}
              score={scoreFinal} // Usa o score final
              references={testReferences}
              metrics={metricsToTest}
              scoreExplanation={scoreExplanationText}
            />
          ),
        };

        // Adiciona a resposta final
        setChatMessages(prev => ({
          ...prev,
          [activeChat]: [...updatedMessages, botResponse],
        }));

        // 6. Desliga o "thinking" e limpa o estado
        setThinkingProcess({ active: false, steps: '', currentScore: null });
        thinkingTimeoutRef.current = [];
        
      }, 4000) // Simula 4s no total
    );

    thinkingTimeoutRef.current = timeouts;
  };

  const handleStopGeneration = () => {
    if (thinkingTimeoutRef.current.length > 0) {
      thinkingTimeoutRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    }
    thinkingTimeoutRef.current = [];
    
    // Limpa o estado de "thinking"
    setThinkingProcess({ active: false, steps: '', currentScore: null });
  };

  // ... (Lógica de `if (!activeChat)` permanece igual) ...
  if (!activeChat) {
    return (
      <div style={styles.noChatContainerStyles}>
        {/* ... (seu JSX de 'nenhum chat') ... */}
      </div>
    );
  }

  return (
    <div
      style={styles.containerStyles}
      // ... (seus handlers de drag/drop)
    >
      <div style={styles.chatWindowStyles}>
        <div style={styles.messagesContainerStyles}>
          {currentMessages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          
          {/* !!! MUDANÇA NA RENDERIZAÇÃO !!! */}
          {/* Renderiza o indicador se estiver ativo e passa o score */}
          {thinkingProcess.active && (
            <ThinkingIndicator
              steps={thinkingProcess.steps}
              currentScore={thinkingProcess.currentScore}
            />
          )}
          
          <div ref={messagesEndRef} />
          {/* ... (seu JSX de 'isDragging') ... */}
        </div>
      </div>
      <div style={styles.inputAreaStyles}>
        <div style={styles.inputWrapperStyles}>
          <FileUploadPreview files={filesToSend} onRemoveFile={handleRemoveFile} />
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={thinkingProcess.active} // Desabilita com base no 'active'
            onStop={handleStopGeneration}
            hasFiles={filesToSend.length > 0}
            onAddFiles={handleAddFiles}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;