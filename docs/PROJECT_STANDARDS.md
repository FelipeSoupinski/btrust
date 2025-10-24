# BTrust - Padrões e Configurações do Projeto

> Documentação técnica completa dos padrões, configurações e convenções utilizadas no projeto BTrust para facilitar o desenvolvimento e integração com LLMs.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Padrões de Código](#padrões-de-código)
- [Sistema de Design](#sistema-de-design)
- [Gerenciamento de Estado](#gerenciamento-de-estado)
- [Arquitetura de Componentes](#arquitetura-de-componentes)
- [Configurações](#configurações)
- [Docker](#docker)
- [Scripts Disponíveis](#scripts-disponíveis)

---

## 🎯 Visão Geral

**Nome do Projeto:** BTrust MVP  
**Tipo:** Aplicação Web Frontend  
**Framework Principal:** React 19.1.1  
**Build Tool:** Vite 7.1.7  
**Linguagem:** JavaScript (ES2020+)  
**Tipo de Módulo:** ESM (ES Modules)

O BTrust é uma aplicação de chat inteligente com seleção de bases de dados, desenvolvida para a B3 (Brasil, Bolsa, Balcão).

---

## 🛠 Tecnologias

### Core
- **React:** 19.1.1 (com React DOM 19.1.1)
- **Vite:** 7.1.7 (build tool e dev server)
- **Node.js:** Compatível com ES2020+

### Desenvolvimento
- **ESLint:** 9.36.0
- **Plugins ESLint:**
  - `eslint-plugin-react-hooks` (5.2.0)
  - `eslint-plugin-react-refresh` (0.4.22)
- **@vitejs/plugin-react:** 5.0.4

### Containerização
- **Docker** com Docker Compose
- **Nginx** (para servir build de produção)

---

## 📁 Estrutura do Projeto

```
btrust/
├── bin/                          # Scripts auxiliares
│   └── docker-compose.sh
├── public/                       # Arquivos estáticos públicos
├── src/                          # Código fonte principal
│   ├── assets/                   # Imagens, ícones, etc.
│   ├── components/               # Componentes reutilizáveis
│   │   ├── ChatInput.jsx
│   │   ├── ChatMessage.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SuggestionButtons.jsx
│   │   └── styles/               # Estilos isolados por componente
│   │       ├── ChatInputStyles.js
│   │       ├── ChatMessageStyles.js
│   │       ├── HeaderStyles.js
│   │       ├── SidebarStyles.js
│   │       └── SuggestionButtonsStyles.js
│   ├── context/                  # Context API (estado global)
│   │   └── AppContext.jsx
│   ├── pages/                    # Páginas/Views principais
│   │   ├── ChatPage.jsx
│   │   ├── ModelSelectPage.jsx
│   │   └── styles/               # Estilos isolados por página
│   │       ├── ChatPageStyles.js
│   │       └── ModelSelectPageStyles.js
│   ├── styles/                   # Estilos globais e tema
│   │   ├── AppStyles.js
│   │   ├── GlobalStyles.css
│   │   └── theme.js              # Design tokens centralizados
│   ├── App.jsx                   # Componente raiz
│   ├── App.css
│   ├── main.jsx                  # Entry point
│   └── index.css
├── docs/                         # Documentação
├── docker-compose.yml            # Configuração Docker (produção)
├── docker-compose.dev.yml        # Configuração Docker (desenvolvimento)
├── Dockerfile                    # Imagem Docker
├── nginx.conf                    # Configuração Nginx
├── vite.config.js                # Configuração Vite
├── eslint.config.js              # Configuração ESLint
├── package.json                  # Dependências e scripts
├── index.html                    # HTML raiz
└── README.md
```

### Convenções de Nomenclatura

- **Componentes React:** PascalCase (ex: `ChatInput.jsx`, `Header.jsx`)
- **Arquivos de Estilos:** PascalCase + "Styles" (ex: `ChatInputStyles.js`)
- **Contextos:** PascalCase + "Context" (ex: `AppContext.jsx`)
- **Páginas:** PascalCase + "Page" (ex: `ChatPage.jsx`)
- **Constantes:** UPPER_SNAKE_CASE (ex: `MOCK_DATA_SOURCES`)
- **Funções/Variáveis:** camelCase (ex: `toggleDataSource`, `isSidebarOpen`)

---

## 💻 Padrões de Código

### Extensão de Arquivos
- **Componentes React:** `.jsx`
- **Configurações:** `.js`
- **Estilos:** `.js` (CSS-in-JS usando objetos JavaScript)
- **CSS Global:** `.css`

### Padrões de Importação

```javascript
// 1. Imports de bibliotecas externas
import { createContext, useContext, useState } from 'react';

// 2. Imports de componentes locais
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';

// 3. Imports de contextos
import { AppProvider, useAppContext } from './context/AppContext.jsx';

// 4. Imports de páginas
import ChatPage from './pages/ChatPage.jsx';

// 5. Imports de estilos
import { inputContainerStyles, inputFieldStyles } from './styles/ChatInputStyles.js';
```

**⚠️ IMPORTANTE:** Sempre incluir a extensão `.jsx` ou `.js` nos imports.

### Estrutura de Componentes

```javascript
// src/components/ExampleComponent.jsx
import React from 'react';
import { styleObject } from './styles/ExampleComponentStyles.js';

function ExampleComponent({ prop1, prop2 }) {
    // 1. Estados locais
    const [state, setState] = useState(initialValue);
    
    // 2. Contextos (se necessário)
    const { contextValue } = useAppContext();
    
    // 3. Handlers/Funções auxiliares
    const handleAction = () => {
        // lógica
    };
    
    // 4. Renderização
    return (
        <div style={styleObject}>
            {/* JSX */}
        </div>
    );
}

export default ExampleComponent;
```

### Regras ESLint

```javascript
{
  ecmaVersion: 2020,
  sourceType: 'module',
  ecmaFeatures: { jsx: true },
  globals: globals.browser,
  
  rules: {
    // Variáveis não utilizadas são errors, 
    // exceto se começarem com letra maiúscula ou underscore
    'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]'}],
  }
}
```

---

## 🎨 Sistema de Design

### Design Tokens (`src/styles/theme.js`)

O tema é centralizado e exportado através de constantes:

```javascript
export const COLORS = {
  principal: '#012C63',          // Azul Escuro (B3 Principal)
  fundo: '#F9F9F9',              // Cinza Claro (Background)
  detalhes: '#FFD862',           // Amarelo (Destaques)
  textosSecundarios: '#40444D',  // Cinza Chumbo (Texto Secundário)
  branco: '#FFFFFF',
  preto: '#000000',
};

export const FONTS = {
  principal: 'Mulish, sans-serif',
  secundaria: 'Montserrat, sans-serif',
};

export const FONT_SIZES = {
  titulo: '32px',
  subtitulo: '24px',
  texto: '16px',
  subtexto: '14px',
};
```

### Padrão de Estilos: CSS-in-JS

**Todos os estilos são objetos JavaScript**, não CSS puro. Cada componente tem seu arquivo de estilos correspondente.

#### Exemplo de Arquivo de Estilos:

```javascript
// src/components/styles/ChatInputStyles.js
import { COLORS, FONT_SIZES, FONTS } from '../../styles/theme.js';

export const inputContainerStyles = {
    width: '100%',
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    backgroundColor: COLORS.branco,
    borderRadius: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: `1px solid #E8E8E8`,
};

export const inputFieldStyles = {
    flexGrow: 1,
    border: 'none',
    padding: '8px 12px',
    fontSize: '14px',
    outline: 'none',
    color: COLORS.textosSecundarios,
    background: 'transparent',
    fontFamily: FONTS.principal,
};
```

#### Como Usar nos Componentes:

```javascript
import { inputContainerStyles, inputFieldStyles } from './styles/ChatInputStyles.js';

function ChatInput() {
    return (
        <div style={inputContainerStyles}>
            <input style={inputFieldStyles} />
        </div>
    );
}
```

### Interatividade (Hover, Focus, etc.)

Como usamos CSS-in-JS com objetos, **estados interativos são aplicados inline**:

```javascript
<button 
    style={sendButtonStyles}
    onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(1, 44, 99, 0.3)';
    }}
    onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'none';
    }}
>
    Enviar
</button>
```

**Padrão de Transições:**
```javascript
transition: 'transform 0.2s, box-shadow 0.2s'
```

---

## 🔄 Gerenciamento de Estado

### Context API (`src/context/AppContext.jsx`)

O estado global é gerenciado através da **Context API do React**.

#### Estrutura do Contexto:

```javascript
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Estados globais
    const [activeScreen, setActiveScreen] = useState('chat');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [availableDataSources] = useState(MOCK_DATA_SOURCES);
    const [selectedDataSources, setSelectedDataSources] = useState([1]);
    
    // Funções globais
    const toggleDataSource = (id) => {
        setSelectedDataSources(prev => 
            prev.includes(id) 
                ? prev.filter(sourceId => sourceId !== id)
                : [...prev, id]
        );
    };
    
    const contextValue = {
        activeScreen,
        setActiveScreen,
        isSidebarOpen,
        setIsSidebarOpen,
        availableDataSources,
        selectedDataSources,
        setSelectedDataSources,
        toggleDataSource,
    };
    
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// Hook customizado para consumir o contexto
export const useAppContext = () => {
    return useContext(AppContext);
};
```

#### Como Usar o Contexto:

```javascript
import { useAppContext } from '../context/AppContext.jsx';

function MyComponent() {
    const { activeScreen, setActiveScreen, selectedDataSources } = useAppContext();
    
    return (
        <div>
            <p>Tela ativa: {activeScreen}</p>
            <p>Bases selecionadas: {selectedDataSources.length}</p>
        </div>
    );
}
```

### Estados Disponíveis no Contexto

| Estado | Tipo | Descrição |
|--------|------|-----------|
| `activeScreen` | string | Tela ativa: `'chat'` ou `'model-select'` |
| `setActiveScreen` | function | Altera a tela ativa |
| `isSidebarOpen` | boolean | Controla se a sidebar está aberta |
| `setIsSidebarOpen` | function | Toggle da sidebar |
| `availableDataSources` | array | Lista de todas as bases de dados disponíveis |
| `selectedDataSources` | array | IDs das bases selecionadas para o chat |
| `setSelectedDataSources` | function | Define as bases selecionadas |
| `toggleDataSource` | function | Liga/desliga uma base específica |

### Dados Mock

```javascript
const MOCK_DATA_SOURCES = [
    { id: 1, name: 'Marketing', description: 'Descrição simples sobre a base de dados' },
    { id: 2, name: 'Finanças', description: 'Dados financeiros e relatórios de mercado' },
    { id: 3, name: 'Regulatório', description: 'Documentação e normas da B3' },
    { id: 4, name: 'Tecnologia', description: 'Dados sobre infraestrutura e sistemas' },
    { id: 5, name: 'Risco', description: 'Modelos e análises de risco' },
    { id: 6, name: 'Ativos', description: 'Informações detalhadas sobre ativos' },
];
```

---

## 🏗 Arquitetura de Componentes

### Hierarquia Principal

```
App (Provider Wrapper)
└── AppLayout
    ├── Sidebar
    └── Main Content
        ├── Header
        └── Current Page
            ├── ChatPage
            │   ├── ChatMessage (múltiplos)
            │   ├── SuggestionButtons
            │   └── ChatInput
            └── ModelSelectPage
```

### Componentes Principais

#### 1. **App.jsx**
- Wrapper principal que injeta o `AppProvider`
- Renderiza `AppLayout`

#### 2. **AppLayout**
- Consome o contexto global
- Controla qual página exibir baseado em `activeScreen`
- Gerencia layout com Sidebar + Main Content

#### 3. **Header**
- Exibe logo, dropdown de bases de dados, perfil
- Conectado ao contexto para gerenciar `selectedDataSources`

#### 4. **Sidebar**
- Navegação lateral colapsável
- Controla `activeScreen` e `isSidebarOpen`

#### 5. **ChatPage**
- Página principal de chat
- Contém histórico de mensagens, sugestões e input

#### 6. **ModelSelectPage**
- Página de seleção de modelos/bases de dados
- Permite configurar `selectedDataSources`

#### 7. **ChatInput**
- Campo de entrada de mensagens
- Suporta Enter para enviar, Shift+Enter para nova linha
- Ícone de anexo e botão de envio

#### 8. **ChatMessage**
- Exibe mensagens individuais (usuário ou assistente)
- Suporte a markdown, formatação, etc.

#### 9. **SuggestionButtons**
- Botões de sugestões rápidas na interface do chat

---

## ⚙️ Configurações

### Vite (`vite.config.js`)

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,              // Permite acesso externo (0.0.0.0)
    port: 8080,              // Porta padrão
    strictPort: true,        // Falha se porta não estiver disponível
    watch: {
      usePolling: true,      // Necessário para Docker/volumes
      interval: 1000,        // Intervalo de polling
    },
  },
})
```

**Porta de Desenvolvimento:** `8080`  
**Hot Module Replacement (HMR):** Ativo com polling para compatibilidade Docker

### ESLint (`eslint.config.js`)

- **ECMAVersion:** 2020
- **Source Type:** module (ESM)
- **Globals:** browser
- **Plugins:** react-hooks, react-refresh
- **Arquivos ignorados:** `dist/`

### Docker

#### Produção (`docker-compose.yml`)

```yaml
services:
  frontend:
    container_name: btrust-mvp
    build: .
    ports:
      - "8080:80"
    restart: always
```

- **Build:** Multi-stage (Node + Nginx)
- **Porta exposta:** 8080 (mapeada para porta 80 do Nginx)
- **Servidor:** Nginx (serve build estático)

#### Nginx (`nginx.conf`)

Configurado para:
- Servir arquivos estáticos da pasta `/usr/share/nginx/html`
- Redirecionar todas as rotas para `index.html` (SPA)
- Compressão Gzip
- Cache otimizado

---

## 🐳 Docker

### Dockerfile (Multi-stage)

**Stage 1: Build**
- Base: `node:20-alpine`
- Instala dependências
- Executa `npm run build`

**Stage 2: Production**
- Base: `nginx:alpine`
- Copia build do stage anterior
- Copia `nginx.conf`
- Expõe porta 80

### Comandos Docker

```bash
# Subir container (produção)
docker compose up -d

# Derrubar container
docker compose down --remove-orphans --volumes

# Ver logs
docker compose logs -f

# Reconstruir e subir
docker compose down --remove-orphans && docker compose up -d --build
```

---

## 📜 Scripts Disponíveis

```json
{
  "dev": "vite",                    // Inicia dev server (porta 8080)
  "build": "vite build",            // Build de produção (output: dist/)
  "lint": "eslint .",               // Executa linting
  "preview": "vite preview",        // Preview do build local
  "docker:up": "docker compose down --remove-orphans && docker compose up -d",
  "docker:down": "docker compose down --remove-orphans --volumes",
  "docker:restart": "npm run docker:down && npm run docker:up",
  "docker:logs": "docker compose logs -f"
}
```

### Comandos Comuns

```bash
# Desenvolvimento local
npm run dev

# Lint do código
npm run lint

# Build de produção
npm run build

# Preview do build
npm run preview

# Docker (produção)
npm run docker:up
npm run docker:logs
npm run docker:down
npm run docker:restart
```

---

## 📝 Convenções de Desenvolvimento

### Props de Componentes

Sempre use **destructuring** e forneça **valores padrão** quando aplicável:

```javascript
function ChatInput({ value = '', onChange, onSend }) {
    // ...
}
```

### Event Handlers

- Prefixo `handle` para funções de evento: `handleClick`, `handleKeyPress`, `handleSendClick`
- Use arrow functions inline para callbacks simples de estilo

```javascript
const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (onSend && value.trim()) {
            onSend(value);
        }
    }
};
```

### Comentários

```javascript
// --- Comentários de Seção ---
// Para dividir grandes blocos lógicos

// Comentários de linha única
// Para explicar lógica específica

/**
 * Comentários de documentação (quando necessário)
 * @param {string} value - Descrição
 */
```

---

## 🔒 Boas Práticas

1. **Sempre importar do tema:** Use `COLORS`, `FONTS`, `FONT_SIZES` de `theme.js`
2. **Separação de estilos:** Cada componente tem seu arquivo de estilos
3. **Contexto para estado global:** Use Context API, não prop drilling
4. **Componentes puros:** Separe lógica de apresentação
5. **Extensões explícitas:** Sempre inclua `.jsx` ou `.js` nos imports
6. **ESM:** Use `import/export`, não `require/module.exports`
7. **Validação de dados:** Sempre valide antes de executar ações (ex: `value.trim()`)
8. **Acessibilidade:** Use elementos semânticos quando possível

---

## 🚀 Fluxo de Desenvolvimento

1. **Clone o repositório**
2. **Instale dependências:** `npm install`
3. **Execute localmente:** `npm run dev`
4. **Desenvolva** seguindo os padrões deste documento
5. **Lint antes de commit:** `npm run lint`
6. **Build de produção:** `npm run build`
7. **Teste com Docker:** `npm run docker:up`

---

## 📚 Referências Rápidas

- **React Docs:** https://react.dev
- **Vite Docs:** https://vite.dev
- **ESLint:** https://eslint.org
- **Docker Compose:** https://docs.docker.com/compose/

---

## 🤖 Instruções para LLMs

Ao trabalhar com este projeto:

1. **Sempre consulte `theme.js`** antes de criar estilos
2. **Mantenha a estrutura de pastas** existente
3. **Use CSS-in-JS** (objetos JavaScript), não CSS puro
4. **Imports devem incluir extensões** (`.jsx`, `.js`)
5. **Contexto global** está em `AppContext.jsx`
6. **Cada componente tem seu arquivo de estilos** em `./styles/`
7. **Siga os padrões de nomenclatura** (PascalCase, camelCase, etc.)
8. **Use hooks modernos do React** (useState, useContext, etc.)
9. **Porta de desenvolvimento é 8080**, não 5173 ou 3000
10. **Docker usa Nginx** para produção, não serve via Vite

---

**Última Atualização:** Outubro 2025  
**Versão do Documento:** 1.0.0
