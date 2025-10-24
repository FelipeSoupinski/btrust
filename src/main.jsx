// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import AgentResponsePage from './pages/AgentResponsePage.jsx';
import './styles/GlobalStyles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AgentResponsePage />
  </React.StrictMode>,
);