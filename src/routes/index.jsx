// src/routes/index.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from '../pages/ChatPage.jsx';
import ModelSelectPage from '../pages/ModelSelectPage.jsx';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/model-select" element={<ModelSelectPage />} />
            <Route path="/" element={<Navigate to="/chat" replace />} />
        </Routes>
    );
};

export default AppRoutes;
