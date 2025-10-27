// src/pages/ChatPage.jsx
import { useEffect, useMemo, useRef, useState } from 'react';

import BotMessage from '../components/BotMessage.jsx';
import ChatInput from '../components/ChatInput.jsx';
import ChatMessage from '../components/ChatMessage.jsx';
import ThinkingIndicator from '../components/ThinkingIndicator.jsx';
import { useAppContext } from '../context/AppContext.jsx';
import { COLORS, FONT_SIZES, FONTS } from '../styles/theme.js';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  flexGrow: 1,
};

const chatWindowStyles = {
  flexGrow: 1,
  overflowY: 'auto',
  padding: '20px 0', // Padding horizontal removido para ser controlado pelo container filho
  display: 'flex',
  flexDirection: 'column',
};

const inputAreaStyles = {
  padding: '20px',
  backgroundColor: COLORS.fundo,
};

const messagesContainerStyles = {
  width: '100%',
  maxWidth: '842px', // Mesma largura máxima do container do input
  margin: '0 auto', // Centraliza o container
  display: 'flex',
  flexDirection: 'column',
};

function ChatPage() {
  const { activeChat, chatMessages, setChatMessages, setChats } = useAppContext();
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const thinkingTimeoutRef = useRef(null); // Ref para guardar o ID do timeout

  const currentMessages = useMemo(() => chatMessages[activeChat] || [], [chatMessages, activeChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [currentMessages, isThinking]);

  const handleSendMessage = text => {
    // Se for a primeira mensagem, atualiza o título do chat na sidebar
    if (currentMessages.length === 0) {
      const newTitle = text.length > 40 ? text.substring(0, 40) + '...' : text;
      setChats(prevChats =>
        prevChats.map(chat => (chat.id === activeChat ? { ...chat, title: newTitle } : chat))
      );
    }

    const userMessage = { author: 'user', text };

    // Adiciona a mensagem do usuário ao estado
    const updatedMessages = [...currentMessages, userMessage];
    setChatMessages(prev => ({ ...prev, [activeChat]: updatedMessages }));

    // Simula o bot "pensando"
    setIsThinking(true);

    // Simula a resposta do bot após um tempo
    // Guarda o ID do timeout para que possamos cancelá-lo
    thinkingTimeoutRef.current = setTimeout(() => {
      // Lógica para ciclar entre os scores para facilitar os testes manuais
      const testScores = [
        { level: 'high', value: 95 },
        { level: 'medium', value: 65 },
        { level: 'low', value: 35 },
      ];
      const testMetrics = [
        { docCount: 15, coverage: 98, relevance: 85 },
        { docCount: 8, coverage: 75, relevance: 60 },
        { docCount: 3, coverage: 40, relevance: 30 },
      ];
      const botResponseCount = Math.floor(updatedMessages.length / 2);
      const scoreToTest = testScores[botResponseCount % testScores.length];
      const metricsToTest = testMetrics[botResponseCount % testMetrics.length];

      let scoreExplanationText = '';
      if (scoreToTest.level === 'high') {
        scoreExplanationText =
          'O nível de confiança é alto, indicando que a resposta foi gerada com base em múltiplos documentos altamente relevantes e cobrindo a maior parte da sua pergunta. Você pode usar esta informação com grande segurança.';
      } else if (scoreToTest.level === 'medium') {
        scoreExplanationText =
          'O nível de confiança é médio. A resposta utilizou documentos relevantes, mas pode haver lacunas na cobertura da pergunta ou a relevância média das fontes não foi a ideal. Recomenda-se uma verificação rápida ou refinar a pergunta se precisar de mais precisão.';
      } else {
        scoreExplanationText =
          'O nível de confiança é baixo. A resposta pode ter sido gerada com poucas fontes, ou as fontes encontradas não foram muito relevantes para a sua pergunta. É crucial verificar esta informação antes de usar ou reformular a sua pergunta para obter resultados mais precisos.';
      }

      const botResponse = {
        author: 'bot',
        text: (
          <BotMessage
            text={`Esta é uma resposta simulada para a sua pergunta: "${text}". A integração real com a IA virá em breve.`}
            score={scoreToTest}
            metrics={metricsToTest}
            scoreExplanation={scoreExplanationText}
          />
        ),
      };

      setChatMessages(prev => ({
        ...prev,
        [activeChat]: [...updatedMessages, botResponse],
      }));

      setIsThinking(false);
    }, 2500); // Simula 2.5 segundos de espera
  };

  const handleStopGeneration = () => {
    if (thinkingTimeoutRef.current) {
      clearTimeout(thinkingTimeoutRef.current);
      thinkingTimeoutRef.current = null;
    }
    setIsThinking(false);
    // Opcional: Adicionar uma mensagem informando que a geração foi parada
    // (Pode ser implementado depois)
  };

  // Se nenhum chat estiver ativo, mostra uma mensagem inicial
  if (!activeChat) {
    return (
      <div style={{ ...containerStyles, alignItems: 'center', justifyContent: 'center' }}>
        <h1
          style={{
            fontSize: FONT_SIZES.titulo,
            color: COLORS.principal,
            fontFamily: FONTS.secundaria,
          }}
        >
          BTrust
        </h1>
        <p style={{ color: COLORS.textosSecundarios }}>
          Selecione um chat ou crie um novo para começar.
        </p>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <div style={chatWindowStyles}>
        <div style={messagesContainerStyles}>
          {currentMessages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isThinking && <ThinkingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div style={inputAreaStyles}>
        <div style={{ maxWidth: '842px', margin: '0 auto' }}>
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isThinking}
            onStop={handleStopGeneration}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
