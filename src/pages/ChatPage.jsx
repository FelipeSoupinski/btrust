// src/pages/ChatPage.jsx
import { useEffect, useMemo, useRef, useState } from 'react';

import ChatInput from '../components/ChatInput.jsx';
import ChatMessage from '../components/ChatMessage.jsx';
import FileUploadPreview from '../components/FileUploadPreview.jsx';
import ThinkingIndicator from '../components/ThinkingIndicator.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import * as styles from '../styles/ChatPage.styles.js';

// ====================================================================
// CONFIGURAÇÃO DA API
// ====================================================================
const API_URL = 'http://localhost:8001';
const DEBUG_MODE = true; // Mude para false em produção

function ChatPage() {
  // --- Hooks ---
  const { activeChat, chatMessages, setChatMessages, setChats, branchActiveChat } = useAppContext();
  
  const [thinkingProcess, setThinkingProcess] = useState({
    active: false,
    steps: '',
    currentScore: null,
  });
  
  const [filesToSend, setFilesToSend] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef(null);

  const currentMessages = useMemo(() => chatMessages[activeChat] || [], [chatMessages, activeChat]);

  // ====================================================================
  // UTILITÁRIO DE LOG (DEBUG)
  // ====================================================================
  const debugLog = (message, data = null) => {
    if (DEBUG_MODE) {
      console.log(`[ChatPage] ${message}`, data || '');
    }
  };

  // ====================================================================
  // HANDLERS DE ARQUIVOS E DRAG/DROP
  // ====================================================================
  const handleAddFiles = newFiles => {
    const pdfFiles = Array.from(newFiles).filter(file => file.type === 'application/pdf');
    setFilesToSend(prevFiles => {
      if (prevFiles.length + pdfFiles.length > 10) {
        alert('Você pode enviar no máximo 10 arquivos PDF por vez.');
        return prevFiles;
      }
      return [...prevFiles, ...pdfFiles];
    });
  };

  const handleRemoveFile = index => {
    setFilesToSend(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleDragEnter = e => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = e => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDragOver = e => { e.preventDefault(); e.stopPropagation(); };
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

  useEffect(scrollToBottom, [currentMessages, thinkingProcess.active]);
  
  // ====================================================================
  // HANDLER PRINCIPAL DE ENVIO DE MENSAGEM
  // ====================================================================
  const handleSendMessage = async (text) => {
    debugLog('🚀 handleSendMessage chamado', { text, filesToSend });

    if (!text.trim() && filesToSend.length === 0) {
      debugLog('❌ Mensagem vazia, abortando');
      return;
    }

    // Criar título para novo chat
    if (currentMessages.length === 0 && text.trim()) {
      const newTitle = text.length > 40 ? text.substring(0, 40) + '...' : text;
      setChats(prevChats =>
        prevChats.map(chat => (chat.id === activeChat ? { ...chat, title: newTitle } : chat))
      );
      debugLog('📝 Título do chat atualizado', newTitle);
    }

    // Criar mensagem do usuário
    const userMessage = {
      author: 'user',
      text,
      files: filesToSend,
    };

    const updatedMessages = [...currentMessages, userMessage];
    setChatMessages(prev => ({ ...prev, [activeChat]: updatedMessages }));
    setFilesToSend([]);
    debugLog('✅ Mensagem do usuário adicionada ao estado', userMessage);

    // ====================================================================
    // CHAMADA DE API PARA O BACKEND
    // ====================================================================
    handleStopGeneration();
    
    setThinkingProcess({
      active: true,
      steps: 'Enviando sua pergunta...',
      currentScore: null,
    });

    try {
      // Preparar dados
      const dadosParaEnviar = {
        chatId: activeChat.toString(),
        texto: text,
        arquivos: filesToSend.map(file => file.name),
      };

      debugLog('📤 Enviando para API', { url: `${API_URL}/api/enviar_mensagem`, payload: dadosParaEnviar });

      // Fazer requisição
      const response = await fetch(`${API_URL}/api/enviar_mensagem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar),
      });

      debugLog('📡 Resposta recebida', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok 
      });

      // Verificar se a resposta é OK
      if (!response.ok) {
        let errorMessage = `Erro ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorMessage;
          debugLog('❌ Erro detalhado da API', errorData);
        } catch (parseError) {
          debugLog('⚠️ Não foi possível parsear erro JSON', parseError);
        }
        
        throw new Error(errorMessage);
      }

      // Parse da resposta de sucesso
      const data = await response.json();
      debugLog('✅ Resposta do backend parseada', data);

      console.log('✅ Mensagem enfileirada com sucesso!');
      console.log('   - Status:', data.status);
      console.log('   - Detalhe:', data.detalhe);
      console.log('   - MessageID:', data.messageId);
      console.log('   - Versão do Backend:', data.versao);

      // Atualizar status do ThinkingIndicator
      setThinkingProcess(prev => ({
        ...prev,
        steps: 'Pergunta recebida! Aguardando processamento...',
      }));

      // NOTA: A resposta do bot virá do consumidor posteriormente

    } catch (error) {
      // Tratar erros
      console.error('❌ ERRO ao enviar mensagem:', error);
      debugLog('❌ Stack trace', error.stack);

      const errorResponse = {
        author: 'bot',
        text: `Desculpe, ocorreu um erro ao enviar sua mensagem: ${error.message}`,
        score: { level: 'low', value: 0 },
      };

      setChatMessages(prev => ({
        ...prev,
        [activeChat]: [...updatedMessages, errorResponse],
      }));

      setThinkingProcess({ active: false, steps: '', currentScore: null });
    }
  };

  // ====================================================================
  // HANDLER DE PARAR GERAÇÃO
  // ====================================================================
  const handleStopGeneration = () => {
    debugLog('⏹️ Parando geração');
    setThinkingProcess({ active: false, steps: '', currentScore: null });
  };

  // ====================================================================
  // RENDERIZAÇÃO
  // ====================================================================
  if (!activeChat) {
    return (
      <div style={styles.noChatContainerStyles}>
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
            <div style={{ textAlign: 'center', padding: '20px', color: '#2196F3' }}>
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
            onBranchChat={branchActiveChat}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;